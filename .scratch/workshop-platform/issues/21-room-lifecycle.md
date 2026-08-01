# 21 — Room lifecycle

Type: grilling

Question: Does a room need explicit phases?

Answer: **Yes:** `submissions → judging → results`, with forward-only transitions authorized by the room's judge secret.

- **Submissions:** participants can create and edit submissions; scoring is closed.
- **Judging:** submissions are locked; judges can create and update scores; public results are hidden.
- **Results:** submissions and scores are locked; the public leaderboard is visible.
