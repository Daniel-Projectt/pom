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
ok(/Beyond Meat/.test(A.GUIDE.sections[0].beyond) && /Institutional/.test(A.GUIDE.sections[1].beyond) && A.GUIDE.sections[2].beyond === '' && /sponsorship/.test(A.GUIDE.sections[3].beyond), 'what each chapter leaves out is stated');

// ---------- 2. in class ----------
head('in class');
ok(A.THEMES.length === 4 && A.THEMES.every(t => t.h && t.body), 'four chapter themes');
ok(A.THEMES[0].quotes.some(q => /Reid Hoffman/.test(q[1])) && A.THEMES[1].quotes.some(q => /Maxwell/.test(q[1])), 'the openers’ quotes');
['Ecclesiastes 4:9–12', 'Philippians 4:12–13', 'Joshua 1:9', 'James 1:2–4'].forEach(r => ok(A.VERSES.some(v => v.ref === r), 'verse on the slides: ' + r));
ok(A.EVENTS.length === 2 && /Scott Walker/.test(A.EVENTS[1][1]) && /September 23/.test(A.EVENTS[1][1]), 'the two announcements');
ok(A.VIDEOS.length >= 20 && A.VIDEOS.every(v => /^https:\/\/www\.youtube\.com\/watch\?v=/.test(v.u) && v.t && tps.includes(v.tp)), 'video list complete with links', A.VIDEOS.length);
ok(new Set(A.VIDEOS.map(v => v.u)).size === A.VIDEOS.length, 'no duplicate video links');
['OvkgSJuGPfY', 'Alp49p_4rc8', 'UfpBPk8HiaY', 'OapP_OK7IrI', 'JFXmIh4P2dM', '46_EC6teOqg'].forEach(id => ok(A.VIDEOS.some(v => v.u.includes(id)), 'video id from the deck: ' + id));

