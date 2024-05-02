# Access PantryPal online at:
https://pantrypal-client-4t7p.onrender.com/

# Running the Server Locally

## Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas account
- npm (Node Package Manager) installed

## Setup Instructions

### 1. Clone the Repository
If you haven't already, clone the repository to your local machine:
```
git clone <repository-url>
```

Navigate into the directory where you've cloned the repo:
```cd <repository-name-from-repo>```

### 2. Switch to the Main Branch
Ensure you are on the main branch and have the latest updates:
```
git checkout main
git pull origin main
```

### 3. Install Dependencies
Navigate to both the server and client directories in separate terminal windows and install the necessary packages using npm.
Server:
bash
```
cd server
npm install
```
Client:
```
cd client
npm install
```
### 4. Start the Server and Client
Start the Server:
In the server directory, run the following command to start the backend server:
```
npm start
```
This will start the server on a default port, typically http://localhost:8000, unless configured otherwise in the environment variable port.

Start the Client:
In the client directory, run the following command to start the React application:
```
npm run dev
```
This command starts the development server for the React application
### 5. Access the Application
Open your web browser and enter the  URL provided by the frontend terminal to access the application.

This will load the frontend of the application, which connects to your backend server.

### Important Note on Environment Variables
Ensure you have the proper .env files set up in both the server and client directories with all the necessary secret keys and configurations to connect to databases, APIs, or other services your application requires.
