# Frontend Project Structure

This document explains the folder structure of the React frontend application located in the `resources/ts/` directory.

## Overview

The frontend is built with React and TypeScript, using modern React patterns including React Router for navigation and TanStack Query for data fetching. The project follows a page-based organization structure.

## Directory Structure

```
resources/ts/
├── assets/                             # Static assets (images)
├── components/                         # Global reusable components
├── hooks/                              # Global reusable hooks
├── pages/                              # Page components and routing
├── services/                           # External communication logic
│   └── api/                            # Backend communication logic
├── utils/                              # Global utility functions and helpers
├── index.tsx                           # Application entry point
└── type.d.ts                           # Global type declarations

```
## Global Development Guidelines
- Use only named exports, never default export. (`export function x` rather than `export default function`)
- Exported function should match the file name. (including casing when exporting react components)
  - In the case of `index.tsx` files, the exported function should match the directory name
- CSS modules should be in the same directory as the component that uses it

## Directory Description

### Root Level Files

- **`index.tsx`** - The main entry point of the application. Sets up React root rendering with React Query provider and strict mode.
- **`type.d.ts`** - Global TypeScript declaration file for CSS modules and external modules type declarations (when there is no available typing to be installed as dependency)

### Assets Directory (`assets/`)
Contains all static assets organized by type (images, gifs, videos)

### Components Directory (`components/`)
Contains all generic components
#### Development Rules
- Only generic and reusable components
- One folder per component (different variations of the same component can be nested folders)

### Hooks Directory (`hooks/`)
Contains all generic hooks

#### Development Rules
- Only generic and reusable hooks

### Services Directory (`services/`)
Contains all the code for external services such as our own backend

#### Development Rules
- One folder per type of service

#### Api Directory (`services/api/`)
Contains all the code for communicating with our Laravel backend server

#### Development Rules
- Follow the API path in the directory creation. Ex: `GET /api/v1/users/addresses` becomes `services/api/users/addresses/getUserAddresses.ts` 
- One file per API endpoint
- Create the type definition for both the Request and Response (when they are relevant)

### Utilities Directory (`utils/`)
Contains all the utility functions organized by type

#### Development Rules
- Categorize the utility function correctly, ex: `formatDate` function should reside in `utils/formatter/date.ts`

### Pages Directory (`pages/`)

Contains all page components organized by feature/route:

- **`App.tsx`** - The main application component that sets up React Router with `BrowserRouter` and defines all application routes. Includes a basic navigation menu.

#### Development Rules
- Every page should have its own directory with a `index.tsx` file exporting its entry point
- Nested routes should reside in nested directories. Ex: `users/list` should reside in `pages/users/list/` directory
- All page-specific components should reside in `components/` directory inside the appropriate page directory. Ex: `pages/users/components/`

## Styling
We use CSS Modules to style our components, that way all classes are scoped to where they actually are used making it simpler to manage style scoping and class naming.

You can use it by naming your CSS file with the `.module.css` extension.

**Note:** CSS class names with hyphens (kebab-case) are automatically converted to camelCase when imported in TypeScript.

```css
/* style.module.css */
.my-class {
  background: red;
}
```

```tsx
// MyComponent.tsx
import styles from './style.module.css';

export function MyComponent() {
  return <div className={styles.myClass}></div>; // .my-class becomes myClass
}
``` 

## Backend API Calls
We use [React TanStack Query](https://tanstack.com/query/latest/docs/framework/react/) to handle state management in async calls.

### Queries
Queries are API calls to get data, no side effects.

```tsx
export function MyComponent() {
  const query = useQuery({
    /**
     * Unique key used for caching the results
     * 
     * If your API call depends on some variable, you should include it in the array, 
     * that way the hook will call the API again if the variable changes 
     */
    queryKey: ['my-query'],
    queryFn: getSomeData // Imported from `services/api/` directory
  });

  /**
   * Some of the available states that the hook provides
   * See the documentation for more details
   */
  query.isLoading;
  query.isError;
  query.data;

  return <div>{query.data}</div>;
}
```

### Mutations
Mutations are API calls to mutate some data.

```tsx
export function MyComponent() {
  const mutation = useMutation({
    mutationKey: ['my-mutation'],
    mutationFn: setSomeData // Imported from `services/api/` directory
  });

  const handleTrigger = () => {
    mutation.mutateAsync()
      .then((response) => {
        // Do something with the response
      })
      .catch((error) => {
        // Handle error
      });
  };

  /**
   * Some of the available states that the hook provides
   * See the documentation for more details
   */
  mutation.isLoading;
  mutation.isError;
  mutation.data;

  return (
    <div>
      {mutation.data}
      <button onClick={handleTrigger}>Trigger</button>
    </div>
  );
}
```