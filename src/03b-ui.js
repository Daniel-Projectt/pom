/* ---- the pure parts can be tested outside a browser ---- */
if(typeof window === "undefined"){
  module.exports = {CH:CH, COURSE:COURSE, GUIDE:GUIDE,
    QB:QB, PAIRSETS:PAIRSETS, VERDICTS:VERDICTS, CHAPTERS:CHAPTERS, TOPIC_NAMES:TOPIC_NAMES, SEC_TITLES:SEC_TITLES, SEC_CHAPTER:SEC_CHAPTER,
    CONFIRMED:CONFIRMED, TIERS:TIERS, TIER_TITLES:TIER_TITLES, REVIEW_NOTE:REVIEW_NOTE, hotOf:hotOf, reviewQuestions:reviewQuestions,
    fromBank:fromBank, fromPair:fromPair, topicQuestions:topicQuestions, mockQuestions:mockQuestions, questionsByKeys:questionsByKeys,
    deckFor:deckFor, matchRound:matchRound, verdictFor:verdictFor};
  return;
}

/* ================================================================ flashcards */
function makeCards(root){
  root.innerHTML =
    '<div class="flashWrap"><div class="flash"><div class="flashInner">'+
      '<div class="face front card-corners">'+CORNERS+'<div class="fc"></div></div>'+
      '<div class="face back card-corners">'+CORNERS+'<div class="fc"></div></div>'+
    '</div></div>'+
    '<div class="progress"><i style="width:0"></i></div><p class="counter"></p>'+
    '<div class="toolbar tight"><button class="btn prev" type="button">&lsaquo; Prev</button><button class="btn primary flip" type="button">Flip</button><button class="btn next" type="button">Next &rsaquo;</button></div></div>';
  var deck = [], idx = 0;
  var flash = $(".flash", root), fF = $(".face.front .fc", root), fB = $(".face.back .fc", root), bar = $(".progress i", root), counter = $(".counter", root);
  function render(){
    if(!deck.length) return;
    var d = deck[idx];
    fF.innerHTML = d.front; fB.innerHTML = d.back;
    counter.textContent = (idx+1) + " of " + deck.length;
    bar.style.width = ((idx+1) / deck.length * 100) + "%";
  }
  /* snap to the front without animating, so the next card's back never shows mid-turn */
  function unflip(){
    if(!flash.classList.contains("flipped")) return;
    flash.classList.add("noanim"); flash.classList.remove("flipped");
    void flash.offsetWidth; flash.classList.remove("noanim");
  }
  function go(step){ unflip(); idx = (idx + step + deck.length) % deck.length; render(); }
  function flip(){ flash.classList.toggle("flipped"); }
  flash.addEventListener("click", flip);
  $(".flip", root).addEventListener("click", flip);
  $(".next", root).addEventListener("click", function(){ go(1); });
  $(".prev", root).addEventListener("click", function(){ go(-1); });
  return {
    load:function(d){ deck = d; idx = 0; unflip(); render(); },
    keys:function(e){
      if(e.key === "ArrowRight"){ go(1); return true; }
      if(e.key === "ArrowLeft"){ go(-1); return true; }
      if(e.key === " " || e.key === "Spacebar"){ flip(); return true; }
      return false;
    }
  };
}

