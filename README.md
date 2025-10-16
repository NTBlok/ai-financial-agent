# AI-Powered Brokerage Assistant

A browser extension and backend system that provides AI-assisted trading automation with compliance checks.

## Features

- **Real-time UI Analysis**: Captures and analyzes brokerage UI elements and screenshots
- **AI-Powered Suggestions**: Uses LLMs to recommend compliant trading actions
- **Policy Engine**: Validates actions against compliance rules before execution
- **Audit Trail**: Maintains a complete record of all actions and decisions
- **Dashboard**: Visual interface for monitoring and reviewing automated activities

## Tech Stack

- **Frontend**: React + TypeScript, Vite
- **Browser Extension**: TypeScript WebExtension (Manifest V3)
- **Backend**: FastAPI (Python)
- **AI/ML**: Ollama (local), OpenAI API (future)
- **Automation**: Playwright
- **Database**: SQLite with JSONB for model outputs
- **CI/CD**: GitHub Actions

## Project Structure

```
├── extension/           # Browser extension code
│   ├── src/
│   │   ├── background/  # Background script
│   │   ├── content/     # Content scripts
│   │   ├── popup/       # Extension popup UI
│   │   └── shared/      # Shared types and utilities
│   └── manifest.json    # Extension manifest
│
├── backend/             # FastAPI backend
│   ├── app/
│   │   ├── api/        # API endpoints
│   │   ├── core/       # Core business logic
│   │   ├── models/     # Database models
│   │   ├── services/   # Business logic services
│   │   └── utils/      # Utility functions
│   └── main.py         # FastAPI app entry point
│
├── dashboard/           # React dashboard
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── services/   # API services
│   └── vite.config.ts  # Vite configuration
│
├── shared/              # Shared code between extension and backend
│   └── types/          # TypeScript type definitions
│
└── tests/              # Test files
    ├── e2e/           # End-to-end tests
    └── unit/          # Unit tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Ollama (for local LLM) or OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install extension dependencies
   cd extension
   npm install
   
   # Install backend dependencies
   cd ../backend
   pip install -r requirements.txt
   
   # Install dashboard dependencies
   cd ../dashboard
   npm install
   ```

### Running Locally

1. Start the backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Build and watch the extension:
   ```bash
   cd extension
   npm run dev
   ```

3. Start the dashboard:
   ```bash
   cd dashboard
   npm run dev
   ```

4. Load the extension in your browser (development mode)

## Development

### Code Style

- TypeScript/JavaScript: ESLint + Prettier
- Python: Black + isort + flake8

### Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run Python tests
pytest
```

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
