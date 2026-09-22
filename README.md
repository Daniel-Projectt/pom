# Principles of Marketing - Study Guide

Study site for chapters 5-8 of Principles of Marketing (Kotler, Armstrong & Balasubramanian):
https://daniel-projectt.github.io/pom/

The professor's Study Guide for Exam 2 (MRKT 3600, Fall 2026), filled in from the four class
decks: the Pearson slides and notes, plus the professor's own examples inside the guide's
sections. Only what the handout asks for is on the page. Same look as the Greek study sheet.

## Tabs
- Guide - the Study Guide for Exam 2, section by section, with check-offs and links to each subsection
- Chapters 5-8 - the handout's four sections per chapter as notes, two flashcard decks each, match, quiz
- Practice Exam - questions from all four chapters, by type and chapter

## Install on a phone
Open the link, then "Add to Home Screen". It keeps an offline copy (manifest + service worker).

## Edit and rebuild
Content lives in `src/02*.js`. Rebuild and test with:

    sh build.sh

Optional click-through test in a simulated browser (needs jsdom somewhere):

    node src/test-dom.js <folder containing node_modules/jsdom>

`src/preview.html` is the artwork for `preview.png` and `icon.png` (render with headless Chrome).
