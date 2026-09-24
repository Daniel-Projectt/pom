/* ================================================================ helpers */
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pick(a,n){ return shuffle(a).slice(0,n); }
function uniqBy(arr, fn){ var seen={}, out=[]; arr.forEach(function(x){ var k=fn(x); if(!seen[k]){ seen[k]=1; out.push(x); } }); return out; }
function strip(s){ return String(s).replace(/<[^>]+>/g,""); }
var store = {
  get:function(k){ try{ return localStorage.getItem("pom."+k); }catch(e){ return null; } },
  set:function(k,v){ try{ localStorage.setItem("pom."+k, v); }catch(e){} }
};
var CORNERS = ['tl','tr','bl','br'].map(function(c){ return '<svg class="c '+c+'" aria-hidden="true"><use href="#corner"/></svg>'; }).join('');
var CHAPTERS = ["c5","c6","c7","c8"];
var TOPIC_NAMES = {};
CHAPTERS.forEach(function(tp){ TOPIC_NAMES[tp] = "Ch. "+CH[tp].n+" · "+CH[tp].short; });
/* Every question and card carries the id of the study-guide section it belongs to */
var SEC_TITLES = {}, SEC_CHAPTER = {};
GUIDE.sections.forEach(function(s){ s.items.forEach(function(it){ SEC_TITLES[it.id] = it.t; SEC_CHAPTER[it.id] = s.tp; }); });

/* How much Quizlet agreement each question has: 2 = both sets, 1 = one, 0 = neither.
   Worked out once, from the concept map in CONFIRMED, and carried on the question. */
var TIER_TITLES = {}, TIER_BLURBS = {};
TIERS.forEach(function(t){ TIER_TITLES[t.w] = t.t; TIER_BLURBS[t.w] = t.s; });
function hotOf(sec, text){
  var best = 0;
  CONFIRMED.forEach(function(c){ if(c.sec === sec && c.w > best && c.k.test(text)) best = c.w; });
  return best;
}
QB.forEach(function(b){
  var ans = (b.a === true) ? "true" : (b.a === false) ? "false" : b.a;
  b.hot = hotOf(b.sec, [b.q, ans, b.e].concat(b.w || []).join(" "));
});

/* ---- verdicts by grade: warm, plain, never a joke at the reader's expense ---- */
var VERDICTS = [
  {min:100, a:"Nothing left to fix here. Try the full set of chapter quizzes next.",
   t:["Flawless.","Perfect \u2014 every one.","Word-perfect.","Nothing to correct."]},
  {min:85,  a:"Strong. The misses below are the whole job now.",
   t:["Strong.","Very well done.","Nearly perfect.","Excellent work."]},
  {min:70,  a:"A solid base, with a few real gaps. Work the misses, then take it again.",
   t:["Good work.","A solid pass.","Coming along nicely.","Well on your way."]},
  {min:50,  a:"About half. A pass through the notes and flashcards for this chapter before testing again will lift this quickly.",
   t:["Halfway there.","A fair start.","Keep going.","Room to grow."]},
  {min:0,   a:"It is easier to test once the material is in place \u2014 start with the notes and flashcards, then come back.",
   t:["A first pass.","Early days.","Not yet \u2014 and that\u2019s all right.","Begin with the notes."]}
];
function verdictFor(p){
  for(var i=0;i<VERDICTS.length;i++){ if(p >= VERDICTS[i].min){ var v = VERDICTS[i]; return {t:pick(v.t,1)[0], a:v.a}; } }
  var last = VERDICTS[VERDICTS.length-1]; return {t:last.t[0], a:last.a};
}

/* ================================================================ question building */
/* Pair sets (term, meaning) per chapter, from every deck not marked match:false.
   Used for Match and for generated identification questions.                    */
var PAIRSETS = {};
CHAPTERS.forEach(function(tp){
  var pairs = [];
  CH[tp].decks.forEach(function(d){ if(d.match === false) return; d.cards.forEach(function(c){ pairs.push([c[0], c[1], c[2]]); }); });
  pairs = uniqBy(uniqBy(pairs, function(p){ return p[1]; }), function(p){ return p[0]; });
  PAIRSETS[tp] = {left:"Term", right:"Meaning", pairs:pairs};
});

