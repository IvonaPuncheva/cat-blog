# Cat-blog
SoftUni React Course Project

## Description

The Cat Blog project is a comprehensive web application designed for browse, comment, and interact with cat-related content. It is built using  web technologies, including React and Vite, and follows a modular, component-based architecture.

## Installation Instructions

### Backend
1. Navigate to the main folder.
2. Install the necessary dependencies by running the following command in the terminal:
   ```bash
   npm install
   ```
3. Start the server by running:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `client` folder.
2. Install the necessary dependencies by running the following command in the terminal:
   ```bash
   npm install
   ```
3. Start the React application by running:
   ```bash
   npm run dev
   ```

## Technologies Used

### Backend
- Express
- Mongoose
- jsonwebtoken
- bcrypt
- cookie-parser
- Nodemon

### Frontend
- React
- Tailwind CSS
- React-DOM
- React-Icons
- React-Redux
- React-Router-DOM
- Vite 

## Prerequisites

- Node.js
- npm

## Usage Instructions

- **Home page** 
- Home Page is public for all users. On it, users can see the most recently added cats.

- **All Cats Page**
Page available for all users and it contains all the created cats.

- **Login Page**
- Login form requires email and password
  Form Validation:
the email should be in a valid email format

- **Register Page**
- Register form requires email, username, password and confirm password
  Form Validation:
the validation for the email is the same as in login.
confirm password should match with password which is checked by error handling from the server.

- **Create a Cat Page**
- Create Cat Page allows the logged in user to create their own offer that will be available in the all devices page and also the owner of that offer will be able to edit and delete the offer. There are 5 input fileds and each one of them have validation that was made by using yup. If an error occurs in the backend it is handled in the CatCreate component and will be shown as a message to the user. When the offer is successfully made the user will be automatically redirected to All cats page.

- **Cat Details Page**
- This page is available for all users they can see the characteristics of the device pluscomment section. If this page is opened by the owner of the device they will be able to see edit and delete buttons.

- **Cat Edit Page**
- This page is available for logged in users only that are the creator of the cat. It has all the same validators as the ones in the CatCreate component. Error handling is implemented there as well. If the edit is successful the user will be redirected to the details page od the edited cat.

- **Delete**
 - Users can delete their own listings.
  
## Summary

The Cat Blog project features routing, API integration, authentication, and dynamic UI updates. It includes a modular structure, custom hooks, and a service-oriented architecture.