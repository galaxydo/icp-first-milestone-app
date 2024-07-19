### Deployment Guide

This guide provides step-by-step instructions for deploying the Galaxy Web App on the Internet Computer.

---

### Introduction

The Galaxy Web App is a decentralized application designed to run on the Internet Computer. This guide will help you deploy the application, ensuring it is set up correctly and ready for use.

---

### Prerequisites

Before you begin, ensure you have completed all the steps mentioned in the Development Guide. You can find the Development Guide [here](#link-to-development-guide).

---

### Steps to Deploy the Application

#### 1. Create Canister on IC Network

To deploy the application to the Internet Computer, you need to create canisters on the IC network.

```sh
dfx ledger --network ic create-canister h3sxa-x3fh3-c2fxp-ubrqw-upjcq-fbjt5-lt2e5-oasjv-utks3-oeer3-wqe --amount 0.15
```

#### 2. Top-Up Canister

Top-up the created canister with sufficient cycles.

```sh
dfx ledger --network ic --identity april30 top-up --amount 1.15 ylngo-viaaa-aaaal-qja2a-cai
```

#### 3. Deploy Frontend Canister

Deploy the frontend canister to the Internet Computer.

```sh
dfx deploy --identity april30 --network ic galaxy-frontend
```

#### 4. Deploy Backend Canister

Deploy the backend canister to the Internet Computer.

```sh
dfx deploy --identity april30 --network ic galaxy-backend
```

---

### Error Handling and Troubleshooting

- **DFX Start Issues**: If `dfx start --clean` fails, try stopping any running DFX processes and then retry.
  ```sh
  dfx stop
  dfx start --clean
  ```
- **Insufficient Cycles**: Ensure your wallet has enough cycles. You can check your balance with:
  ```sh
  dfx ledger --network ic balance
  ```
- **Canister Creation Errors**: If canister creation fails, ensure you are using the correct network and have sufficient cycles.

---

### Additional Resources

- [DFINITY SDK Documentation](https://sdk.dfinity.org/docs/index.html)
- [Internet Identity Documentation](https://sdk.dfinity.org/docs/ic-identity-guide/what-is-ic-identity.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
