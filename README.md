# CarbonTracker Backend

## Overview

CarbonTracker Backend is a Node.js and Express-based API that calculates a user's carbon footprint based on travel distance and transport type. It integrates AI to provide recommendations for reducing carbon emissions.

## Features

- **Carbon Footprint Calculation**: Computes emissions based on predefined transport emission factors.
- **AI-Powered Recommendations**: Uses OpenAI's API to suggest ways to reduce emissions.
- **REST API**: Provides endpoints for carbon footprint calculation.
- **Deployed on Railway**: The API is accessible via a public endpoint.

## Tech Stack

- **Backend**: Node.js, Express
- **AI Integration**: OpenAI (via OpenRouter API)
- **Deployment**: Railway

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/princekumargarg/bnz-green-test-backend.git
   cd bnz-green-test-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the API key:
   ```sh
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Calculate Carbon Footprint

**Endpoint:** `POST /calculate`

**Request Body:**

```json
{
  "distance": 100,
  "transport": "car"
}
```

**Response:**

```json
{
  "footprint": 12.0,
  "recommendations": "Carpool with others. Use an electric car. Drive efficiently."
}
```

## Deployment

The backend is deployed on Railway:
[Live API](https://bnz-green-test-backend-production.up.railway.app/)

## Repository

[GitHub Repository](https://github.com/princekumargarg/bnz-green-test-backend.git)

## License

This project is licensed under the MIT License.
