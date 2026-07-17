# CalCome TASK_QUEUE

Rules

- Complete only the first task whose effective status is OPEN.
- One task per scheduled execution.
- Reconcile task status with existing branches and Draft Pull Requests before selecting work.
- An OPEN task with a recorded incomplete Branch must resume that branch.
- A task with an open Draft Pull Request is effectively IN_REVIEW and must be skipped.
- A failed task remains OPEN and must be retried before any later task.
- Never merge automatically.
- Always create a Draft Pull Request after validation succeeds.
- If there are no effectively OPEN tasks, reply exactly:
  NO OPEN TASKS

Status values

- OPEN: ready for work or waiting for retry after failure
- IN_PROGRESS: currently being implemented
- IN_REVIEW: Draft Pull Request created and awaiting review
- DONE: reviewed and merged or explicitly completed

---

P-001

Title: Unemployment Benefits Calculator

Status: IN_REVIEW

Priority: HIGH

Branch: codex/unemployment-benefits-calculator

Commit SHA: f9e816f31d360f05c906902412acee9080164523

Draft PR: #35 https://github.com/maxtop9843-byte/calcome/pull/35

Last Result: SUCCESS

Failure: -

Updated: 2026-07-17

---

P-002

Title: Weekly Holiday Pay Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-003

Title: Annual Leave Allowance Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -
