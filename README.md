# House of Viraasat Client

House of Viraasat is an enterprise-grade ecommerce platform. This repository contains the customer-facing frontend web application, built for high performance, premium user experience, and robust type safety.

## 1. Project Overview

The `house-of-viraasat-client` repository is a standalone client-side web application. It acts as the customer-facing interface, consuming backend data purely via RESTful API endpoints. 

To maintain clean separation of concerns, related services are managed in separate repositories:
- **Backend API Service**: `house-of-viraasat-api`
- **System Documentation**: `house-of-viraasat-docs`

---

## 2. Tech Stack

The client application is built with a modern, high-performance web stack:

- **Core Framework**: React (v19.x)
- **Build System & Dev Server**: Vite (v8.x)
- **Language**: TypeScript (v6.x)
- **Styling**: Tailwind CSS (v4.x)
- **Routing**: React Router (v7.x)
- **Form Management**: React Hook Form (v7.x)
- **Data Validation**: Zod (v4.x)
- **State Management**: Zustand (v5.x)
- **HTTP Client**: Axios (v1.x)
- **UI Icons**: Lucide React

---

## 3. Project Architecture

This application employs a **feature-first, modular architecture**. This design encapsulates domain-specific logic, components, and hooks into self-contained directories, minimizing coupling and allowing the codebase to scale cleanly.

### Feature Folders

Inside `src/features/`, each subdirectory represents a distinct business domain (e.g., `auth`, `products`, `cart`, `orders`). Each feature folder adheres to a strict internal structure:
- **`api/`**: Axios endpoints and API services scoped to this feature.
- **`components/`**: Feature-specific UI elements (e.g., `LoginForm.tsx` inside `auth`).
- **`hooks/`**: Custom React hooks driving specific feature behaviors.
- **`pages/`**: Complete page components mapped to routes.
- **`services/`**: Feature-level business logic helpers.
- **`types/`**: TypeScript type definitions and interfaces for this module.
- **`utils/`**: Helper functions utilized within the feature scope.
- **`index.ts`**: The public entry point (API) of the feature, exporting only what is needed externally.

### Global Directories

- **`src/components/`**: Reusable global UI components (buttons, input fields, modals).
- **`src/layouts/`**: Page layout containers (dashboard wrapper, landing layouts).
- **`src/store/`**: Global Zustand state stores.
- **`src/services/`**: Infrastructure level API setups and clients.
- **`src/styles/`**: Global style definitions and Tailwind overrides.
- **`src/types/`**: Shared TypeScript types and global definitions.

---

## 4. Prerequisites

Before setting up the repository locally, ensure your workstation meets the following requirements:

- **Node.js**: Version 18.x or 20.x (LTS recommended)
- **Git**: Version 2.30+
- **Backend API**: A running instance of the `house-of-viraasat-api` backend service (local or remote) to serve the client.

---

## 5. Installation

Follow these steps to establish your local development environment:

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-organization/house-of-viraasat-client.git
cd house-of-viraasat-client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the template configuration file to create your local variables:
```bash
cp .env.example .env
```
Open `.env` and verify the values match your backend and environment specifications.

### Step 4: Run the Development Server
```bash
npm run dev
```
By default, the server spins up at `http://localhost:5173`.

---

## 6. Environment Variables

The application relies on environment variables configured via Vite. These must be prefixed with `VITE_` to be exposed to the client bundle.

### Environment Template (`.env.example`)
```ini
# Public Frontend Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME="House of Viraasat"
VITE_ENV_MODE=development
```

### Variable Reference

- **`VITE_API_BASE_URL`**: The base HTTP URL of the running backend server. All API requests using the Axios instance are dispatched here.
- **`VITE_APP_NAME`**: The customer-facing application title. Used in metadata header rendering and the UI.
- **`VITE_ENV_MODE`**: The application run mode. Typically matches `development`, `staging`, or `production`.

---

## 7. Available Scripts

Use the following npm scripts to build, test, and maintain the codebase:

- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR) and fast build execution.
- **`npm run build`**: Runs the TypeScript compiler check (`tsc`) and compiles the React application into optimized, static production assets inside the `dist` directory.
- **`npm run preview`**: Launches a local HTTP server to host and inspect the compiled assets in the `dist` directory before deployment.
- **`npm run lint`**: Executes ESLint to scan the project files for code quality issues and style guide violations.
- **`npm run format`**: Re-formats the source code in `src/` to conform to the Prettier standards.

---

## 8. Folder Structure

