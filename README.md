# NestJS Application - CobbleWeb Assignment Backend

This is a backend application built with NestJS v10.0, PostgreSQL, and TypeORM. The application includes user registration, authentication with JWT tokens, and photo upload features.

## Features
- **User Registration:** Users can register with their first name, last name, email, and password. The application also supports uploading multiple photos during registration.
- **User Authentication:** Users can authenticate using JWT tokens. The application uses Passport library for handling JWT tokens.
- **Photo Upload:** Users can upload multiple photos. Each photo is linked to the user who uploaded it. Uploaded photos are stored in AWS S3.

## Prerequisites
- Node.js
- PostgreSQL

## Installation
1. Clone the repository
```
git clone https://github.com/itskush/cobbleweb-backend.git
```
2. Navigate into the directory
```
cd cobbleweb-backend
```
3. Install the dependencies
```
npm install
```
4. Rename the `.env.template` file to a `.env` file and fill in your database details, AWS details and JWT SECRET.

5. Start the application
```
npm run start
```
The application should now be running at http://localhost:3000 assuming you have created a db in your postgres instance and linked it in the env file. DB_NAME is the name of the database you created in postgres.


## Testing
To run the tests, use the following command:

```
npm run test
```

## API Endpoints
- **POST /api/register**: Register a new user. Requires first name, last name, email, password, and at least 4 photos.
- **POST /api/login**: Login with email and password. Returns a JWT token.
- **GET /api/users/me**: Get the authenticated user's details. Requires a valid JWT token in the Authorization header(Bearer Token).

## License
MIT