
## Project Structure

```
Backend/
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoute.js
├── services/
│   └── userServices.js
├── .env
├── .gitignore
├── app.js
├── db.js
└── package.json
```

## Installation

1. Clone the repository.
2. Navigate to the `Backend` directory.
3. Install the dependencies using `npm install`.

```sh
cd Backend
npm install
```

4. Create a `.env` file in the Backend directory and add the following environment variables:

```
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017
JWT_SECRET=uberclone123
```

5. Start the server using `npm start`.

```sh
npm start
```

## File Descriptions

### `userModel.js`

Defines the Mongoose schema and model for the user. Includes methods for generating authentication tokens, comparing passwords, and hashing passwords.

### userController.js

Contains the controller for user-related operations. Includes the `registerUser` function which handles user registration.

### `userRoute.js`

Defines the routes for user-related operations. Includes a route for user registration with validation using `express-validator`.

### `userServices.js`

Contains the service for user-related operations. Includes the `createUser` function which handles the creation of a new user.

## API Endpoints

### Register User

- **URL:** `/user/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "hashed_password"
    },
    "token": "jwt_token"
  }
  ```

## License

This project is licensed under the MIT License.
```