```
house-of-viraasat-client/
├── dist/                          # Compiled static production assets
├── public/                        # Static assets served directly (favicons, manifest.json)
├── src/                           # Client source code root
│   ├── app/                       # Core app definitions and initialization
│   ├── assets/                    # Media assets (unoptimized images, logo SVGs)
│   ├── components/                # Reusable global design-system UI components
│   ├── features/                  # Feature-first domain modules
│   │   ├── auth/                  # Login, registration, and reset page flow
│   │   ├── products/              # Product grid, product detail, catalog search
│   │   └── cart/                  # Cart management and checkout slideouts
│   ├── hooks/                     # Shared React hooks (useMediaQuery, useDebounce)
│   ├── layouts/                   # Global layout templates (MainLayout, DashboardLayout)
│   ├── lib/                       # Vendor library configurations (Axios clients, etc.)
│   ├── providers/                 # React Context providers (auth, theme, toast)
│   ├── routes/                    # Router mapping, lazy-loaded page route declarations
│   ├── services/                  # Global network services and system interceptors
│   ├── store/                     # Zustand state definitions
│   ├── styles/                    # Theme declarations and global style files
│   ├── types/                     # Shared TypeScript type declaration files
│   ├── utils/                     # Generic utility scripts (formatting, calculations)
│   ├── App.css                    # Main app structural styling
│   ├── App.tsx                    # Root React component orchestrating providers
│   ├── index.css                  # Core CSS importing Tailwind directives
│   └── main.tsx                   # Client entry point mounting React root DOM
├── .env.example                   # Template file for environment variables
├── .prettierrc                    # Code style rules for formatting
├── eslint.config.js               # Code syntax standards and compiler exceptions
├── package.json                   # Project scripts and package dependencies
├── tsconfig.json                  # Compiler variables for TypeScript
└── README.md                      # Developer documentation
```

---

## 9. Styling

The interface is styled using **Tailwind CSS v4** to create premium, responsive, and high-performance designs.

### Key Guidelines

- **Tailwind CSS v4**: Integrates using the Vite-native CSS post-processing pipeline `@tailwindcss/vite`.
- **Component Organization**: Styles are applied inline using utility classes. For highly repeatable components (such as buttons or form groups), design tokens are abstracted into shared UI components in `src/components/` rather than raw CSS classes.
- **Responsive Design**: Follows a strict **mobile-first** development approach. Layout modifications are handled through breakpoints (e.g., `md:`, `lg:`) to ensure seamless layouts across mobile, tablet, and desktop viewports.
- **Theme Consistency**: Colors, borders, typography, and animation scales are controlled via standardized variables within Tailwind. Design palettes use premium HSL coordinates to support uniform focus rings, dark-mode styling, and transitions.

---

## 10. State Management

The application segregates state into three main layers to optimize performance and prevent unnecessary re-renders:

### 1. Global Store (Zustand)
Zustand is chosen for global, client-side store management due to its minimal boilerplate and simple hooks-based API. Global states are kept light, covering:
- Authentication sessions (access tokens and logged-in user profile).
- UI/Layout state (sidebar drawers, shopping cart toggle).
- Shopping cart contents and local caching configurations.

### 2. API Services (Axios Client)
Direct network communication is encapsulated within API services. Responses are mapped immediately to types, with transient data cached locally or stored locally inside feature-specific React state if and only if it does not require global synchronization.

### 3. Forms & Client Validation (React Hook Form & Zod)
Form state (dirty values, touches, submissions) is handled using uncontrolled inputs via React Hook Form, maximizing UI performance on complex forms. Validation schemas are declared using Zod. The form validator parses input fields against the Zod schema on submission, ensuring type-safe payloads are sent to the API.

---

## 11. API Communication

### Backend Integration
The client communicates with the backend REST API via a dedicated Axios client instance configured in `src/services/`. The client instance automatically:
- Injects the `VITE_API_BASE_URL` config.
- Embeds standard API Headers (Content-Type, Accept).

### Authentication Flow & Token Storage
- **Token Delivery**: On login/signup, the backend returns a short-lived JSON Web Token (JWT) Access Token in the response payload and sets a secure, HTTP-only cookie containing the Refresh Token.
- **Storage Strategy**: The client stores the JWT Access Token in-memory (within the Zustand Auth Store) to protect against Cross-Site Scripting (XSS) attacks. 
- **Token Refresh**: Axios request interceptors monitor access token expiration. When expired, the interceptor pauses outgoing requests, triggers the token refresh endpoint (which validates the HTTP-only Refresh Token cookie), updates the in-memory access token, and retries the original request.

