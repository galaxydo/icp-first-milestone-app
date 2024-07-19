## Introduction

The Galaxy Web App is a decentralized application (dApp) hosted on the Internet Computer (ICP). It provides a seamless user experience through modern web technologies and decentralized principles. The app consists of three main pages: Login, File Manager, and Canvas.

## High-Level Architecture

The Galaxy Web App employs a decentralized approach to building ICP applications. The architecture leverages the htmx islands architecture, custom Vite plugins, and a service worker that acts as a web server within the browser.

### Components

1. **Login Page**:
   - **Description**: A static HTML page served directly from the ICP assets canister, handling user authentication via Internet Identity (II).
   - **Function**: Displays a login button that, when pressed, allows the user to proceed with Internet Identity, storing their identity in local storage.

2. **Service Worker**:
   - **Description**: Registered after a successful login.
   - **Function**: Acts as a web server within the browser, implementing server-side rendering (SSR) and dynamic content loading. It uses `lightning-fs` along with the Wayne server for file management and caching.

3. **File Manager Page**:
   - **Description**: Allows users to upload and manage images.
   - **Function**: Images are persisted in the ICP canister and cached in IndexedDB using `lightning-fs`.

4. **Canvas Page**:
   - **Description**: Displays uploaded images on a canvas.
   - **Function**: Allows users to organize and visualize their collections.

### Data Flow

- **User Authentication**: Handled by the Internet Identity canister.
- **Service Worker Registration**: After successful login, the service worker is registered, and the page is refreshed to be handled by the service worker.
- **Image Storage**: Images are stored in the ICP canister and mirrored in the browser's IndexedDB using `lightning-fs` for offline access.
- **Dynamic Page Rendering**: The service worker ensures dynamic rendering and hydration of page components using the htmx islands architecture.

## Islands Architecture

### Overview

The htmx islands architecture is inspired by frameworks like Astro but extended to support dynamic content loading based on various triggers. This architecture allows for efficient rendering and hydration of individual components, reducing the complexity and overhead associated with traditional client-side frameworks like React.

### Plugin Implementation

The custom Vite plugin, `vite-plugin-islands`, is a key component of this architecture. It automates the process of defining, loading, and rendering islands (self-contained components) dynamically. Below is an explanation of the plugin's functionality:

1. **Scanning and Parsing**: The plugin scans the `src/service_worker/islands` directory for `.tsx` files and parses them to identify exported methods and swap values.
2. **Generating Routes**: It generates route registrations for each island component, enabling the service worker to handle requests and render components dynamically.
3. **Defining Islands**: The plugin creates import statements, route registrations, and async component wrappers for each island, ensuring they are loaded and hydrated only when necessary.
4. **Output Files**: The plugin writes the generated routes and islands content to specific files (`generated/routes.ts` and `generated/islands.tsx`), which are then used by the service worker and the application.

### Components and Workflow

1. **Defining Islands**: Islands are defined using the custom Vite plugin, which scans the islands directory for `.tsx` files and generates necessary code for dynamic loading.
2. **Loading Islands**: Islands are dynamically loaded based on triggers such as viewport visibility or user interactions, ensuring only necessary components are loaded and hydrated.
3. **Rendering and Hydration**: The service worker handles requests for island components, rendering them on the server side and serving them to the client for hydration.

### Benefits

- **Performance**: Efficient rendering and hydration of necessary components ensure fast load times and optimal resource usage.
- **Simplicity**: Simplifies development by offloading business logic to the backend and reducing the need for complex client-side state management.
- **Flexibility**: Dynamic loading of islands allows for a highly flexible and responsive user experience, adapting to user interactions and viewport changes in real-time.

## Service Worker and SSR

The service worker plays a crucial role by acting as a web server within the browser. It intercepts all network requests and routes them to appropriate handlers, enabling SSR and dynamic content loading.

### Key Responsibilities

1. **Routing**: Implements a router to handle various endpoints, such as file uploads, file information requests, and page rendering.
2. **SSR**: Renders pages on the server side using Preact and hyperscript, ensuring fast initial load times and a seamless user experience.
3. **Caching**: Improves performance and enables offline access by caching static assets and API responses.

### Workflow

1. **Landing Page**: Displayed instantly from the canister with a login button.
2. **Login Process**: User presses the login button, authenticates with Internet Identity, and stores their identity in local storage.
3. **Service Worker Registration**: Registered after successful login, then the page is refreshed.
4. **Intercepting Requests**: All subsequent network requests are intercepted by the service worker.
5. **Routing and Rendering**: Requests are routed to appropriate handlers, rendering necessary components on the server side and serving them to the client.
