# AUTOMATION

## Purpose

This document defines the permanent operating rules for autonomous development in the CalCome repository.

These rules always take priority over implementation details.

---

# Core Principles

1. Never commit directly to main.

2. Always create a new feature branch.

3. Always create a Draft Pull Request.

4. Never merge automatically.

5. Complete only one task per execution.

6. Never work on tasks already marked IN_PROGRESS, IN_REVIEW or DONE.

7. Never start the next task if the current task fails.

8. If tests or build fail, stop immediately.

---

# Development Rules

- Follow the existing architecture.
- Reuse shared components whenever possible.
- Keep code style consistent.
- Prefer small focused commits.
- Do not introduce unnecessary dependencies.
- Do not perform unrelated refactoring.

---

# Required Validation

Before pushing, always execute:

npm run check

npm run build

If either command fails:

- Do not push.
- Do not create a Pull Request.
- Report the failure.

---

# Pull Request Rules

Every implementation must:

- create a new branch
- commit changes
- push to origin
- create a Draft Pull Request

Never create a normal Pull Request.

Never merge.

---

# TASK_QUEUE Rules

Read TASK_QUEUE.md.

Find the first task with Status: OPEN.

Work only on that task.

After successful implementation:

- Change Status to IN_REVIEW.
- Record Branch.
- Record Commit SHA.
- Record Draft PR number.
- Record Updated date.

Commit and push the updated TASK_QUEUE.md.

---

# Failure Rules

If implementation fails:

- stop immediately
- leave remaining tasks untouched
- do not retry automatically
- do not continue to another task

---

# Success Condition

A task is complete only when all of the following are true:

- implementation finished
- npm run check passed
- npm run build passed
- commit created
- push completed
- Draft Pull Request created
- TASK_QUEUE.md updated

Otherwise the task is considered incomplete.
