# From PRD to Deployment — Cursor Hands-on Workshop
*Cursor Jakarta × Hacktiv8*

---

## Slide 01 / 37 — Title
**Cursor Hands-on Workshop**  
### From PRD to Deployment
*Start from a problem. Leave with an MVP.*

---

## Slide 02 / 37 — 01 · SDLC: What You Leave With
### What You Leave With
- We go through every SDLC phase today
- You use AI in every one of them
- You leave with an app that is actually deployed
- Winners get **$500 / $300 / $200** Cursor credit

---

## Slide 03 / 37 — 01: The SDLC
### 01 · The SDLC
*Same phases. Faster loop.*

---

## Slide 04 / 37 — 01 · SDLC: What Is the SDLC?
### What Is the SDLC?
The Software Development Life Cycle. How software gets from an idea to production.

Requirements → Planning → Design → Implementation → Testing → Deployment

- Every phase hands something to the next one
- You run this loop every day

---

## Slide 05 / 37 — 01 · SDLC: SDLC in the Agentic Era
### SDLC in the Agentic Era
- **Requirements** → **PRD**: You write it with the AI
- **Planning & Design** → **RFC**: You write it with the AI
- **Implementation** → Agent mode, one phase at a time
- **Testing** → The agent writes the tests, you keep TDD
- **Review** → AI review first, you make the final call
- **Deployment** → Deploy — already decided in the RFC

> *Same phases, same artifacts. The loop repeats every phase, and what used to take weeks now takes minutes.*

---

## Slide 06 / 37 — 01 · SDLC: How Today Flows
### How Today Flows
PRD → RFC → Build → Review → Deploy → Submit

- Submit your work, judges score, top 5 present
- Theory only at the start. The rest is hands-on.
- You try every step on your own machine

---

## Slide 07 / 37 — 02: The Idea
### 02 · The Idea
*Showcase — the product we build and use today.*

---

## Slide 08 / 37 — 02 · Idea: What We'll Build: Showcase
### What We'll Build: Showcase
#### The Problem
A live workshop needs a fast, fair way to collect everyone's project and rank them for prizes. A spreadsheet and a chat thread will not hold up.

- A submission & judging platform, built today and used today
- **Constraints**: 3 hours of work, deployable on Netlify and Railway
- **Participants submit**: GitHub repo, deployed URL, PRD, RFC, `llms.txt`, screenshots
- **Judges score**: 1–10 on PRD, RFC, and Code
- **Leaderboard**: Ranks everyone and highlights the top 5
- We build it together, then you submit your own work to it

---

## Slide 09 / 37 — 03: The PRD
### 03 · The PRD
*What we build, and why.*

---

## Slide 10 / 37 — 03 · PRD: What Is a PRD?
### What Is a PRD?
A Product Requirements Document. What we are building and why, written down before any code.

#### Inside every PRD:
- **Problem** — one sentence
- **User stories** — *"As a [persona], I want [capability], so that [outcome]"*
- **Non-goals** — what we will not build
- **Acceptance criteria** — how we know each story is done
- **Constraints** — time, cost, people

---

## Slide 11 / 37 — 03 · PRD: How to Write It
### How to Write It
- Use the **`grill-me`** skill — let the AI ask you until the problem is sharp
- **Brainstorm with the AI** — explore ideas before you lock scope
- **Ask the AI how to write a PRD** — if you don't know the format, let it propose one
- **Ask the AI to research** — competitors, patterns, constraints you might have missed

---

## Slide 12 / 37 — 03 · PRD: Guardrails
### Guardrails
- **Review it** — read the PRD out loud, don't accept the first draft
- **Does it align with your goal?** — does this say what you want to build?
- **Does it make sense to you?** — would you trust this enough to hand to an engineer?

---

## Slide 13 / 37 — 03 · PRD: Live — build along
### Practice: Make Your PRD
- Everyone writes and refines their PRD in Cursor
- Review it like an owner. Read the stories out loud and cut the extras.

---

## Slide 14 / 37 — 04: The RFC: Planning + Design
### 04 · The RFC: Planning + Design
*We decide before we write code.*

---

## Slide 15 / 37 — 04 · RFC: What Is an RFC?
### What Is an RFC?
A Request for Comments. How we will build what the PRD asked for — stack, shape, and trade-offs — written down before any code.

#### Inside every RFC:
- **Solution design** — engineering answer to the PRD
- **Stack** — frontend, design, backend, devops (split into separate RFCs when the surface is big)
- **Constraints** — time, cost, people, platforms
- **Trade-offs** — pros and cons of each tech choice
- *One PRD can spawn many RFCs — split by surface when it helps*

---

## Slide 16 / 37 — 04 · RFC: How to Write It
### How to Write It
- One PRD can become several RFCs — pick the slice you own first
- **As the engineer**: what tech will you pick, and why?
- **Research the options** — let the AI help you compare
- **Lock versions**, not just names
- **Ask the AI what an RFC should contain** — if the format is fuzzy, let it propose one
- Brainstorm with the AI, then use `grill-me` until the decisions are sharp

---

## Slide 17 / 37 — 04 · RFC: Guardrails
### Guardrails
- **Review it** — read the RFC out loud, don't accept the first draft
- **Does it cover the PRD?** — every user story, success case, and edge case you care about
- **Does it include a timeline?** — phases that can ship on their own

---

## Slide 18 / 37 — 04 · RFC: Live — build along
### Practice: Make Your RFC
- Everyone writes and refines their RFC in Cursor from their PRD
- Start from a small foundation — one stack, one data shape, three phases
- Review it like an owner. Would you trust this plan enough to build from it?

---

## Slide 19 / 37 — 05: Implementation
### 05 · Implementation
*We write code from the RFC — plan first, then agents.*

---

## Slide 20 / 37 — 05 · Build: What Is Implementation?
### What Is Implementation?
Turning the RFC into working code that ships PRD user stories — phase by phase, not a blank-chat vibe session.

#### Inside every implementation:
- **What** — code that delivers what the PRD asked for, from the RFC you locked
- **What makes it good** — matches the user story, stays simple, can be verified, a teammate can read it
- **Skills that help** — obra's Superpowers (brainstorm → plan → execute → verify)
- **Modes in Cursor** — Plan Mode first, then Agent Mode to build
- **Models** — Composer 2.5 or Grok; pick what you have, stay model-agnostic

---

## Slide 21 / 37 — 05 · Build: Agentic AI for Code
### Agentic AI for Code
- **Always start in Plan Mode** — never jump straight to code
- **Point it at the PRD and RFC** — context does the heavy lifting
- **The plan must name**: user story, edge cases, and how to verify
- **Use agentic AI to do the work** — Agent Mode after you approve the plan
- **Follow the user story as the north star** — verify against it before you call it done
- **Don't micromanage the typing** — correct against the plan, not with hand-edits

---

## Slide 22 / 37 — 05 · Build: Guardrails
### Guardrails
- **Verify with agents** — let the agent run checks, then you make the final call
- **Does it match the plan?** — every user story and edge case you approved
- **TDD** — unit and integration tests that prove the story
- **Lint** — keep the linter green; fix what the agent leaves behind
- **Run the app** — tests green is not enough if the product does not work

---

## Slide 23 / 37 — 05 · Build: Live — build along
### Practice: Execution
- Enter Plan Mode, point at the PRD and RFC, approve the plan
- Hand the approved plan to Agent Mode and let it run
- Verify against the user story: tests, lint, app behaves
- Then the git rhythm: branch, commit, MR — review is next

---

## Slide 24 / 37 — 06: Review
### 06 · Review
*Second look before it lands.*

---

## Slide 25 / 37 — 06 · Review: What Is a Review?
### What Is a Review?
A second look at a change before it lands — a checklist against standards you can name.

- **KISS** — as simple as it can be, nothing clever
- **DRY** — no accidental duplication
- **Maintainable** — a teammate still understands it in 3 months
- **Security** — validate input, no secrets in the code
- **Performance** — no obvious waste