function fromBank(b, i){
  var q = {key:b.tp+":"+i, tp:b.tp, sec:b.sec, hot:b.hot || 0, ap:!!b.ap, kind:b.t, text:b.q, explain:b.e};
  if(b.t === "tf"){
    q.opts = [{html:"True", ok:b.a === true, cls:"tf"}, {html:"False", ok:b.a === false, cls:"tf"}];
    q.miss = strip(b.q) + " — <b>" + (b.a ? "True" : "False") + "</b>";
  } else {
    q.opts = shuffle([{html:b.a, ok:true}].concat(b.w.map(function(w){ return {html:w, ok:false}; })));
    q.miss = strip(b.q) + " — <b>" + b.a + "</b>";
  }
  return q;
}
/* Identification questions generated from a pair set; wrong answers redrawn each time */
function fromPair(tp, idx, reverse){
  var set = PAIRSETS[tp], p = set.pairs[idx];
  var others = pick(set.pairs.filter(function(o, j){ return j !== idx; }), 3);
  var q = {key:tp+":p"+idx+(reverse?"r":""), tp:tp, sec:p[2], hot:hotOf(p[2], p[0]+" "+p[1]), ap:false, kind:"id"};
  if(reverse){
    q.text = "Which meaning fits <b>" + p[0] + "</b>?";
    q.opts = shuffle([{html:p[1], ok:true}].concat(others.map(function(o){ return {html:o[1], ok:false}; })));
  } else {
    q.text = "“" + p[1] + "” — which term?";
    q.opts = shuffle([{html:p[0], ok:true}].concat(others.map(function(o){ return {html:o[0], ok:false}; })));
  }
  q.explain = "<b>" + p[0] + "</b>: " + p[1] + ".";
  q.miss = p[0] + " — <b>" + p[1] + "</b>";
  return q;
}
/* A question marked off:true never enters a quiz (none is, now that the page holds only the study guide) */
function bankFor(tp){ var out = []; QB.forEach(function(b, i){ if(b.off) return; if(!tp || b.tp === tp) out.push({b:b, i:i}); }); return out; }

/* Two questions "are the same" when the thing being asked and the right answer
   are mostly the same words — a written question and the identification question
   generated from the matching flashcard, for instance. One quiz never shows both. */
var STOPWORDS = {};
"the a an of to in is are was were for on by with which that this these those it its as and or not be what who whom whose how why when where does do did can may might one more most than then from at into".split(" ").forEach(function(w){ STOPWORDS[w] = 1; });
function meaningOf(q){
  var right = "";
  (q.opts || []).forEach(function(o){ if(o.ok) right = o.html; });
  if(q.kind === "tf") right = "";            /* true/false: the statement is the meaning */
  var words = strip(q.text + " " + right).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/);
  var set = {}, n = 0;
  words.forEach(function(w){ if(w.length > 2 && !STOPWORDS[w] && !set[w]){ set[w] = 1; n++; } });
  return {set:set, n:n};
}
function sameThing(a, b){
  if(!a.n || !b.n) return false;
  var shared = 0;
  Object.keys(a.set).forEach(function(w){ if(b.set[w]) shared++; });
  return shared / (a.n + b.n - shared) >= 0.6;
}
/* Draw up to n questions from pool, never two that ask the same thing.
   Pool order decides which of a pair survives — written questions come first.  */
function drawDistinct(pool, n){
  var out = [], seen = [];
  for(var i = 0; i < pool.length && out.length < n; i++){
    var mean = meaningOf(pool[i]), dup = false;
    for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
    if(!dup){ out.push(pool[i]); seen.push(mean); }
  }
  return out;
}

/* A chapter quiz: mostly written questions, about a third identification */
function topicQuestions(tp, keys, n){
  n = n || 10;
  if(keys && keys.length) return shuffle(questionsByKeys(keys)).slice(0, n);
  var bank = shuffle(bankFor(tp).map(function(x){ return fromBank(x.b, x.i); }));
  var gen = shuffle(PAIRSETS[tp].pairs.map(function(p, i){ return fromPair(tp, i, Math.random() < 0.5); }));
  var nGen = Math.min(gen.length, Math.floor(n/3));
  /* written questions lead, so a written one always outranks the card it echoes */
  var out = drawDistinct(bank.concat(gen), n - nGen).concat(drawDistinct(gen, nGen));
  out = drawDistinct(out, n);
  if(out.length < n) out = drawDistinct(out.concat(bank, gen), n);
  return shuffle(out);
}
/* Rebuild exact questions from their keys ("tp:i" bank, "tp:pN" / "tp:pNr" pairs); anything malformed is dropped */
function questionsByKeys(keys){
  return uniqBy(keys, function(k){ return k; }).map(function(k){
    var m = /^([a-z0-9]+):p(\d+)(r?)$/.exec(k);
    if(m){
      var set = PAIRSETS[m[1]], i = parseInt(m[2],10);
      return (set && i < set.pairs.length) ? fromPair(m[1], i, m[3] === "r") : null;
    }
    var b = /^([a-z0-9]+):(\d+)$/.exec(k);
    if(!b) return null;
    var j = parseInt(b[2],10);
    return (QB[j] && QB[j].tp === b[1]) ? fromBank(QB[j], j) : null;
  }).filter(Boolean);
}
/* The practice exam: every chapter, reshuffled.
   types  — all / mc / tf / ap
   focus  — all, or one Quizlet tier: both / one / gaps (see CONFIRMED)         */
