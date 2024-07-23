# MERN Stack Project

This is a MERN stack project that includes a client-side application built with React and a server-side application built with Node.js, Express, and MongoDB. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)
- MongoDB (https://www.mongodb.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies for the server:

    ```bash
    cd server
    npm install
    ```

3. Install dependencies for the client:

    ```bash
    cd ../client
    npm install
    ```

## Running the Application

### Server

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Create a `.env` file in the `server` directory and add the following variables:

    ```bash
    MONGO_URI=mongo_uri
    LIVECOINWATCH_API_KEY=api-key
    PORT=80
    ```

3. Start the server:

    ```bash
    npm start
    ```

    The server will start on the specified port (default is 80).

### Client

1. Navigate to the `client` directory:

    ```bash
    cd ../client
    ```

2. Start the client:

    ```bash
    npm start
    ```

    The client will start on the default port 3000.

## Environment Variables

The server application uses the following environment variables:

- `MONGO_URI`: The URI of your MongoDB database.
- `LIVECOINWATCH_API_KEY`: The API key for Livecoinwatch.
- `PORT`: The port on which the server will run (default is 80).

Make sure to create a `.env` file in the `server` directory with these variables.

## Project Structure

The project is structured as follows:

