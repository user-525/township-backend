Overview
This MERN stack application is designed for managing industries, solutions, and solution packages. It allows users to perform CRUD (Create, Read, Update, Delete) operations for each component within the application.

Industries: Manage different industries.
Solutions: Add and manage solutions within each industry.
Solution Packages: Add and manage packages associated with each solution.
Prerequisites
Node.js (v14 or later)
npm (v6 or later)
MongoDB (local or remote)

Backend Setup:-
Open the Project in VS Code

Launch VS Code and open the project directory.

code .
Navigate to the Backend Directory

Open a new terminal in VS Code and navigate to the backend directory.

cd backend
Install Backend Dependencies

Run the following command to install required packages:

npm install
Create Environment Variables(if its not created already)

Create a .env file in the backend directory and add the following content:

MONGO_URI=mongodb+srv://gokaddalUser:gokaddal_pass@gokaddal.qicnveb.mongodb.net/?retryWrites=true&majorityappNam=Gokaddal
PORT=4000

Start the Backend Server by using command npm start

Ensure MongoDB is running

The server will be available at http://localhost:4000.