var FOCUS_HOT = {both:2, one:1, gaps:0};
function mockQuestions(cfg){
  var tps = cfg.topics && cfg.topics.length ? cfg.topics : CHAPTERS.slice();
  var n = cfg.n || 25;
  var hot = (cfg.focus && cfg.focus !== "all") ? FOCUS_HOT[cfg.focus] : null;
  var pool = [];
  QB.forEach(function(b, i){
    if(b.off || tps.indexOf(b.tp) < 0) return;
    if(cfg.types === "mc" && b.t !== "mc") return;
    if(cfg.types === "tf" && b.t !== "tf") return;
    if(cfg.types === "ap" && !b.ap) return;
    if(hot !== null && (b.hot || 0) !== hot) return;
    pool.push(fromBank(b, i));
  });
  if(cfg.types === "all" || cfg.types === "mc" || !cfg.types){
    tps.forEach(function(tp){
      pick(PAIRSETS[tp].pairs.map(function(p, i){ return i; }), 3).forEach(function(i){
        var q = fromPair(tp, i, Math.random() < 0.5);
        if(hot === null || (q.hot || 0) === hot) pool.push(q);
      });
    });
  }
  /* spread across chapters, and never two questions asking the same thing */
  var byTp = {}; tps.forEach(function(t){ byTp[t] = shuffle(pool.filter(function(q){ return q.tp === t; })); });
  var out = [], seen = [], k = 0;
  while(out.length < n){
    var t = tps[k % tps.length], list = byTp[t];
    if(list.length){
      var q = list.shift(), mean = meaningOf(q), dup = false;
      for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
      if(!dup){ out.push(q); seen.push(mean); }
    }
    if(tps.every(function(x){ return !byTp[x].length; })) break;
    k++;
  }
  return shuffle(out);
}

/* The 50 for the exam. The study guide is the key, so every one of its sixteen
   sections is represented — three questions each, then two spare. Inside a
   section the draw leans towards what the two Quizlet sets confirm, without ever
   shutting out the material neither of them covers.                            */
function finalFifty(n){
  n = n || 50;
  var secs = [], bySec = {};
  GUIDE.sections.forEach(function(s){ s.items.forEach(function(it){ secs.push(it.id); bySec[it.id] = []; }); });
  QB.forEach(function(b, i){ if(!b.off && bySec[b.sec]) bySec[b.sec].push(fromBank(b, i)); });
  secs.forEach(function(id){
    bySec[id] = bySec[id].map(function(q){ return {q:q, r:(q.hot || 0) + Math.random()*1.8}; })
                         .sort(function(a, c){ return c.r - a.r; })
                         .map(function(x){ return x.q; });
  });
  var out = [], seen = [];
  function take(id){
    var list = bySec[id];
    while(list.length){
      var q = list.shift(), mean = meaningOf(q), dup = false;
      for(var j = 0; j < seen.length && !dup; j++) dup = sameThing(mean, seen[j]);
      if(!dup){ out.push(q); seen.push(mean); return true; }
    }
    return false;
  }
  var per = Math.floor(n / secs.length);
  for(var r = 0; r < per; r++) secs.forEach(function(id){ if(out.length < n) take(id); });
  var k = 0;
  while(out.length < n && k < secs.length * 8){ if(out.length < n) take(secs[k % secs.length]); k++; }
  return shuffle(out);
}

/* ================================================================ decks and match */
function deckFor(tp, id){
  var d = CH[tp].decks.filter(function(x){ return x.id === id; })[0] || CH[tp].decks[0];
  return shuffle(d.cards).map(function(c){
    return {front:'<div class="mid" style="font-family:var(--serif);letter-spacing:.01em;text-transform:none;font-size:clamp(19px,4.2vw,26px);line-height:1.35">'+c[0]+'</div>',
            back:'<div class="bname">'+c[0]+'</div><div class="bsound" style="margin-top:12px">'+c[1]+'</div>'+(SEC_TITLES[c[2]] ? '<div class="btr" style="margin-top:12px">Study guide · '+SEC_TITLES[c[2]]+'</div>' : '')};
  });
}
function matchRound(tp, n){
  var set = PAIRSETS[tp];
  var items = set.pairs.map(function(p, i){ return {id:tp+i, left:p[0], right:p[1]}; });
  return {leftTitle:set.left, rightTitle:set.right, items:pick(items, Math.min(n || 6, items.length))};
}
