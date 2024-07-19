# Development Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Frontend Development](#frontend-development)
   - [Prerequisites](#prerequisites-frontend)
   - [Project Structure](#project-structure-frontend)
   - [Setting Up the Frontend](#setting-up-the-frontend)
   - [Building the Frontend](#building-the-frontend)
   - [Running the Frontend](#running-the-frontend)
4. [Backend Development](#backend-development)
   - [Prerequisites](#prerequisites-backend)
   - [Project Structure](#project-structure-backend)
   - [Setting Up the Backend](#setting-up-the-backend)
   - [Deploying the Backend](#deploying-the-backend)
5. [Running the Program with Kitty Tabs](#running-the-program-with-kitty-tabs)
   - [Explanation of `open_tabs.sh`](#explanation-of-opentabssh)
   - [Explanation of `tabs.txt`](#explanation-of-tabstxt)

---

## Introduction

Welcome to the development guide for the Galaxy project. This document provides step-by-step instructions for setting up, building, and running both the frontend and backend components of the project.

## Project Structure

The project is organized as follows:

```
.
├── .env
├── .env.production
├── .gitignore
├── README.md
├── canister_ids.json
├── dfx.json
├── package.json
├── scripts/
│   ├── open_tabs.sh
│   └── tabs.txt
├── src/
│   ├── galaxy-backend/
│   │   └── Pictures.mo
│   └── galaxy-frontend/
│       ├── index.html
│       ├── index.tsx
│       ├── vite.config.js
│       └── islands/
│           ├── FilesPage.tsx
│           ├── UploadProcess.tsx
│           └── SingleProcess.tsx
│           └── ...
├── tsconfig.json
└── tree.txt
```

## Frontend Development

### Prerequisites

- Node.js and npm installed.

### Project Structure

The frontend code is organized as follows:

```
src/
└── galaxy-frontend/
    ├── index.html
    ├── index.tsx
    ├── vite.config.js
    └── islands/
        ├── FilesPage.tsx
        ├── UploadProcess.tsx
        └── SingleProcess.tsx
```

### Setting Up the Frontend

1. **Navigate to the Frontend Directory:**
   ```sh
   cd src/galaxy-frontend
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm installed. Then run:
   ```sh
   npm install
   ```

### Building the Frontend

1. **Build the Frontend:**
   Use the following command to build the frontend with the specified islands:
   ```sh
   ENABLED_ISLANDS=FilesPage,UploadProcess,SingleProcess vite build --mode development
   ```

2. **Lint the Frontend:**
   Use `oxlint` for linting the TypeScript files:
   ```sh
   ls src/**/*.ts* | entr -r -s 'npx oxlint@latest ./src/service_worker/islands/**/*.tsx --format default > oxc.txt' && echo 'done'
   ```

### Running the Frontend

1. **Serve the Built Files:**
   After building, navigate to the `dist` directory and serve the files using a static file server:
   ```sh
   cd src/galaxy-frontend/dist
   ~/.deno/bin/file_server
   ```

## Backend Development

### Prerequisites

- DFX installed.

### Project Structure

The backend code is organized as follows:

```
src/
└── galaxy-backend/
    └── Pictures.mo
```

### Setting Up the Backend

1. **Navigate to the Backend Directory:**
   ```sh
   cd src/galaxy-backend
   ```

2. **Start the DFX Environment:**
   Ensure you have DFX installed. Then run:
   ```sh
   dfx start --clean
   ```

3. **Install Dependencies:**
   Pull and initialize dependencies:
   ```sh
   dfx deps pull
   dfx deps init --argument '(null)' internet-identity
   dfx deps deploy
   ```

### Deploying the Backend

1. **Create the Canister:**
   ```sh
   dfx canister create galaxy-backend
   ```

2. **Deploy the Canister:**
   Use the following command to deploy the backend canister:
   ```sh
   ls src/**/*.mo* | entr -r -s 'dfx deploy --yes galaxy-backend && dfx build galaxy-frontend'
   ```

## Running the Program with Kitty Tabs

### Explanation of `open_tabs.sh`

The `open_tabs.sh` script helps to run multiple commands in separate tabs in the Kitty terminal. You can find the script [here](scripts/open_tabs.sh).

### Explanation of `tabs.txt`

The `tabs.txt` file contains the commands to be executed in separate tabs. Each line consists of a label and a command, separated by a colon (`:`). Here are the contents of `tabs.txt`:

```
frontend: cd src/galaxy-frontend && ls src/**/*.ts* | /opt/homebrew/bin/entr -r -s 'ENABLED_ISLANDS=ALL vite build --mode development'
serve: cd src/galaxy-frontend/dist && ~/.deno/bin/file_server
dfx: dfx start --clean
canister: sleep 5 && dfx canister create galaxy-frontend && ls src/**/*.mo* | /opt/homebrew/bin/entr -r -s 'dfx deploy --yes galaxy-backend && dfx build galaxy-frontend'
```

- **frontend:** This command navigates to the `src/galaxy-frontend` directory and uses `entr` to watch for changes in TypeScript files, triggering a build with Vite in development mode.
- **serve:** This command navigates to the `dist` directory and serves the built files using a static file server.
- **dfx:** This command starts the DFX environment with a clean state.
- **canister:** This command creates the frontend canister and uses `entr` to watch for changes in Motoko files, triggering a deployment of the backend canister and a build of the frontend.
