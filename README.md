# Principles of Marketing - Study Guide

Study site for chapters 5-8 of Principles of Marketing (Kotler, Armstrong & Balasubramanian):
https://daniel-projectt.github.io/pom/

Built from the four "enhanced" class decks: the Pearson slides and notes, plus the professor's
additions (cases, figures, Scripture, videos). Same look as the Greek study sheet.

## Tabs
- Guide - the learning objectives from the slides, turned into a check-off review list
- Chapters 5-8 - notes, two flashcard decks each, match, quiz
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
