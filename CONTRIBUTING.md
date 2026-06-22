# Contributing to ATSPro

Thank you for your interest in contributing to ATSPro! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/ATSPro.git
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/originalrepo/ATSPro.git
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Gemini API key
- Git

### Setup

1. Install server dependencies:
   ```bash
   cd server && npm install
   ```

2. Install client dependencies:
   ```bash
   cd client && npm install
   ```

3. Set up environment variables (see README.md)

4. Start development servers:
   ```bash
   # Terminal 1 - Server
   cd server && npm run dev

   # Terminal 2 - Client
   cd client && npm start
   ```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README.md if features change
4. Request review from maintainers

## Coding Standards

### JavaScript

- Use ES6+ features
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

### Node.js/Express

- Follow MVC architecture
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate all inputs

## Commit Messages

Use conventional commits format:

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## Issue Guidelines

- Use descriptive titles
- Include steps to reproduce bugs
- Provide environment details
- Add labels when possible

## Questions?

Open an issue with the "question" label or contact the maintainers.
