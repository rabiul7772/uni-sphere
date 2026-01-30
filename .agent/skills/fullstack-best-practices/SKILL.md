---
name: fullstack-best-practices
description: Enforces frontend best practices (reusable components, clean code, DRY) and backend clean code, performance and security standards for modern full-stack web applications.
---

# Full-Stack Best Practices Skill

This skill guides the agent to write **clean, maintainable, scalable, and secure code** while working on both frontend and backend tasks.

It should be applied whenever implementing UI components, frontend logic, APIs, database access, or application architecture.

---

## When to use this skill

Use this skill when:

- Building or refactoring frontend components
- Designing UI layouts and dashboards
- Writing backend APIs or services
- Improving performance, security, or code quality
- Reviewing or cleaning existing code

---

# Frontend Guidelines (MANDATORY)

## Core principles

The agent must strictly follow:

- **Reusable components**
- **Clean and readable code**
- **DRY (Don’t Repeat Yourself)**
- **Single Responsibility Principle**
- **Component-driven architecture**

---

## Component design rules

- One component = one responsibility
- Prefer **composition over inheritance**
- Avoid large components (>200 lines)
- Extract repeated logic into:
  - Shared components
  - Custom hooks
  - Utility functions

### ✅ Good

```ts
<StudentTable />
<FacultyTable />
```

Match the provided design image 100% pixel-perfect

Fully responsive (mobile → desktop)

# Backend Guidelines (MANDATORY)

The agent must follow these rules whenever working on backend code.  
The backend should be **secure, performant, scalable, and maintainable**.

---

## Core backend principles

- Keep APIs **stateless**
- Follow **separation of concerns**
- Prefer **clarity over cleverness**
- Optimize **database queries before code**
- Assume **serverless execution** by default

---

## Project structure rules

- Routes must be thin and declarative
- Database access belongs in a dedicated data layer
- Middleware handles cross-cutting concerns

### Example structure

src/
├─ routes/
├─ controllers/
├─ services/
├─ db/
├─ middleware/
└─ utils/

---

## API design rules

- Follow RESTful conventions
- Use nouns, not verbs, in endpoints
- Keep request and response shapes consistent

### Example

GET /api/students
POST /api/students
GET /api/students/:id
PUT /api/students/:id
DELETE /api/students/:id

---

## Request validation (REQUIRED)

- Validate **every** incoming request
- Reject invalid data early
- Never trust client input

Validation must happen:

- Before business logic
- Before database access

---

## Database access rules

- Use the ORM consistently (no mixed patterns)
- Avoid raw SQL unless strictly necessary
- Use transactions for multi-step operations
- Fetch only required fields
- Use pagination for large datasets

### Performance rules

- Avoid N+1 queries
- Prefer indexed columns in filters
- Batch queries when possible

---

## Security rules (CRITICAL)

The agent must always:

- Enforce authentication on protected routes
- Enforce authorization (role checks) on the server
- Sanitize user input
- Never expose internal error details
- Never return stack traces to clients

### Forbidden actions

- Hardcoding secrets
- Trusting role or user ID from the client
- Logging sensitive data
- Exposing database error messages

---

## Authentication & authorization

- Authentication verifies identity
- Authorization verifies permission
- Default to **deny access** if unsure
- Role checks must be enforced in middleware

---

## Error handling rules

- Centralize error handling
- Return generic error messages to clients
- Log detailed errors internally

### Response format

```json
{
  "success": false,
  "message": "An unexpected error occurred"
}
Performance & scalability guidelines
The agent should:

Keep request handlers fast

Avoid long-running tasks in API routes

Minimize cold-start work

Avoid blocking operations

Cache static or frequently accessed data when possible

Environment & configuration
Use environment variables for all secrets

Never commit .env files

Provide safe defaults for development

Fail fast if required env vars are missing

Logging & monitoring
Log errors with context (request ID, user ID if safe)

Avoid excessive logging

Never log secrets or tokens

Decision guide for the agent
Complex logic? → Move to a service

Sensitive operation? → Add authorization check

Slow endpoint? → Optimize database first

Shared logic? → Extract utility function

Output expectations
When following these backend guidelines, the agent must:

Write secure and performant code

Avoid duplication

Follow clean architecture

Protect user data

Prefer maintainability over shortcuts
```
