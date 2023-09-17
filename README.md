# NestJS Application - CobbleWeb Assignment Backend and React

This is a full stack application built with Nextjs13, NestJS v10.0, PostgreSQL, and TypeORM. The application includes user registration, authentication with JWT tokens, and photo upload features.

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
3. Install concurrently
```
npm install
```
4. Install the dependencies for both client and server
```
npm run install-all
```
5. Rename the `.env.template` files to a `.env` and fill in your database details, AWS details and JWT SECRET for the server and the  API BASE URK for the client env file.

6. Start the application both client and server at the same time with concurrently
```
npm run start
```
The application api should now be running at http://localhost:3000 assuming you have created a db in your postgres instance and linked it in the env file. DB_NAME is the name of the database you created in postgres.

The client is accessible at http://localhost:5000

## Testing
To run the tests for server, use the following command:

```
npm run test
```

## API Endpoints
- **POST /api/register**: Register a new user. Requires first name, last name, email, password, and at least 4 photos.
- **POST /api/login**: Login with email and password. Returns a JWT token.
- **GET /api/users/me**: Get the authenticated user's details. Requires a valid JWT token in the Authorization header(Bearer Token).

## Client Endpoints localhost:5000
- **/register**: Register a new user. Requires first name, last name, email, password, and at least 4 photos.
- **/login**: Login with email and password. Redirects to profile page
- **/profile**: Get the authenticated user's details from the api. Displays a carousel of images uploaded by the user from registration.

## License
MIT