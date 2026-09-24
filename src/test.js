const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let fails = 0, checks = 0;
function ok(cond, label, detail) { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + detail : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

// ---------- load ----------
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT'); process.exit(1); }
const src = m[1];
try { new vm.Script(src); } catch (e) { console.log('JS PARSE ERROR: ' + e.message); process.exit(1); }
const sandbox = { module: { exports: {} }, console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const A = sandbox.module.exports;
console.log('script parsed and loaded, exports: ' + Object.keys(A).length);
const tps = ['c5', 'c6', 'c7', 'c8'];
const body = tp => A.CH[tp].notes.map(n => n.body).join(' ');
const allBodies = tps.map(body).join(' ');
const anchorExists = id => tps.some(tp => A.CH[tp].notes.some(n => n.id === id)) || allBodies.includes('id="' + id + '"');

// ---------- 1. the handout ----------
head('the study guide handout');
ok(A.COURSE.code === 'MRKT 3600 Principles of Marketing' && A.COURSE.term === 'Fall 2026' && A.COURSE.exam === 'Study Guide for Exam 2', 'course, term and title as on the handout');
ok(/Chapters 5–8/.test(A.COURSE.scope) && /20th edition/.test(A.COURSE.scope), 'scope line');
ok(A.COURSE.rules.length === 4 && /master/.test(A.COURSE.rules[0]) && /subsections/.test(A.COURSE.rules[1]) && /“important.”/.test(A.COURSE.rules[2]) && /applying/.test(A.COURSE.rules[3]), 'the four instructions from the handout');
ok(A.GUIDE.sections.length === 4 && A.GUIDE.sections.every((s, i) => s.tp === tps[i] && s.h === 'Chapter ' + (i + 5)), 'four chapters, in order');
const HANDOUT = {
  c5: ['Model of Consumer Behavior', 'Characteristics Affecting Consumer Behavior', 'Buying Decision Behavior and The Buyer Decision Process', 'The Buyer Decision Process for New Products'],
  c6: ['Introduction', 'Business Markets', 'Business Buyer Behavior', 'The Business Buyer Decision Process'],
  c7: ['Marketing Strategy', 'Market Segmentation', 'Market Targeting', 'Differentiation and Positioning'],
  c8: ['What is a Product', 'Product and Service Decisions', 'Services Marketing', 'Branding Strategy (Brand Equity and Brand Value only)'] };
A.GUIDE.sections.forEach(s => {
  ok(JSON.stringify(s.items.map(i => i.t)) === JSON.stringify(HANDOUT[s.tp]), 'sections match the handout for ' + s.tp, s.items.map(i => i.t).join(' | '));
  s.items.forEach(it => {
    ok(it.short && it.short.length > 60, 'item has a one-breath answer: ' + it.t);
    ok(A.CH[s.tp].notes.some(n => n.id === it.a), 'item points at a note section: ' + it.t, it.a);
    ok(it.subs.length >= 1 && it.subs.every(sb => sb[0] && anchorExists(sb[1])), 'every subsection anchor exists: ' + it.t, it.subs.map(sb => sb[1]).join(','));
  });
});
const items = A.GUIDE.sections.flatMap(s => s.items);
ok(items.length === 16 && new Set(items.map(i => i.id)).size === 16, 'sixteen items, unique ids');
ok(A.GUIDE.sections.every(s => !('beyond' in s)) && !('THEMES' in A) && !('VIDEOS' in A) && !('VERSES' in A) && !('EVENTS' in A), 'nothing outside the handout: no beyond notes, no class extras');
ok(!/youtube\.com|Ecclesiastes|Philippians|Joshua 1|Scott Walker|Impact 2026/.test(html), 'the openers, Scripture, videos and announcements are gone from the page');
ok(!/institutional and government|how brands are built|Beyond the guide|beyond the guide|Lists &amp; numbers|Lists & numbers/i.test(html), 'no wording left over from the wider versions');

// ---------- 3. chapters ----------
head('chapters');
const noteIds = [];
tps.forEach((tp, k) => {
  const c = A.CH[tp];
  ok(c.n === k + 5 && c.title && c.short, 'chapter header: ' + tp);
  ok(c.notes.length === 4 && c.notes.every(n => n.id && n.h && n.body && n.body.length > 300 && !n.beyond), 'exactly the handout’s four sections, nothing more: ' + tp, c.notes.length);
  ok(c.notes.map(n => n.h.replace(/: Brand Equity and Brand Value$/, ' (Brand Equity and Brand Value only)')).join('|') === HANDOUT[tp].join('|'), 'the note sections carry the handout’s headings: ' + tp, c.notes.map(n => n.h).join(' | '));
  c.notes.forEach(n => { ok(n.id.indexOf(tp + '-') === 0, 'note id prefixed: ' + n.id); noteIds.push(n.id); });
  ok(c.decks.length === 2 && c.decks.every(d => d.id && d.label && d.match !== false && d.cards.length >= 15), 'two decks with 15+ cards, all in play: ' + tp, c.decks.map(d => d.cards.length).join(','));
  c.decks.forEach(d => {
    ok(d.cards.every(x => x.length >= 2 && x[0] && x[1]), 'cards have front and back: ' + tp + '/' + d.id);
    ok(new Set(d.cards.map(x => x[0])).size === d.cards.length, 'card fronts unique: ' + tp + '/' + d.id);
  });
  ok(A.PAIRSETS[tp].pairs.length >= 30, 'enough pairs to match: ' + tp, A.PAIRSETS[tp].pairs.length);
  ok(new Set(A.PAIRSETS[tp].pairs.map(p => p[1])).size === A.PAIRSETS[tp].pairs.length, 'pair meanings unique: ' + tp);
});
ok(new Set(noteIds).size === noteIds.length, 'note ids unique across chapters');
const subIds = [...new Set((allBodies.match(/ id="([a-z0-9-]+)"/g) || []).map(s => s.slice(5, -1)))];
ok(new Set(subIds.concat(noteIds)).size === subIds.length + noteIds.length, 'subsection ids do not collide with section ids');
// chapter 5 — the lists, the class additions, and the flagged number
['Cultural', 'Social', 'Personal', 'Psychological'].forEach(v => ok(body('c5').includes('<h4>' + v + '</h4>'), 'ch. 5 factor box: ' + v));
['Complex buying behavior', 'Dissonance-reducing buying behavior', 'Variety-seeking buying behavior', 'Habitual buying behavior'].forEach(v => ok(body('c5').includes('<h4>' + v + '</h4>'), 'ch. 5 buying type: ' + v));
['Need recognition', 'Information search', 'Evaluation of alternatives', 'Purchase decision', 'Postpurchase behavior'].forEach(v => ok(body('c5').includes(v), 'ch. 5 stage: ' + v));
['2.5%', '13.5%', '34%', '16%'].forEach(v => ok(body('c5').includes(v), 'ch. 5 adopter share: ' + v));
ok(/lists lagging adopters at 10%/.test(body('c5')), 'the 10% vs 16% discrepancy is flagged, not silently fixed');
['Sincerity', 'Excitement', 'Competence', 'Sophistication', 'Ruggedness'].forEach(v => ok(body('c5').includes('<td class="head">' + v + '</td>'), 'ch. 5 brand-personality trait: ' + v));
['<h3>Perception</h3>', '<h3>Beliefs and attitudes</h3>', 'selective attention', 'selective distortion', 'selective retention'].forEach(v => ok(body('c5').includes(v), 'ch. 5 psychological factor explained: ' + v));
ok(!/from the book|the book says|Kotler’s worked example|Kotler’s figures|Evernote|Starbucks Experience|third place|LinkedIn|competing with itself/i.test(allBodies), 'nothing filled in from outside the class decks, and no chapter openers');
// chapter 6
['Straight rebuy', 'Modified rebuy', 'New task'].forEach(v => ok(body('c6').includes(v), 'ch. 6 buying situation: ' + v));
['Users', 'Influencers', 'Buyers', 'Deciders', 'Gatekeepers'].forEach(v => ok(body('c6').includes('<td class="head">' + v + '</td>'), 'ch. 6 buying-center role: ' + v));
['Problem recognition', 'General need description', 'Product specification', 'Supplier search', 'Proposal solicitation', 'Supplier selection', 'Order-routine specification', 'Performance review'].forEach((v, i) => ok(body('c6').includes((i + 1) + ' · ' + v), 'ch. 6 step ' + (i + 1) + ': ' + v));
['Derived demand', 'Professional buyer = buyer', 'Buyer and seller are dependent'].forEach(v => ok(body('c6').includes(v), 'ch. 6 comparison row: ' + v));
['Environmental', 'Organizational', 'Interpersonal', 'Individual'].forEach(v => ok(body('c6').includes('<h4>' + v + '</h4>'), 'ch. 6 influence group: ' + v));
ok(!/Maersk|c6-digital|Wright-Patterson|Grainger|Institutional markets/.test(body('c6')), 'ch. 6 has no digital/social, institutional or government material');
ok(!/Beyond Meat/.test(body('c5')) && !/Line extensions|Kroger|Apple’s comeback|Sculley/.test(body('c8')), 'ch. 5 and 8 carry nothing outside the handout');
// chapter 7
['Geographic', 'Demographic', 'Psychographic', 'Behavioral'].forEach(v => ok(body('c7').includes('<h3>' + v + '</h3>'), 'ch. 7 segmentation base: ' + v));
['Measurable', 'Accessible', 'Substantial', 'Differentiable', 'Actionable'].forEach(v => ok(body('c7').includes('<b>' + v + '</b>'), 'ch. 7 requirement: ' + v));
['Undifferentiated (mass)', 'Differentiated (segmented)', 'Concentrated (niche)', 'Micromarketing'].forEach(v => ok(body('c7').includes(v), 'ch. 7 targeting strategy: ' + v));
['More for more', 'More for the same', 'More for less', 'The same for less', 'Less for much less'].forEach(v => ok(body('c7').includes('<div class="cell win">' + v), 'ch. 7 winning proposition: ' + v));
ok((body('c7').match(/class="cell lose"/g) || []).length === 3 && (body('c7').match(/class="cell meh"/g) || []).length === 1, 'three losing and one marginal cell');
ok(/To \(target segment and need\)/.test(body('c7')) && /Campus Fresh/.test(body('c7')) && /If it fits, it ships/.test(body('c7')), 'positioning statement: the form, a worked example, and the points-of-difference example');
ok(!/Tide|Marriott|Liquid Death/.test(allBodies), 'the brand anecdotes from the slides are gone from ch. 7');
// chapter 8
['Core customer value', 'Actual product', 'Augmented product'].forEach(v => ok(body('c8').includes(v), 'ch. 8 level: ' + v));
['Convenience', 'Shopping', 'Specialty', 'Unsought'].forEach(v => ok(body('c8').includes('<th>' + v + '</th>'), 'ch. 8 consumer product column: ' + v));
['Intangibility', 'Inseparability', 'Variability', 'Perishability'].forEach(v => ok(body('c8').includes('<h4>' + v + '</h4>'), 'ch. 8 service characteristic: ' + v));
['Width', 'Length', 'Depth', 'Consistency'].forEach(v => ok(body('c8').includes('<td class="head">' + v + '</td>'), 'ch. 8 mix dimension: ' + v));
ok(/<b>differentiation<\/b>/.test(A.CH.c8.notes[3].body) && /<b>esteem<\/b>/.test(A.CH.c8.notes[3].body) && /Equity versus value/.test(A.CH.c8.notes[3].body), 'brand equity and value are explained, and told apart, in the branding section');

// ---------- 3a. the page teaches the sixteen points; it does not quiz the slides ----------
head('the page teaches the sixteen points, not the slides');
tps.forEach(tp => A.CH[tp].notes.forEach(n => {
  ok(n.body.indexOf('<div class="point"><b>The point</b>') === 0, 'section opens with “The point”: ' + n.h);
  ok(/<p class="able"><b>Be able to<\/b>/.test(n.body), 'section says what to be able to do: ' + n.h);
}));
const TRIVIA = /\$145,200|\$805,400|58 gallons|53%|\$30 trillion|34\.8 million|99\.9%|59 million|Palessi|\$645|\$470\.9|\$1\.48|\$388\.5|Mosaic|PRIZM|Personicx|66 segments|71 lifestyle|\b1949\b|40% of the detergent|58% more|64% of|Six Flags|tsunami|interior designer|Supplier Development Department|Liquid Death|\$1\.75|Starkey|Resonate|62% of|42,000|20# paper|9-by-12|9" × 12"|answer key|Pew slides|\$5–7 billion|twice the nearest/i;
const everyText = allBodies + ' ' + A.QB.map(q => [q.q, q.a, q.e].concat(q.w || []).join(' ')).join(' ') + ' ' + tps.map(tp => A.CH[tp].decks.map(d => d.cards.map(c => c[0] + ' ' + c[1]).join(' ')).join(' ')).join(' ');
ok(!TRIVIA.test(everyText), 'no slide trivia anywhere — notes, questions or cards', (everyText.match(TRIVIA) || []).join(' | '));
const CITES = /class slide|class’s|class table|the slides|from class|on the slide|per the slide|according to the slide/i;
A.QB.forEach((q, i) => ok(!CITES.test(q.q), 'question #' + i + ' asks about the concept, not about what a slide said', q.q));
ok(!CITES.test(tps.map(tp => A.CH[tp].decks.map(d => d.cards.map(c => c[0]).join(' ')).join(' ')).join(' ')), 'no card front cites the slides');
Object.keys(A.SEC_CHAPTER).forEach(id => {
  const mine = A.QB.filter(q => q.sec === id);
  ok(mine.length >= 8, 'at least eight written questions for “' + A.SEC_TITLES[id] + '”', mine.length);
  ok(mine.filter(q => q.ap).length >= 1, 'at least one application question for “' + A.SEC_TITLES[id] + '”', mine.filter(q => q.ap).length);
  ok(mine.filter(q => q.t === 'tf').length >= 1, 'at least one true/false for “' + A.SEC_TITLES[id] + '”');
});

// ---------- 3b. every question and card belongs to a study-guide section ----------
head('every question and card belongs to a study-guide section');
const SEC = A.SEC_CHAPTER;
ok(Object.keys(SEC).length === 16 && Object.keys(A.SEC_TITLES).length === 16, 'sixteen sections known to the engine');
for (let i = 0; i < A.QB.length; i++) ok(A.QB[i] && typeof A.QB[i] === 'object', 'no empty slot in the question list (a stray double comma) at #' + i);
A.QB.forEach((q, i) => ok(q.sec && SEC[q.sec] === q.tp, 'question #' + i + ' is tagged with a section of its own chapter', q.sec + ' / ' + q.q.slice(0, 60)));
tps.forEach(tp => A.CH[tp].decks.forEach(d => d.cards.forEach(c => ok(c[2] && SEC[c[2]] === tp, 'card is tagged with a section of its chapter: ' + c[0], c[2]))));
Object.keys(SEC).forEach(id => {
  const n = A.QB.filter(q => q.sec === id).length;
  ok(n >= 4, 'at least four written questions for “' + A.SEC_TITLES[id] + '”', n);
  ok(A.CH[SEC[id]].decks.some(d => d.cards.some(c => c[2] === id)), 'at least one flashcard for “' + A.SEC_TITLES[id] + '”');
});
ok(A.PAIRSETS.c5.pairs.every(p => p[2] && SEC[p[2]] === 'c5'), 'match pairs carry their section');
console.log('  questions per section: ' + Object.keys(SEC).map(id => id.replace(/^g/, '') + '=' + A.QB.filter(q => q.sec === id).length).join(' '));

// ---------- 3c. the review test: the Quizlet overlap ----------
head('the review test');
ok(A.CONFIRMED.length >= 60, 'the concept map covers the two sets', A.CONFIRMED.length);
// the question text hotOf() actually searches — question, answer, wrong answers, explanation
const qText = q => [q.q, q.a === true ? 'true' : q.a === false ? 'false' : q.a, q.e].concat(q.w || []).join(' ');
A.CONFIRMED.forEach((c, i) => {
  ok(A.SEC_CHAPTER[c.sec], 'concept #' + i + ' names a real study-guide section', c.sec);
  ok(c.w === 1 || c.w === 2, 'concept #' + i + ' is weighted 1 or 2', c.w);
  ok(c.k && typeof c.k.test === 'function' && c.k.source, 'concept #' + i + ' carries a matcher');
  ok(A.QB.some(q => q.sec === c.sec && c.k.test(qText(q))), 'concept #' + i + ' actually matches a question', c.sec + ' ' + c.k);
});
ok(A.TIERS.length === 3 && A.TIERS.map(t => t.w).join() === '2,1,0', 'three tiers, strongest first');
ok(!('reviewQuestions' in A) && !/data-topic="review"/.test(html), 'the review test is folded into the practice exam, not a tab of its own');
const byTier = { 0: A.QB.filter(q => (q.hot || 0) === 0), 1: A.QB.filter(q => q.hot === 1), 2: A.QB.filter(q => q.hot === 2) };
[0, 1, 2].forEach(t => ok(byTier[t].length >= 25, 'tier ' + t + ' has enough questions to draw on', byTier[t].length));
ok(A.QB.every(q => [0, 1, 2].includes(q.hot || 0)), 'every question carries a tier');
// the sections neither set covers must really be uncovered, not just unmatched by a typo
ok(byTier[2].filter(q => q.sec === 'g5-decide').length >= 8, 'the four buying behaviours and five stages count as confirmed twice');
ok(byTier[2].filter(q => q.sec === 'g6-behavior').length >= 8, 'the three buying situations and the buying center count as confirmed twice');
ok(A.QB.filter(q => q.sec === 'g7-strategy').every(q => (q.hot || 0) === 0), 'Marketing Strategy is a genuine blind spot — neither set touches it');
// the exam's Quizlet filter
const seenTiers = new Set();
for (let r = 0; r < 60; r++) {
  const n = [15, 25, 40][r % 3];
  const all = A.mockQuestions({ n: n, types: 'all', focus: 'all' });
  ok(all.length === n, 'the exam still returns the asked-for length', all.length + ' vs ' + n);
  ok(new Set(all.map(q => q.key)).size === all.length, 'no repeats inside one exam');
  all.forEach(q => seenTiers.add(q.hot || 0));
  // a 15-question draw can miss the smallest tier by chance, so only hold the long exams to it
  if (n >= 40) ok([0, 1, 2].every(t => all.some(q => (q.hot || 0) === t)), 'a full-length unfiltered exam reaches all three tiers');
  [['both', 2], ['one', 1], ['gaps', 0]].forEach(([f, want]) => {
    const got = A.mockQuestions({ n: n, types: 'all', focus: f });
    ok(got.length === n, 'focus ' + f + ' fills the exam', got.length + '/' + n);
    ok(got.every(q => (q.hot || 0) === want), 'focus ' + f + ' draws only that tier');
    ok(got.every(q => q.sec && A.SEC_CHAPTER[q.sec] === q.tp), 'focus ' + f + ' questions name their section');
    ok(new Set(got.map(q => q.tp)).size === 4, 'focus ' + f + ' still spreads across the four chapters', [...new Set(got.map(q => q.tp))].join(','));
  });
  ok(A.mockQuestions({ n: n, types: 'ap', focus: 'gaps' }).every(q => q.ap && !(q.hot || 0)), 'the filters combine: application questions that neither set covers');
  ok(A.mockQuestions({ n: n, types: 'tf', focus: 'both' }).every(q => q.kind === 'tf' && q.hot === 2), 'the filters combine: true/false that both sets cover');
}
ok(seenTiers.size === 3, 'unfiltered exams draw on all three tiers', [...seenTiers].join(','));
console.log('  tiers: both=' + byTier[2].length + ' one=' + byTier[1].length + ' neither=' + byTier[0].length);

// ---------- 4. question bank ----------
head('question bank');
tps.forEach(tp => {
  const mine = A.QB.filter(q => q.tp === tp && !q.off);
  ok(mine.length >= 50, 'at least 50 on-guide questions on ' + tp, mine.length);
  ok(mine.filter(q => q.t === 'tf').length >= 10, 'on-guide true/false on ' + tp, mine.filter(q => q.t === 'tf').length);
  ok(mine.filter(q => q.ap).length >= 6, 'on-guide application questions on ' + tp, mine.filter(q => q.ap).length);
});
const off = A.QB.filter(q => q.off);
ok(off.length === 0, 'no question is marked outside the guide — there is nothing outside it', off.length);
const OUT = /co-brand|licens|brand extension|multibrand|store-brand quality|Kroger|Great Value|institutional market|lowest bidder|Grainger|Wright-Patterson|Beyond Meat|Apple became|Apple’s timeline|Maersk|LinkedIn|third place|Evernote/i;
ok(!A.QB.some(q => OUT.test(q.q)), 'no question touches a topic the handout leaves out', A.QB.filter(q => OUT.test(q.q)).map(q => q.q).join(' || '));
A.QB.forEach((q, i) => {
  ok(tps.includes(q.tp), 'known chapter #' + i);
  ok(q.q && q.e, 'question and explanation #' + i);
  if (q.t === 'mc') {
    ok(q.w.length === 3, 'three wrong answers #' + i, q.q);
    ok(!q.w.includes(q.a), 'right answer not among the wrong #' + i, q.q);
    ok(new Set([q.a].concat(q.w)).size === 4, 'four distinct options #' + i, q.q);
  } else ok(q.t === 'tf' && typeof q.a === 'boolean', 'true/false has a boolean answer #' + i);
});
ok(new Set(A.QB.map(q => q.q)).size === A.QB.length, 'no duplicate questions');
console.log('  questions: ' + A.QB.length + ' (' + off.length + ' beyond the guide)');

head('question generators (100 runs)');
const offKeys = new Set(A.QB.map((q, i) => q.off ? q.tp + ':' + i : null).filter(Boolean));
for (let run = 0; run < 100; run++) {
  tps.forEach(tp => {
    const qs = A.topicQuestions(tp, null, 10);
    ok(qs.length === 10, tp + ': ten questions', qs.length);
    ok(new Set(qs.map(q => q.key.replace(/r$/, ''))).size === qs.length, tp + ': no repeated question', qs.map(q => q.key).join(','));
    ok(qs.every(q => !offKeys.has(q.key)), tp + ': no beyond-the-guide question in a quiz');
    ok(qs.every(q => q.sec && SEC[q.sec] === tp), tp + ': every quiz question, generated ones included, names its study-guide section', qs.map(q => q.sec).join(','));
    qs.forEach(q => {
      ok(q.opts.filter(o => o.ok).length === 1, tp + ': exactly one right answer', q.text);
      ok(new Set(q.opts.map(o => o.html)).size === q.opts.length, tp + ': options distinct', q.opts.map(o => o.html).join(' | '));
      ok(q.opts.length === (q.kind === 'tf' ? 2 : 4), tp + ': option count', q.kind + ' ' + q.opts.length);
      ok(q.tp === tp && q.explain && q.miss, tp + ': question complete');
    });
    ok(qs.filter(q => q.kind === 'id').length <= 3, tp + ': identification at most a third');
  });
  [15, 25, 40, 60].forEach(n => {
    const mx = A.mockQuestions({ n, types: 'all', topics: [] });
    ok(mx.length === n, 'practice exam fills to ' + n, mx.length);
    tps.forEach(tp => ok(mx.some(q => q.tp === tp), 'practice exam of ' + n + ' covers ' + tp));
    ok(new Set(mx.map(q => q.key)).size === mx.length, 'practice exam has no repeats');
    ok(mx.every(q => !offKeys.has(q.key)), 'practice exam stays on the guide');
    ok(mx.every(q => q.sec && SEC[q.sec] === q.tp), 'every practice-exam question names its study-guide section');
  });
  ok(A.mockQuestions({ n: 25, types: 'tf', topics: [] }).every(q => q.kind === 'tf'), 'true/false-only exam');
  ok(A.mockQuestions({ n: 25, types: 'ap', topics: [] }).every(q => q.ap), 'application-only exam');
  ok(A.mockQuestions({ n: 15, types: 'all', topics: ['c7'] }).every(q => q.tp === 'c7'), 'single-chapter exam');
}
const sampleKeys = A.topicQuestions('c6', null, 10).map(q => q.key);
const back = A.questionsByKeys(sampleKeys);
ok(back.length === sampleKeys.length && back.every((q, i) => q.key === sampleKeys[i]), 'practice-the-misses rebuilds the same questions');
ok(A.questionsByKeys(['nonsense:99', 'c5:999999', 'c9:1']).length === 0, 'bad keys are ignored');

// ---------- 5. decks, match, verdicts ----------
head('decks, match and verdicts');
tps.forEach(tp => {
  A.CH[tp].decks.forEach(d => ok(A.deckFor(tp, d.id).length === d.cards.length, 'deck loads: ' + tp + '/' + d.id));
  for (let run = 0; run < 30; run++) {
    const r = A.matchRound(tp, 6);
    ok(r.items.length === 6 && new Set(r.items.map(x => x.right)).size === 6 && new Set(r.items.map(x => x.left)).size === 6, tp + ' match round: six unique pairs');
  }
});
const lines = A.VERDICTS.flatMap(v => v.t.concat([v.a])).join(' | ');
ok(!/cheeks|goat|bruh|cooked|twin|\bbro\b|\bchat\b|aura|npc|crack a|\bnah\b|ain.t|dawg|\bW\b|no cap|lock in|\bhim\b|\bL\b|mid\.|headlock|trenches/i.test(lines), 'no slang anywhere in the verdicts', lines);
ok(A.VERDICTS.length === 5 && A.VERDICTS.every(v => v.t.length >= 3 && v.a.length > 20), 'five tiers, each with several gracious lines and advice');
ok(!/function reaction\(/.test(src) && !/\bREACT\b/.test(src), 'per-answer quips are gone');
ok(/<b>Correct\.<\/b>/.test(src) && /<b>Not this one\.<\/b>/.test(src), 'answer feedback is plain');
[100, 90, 75, 55, 10].forEach(p => ok(!!A.verdictFor(p).t, 'verdict for ' + p));

// ---------- 6. markup ----------
head('markup');
const ids = [...new Set((src.match(/\$\("#([A-Za-z0-9_-]+)"/g) || []).map(s => s.slice(4, -1)))];
const dynamic = ['gCount', 'gBar', 'gPrint', 'mxN', 'mxT', 'mxP', 'mxStart'];
const missing = ids.filter(id => !html.includes('id="' + id + '"') && !dynamic.includes(id));
ok(missing.length === 0, 'every element referenced by id exists', missing.join(', '));
tps.forEach(tp => ['Notes', 'Cards', 'Match', 'Quiz'].forEach(s => ok(html.includes('id="' + tp + s + '"'), 'chapter root exists: ' + tp + s)));
const panels = [...new Set((html.match(/data-panel="([^"]+)"/g) || []).map(s => s.slice(12, -1)))];
console.log('  panels: ' + panels.join(', '));
panels.forEach(pn => {
  const [t, mo] = pn.split('/');
  ok(html.includes('data-modes="' + t + '"'), 'panel ' + pn + ' has a mode switch');
  ok(new RegExp('data-modes="' + t + '"[\\s\\S]*?data-mode="' + mo + '"').test(html), 'panel ' + pn + ' has its mode button');
});
['guide', 'c5', 'c6', 'c7', 'c8', 'exam'].forEach(t => {
  ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'topic ' + t + ' has a tab and a section');
});
ok(!html.includes('data-topic="extra"') && (html.match(/class="topic-btn"/g) || []).length === 6, 'six tabs — the review test lives inside the practice exam');
ok(/data-topic="guide"\s+aria-selected="true"/.test(html), 'Guide is the first, default tab');
ok((html.match(/<script>/g) || []).length === 1, 'a single script block');
['div', 'section', 'button', 'nav', 'main', 'header', 'footer', 'svg', 'symbol', 'table', 'g', 'ol', 'ul', 'h3'].forEach(t => {
  const open = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  ok(open === close, t + ' tags balanced', open + ' vs ' + close);
});
ok(html.includes('id="flourish"') && html.includes('id="emblem"') && html.includes('class="rail left"') && html.includes('class="emblem"'), 'ornaments, emblem and side rails present');
ok(html.includes('rel="manifest"') && html.includes('sw.js') && fs.existsSync(path.join(ROOT, 'sw.js')) && fs.existsSync(path.join(ROOT, 'manifest.webmanifest')), 'PWA pieces: manifest and service worker');
ok(html.includes('og:image') && html.includes('/pom/preview.png'), 'link preview metadata');
ok(!/�/.test(html), 'no broken characters');
ok(!/29\/54|45\/53|19\/38|35\/45|40\/45|24\/50|36\/50|40\/50|25\/51|35\/51/.test(html), 'the professor’s stray slide counters did not leak in');
console.log('  file size: ' + (fs.statSync(path.join(ROOT, 'index.html')).size / 1024).toFixed(1) + ' KB');

console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' checks'));
process.exit(fails ? 1 : 0);
