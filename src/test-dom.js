/* Clicks through the real page in a simulated browser (jsdom).
   Usage: node test-dom.js <path-to-node_modules-containing-jsdom>             */
const path = require('path');
const fs = require('fs');
const NM = process.argv[2];
const { JSDOM, VirtualConsole } = require(path.join(NM, 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let fails = 0, checks = 0; const errors = [];
function ok(c, label, d) { checks++; if (!c) { fails++; console.log('  FAIL  ' + label + (d !== undefined ? '  -> ' + d : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push(e.message + (e.detail ? ' | ' + e.detail : '')));
vc.on('error', e => errors.push(String(e)));
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc,
  beforeParse(w) {
    w.scrollTo = () => {}; w.print = () => { w.__printed = (w.__printed || 0) + 1; };
    w.Element.prototype.scrollIntoView = function () { w.__scrolledTo = this.id; };
    w.addEventListener('error', e => errors.push('window.onerror: ' + e.message));
  } });
const w = dom.window, d = w.document;
const $ = s => d.querySelector(s), $$ = s => Array.from(d.querySelectorAll(s));
const visible = el => { for (let n = el; n && n !== d; n = n.parentNode) if (n.hidden) return false; return true; };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const key = k => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const topic = t => click($('.topic-btn[data-topic="' + t + '"]'));
const mode = (t, m) => click($('.seg[data-modes="' + t + '"] button[data-mode="' + m + '"]'));
const panel = p => $('[data-panel="' + p + '"]');
const tps = ['c5', 'c6', 'c7', 'c8'];

function answerQuiz(root, label) {
  let guard = 0;
  while (guard++ < 80) {
    const opts = Array.from(root.querySelectorAll('.qbody .opt'));
    if (!opts.length) break;
    click(opts[Math.floor(Math.random() * opts.length)]);
    ok(root.querySelectorAll('.qbody .opt.correct').length === 1, label + ': the right answer is revealed');
    ok(root.querySelector('.qbody .feedback').textContent.length > 10, label + ': feedback explains');
    const nb = root.querySelector('.qbody .next'); ok(nb && !nb.hidden, label + ': next appears');
    click(nb);
  }
  return root.querySelector('.qbody .result');
}

head('landing');
ok(errors.length === 0, 'no errors while loading', errors.join(' || '));
ok(visible($('#topic-guide')) && !visible($('#topic-c5')), 'opens on the Guide');
const items = $$('#guideRoot .gitem');
ok(items.length === 16, 'guide shows the handout’s 16 sections', items.length);
ok(/0 of 16/.test($('#gCount').textContent), 'progress starts at 0 of 16', $('#gCount').textContent);
ok(!!$('#guideRoot .handout') && $$('#guideRoot .handout .hrules li').length === 4 && /Study Guide for Exam 2/.test($('#guideRoot .handout h2').textContent), 'the handout header with its four instructions');
ok($$('#guideRoot .gsub .btn').length >= 30 && $$('#guideRoot .gbeyond').length === 0, 'subsection buttons, and no beyond-the-guide notes');

head('guide checkboxes and jumps');
const cb = $('#guideRoot input[data-g="g5-decide"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/1 of 16/.test($('#gCount').textContent), 'checking an item moves the progress', $('#gCount').textContent);
ok(/g5-decide":true/.test(w.localStorage.getItem('pom.guide') || ''), 'the check is saved on the device');
click($('#gPrint')); ok(w.__printed === 1, 'print button prints');
click($('#guideRoot .gitem[data-gi="g6-behavior"] > button[data-go]'));
ok(visible($('#topic-c6')) && visible(panel('c6/notes')) && !!d.getElementById('c6-behavior'), 'Business Buyer Behavior: jumps to the chapter 6 notes');
topic('guide');
click($('#guideRoot .gitem[data-gi="g8-brands"] > button[data-go]'));
ok(visible(panel('c8/notes')) && !!d.getElementById('c8-brands'), 'Branding Strategy: jumps to the chapter 8 notes');
topic('guide');
click($('#guideRoot .gitem[data-gi="g5-chars"] .gsub .btn[data-a="c5-psych"]'));
ok(visible(panel('c5/notes')) && !!d.getElementById('c5-psych') && d.getElementById('c5-psych').closest('.note-sec').id === 'c5-chars', 'a subsection button lands inside its handout section');
topic('guide');
click($('#guideRoot .gitem[data-gi="g7-position"] .gsub .btn[data-a="c7-value"]'));
ok(visible(panel('c7/notes')) && d.getElementById('c7-value').closest('.note-sec').id === 'c7-position', 'value propositions live inside Differentiation and Positioning');
topic('guide');
click($('#guideRoot [data-go="exam/mock"]'));
ok(visible(panel('exam/mock')) && !!$('#mxStart'), 'the practice-exam button opens the exam setup');

head('every tab and mode');
const modes = {};
$$('.seg[data-modes]').forEach(s => { modes[s.getAttribute('data-modes')] = Array.from(s.querySelectorAll('button[data-mode]')).map(b => b.getAttribute('data-mode')); });
Object.keys(modes).forEach(t => {
  topic(t);
  ok(visible($('#topic-' + t)), 'tab opens: ' + t);
  ok($$('.topic').filter(visible).length === 1, 'only one section visible: ' + t);
  modes[t].forEach(m => {
    mode(t, m);
    ok(visible(panel(t + '/' + m)), 'mode opens: ' + t + '/' + m);
    ok($$('#topic-' + t + ' .panel').filter(visible).length === 1, 'one panel at a time: ' + t + '/' + m);
    ok(panel(t + '/' + m).textContent.trim().length > 20, 'panel has content: ' + t + '/' + m);
  });
});
ok(errors.length === 0, 'no errors after visiting every mode', errors.join(' || '));

head('notes');
tps.forEach(t => { topic(t); mode(t, 'notes'); ok($$('#' + t + 'Notes .note-sec').length >= 4, t + ': note sections rendered'); ok($$('#' + t + 'Notes .secnav a').length >= 4, t + ': section nav rendered'); ok($$('#' + t + 'Notes h3.sub').length >= 5, t + ': subsection headings rendered'); });
ok($$('#c5Notes .mx-c').length === 4 && $$('#c7Notes .vp .cell').length === 9, 'the 2x2 and the 3x3 grids rendered');
ok(tps.every(t => $$('#' + t + 'Notes .note-sec').length === 4 && $$('#' + t + 'Notes .note-sec.beyond').length === 0), 'exactly four sections per chapter, none beyond the guide');

head('flashcards');
tps.forEach(t => {
  topic(t); mode(t, 'cards');
  const p = panel(t + '/cards'), c = p.querySelector('.counter');
  ok(/^1 of \d+$/.test(c.textContent), t + ': counter starts at 1', c.textContent);
  click(p.querySelector('.flip')); ok(p.querySelector('.flash').classList.contains('flipped'), t + ': flips');
  ok(/Study guide · /.test(p.querySelector('.face.back').textContent), t + ': the card back names its study-guide section');
  click(p.querySelector('.next')); ok(/^2 of /.test(c.textContent) && !p.querySelector('.flash').classList.contains('flipped'), t + ': next card, unflipped');
  key('ArrowLeft'); ok(/^1 of /.test(c.textContent), t + ': arrow key goes back');
  const decks = Array.from(p.querySelectorAll('[data-deck]'));
  ok(decks.length === 2, t + ': two decks, nothing beyond the guide');
  click(decks[1]); ok(/^1 of \d+$/.test(c.textContent) && decks[1].getAttribute('aria-pressed') === 'true', t + ': second deck loads');
});

head('match');
tps.forEach(t => {
  topic(t); mode(t, 'match');
  const p = panel(t + '/match');
  const L = Array.from(p.querySelectorAll('.L .tile')), R = Array.from(p.querySelectorAll('.R .tile'));
  ok(L.length === 6 && R.length === 6, t + ': six pairs', L.length + '/' + R.length);
  click(L[0]); click(R[R.length - 1]);   // a deliberate first pair, right or wrong
  // solve the rest: only undone tiles, so every click(l) is a fresh selection and each (l, r) is compared
  L.filter(l => !l.classList.contains('done')).forEach(l => { for (const r of R) { if (r.classList.contains('done')) continue; click(l); click(r); if (l.classList.contains('done')) break; } });
  ok(p.querySelectorAll('.tile.done').length === 12, t + ': every pair can be matched', p.querySelectorAll('.tile.done').length);
  ok(p.querySelector('.banner') && p.querySelector('.banner').textContent.length > 10, t + ': round-complete banner with a verdict');
  click(p.querySelector('.toolbar .btn')); ok(p.querySelectorAll('.tile.done').length === 0, t + ': new round resets');
});

head('chapter quizzes');
tps.forEach(t => {
  topic(t); mode(t, 'quiz');
  const root = $('#' + t + 'Quiz');
  ok(root.querySelectorAll('.dots i').length === 10, t + ': ten dots');
  ok(root.querySelector('.qtag.sec') && root.querySelector('.qtag.sec').textContent.length > 8, t + ': the question card names its study-guide section', root.querySelector('.qtag.sec') && root.querySelector('.qtag.sec').textContent);
  const res = answerQuiz(root, t);
  ok(!!res, t + ': results screen');
  ok(res && res.querySelector('h3') && res.querySelector('h3').textContent.length > 3, t + ': verdict line shown');
  ok(res && /\d+\/10/.test(res.querySelector('.big').textContent), t + ': score shown', res && res.querySelector('.big').textContent);
  const missed = res.querySelector('.missed');
  if (missed) {
    const n = res.querySelectorAll('.misslist > div').length;
    click(missed);
    ok(root.querySelectorAll('.dots i').length === n, t + ': practice the misses asks exactly the missed ones', root.querySelectorAll('.dots i').length + ' vs ' + n);
    answerQuiz(root, t + ' (misses)');
  }
  click(root.querySelector('.again')); ok(root.querySelectorAll('.dots i').length === 10, t + ': new quiz has ten');
});
topic('c5'); mode('c5', 'quiz');
key('1'); ok($$('#c5Quiz .qbody .opt:disabled').length > 0, 'key 1 answers');
key('Enter'); ok(/Question 2/.test($('#c5Quiz .qnum').textContent), 'Enter moves on', $('#c5Quiz .qnum').textContent);

head('practice exam');
topic('exam'); mode('exam', 'mock');
ok(!!$('#mxStart'), 'setup screen shows');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]')); click($('#mxP button[data-p="all"]'));
click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15, 'fifteen-question exam', $$('#mockExam .dots i').length);
const mres = answerQuiz($('#mockExam'), 'exam');
ok(mres && mres.querySelectorAll('.tbl tr').length >= 4 && mres.querySelectorAll('.tbl tr').length <= 16 && mres.querySelectorAll('.tbl .secch').length === mres.querySelectorAll('.tbl tr').length, 'results break down by study-guide section', mres && mres.querySelectorAll('.tbl tr').length);
click(mres.querySelector('.setupbtn')); ok(!!$('#mxStart'), 'change settings returns to setup');
click($('#mxT button[data-t="ap"]')); click($('#mxN button[data-n="25"]')); click($('#mxStart'));
ok($$('#mockExam .dots i').length === 25 && $('#mockExam .qtag').textContent === 'Application', 'application-only exam');
ok(/"types":"ap"/.test(w.localStorage.getItem('pom.mockcfg') || ''), 'exam settings remembered');

head('remembers where you were');
topic('c7'); mode('c7', 'cards');
ok(w.localStorage.getItem('pom.topic') === 'c7' && w.localStorage.getItem('pom.mode.c7') === 'cards', 'topic and mode saved');
ok(!$('.topic-btn[data-topic="extra"]') && $$('.topic-btn').length === 7, 'seven tabs including the review test');

head('review test');
topic('review');
ok(visible(panel('review/test')) && !!$('#rvStart'), 'the review tab opens its setup');
ok(/Quizlet/.test(panel('review/test').textContent), 'the setup explains where the questions come from');
click($('#rvN button[data-n="20"]')); click($('#rvF button[data-f="all"]')); click($('#rvStart'));
const rv = $('#reviewTest');
ok(rv.querySelectorAll('.dots i').length === 20, 'twenty questions', rv.querySelectorAll('.dots i').length);
ok(!!rv.querySelector('.qtag.tier'), 'the question card is labelled with its Quizlet tier', rv.querySelector('.qtag.tier') && rv.querySelector('.qtag.tier').textContent);
const rvRes = answerQuiz(rv, 'review');
ok(!!rvRes, 'the review test reaches results');
ok(rvRes.querySelectorAll('.tbl').length === 2, 'results break down by section and by tier', rvRes.querySelectorAll('.tbl').length);
ok(/On both Quizlets|On one Quizlet|On neither Quizlet/.test(rvRes.textContent), 'the tier breakdown names the tiers');
click(rvRes.querySelector('.setupbtn')); click($('#rvF button[data-f="gaps"]')); click($('#rvStart'));
ok(Array.from($('#reviewTest').querySelectorAll('.qtag.tier')).every(t => /neither/i.test(t.textContent)), 'the blind-spot draw shows only blind-spot questions');
ok(/"focus":"gaps"/.test(w.localStorage.getItem('pom.reviewcfg') || ''), 'review settings remembered');
topic('guide');
click($('#guideRoot [data-go="review/test"]'));
ok(visible(panel('review/test')), 'the guide’s review-test button opens the review test');

head('errors');
ok(errors.length === 0, 'no runtime errors anywhere', errors.join(' || '));
console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' DOM CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' DOM checks'));
w.close();
process.exit(fails ? 1 : 0);
