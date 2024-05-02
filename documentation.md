# PantryPal Documentation

## Overview
The frontend of PantryPal is built using React and utilizes React Router for navigation between pages. The app is designed to allow users to register, log in, and search for recipes based on ingredients they have. Users can also save their favorite recipes and view them on a dashboard. The frontend interacts with the backend via axios to fetch and post data.

## Directory Structure
```
client/
├── context/
│ └── userContext.js
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── PrivateRoutes.jsx
│ │ └── RecipeCard.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Recipes.jsx
│ └── App.jsx
```

## Key Files and Components

### `userContext.js`
**Purpose:** Manages the user state across the app using React's Context API.

**Key Functions:**
- **UserContextProvider:** Initializes and provides user state to all child components.

### `Navbar.jsx`
**Purpose:** Displays the navigation bar across the top of all pages.

**Key Functions:**
- **logoutUser:** Logs out the user by clearing the JWT token and reloading the page.

### `PrivateRoutes.jsx`
**Purpose:** Restricts access to certain routes unless the user is logged in.

**Components Used:**
- Navigate, Outlet from react-router-dom.

**Key Functions:**
- Returns either the component for the route or redirects to the login page based on user authentication status.

### `RecipeCard.jsx`
**Purpose:** Displays individual recipe cards with options to expand details, favorite a recipe, and like a recipe.

**Key Functions:**
- **handleFavorite:** Handles adding or removing a recipe from user's favorites.
- **toggleExpand:** Toggles visibility of detailed recipe instructions.

### `Dashboard.jsx`
**Purpose:** Displays user's favorite recipes.

**Key Functions:**
- **fetchFavorites:** Fetches and displays recipes that the user has favorited.

### `Home.jsx`
**Purpose:** Serves as the landing page of the app.

**Features:**
- Animated typing effect showcasing possible ingredients to search.
- Quick link to navigate to the recipes page.

### `Login.jsx`
**Purpose:** Handles user login.

**Key Functions:**
- **loginUser:** Authenticates the user and updates the context state.

### `Register.jsx`
**Purpose:** Handles new user registration.

**Key Functions:**
- **registerUser:** Registers a new user and updates the context state.

### `Recipes.jsx`
**Purpose:** Allows users to search for recipes based on ingredients, cuisine, and diet preferences.

**Key Functions:**
- **addIngredient:** Adds an ingredient to the search list.
- **fetchRecipes:** Fetches recipes based on the specified search criteria.
- **toggleItem:** Toggles selections for advanced filters (cuisines and diets).

### `App.jsx`
**Purpose:** Sets up routing and wraps the entire app in UserContextProvider for state management.

**Components Used:**
- BrowserRouter, Routes, Route from react-router-dom.

**Key Functions:**
- Configures routes and ensures protected routes require user authentication.

## Development Tools and Libraries
- **React:** A JavaScript library for building user interfaces.
- **React Router:** Declarative routing for React.
- **Axios:** Promise-based HTTP client for making requests to the backend.
- **React Hot Toast:** Library for creating notifications.
- **Bootstrap:** Framework for building responsive, mobile-first sites.

## Deployment
- **Base URL Configuration:** Set to connect with the backend hosted on https://pantrypal-uyid.onrender.com.
- **WithCredentials:** Set to true to allow credentials to be sent with requests, which is essential for handling JWTs across different domains.

## Styling
The app utilizes Tailwind CSS for styling. The color scheme is designed to be visually appealing and user-friendly.

# Backend Documentation for the PantryPal App

## Overview
The backend of PantryPal  is built using Node.js and Express, and it utilizes MongoDB for data storage. This backend is responsible for handling user authentication, managing recipe data, and interfacing with the Spoonacular API to fetch recipe information based on user inputs.

## Directory Structure
```
server/
├── controllers/
│ ├── authControllers.js
│ ├── recipeControllers.js
│ └── userControllers.js
├── helpers/
│ └── auth.js
├── models/
│ └── user.js
├── routes/
│ ├── authRoutes.js
│ ├── recipeRoutes.js
│ └── userRoutes.js
└── index.js
```

## Key Files and Components

### `authControllers.js`
**Purpose:** Manages authentication processes including user registration, login, and profile retrieval.

**Key Functions:**
- **registerUser:** Registers a new user by hashing their password and saving their details in the database.
- **loginUser:** Authenticates a user and issues a JWT for session management.
- **getProfile:** Retrieves user details based on the provided JWT.

### `recipeControllers.js`
**Purpose:** Interfaces with the Spoonacular API to fetch recipes based on various parameters.

**Key Functions:**
- **fetchRecipes:** Fetches recipes by ingredients.
- **fetchRecipesComplex:** Fetches recipes based on multiple parameters including cuisine, diet, and intolerances.
- **recipesById:** Retrieves detailed information for specified recipe IDs.

### `userControllers.js`
**Purpose:** Manages user-specific data like favorite recipes.

**Key Functions:**
- **handleFavorite:** Adds or removes a recipe from a user's favorites.
- **getFavorites:** Retrieves all favorite recipes for a user.

### `auth.js`
**Purpose:** Provides utility functions for password hashing and verification.

**Key Functions:**
- **hashPassword:** Hashes a password using bcrypt.
- **comparePassword:** Compares a plain text password against a hashed password.

### `user.js`
**Purpose:** Defines the MongoDB schema for user data.

**Key Attributes:**
- **name:** User's name.
- **email:** User's email address.
- **password:** Hashed password.
- **savedRecipes:** Array of recipe IDs marked as favorites by the user.

### `authRoutes.js`
**Purpose:** Defines routes for authentication processes.

**Routes:**
- **GET /**: A test endpoint.
- **POST /register:** Registers a new user.
- **POST /login:** Authenticates a user.
- **GET /profile:** Retrieves the profile of the logged-in user.

### `recipeRoutes.js`
**Purpose:** Defines routes for recipe data management.

**Routes:**
- **GET /recipes:** Fetches recipes by ingredients.
- **GET /complexRecipes:** Fetches recipes based on complex search parameters.
- **POST /recipesById:** Fetches detailed recipe information by IDs.

### `userRoutes.js`
**Purpose:** Defines routes for managing user-specific data like favorites.

**Routes:**
- **POST /handleFavorite:** Adds or removes a recipe from favorites.
- **GET /getFavorites:** Retrieves all favorite recipes for a user.

### `index.js`
**Purpose:** Initializes the Express application, connects to MongoDB, sets up middleware, and defines the base routes.

**Key Configurations:**
- **CORS setup:** for cross-origin resource sharing.
- **Middleware:** for JSON parsing and URL encoding.
- **Routes initialization:** and server start on a specified port.

## Development Tools and Libraries
- **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user data and recipe favorites.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcrypt:** Library for hashing and salting user passwords.
- **JWT (JSON Web Tokens):** Used for secure transmission of information between parties as a JSON object.
- **Axios:** Promise-based HTTP client for making HTTP requests from Node.js.
- **Dotenv:** Loads environment variables from a `.env` file into `process.env`.

## Security Considerations
- **Uses bcrypt** for secure password storage.
- **Implements JWT** for secure and stateless authentication.
- **Configures CORS** to restrict resource sharing to trusted domains.

