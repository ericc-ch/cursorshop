# Plan: Submission, Judging, and Leaderboard Platform

## Idea

A simple platform for live coding workshops and events. People who build things at an event can submit their work, judges can score it, and a leaderboard shows who won.

No accounts, no complex setup. Just: submit, score, rank.

## The Problem

Workshops are messy at the end. There is no good way to collect everyone's work, score it fairly, and show the results fast. Spreadsheets and chat threads do not hold up when there are dozens of projects and a room full of people waiting for the winners.

## The Flow

1. Participants submit their work: repo link, deployed link, and a short write-up.
2. The app checks that the deployed link is live, so broken links are caught early.
3. Judges score each submission on their phones or laptops.
4. A leaderboard ranks everyone and highlights the top finishers.
5. Results can be exported for the record.

## What We Are Not Building

- No login or user accounts.
- No live activity feed.
- No complex event management. One event at a time is enough.
- No file uploads in the first version. Links and text are enough.

## How It Fits the Workshop

The platform is built as part of the workshop itself and used live in the same session. Participants submit their own work to it, judges score from it, and the leaderboard runs the awards on the big screen.

## Tech Notes

- Built on the Cursor Shop monorepo: Vite + React web app, Effect HTTP API, shared contracts in `packages/shared`.
- Deploys to Netlify (web) and Railway (API).
- Simple data storage, one event at a time.