/* ================================================================ match */
function makeMatch(root, getRound){
  var items = [], sel = null, miss = 0, done = 0, started = false;
  function round(){
    var r = getRound();
    items = r.items; sel = null; miss = 0; done = 0; started = true;
    root.innerHTML = '<div class="toolbar"><button class="btn primary" type="button">New round</button></div>'+
      '<p class="scoreline"></p><div class="mbanner"></div>'+
      '<div class="matchGrid"><div class="col"><h3>'+r.leftTitle+'</h3><div class="tiles text names L"></div></div>'+
      '<div class="col"><h3>'+r.rightTitle+'</h3><div class="tiles text R"></div></div></div>';
    $(".toolbar .btn", root).addEventListener("click", round);
    shuffle(items).forEach(function(it){ tile($(".L", root), "L", it, it.left); });
    shuffle(items).forEach(function(it){ tile($(".R", root), "R", it, it.right); });
    upd();
  }
  function upd(){ $(".scoreline", root).innerHTML = "Matched <b>"+done+" of "+items.length+"</b> &nbsp;&middot;&nbsp; Misses <b>"+miss+"</b>"; }
  function tile(parent, side, it, text){
    var b = document.createElement("button");
    b.type = "button"; b.className = "tile"; b.innerHTML = text;
    b.addEventListener("click", function(){ click(side, it, b); });
    parent.appendChild(b);
  }
  function click(side, it, node){
    if(node.classList.contains("done")) return;
    if(!sel){ sel = {side:side, it:it, node:node}; node.classList.add("sel"); return; }
    if(sel.side === side){ sel.node.classList.remove("sel"); sel = {side:side, it:it, node:node}; node.classList.add("sel"); return; }
    var a = sel; sel = null; a.node.classList.remove("sel");
    if(a.it.id === it.id){
      a.node.classList.add("done"); node.classList.add("done"); done++; upd();
      if(done === items.length){
        $(".mbanner", root).innerHTML = '<p class="banner">'+verdictFor(Math.round(items.length/(items.length+miss)*100)).t+' &mdash; '+
          (miss === 0 ? "a clean round." : miss + (miss === 1 ? " miss." : " misses."))+' Press <b>New round</b> for another set.</p>';
      }
    } else {
      miss++; upd();
      [a.node, node].forEach(function(x){ x.classList.add("bad"); setTimeout(function(){ x.classList.remove("bad"); }, 400); });
    }
  }
  return {round:round, ensure:function(){ if(!started) round(); }};
}