### Error Handling
A global Axios response interceptor acts as the first line of defense for API failures:
- **401 Unauthorized**: Automatically triggers token refresh logic. If the refresh fail, the interceptor clears the local store and redirects the user to the login screen.
- **403 Forbidden**: Blocks access and dispatches an alert showing insufficient privileges.
- **422 Validation / 400 Bad Request**: Formats API validation issues and passes errors directly back to React Hook Form field validators.
- **500 Server Error**: Redirects the viewport to a fallback page or triggers a global toast message.

---

## 12. Development Workflow

Follow this systematic pipeline when introducing new features to the repository:

```
[Design Spec] ➔ [Feature Scaffold] ➔ [Define Types/Schemas] ➔ [Build Components] ➔ [Implement Hooks/State] ➔ [Integrate API] ➔ [Verify & Test]
```

1. **Design & Spec**: Review user flow, UI layout specifications, and backend endpoint payloads.
2. **Feature Scaffolding**: Create the corresponding folder under `src/features/` with its nested directories.
3. **Define Types & Schemas**: Declare TypeScript interfaces and Zod validation schemas for forms.
4. **Build Components**: Implement reusable layout wrappers and presentational components.
5. **Implement Hooks & State**: Code custom hooks to handle page interactions or Zustand slices for global variables.
6. **Integrate API**: Bind components to network services and map error payloads.
7. **Verify & Test**: Check layout responsiveness, form validation messages, loading patterns, and edge cases. Ensure linting and formatting scripts execute without warnings.

---

## 13. Coding Standards

### TypeScript
- Explicitly define the return type of all functions and React components.
- Do not use `any`. Explicitly declare type overrides or use generics (`unknown` / `Record<string, unknown>`).
- Set unused variables configuration to error out unless prefixed with an underscore (`_`).

### ESLint & Prettier
All files must satisfy the static analysis configurations. Pre-commit commands automatically format code blocks.
- **Prettier Settings**: Semicolons are required, print width is capped at 100 characters, and double quotes are preferred.
- **Linting Rules**: ESLint enforces strict React hooks usage and parser structures.

### Naming & Directory Conventions
- **Folders & Files**: lowercase kebab-case (e.g., `product-card.tsx`).
- **React Components**: PascalCase (e.g., `ProductCard.tsx`).
- **CSS Classes**: Tailwind utility classes.
- **Types/Interfaces**: PascalCase (e.g., `ProductDetailResponse`).
- **Variables & Functions**: camelCase (e.g., `fetchProductById`).

---

## 14. Performance

To ensure a seamless, high-performance customer experience, the application implements the following optimizations:

- **Code Splitting**: High-level page routes are imported dynamically using `React.lazy()` and wrapped with `Suspense` containers. This separates the production bundle into lightweight, route-specific chunks.
- **Image Optimization**: Layouts request optimized formats (WebP/AVIF) from the backend. CSS utilizes native browser `loading="lazy"` tags on decorative media to reduce initial load weight.
- **Bundle Optimization**: Vite's rollup builder handles tree shaking, dependency grouping, and CSS extraction, stripping out unused packages and reducing initial payload size.

---

## 15. Troubleshooting

### API Connection Issues
- **Symptom**: Console logs show `ERR_CONNECTION_REFUSED` or network timeouts.
- **Fix**: Check if the backend API service is running locally on port `5000` (or the port defined in `.env`). Verify the `VITE_API_BASE_URL` in `.env` matches the running server URL.

### CORS Errors
- **Symptom**: Console throws security errors regarding origin policies on outbound API requests.
- **Fix**: Ensure your local client URL (typically `http://localhost:5173`) is declared inside the backend's `CLIENT_URL` configuration within the API's `.env` file.

### Environment Variables Undefined
- **Symptom**: App starts but crashes immediately, or variables return `undefined`.
- **Fix**: Vite requires the `VITE_` prefix on all client variables. Ensure variables in `.env` match `.env.example` exactly and restart the dev server after editing variables.

### Build Failures
- **Symptom**: Run build commands fail during typescript parsing.
- **Fix**: Run `npm run lint` and `npm run format` locally. Ensure that all TypeScript return types are defined and that there are no remaining imports to non-existent types.

---

## 16. License

This project contains proprietary commercial software. All rights reserved. No part of this code may be copied, reproduced, distributed, or modified without explicit authorization.
