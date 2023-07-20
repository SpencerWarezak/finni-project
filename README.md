# README.md -- Finni Health Project Documentation
## Created by Spencer Warezak -- July 20, 2023

### Description
This is a small project aimed at creating a health care provider's patient dashboard. In the dashboard, the provider is able to add, remove, and update patient information. The dashboard also allows for searching patients and filtering patients by their relevant information. The tech stack used was MERN (MongoDB, Express.js, Node.js, React.js) with Material UI for styling.

### Configuration
In order to configure the project, there are a few steps you must take.
- Install npm on your machine
- Install all of the dependencies in the frontend and backend
    - ```npm install``` for each of the directories
- Include all of the necessary environment variables
    - Frontend .env should include
    ```
    REACT_APP_PORT=http://localhost:4000
    ```
    - Backend .env should include
    ```
    PORT=4000
    MONGO_URI=<your MongoDB URI>
    JWT_SECRET=<whatever secret you wish to use>
    ```
- Please make sure you don't have any processes running on port 3000 or 4000 while using this application