---

## Slide 26 / 37 — 06 · Review: Why Review?
### Why Review?
- **Last guardrail** — catches what tests and lint miss
- **Check standardization** — same bar every time: KISS, DRY, maintainable, secure, performant
- **Impact on the codebase** — every merge teaches the next agent and teammate what good looks like here
- **Intent and taste** — does this still match the PRD and RFC?

---

## Slide 27 / 37 — 06 · Review: Live — build along
### Who Reviews?
- **AI reviews first** — point it at the diff and your criteria; concrete violations only
- **Human reviews second** — intent, taste, product sense; find what the AI missed
- **Comment like a teammate** — specific, kind, actionable
- **Then merge** — approvals in, tests green, boring merge; the loop closes

---

## Slide 28 / 37 — 06 · Review: Do We Need Review?
### Do We Need Review?
- **Depends on the team** — solo spike vs shared main vs regulated product
- **Depends on the change** — throwaway prototype vs shared library vs auth
- **Depends on the rules** — project rules, CI, and review skills raise the floor
- **Today's default** — AI pass, then human pass, then merge; skip only when you own the risk

---

## Slide 29 / 37 — 07: Human in the Loop
### 07 · Human in the Loop
*AI does the work. You keep the decisions.*

---

## Slide 30 / 37 — 07 · HITL: Live — build along
### Human in the Loop
Agentic SDLC is not autopilot — you approve the plan, judge the review, and own the merge.

- **AI proposes and executes** — you decide at the gates
- **Gates that stay human**: approve the plan, verify the story, review the diff, merge
- **Same loop again for the next slice of work** — you drive now
- **Goal**: keep shipping until the build is done and on main

---

## Slide 31 / 37 — 08: Deploy
### 08 · Deploy
*The RFC already decided how.*

---

## Slide 32 / 37 — 08 · Deploy: Deploy: Prepare
### Deploy: Prepare
- You already made the deploy decisions in the RFC
- Read them back: platform, environment, domain, constraints
- Deploy prep is just reading your own RFC back
- We already have the RFC, so we know how to deploy, right?

---

## Slide 33 / 37 — 08 · Deploy: Live — build along
### Live: Deploy and Verify
- Deploy to Netlify or Railway, open the public URL
- Submit a real test entry, check the leaderboard

---

## Slide 34 / 37 — 08 · Submit: Interactive
### Finish Your Build
- This window is yours. Keep going until you are done.
- **Deploy, then submit**: GitHub, deployed URL, PRD, RFC, `llms.txt`, screenshots
- A repo and local screenshots are enough to submit
- The facilitator keeps the room going with live help and time checks

---

## Slide 35 / 37 — 08 · Submit: Judging Criteria
### Judging Criteria
*~90 people in the room. Judges cannot click every app — screenshots and your deployed URL carry the App score.*

- **PRD · 1–10**: Clear problem, user stories A to Z, tight MVP scope
- **RFC · 1–10**: Decisions with reasons, phases that are realistic
- **App · 1–10**: From your screenshots and deployed URL. Does it work, does it feel real?

> *Judges score independently. The platform averages the scores. Tiebreak: stronger App, then earlier submission.*

---

## Slide 36 / 37 — 09 · Wrap: Interactive
### Top 5: Lightning Demos
- **Leaderboard order** — top 5 only
- **3 minutes hard timebox**. Stay on time so a room of ~90 hears all five.
- **Structure**: problem → what the agent got right → where you corrected it → live demo
- Keep your screenshots open as backup

---

## Slide 37 / 37 — 09: Winners & Thanks
### Winners & Thanks
*Thank you, Cursor Jakarta × Hacktiv8.*

- 🥇 **1st Place**: $500 Cursor credit
- 🥈 **2nd Place**: $300 Cursor credit
- 🥉 **3rd Place**: $200 Cursor credit
- 🎖️ **Everyone who finished**: $20 credit

*Join the community. See you at the next one.*
