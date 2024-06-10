ls src/**/*.ts* | entr -s 'npx tailwindcss -i src/main.css -o assets/output.css; vite build; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -s 'vite build; npx tailwindcss -i src/main.css -o dist/output.css; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -s 'vite build --mode development; npx tailwindcss -i src/main.css -o dist/output.css; cp assets/htmx.min.js dist/htmx.min.js; cp assets/may16.js dist/may16.js; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -r -s 'vite build --mode development; npx tailwindcss -i src/main.css -o dist/output.css; cp assets/htmx2.min.js dist/htmx2.min.js; cp assets/_hyperscript.min.js dist/_hyperscript.min.js; cp assets/may16.js dist/may16.js; cp assets/may26._hs dist/may26._hs; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -r -s 'vite build --mode development; npx tailwindcss -i src/main.css -o dist/output.css; cp assets/scripts/* dist/; cp assets/styles/* dist/; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

cp assets/scripts/* dist/assets; cp assets/styles/* dist/assets;

ls src/**/*.ts* | entr -r -s 'vite build --mode development; npx tailwindcss -i src/main.css -o dist/output.css; cp assets/scripts/* dist/; cp assets/styles/* dist/; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -r -s 'vite build --mode development; mv dist/galaxy-service-worker.js galaxy-service-worker.js;'

ls src/**/*.ts* | entr -r -s 'vite build && cp dist/galaxy-service-worker.js galaxy-service-worker.js'

ls src/**/*.ts* | entr -r -s 'vite build --mode development && cp dist/galaxy-service-worker.js galaxy-service-worker.js'

## backend

dfx start --clean

dfx deps pull
dfx deps init --argument '(null)' internet-identity
dfx deps deploy

ls src/**/*.mo* | entr -r -s 'dfx build may16-galaxy-backend'

ls src/**/*.mo* | entr -r -s 'dfx deploy may16-galaxy-backend'

ls src/**/*.mo* | entr -r -s 'dfx deploy --yes may16-galaxy-backend && dfx build may16-galaxy-frontend'

## etc

tailwind.config.js#svgStylePlugin allows to apply dynamic styles to svg icons like this

                <Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />

##
Icon component not compatible with preact, instead we use its utils functions and apply to span innerHTML, all svgs are embedded into build not api 

# concept

multi-page icp apps

knowledge is essential to reach higher levels that happiness

key to knowledge - cutting the diamonds out of rocks, i.e. saving most important relevant pieces of information and discarding everything else

we do it everyday in offline by taking pictures on phone and online by taking screenshots of the screen

then we all have a lot of images representing gathered representing our unique experience and knowledge

now to organize those images into a structure that makes sense we use canvas for it and drag & drop all the images and re arrange their relative position to each other

# deployment

dfx ledger --network ic create-canister h3sxa-x3fh3-c2fxp-ubrqw-upjcq-fbjt5-lt2e5-oasjv-utks3-oeer3-wqe --amount 0.15

may16-galaxy git:(master) ✗ dfx identity --network ic --identity april30 top-up --amount 0.15 ylngo-viaaa-aaaal-qja2a-cai

dfx deploy --identity april30 --network ic may16-galaxy-frontend

cp dist/* ./

cp ./dist/*.* ./dist/assets

# ic-sw-starter

## Overview

This template shows an alternative way to build blockchain apps on Internet Computer, featuring separation of concerns, state representation, templating engine, and thread separation for calls and queries.

### Separation of Concerns

All business logic of the application should be on the backend. This is fulfilled here by the service worker, which acts as an intermediary between the frontend and the actual smart contract. This service worker implements the missing layer which is usually done by a real backend. It performs real routing and server-side-rendering but inside of the browser service worker, which is actually hosted on the chain.

### State Representation

The Hypertext Markup itself represents the state of the application. This means that the structure and layout of the application are defined and controlled by the HTML code.

### Templating Engine

The Preact templating engine is used in this guide. Preact is a fast, lightweight JavaScript library that is similar to React. It provides a simple and efficient way to create interactive UIs.

### Thread Separation

Separate threads are used for calls and queries. This ensures that the application can handle multiple requests simultaneously without blocking or slowing down the user interface.


## Structure

1. **Index.html**: This is the entry point of the application. It contains a root div where the app will be rendered and a script tag that points to the main JavaScript file.

2. **Main.js**: This script registers a service worker. Service workers are scripts that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. In this case, the service worker is used to handle routing and server-side rendering.

3. **Service Worker**: The service worker implements routing and server-side rendering within the client-side. It isolates all the business logic interacting with the backend and wraps its responses in HTML hypertext markup. This is important because it's impossible to do on the side of the actual IC backend, hence the need for this service worker proxy.

4. **Routes**: The service worker defines routes for the application. Each route is associated with a handler function that returns a JSX fragment. The JSX fragments are then rendered to HTML strings and returned as responses to fetch events.

5. **HTMX**: HTMX allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext. In this case, it's used in the Index page to handle form submission and update a section of the page with the server's response.

6. **Preact**: Preact is a fast, lightweight JavaScript library that is similar to React. It's used here to define the components of the application and render them to HTML strings.

By following this structure, you can build efficient, scalable, and robust blockchain apps.