/* ================================================================ quiz */
function makeQuiz(root, gen, opts){
  opts = opts || {};
  var qs = [], qi = 0, score = 0, missed = [], answered = false, started = false;
  function start(keys){
    qs = keys ? questionsByKeys(keys) : gen();
    qi = 0; score = 0; missed = []; started = true; render();
  }
  function shell(){
    if(!$(".dots", root)){ root.innerHTML = '<div class="quizWrap"><div class="dots"></div><div class="qbody"></div></div>'; }
    return $(".qbody", root);
  }
  function dots(){
    var d = $(".dots", root); d.innerHTML = "";
    qs.forEach(function(q, i){
      var s = document.createElement("i");
      if(q.got === true) s.className = "ok"; else if(q.got === false) s.className = "no"; else if(i === qi) s.className = "on";
      d.appendChild(s);
    });
  }
  function tagFor(q){
    var t = q.ap ? "Application" : (q.kind === "tf" ? "True or false" : (q.kind === "id" ? "Identification" : "Multiple choice"));
    return '<span class="qtag">'+t+'</span>' + (SEC_TITLES[q.sec] ? '<span class="qtag sec">'+SEC_TITLES[q.sec]+'</span>' : '')
      + (opts.showTier ? '<span class="qtag tier t'+(q.hot||0)+'">'+TIER_TITLES[q.hot||0]+'</span>' : '');
  }
  function render(){
    var body = shell(); dots();
    if(qi >= qs.length){ results(); return; }
    var q = qs[qi]; answered = false;
    body.innerHTML =
      '<div class="qcard card-corners">'+CORNERS+
        '<div class="qnum">Question '+(qi+1)+' of '+qs.length+(opts.showTopic ? ' &middot; '+TOPIC_NAMES[q.tp] : '')+'</div>'+
        '<div style="text-align:center;margin-top:10px">'+tagFor(q)+'</div>'+
        '<p class="qtext">'+q.text+'</p>'+
        '<div class="opts'+(q.kind === "tf" ? " two" : "")+'"></div><p class="feedback"></p>'+
        '<div class="qfoot"><button class="btn primary next" type="button" hidden>Next &rsaquo;</button></div>'+
      '</div>';
    var wrap = $(".opts", body);
    q.opts.forEach(function(o, i){
      var b = document.createElement("button");
      b.type = "button"; b.className = "opt " + (o.cls || "");
      b.innerHTML = '<span class="k">'+(i+1)+'</span>' + o.html;
      b.addEventListener("click", function(){ answer(o, b); });
      wrap.appendChild(b);
    });
    $(".next", body).addEventListener("click", function(){ qi++; render(); });
  }
  function answer(o, node){
    if(answered) return;
    answered = true;
    var q = qs[qi], body = $(".qbody", root); q.got = o.ok;
    $$(".opt", body).forEach(function(b, i){ b.disabled = true; if(q.opts[i].ok) b.classList.add("correct"); });
    if(o.ok){ score++; $(".feedback", body).innerHTML = "<b>Correct.</b> " + q.explain; }
    else { node.classList.add("wrong"); missed.push(q); $(".feedback", body).innerHTML = "<b>Not this one.</b> " + q.explain; }
    dots();
    var nb = $(".next", body); nb.hidden = false; nb.textContent = (qi === qs.length-1) ? "See results" : "Next"; nb.focus();
  }
  function results(){
    var body = $(".qbody", root);
    var pct = qs.length ? Math.round(score / qs.length * 100) : 0, v = verdictFor(pct);
    var html = '<div class="result card-corners">'+CORNERS+'<div class="big">'+score+'/'+qs.length+'</div><div class="rsub">'+pct+' percent</div>'+
      '<h3 style="font-family:var(--serif);font-weight:400;font-size:26px;margin:16px 0 0">'+v.t+'</h3><p class="verdict">'+v.a+'</p>';
    if(opts.showTopic){
      /* the breakdown follows the study guide, section by section */
      var rows = "";
      GUIDE.sections.forEach(function(s){ s.items.forEach(function(it){
        var mine = qs.filter(function(q){ return q.sec === it.id; }); if(!mine.length) return;
        var ok = mine.filter(function(q){ return q.got; }).length;
        rows += '<tr><td class="sm"><span class="secch">'+s.h+'</span>'+it.t+'</td><td class="num">'+ok+' / '+mine.length+'</td></tr>';
      }); });
      html += '<div class="tblwrap" style="max-width:600px;margin:22px auto 0"><table class="tbl n0"><tbody>'+rows+'</tbody></table></div>';
    }
    if(opts.showTier){
      /* how she did against the Quizlets: the last row is the one that matters */
      var trows = TIERS.map(function(t){
        var mine = qs.filter(function(q){ return (q.hot||0) === t.w; }); if(!mine.length) return "";
        var ok = mine.filter(function(q){ return q.got; }).length;
        return '<tr><td class="sm"><b>'+t.t+'</b><span class="tsub">'+t.s+'</span></td><td class="num">'+ok+' / '+mine.length+'</td></tr>';
      }).join("");
      html += '<div class="tblwrap" style="max-width:600px;margin:22px auto 0"><table class="tbl n0"><tbody>'+trows+'</tbody></table></div>';
    }
    /* an identification miss already reads "term — meaning", so it gets no second line */
    if(missed.length){ html += '<div class="misslist">' + missed.map(function(q){ return '<div><span class="g">'+q.miss+'</span>'+(q.kind === "id" ? '' : '<span class="t">'+q.explain+'</span>')+'</div>'; }).join("") + '</div>'; }
    html += '<div class="toolbar" style="margin:26px 0 0"><button class="btn primary again" type="button">'+(opts.againLabel || "New quiz")+'</button>'+
            (missed.length ? '<button class="btn missed" type="button">Practice the misses</button>' : '')+
            (opts.onSetup ? '<button class="btn setupbtn" type="button">Change settings</button>' : '')+'</div></div>';
    body.innerHTML = html;
    $(".again", body).addEventListener("click", function(){ start(null); });
    if($(".missed", body)) $(".missed", body).addEventListener("click", function(){ start(missed.map(function(q){ return q.key; })); });
    if($(".setupbtn", body)) $(".setupbtn", body).addEventListener("click", opts.onSetup);
    dots();
  }
  return {
    start:start,
    ensure:function(){ if(!started) start(null); },
    reset:function(){ started = false; qs = []; root.innerHTML = ""; },
    keys:function(e){
      var body = $(".qbody", root); if(!body) return false;
      if(/^[1-4]$/.test(e.key)){ var b = $$(".opt", body)[parseInt(e.key,10)-1]; if(b && !b.disabled){ b.click(); return true; } }
      else if(e.key === "Enter"){ var nb = $(".next", body); if(nb && !nb.hidden){ nb.click(); return true; } }
      return false;
    }
  };
}
