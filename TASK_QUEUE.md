# CalCome TASK_QUEUE

Rules

- Complete only the first task whose effective status is OPEN.
- One task per scheduled execution.
- Reconcile task status with existing branches and Draft Pull Requests before selecting work.
- An OPEN task with a recorded incomplete Branch must resume that branch.
- A task with an open Draft Pull Request is effectively IN_REVIEW and must be skipped.
- A failed task remains OPEN and must be retried before any later task.
- Never merge directly from the feature agent.
- After validation succeeds, create one non-Draft Pull Request containing the exact `AUTO_MERGE: true` marker.
- The repository Auto Merge workflow may merge only after CI and Vercel Preview succeed.
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

---

P-004

Title: Gross-Up Salary Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-005

Title: Hourly Wage Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-006

Title: Four Major Social Insurance Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-007

Title: Average Wage Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-008

Title: Salary Raise Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-009

Title: Overtime Pay Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-010

Title: Night Work Pay Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-011

Title: Holiday Work Pay Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-012

Title: Minimum Wage Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-013

Title: Salary Conversion Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-014

Title: Retirement Pension Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-015

Title: DSR Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-016

Title: LTV Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-017

Title: Loan Interest Comparison Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-018

Title: Loan Refinancing Savings Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-019

Title: Balloon Payment Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-020

Title: Mortgage Payment Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-021

Title: Jeonse Loan Interest Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-022

Title: Credit Loan Interest Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-023

Title: Early Loan Repayment Fee Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-024

Title: DTI Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-025

Title: Real Estate Acquisition Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-026

Title: Capital Gains Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-027

Title: Gift Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-028

Title: Inheritance Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-029

Title: Property Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-030

Title: Comprehensive Real Estate Holding Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-031

Title: Value Added Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-032

Title: Comprehensive Income Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-033

Title: Withholding Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-034

Title: Freelancer 3.3 Percent Tax Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-035

Title: Loan Affordability Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-036

Title: Debt Repayment Period Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-037

Title: Credit Card Installment Interest Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-038

Title: Rent Conversion Rate Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-039

Title: Jeonse to Monthly Rent Conversion Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-040

Title: Real Estate Brokerage Fee Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-041

Title: Stock Average Cost Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-042

Title: Stock Profit and Loss Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-043

Title: Dividend Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-044

Title: Dividend Yield Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-045

Title: Investment Fee Impact Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-046

Title: Inflation Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-047

Title: Currency Conversion Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-048

Title: Pension Savings Tax Credit Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-049

Title: ISA Tax Savings Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -

---

P-050

Title: Retirement Pension Tax Credit Calculator

Status: OPEN

Priority: HIGH

Branch: -

Commit SHA: -

Draft PR: -

Last Result: NOT_STARTED

Failure: -

Updated: -