// ---------- 3. chapters ----------
head('chapters');
const noteIds = [];
tps.forEach((tp, k) => {
  const c = A.CH[tp];
  ok(c.n === k + 5 && c.title && c.short, 'chapter header: ' + tp);
  ok(c.notes.length >= 4 && c.notes.every(n => n.id && n.h && n.body && n.body.length > 300), 'notes complete: ' + tp, c.notes.length);
  ok(c.notes.slice(0, 4).map(n => n.h.replace(/: Brand Equity and Brand Value$/, ' (Brand Equity and Brand Value only)')).join('|') === HANDOUT[tp].join('|'), 'the first four note sections carry the handout’s headings: ' + tp, c.notes.slice(0, 4).map(n => n.h).join(' | '));
  ok(c.notes.slice(4).every(n => n.beyond && /^Beyond the guide/.test(n.h)), 'anything after the four is marked beyond the guide: ' + tp);
  c.notes.forEach(n => { ok(n.id.indexOf(tp + '-') === 0, 'note id prefixed: ' + n.id); noteIds.push(n.id); });
  const main = c.decks.filter(d => d.match !== false), beyond = c.decks.filter(d => d.match === false);
  ok(main.length === 2 && main.every(d => d.id && d.label && d.cards.length >= 15), 'two main decks with 15+ cards: ' + tp, main.map(d => d.cards.length).join(','));
  ok(beyond.every(d => d.cards.length >= 5 && d.cards.every(x => x[2])), 'beyond-the-guide decks are labeled card by card: ' + tp);
  c.decks.forEach(d => {
    ok(d.cards.every(x => x.length >= 2 && x[0] && x[1]), 'cards have front and back: ' + tp + '/' + d.id);
    ok(new Set(d.cards.map(x => x[0])).size === d.cards.length, 'card fronts unique: ' + tp + '/' + d.id);
  });
  ok(A.PAIRSETS[tp].pairs.length >= 30, 'enough pairs to match: ' + tp, A.PAIRSETS[tp].pairs.length);
  ok(new Set(A.PAIRSETS[tp].pairs.map(p => p[1])).size === A.PAIRSETS[tp].pairs.length, 'pair meanings unique: ' + tp);
  beyond.forEach(d => d.cards.forEach(x => ok(!A.PAIRSETS[tp].pairs.some(p => p[0] === x[0]), 'beyond-the-guide card stays out of match and quizzes: ' + x[0])));
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
['$12,000', '$61,260', '$145,200', '$269,100', '$805,400'].forEach(v => ok(body('c5').includes(v), 'ch. 5 net worth figure: ' + v));
ok(/KIA<\/b>/.test(body('c5')) && /Jeep<\/b>/.test(body('c5')), 'ch. 5 brand-personality answer key');
ok(/these two are from the book/.test(body('c5')), 'perception and attitudes are marked as from the book, not the deck');
// chapter 6
['Straight rebuy', 'Modified rebuy', 'New task'].forEach(v => ok(body('c6').includes(v), 'ch. 6 buying situation: ' + v));
['Users', 'Influencers', 'Buyers', 'Deciders', 'Gatekeepers'].forEach(v => ok(body('c6').includes('<td class="head">' + v + '</td>'), 'ch. 6 buying-center role: ' + v));
['Problem recognition', 'General need description', 'Product specification', 'Supplier search', 'Proposal solicitation', 'Supplier selection', 'Order-routine specification', 'Performance review'].forEach((v, i) => ok(body('c6').includes((i + 1) + ' · ' + v), 'ch. 6 step ' + (i + 1) + ': ' + v));
['$30 trillion', '34.8 million', '99.9%', '9" × 12"'].forEach(v => ok(body('c6').includes(v), 'ch. 6 class figure: ' + v));
ok(/not on the study guide/.test(A.CH.c6.notes[3].body), 'digital/social marketing is labeled as not on the guide inside the process section');
// chapter 7
['Geographic', 'Demographic', 'Psychographic', 'Behavioral'].forEach(v => ok(body('c7').includes('<h3>' + v + '</h3>'), 'ch. 7 segmentation base: ' + v));
['Measurable', 'Accessible', 'Substantial', 'Differentiable', 'Actionable'].forEach(v => ok(body('c7').includes('<b>' + v + '</b>'), 'ch. 7 requirement: ' + v));
['Undifferentiated (mass)', 'Differentiated (segmented)', 'Concentrated (niche)', 'Micromarketing'].forEach(v => ok(body('c7').includes(v), 'ch. 7 targeting strategy: ' + v));
['More for more', 'More for the same', 'More for less', 'The same for less', 'Less for much less'].forEach(v => ok(body('c7').includes('<div class="cell win">' + v), 'ch. 7 winning proposition: ' + v));
ok((body('c7').match(/class="cell lose"/g) || []).length === 3 && (body('c7').match(/class="cell meh"/g) || []).length === 1, 'three losing and one marginal cell');
ok(/Evernote/.test(body('c7')) && /Aveeno/.test(body('c7')), 'positioning statement: Kotler’s worked example and the class’s Aveeno');
// chapter 8
['Core customer value', 'Actual product', 'Augmented product'].forEach(v => ok(body('c8').includes(v), 'ch. 8 level: ' + v));
['Convenience', 'Shopping', 'Specialty', 'Unsought'].forEach(v => ok(body('c8').includes('<th>' + v + '</th>'), 'ch. 8 consumer product column: ' + v));
['Intangibility', 'Inseparability', 'Variability', 'Perishability'].forEach(v => ok(body('c8').includes('<h4>' + v + '</h4>'), 'ch. 8 service characteristic: ' + v));
['Width', 'Length', 'Depth', 'Consistency'].forEach(v => ok(body('c8').includes('<td class="head">' + v + '</td>'), 'ch. 8 mix dimension: ' + v));
ok(/differentiation, relevance, knowledge, esteem/.test(A.CH.c8.notes[3].body) && /\$470\.9B/.test(A.CH.c8.notes[3].body), 'brand equity and value are in the guide section');
ok(!/Line extensions/.test(A.CH.c8.notes[3].body) && /Line extensions/.test(A.CH.c8.notes[4].body) && A.CH.c8.notes[4].beyond, 'sponsorship and development are only in the beyond-the-guide section');
ok(/as dated on the slide/.test(body('c8')), 'the Macintosh 1983 date is attributed to the slide');

// ---------- 4. question bank ----------
head('question bank');
tps.forEach(tp => {
  const mine = A.QB.filter(q => q.tp === tp && !q.off);
  ok(mine.length >= 50, 'at least 50 on-guide questions on ' + tp, mine.length);
  ok(mine.filter(q => q.t === 'tf').length >= 10, 'on-guide true/false on ' + tp, mine.filter(q => q.t === 'tf').length);
  ok(mine.filter(q => q.ap).length >= 6, 'on-guide application questions on ' + tp, mine.filter(q => q.ap).length);
});
const off = A.QB.filter(q => q.off);
ok(off.length >= 20 && off.every(q => ['c5', 'c6', 'c8'].includes(q.tp)), 'beyond-the-guide questions exist only for chapters 5, 6 and 8', off.length);
ok(off.some(q => /Kroger/.test(q.q)) && off.some(q => /lowest bidder|Government markets/.test(q.q)) && off.some(q => /Beyond Meat/.test(q.q)) && off.some(q => /Apple became/.test(q.q)), 'the excluded topics are the ones the handout leaves out');
ok(!A.QB.some(q => !q.off && /co-brand|licens|brand extension|multibrand|store-brand quality|Kroger|Great Value|institutional market|lowest bidder|Grainger|Wright-Patterson|Beyond Meat|Apple became|Apple’s timeline|Maersk/i.test(q.q)), 'no on-guide question touches an excluded topic', A.QB.filter(q => !q.off && /co-brand|licens|brand extension|multibrand|store-brand quality|Kroger|Great Value|institutional market|lowest bidder|Grainger|Wright-Patterson|Beyond Meat|Apple became|Maersk/i.test(q.q)).map(q => q.q).join(' || '));
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
['guide', 'c5', 'c6', 'c7', 'c8', 'extra', 'exam'].forEach(t => {
  ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'topic ' + t + ' has a tab and a section');
});
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
