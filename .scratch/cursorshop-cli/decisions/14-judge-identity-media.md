# 14 — Judge identity and review media

Type: grilling

Question: How does the CLI handle judge identity and review media?

Answer: Require an explicit `--judge-name` flag on every score command that needs it. Do not persist judge identity locally. Review and score-list responses include Submission Markdown and screenshot URLs in JSON; the CLI does not download screenshot files. Agents may fetch those URLs themselves if they need local images.
