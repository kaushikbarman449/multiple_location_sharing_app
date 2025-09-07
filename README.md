# Multiple Location Sharing App

## Project Overview

The Multiple Location Sharing App is a full-stack web application that enables users to share, view, and manage multiple locations in real-time. The project is divided into two main parts: a React/Next.js-based frontend and a Python FastAPI backend. The app is designed for collaborative use cases such as group travel, event planning, or real-time location sharing among friends or teams.

---

## Features

- Real-time location sharing and updates
- Room-based sharing for private groups
- Interactive map interface
- Responsive and modern UI
- Secure backend API

---

## Tech Stack

### Frontend

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** React hooks
- **Build Tool:** Vite
- **Other:** ESLint, TypeScript, pnpm

### Backend

- **Framework:** FastAPI (Python)
- **Deployment:** Google Cloud Run (render.yaml)
- **Dependencies:** See `backend/requirements.txt`

---

## Folder Structure

```
backend/           # FastAPI backend
  main.py          # Main API server
  requirements.txt # Python dependencies
  render.yaml      # Deployment config
frontend/          # Next.js frontend
  app/             # Main app pages and routes
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  lib/             # Utility functions
  public/          # Static assets
  src/             # Additional React components and styles
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.10+
- pnpm (for frontend)

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   pnpm dev
   ```
4. The app will be available at `http://localhost:3000` by default.

### Backend Setup

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. (Optional) Create a virtual environment:
   ```sh
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
5. The API will be available at `http://localhost:8000` by default.

---

## Usage

- Open the frontend in your browser and join or create a room to start sharing locations.
- The backend handles API requests and real-time updates.

---

## Deployment

- The backend can be deployed using Google Cloud Run (see `backend/render.yaml`).
- The frontend can be deployed to Vercel, Netlify, or any static hosting provider.

---

## License

This project is licensed under the MIT License.

---

## Contributors

- Kaushik Barman (kaushikbarman449)

---

## Acknowledgements

- Built with Next.js, FastAPI, and Tailwind CSS.
