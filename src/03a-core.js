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

/* A chapter quiz: mostly written questions, about a third identification */
function topicQuestions(tp, keys, n){
  n = n || 10;
  if(keys && keys.length) return shuffle(questionsByKeys(keys)).slice(0, n);
  var bank = bankFor(tp).map(function(x){ return fromBank(x.b, x.i); });
  var gen = PAIRSETS[tp].pairs.map(function(p, i){ return fromPair(tp, i, Math.random() < 0.5); });
  var nGen = Math.min(gen.length, Math.floor(n/3));
  return shuffle(pick(bank, n - nGen).concat(pick(gen, nGen)));
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
/* The practice exam: every chapter, reshuffled; types all / mc / tf / ap */
function mockQuestions(cfg){
  var tps = cfg.topics && cfg.topics.length ? cfg.topics : CHAPTERS.slice();
  var n = cfg.n || 25;
  var pool = [];
  QB.forEach(function(b, i){
    if(b.off || tps.indexOf(b.tp) < 0) return;
    if(cfg.types === "mc" && b.t !== "mc") return;
    if(cfg.types === "tf" && b.t !== "tf") return;
    if(cfg.types === "ap" && !b.ap) return;
    pool.push(fromBank(b, i));
  });
  if(cfg.types === "all" || cfg.types === "mc" || !cfg.types){
    tps.forEach(function(tp){
      pick(PAIRSETS[tp].pairs.map(function(p, i){ return i; }), 3).forEach(function(i){ pool.push(fromPair(tp, i, Math.random() < 0.5)); });
    });
  }
  /* spread across chapters */
  var byTp = {}; tps.forEach(function(t){ byTp[t] = shuffle(pool.filter(function(q){ return q.tp === t; })); });
  var out = [], k = 0;
  while(out.length < n){
    var t = tps[k % tps.length], list = byTp[t];
    if(list.length) out.push(list.shift());
    if(tps.every(function(x){ return !byTp[x].length; })) break;
    k++;
  }
  return shuffle(out);
}

/* The review test: built from the Quizlet overlap rather than from the chapters.
   "all" mixes the three tiers — most weight on what both sets confirm, but always
   a fifth of the test on what neither set covers, because that is the blind spot.
   Within a tier the draw round-robins the study-guide sections so it stays spread. */
function reviewQuestions(cfg){
  cfg = cfg || {};
  var n = cfg.n || 40, focus = cfg.focus || "all";
  var want = {};
  if(focus === "both")      want = {2:n, 1:0, 0:0};
  else if(focus === "one")  want = {2:0, 1:n, 0:0};
  else if(focus === "gaps") want = {2:0, 1:0, 0:n};
  else { want[2] = Math.round(n*0.55); want[1] = Math.round(n*0.25); want[0] = n - want[2] - want[1]; }
  var pool = {0:[], 1:[], 2:[]};
  QB.forEach(function(b, i){ if(b.off) return; pool[b.hot || 0].push(fromBank(b, i)); });
  var out = [];
  [2,1,0].forEach(function(t){
    if(!want[t]) return;
    var bySec = {}, secs = [];
    shuffle(pool[t]).forEach(function(q){ if(!bySec[q.sec]){ bySec[q.sec] = []; secs.push(q.sec); } bySec[q.sec].push(q); });
    secs = shuffle(secs);
    var k = 0, taken = 0;
    while(taken < want[t] && secs.length){
      var list = bySec[secs[k % secs.length]];
      if(list.length){ out.push(list.shift()); taken++; }
      if(secs.every(function(s){ return !bySec[s].length; })) break;
      k++;
    }
  });
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
