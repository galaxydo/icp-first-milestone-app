# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js and npm**: Download and install from [here](https://nodejs.org/). npm is included with Node.js.
2. **DFX (Dfinity SDK)**: Follow the instructions [here](https://sdk.dfinity.org/docs/quickstart/quickstart.html) to install DFX.
3. **Git**: Download and install Git from [here](https://git-scm.com/).
4. **Deno**: Install Deno by following the instructions [here](https://deno.land/manual@v1.28.3/getting_started/installation).

## Installation

### Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/your-username/galaxy-web-app.git
cd galaxy-web-app
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:

#### Frontend Dependencies

```sh
# Navigate to the frontend directory
cd src/galaxy-frontend

# Install frontend dependencies
npm install
```

#### Backend Dependencies

```sh
# Navigate back to the root directory
cd ../..

# Install backend dependencies
dfx deps pull
```

## Running the Application

### Start the DFX Local Network

To start the local Internet Computer network, run the following command:

```sh
dfx start --clean
```

This command will start a local instance of the Internet Computer, ensuring a clean state.

### Deploy the Canisters

Next, deploy the canisters to the local network:

#### Deploy the Internet Identity Canister

```sh
dfx deps init --argument '(null)' internet-identity
dfx deps deploy
```

#### Create and Deploy the Frontend Canister

```sh
dfx canister create galaxy-frontend
dfx deploy --yes galaxy-frontend
```

#### Deploy the Backend Canister

```sh
dfx deploy --yes galaxy-backend
```

### Build and Serve the Frontend

Navigate to the frontend directory and build the frontend assets:

```sh
# Navigate to the frontend directory
cd src/galaxy-frontend

# Build the frontend assets
ENABLED_ISLANDS=FilesPage,UploadProcess,SingleProcess vite build --mode development

# Serve the frontend assets
cd dist
~/.deno/bin/file_server
```

## Access the Application

Once everything is set up and running, you can access the Galaxy Web App in your browser at `http://localhost:8080` or the port specified by your file server.

## Troubleshooting

If you encounter any issues, consider the following steps:

- Ensure all prerequisites are installed correctly.
- Verify that the DFX local network is running.
- Check the console output for any error messages and follow the suggestions.

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
