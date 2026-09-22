# Principles of Marketing - Study Guide

Study site for chapters 5-8 of Principles of Marketing (Kotler, Armstrong & Balasubramanian):
https://daniel-projectt.github.io/pom/

Built around the professor's Study Guide for Exam 2 (MRKT 3600, Fall 2026) and the four
"enhanced" class decks: the Pearson slides and notes, plus the professor's additions (cases,
figures, Scripture, videos). Same look as the Greek study sheet.

The handout's sections are the spine: the Guide tab lists them item by item, the notes are grouped
under those exact headings, and the quizzes draw only from them. What the deck covered but the
handout leaves out (institutional and government markets, brand sponsorship and development, the
class openers) is kept in the notes labeled "beyond the guide" and excluded from the quizzes.

## Tabs
- Guide - the Study Guide for Exam 2, section by section, with check-offs and links to each subsection
- Chapters 5-8 - notes, two flashcard decks each (plus a "beyond the guide" deck where needed), match, quiz
- In Class - the theme each chapter opens with, Scripture, announcements, and every video shown
- Practice Exam - questions from all four chapters, by type and chapter

## Install on a phone
Open the link, then "Add to Home Screen". It keeps an offline copy (manifest + service worker).

## Edit and rebuild
Content lives in `src/02*.js`. Rebuild and test with:

    sh build.sh

Optional click-through test in a simulated browser (needs jsdom somewhere):

    node src/test-dom.js <folder containing node_modules/jsdom>

`src/preview.html` is the artwork for `preview.png` and `icon.png` (render with headless Chrome).
