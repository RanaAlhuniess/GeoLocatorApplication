# Geolocation Finder Application

This full-stack application enables users to input an address in a React.js frontend. The Node.js backend handles
address validation, checks if the address's geolocation data is stored in the database, and if not, fetches it from a
third-party API. Additionally, it includes a feature to email the geolocation results from the frontend.

## Backend Repository

This repository contains the backend code for the Geolocation Finder application.

# Technologies Used

- Node.js
- Express.js
- TypeScript
- Postgresql
- Prisma

# Features

* **API Endpoint:** Handles requests from the frontend.
* **Email Functionality:** Allows users to email the geolocation results using Nodemailer.

-----------
## Live Deployment
The Geolocation Finder application is live and accessible at the following URL:

[Live Geolocation Finder Backend](https://geolocator-app.onrender.com)
-----------

# Setup Instructions

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.17.0 or higher
  To get the Node server running locally:
- Clone the repository
    ```
    git clone  <git hub template url> <project_name>
    ```
- Switch to the repo folder
    ```
   cd <project_name>
  ```
- Install dependencies
  ### `npm install`
- Configure the database connection and third-party API keys
  Copy the example env file and make the required configuration changes in the .env file
    ```
     cp .env.example .env
  ```
- Apply Migration
  ### `npx prisma migrate deploy`
  Make sure you set the correct database connection information before running the migrations Environment variables
- Run the backend server using
  ### `npm run dev`

Runs the app in the development mode.\
You can now access the server at  [http://localhost:8000](http://localhost:8000).

**TL;DR command list**

```
git clone https://github.com/RanaAlhuniess/GeoLocatorApplication
cd GeoLocatorApplication
npm install
cp .env.example .env
npx prisma migrate deploy
npm run dev
```

-----------
# APIs
## Get Geolocation by Address
This API endpoint enables users to retrieve geolocation data by providing an address. If the address is found in the database, the geolocation data is fetched directly. However, if the address is not found, the application fetches the geolocation data from a third-party service (Mapbox), saves it in the database for future reference, and returns the geolocation data to the user.
**Endpoint**

 `POST /addresses/search`
 **Request**

 The request should include a JSON object containing the address details in the request body.
 
- Request Body
```json
{
    "address": "Kafar Sousah",
    "email": "test@test.com",
    "sendEmail": true
}

```
***Note*** : sendEmail property is optional
**Response**
```json
{
  "address": "Kafar Sousah",
  "latitude": 51.466667,
  "longitude": 19.65
}
```
Upon successful retrieval of the geolocation data, the API returns a JSON response containing the address details and corresponding geolocation information.

Success Response

-----------
# Code overview

## Essential Dependencies
The Geolocation Finder application relies on several essential dependencies. Ensure these packages are installed using npm or yarn to run the application successfully:
- **node-geocoder**
- Description: Type definitions for Node.js geocoding library, facilitating strong typing in development.
- [More information](https://www.npmjs.com/package/@types/node-geocoder)
- **inversify**
    - Description: Inversify is a powerful and lightweight inversion of control (IoC) container for JavaScript & Node.js apps.
    - [More information](https://github.com/inversify/InversifyJS)
- **pg**
    - Description: PostgreSQL client for Node.js.
    - [More information](https://www.npmjs.com/package/pg)
- **@prisma/client**
    - Description: Prisma client provides database access and query capabilities.
    - [More information](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)
      Ensure that these dependencies are properly installed by running `npm install` or `yarn install` in the respective backend or frontend directories, depending on where they are required.
- **nodemailer**
    - Description: Nodemailer is a module for Node.js applications that allows email sending.
    - [More information](https://nodemailer.com/about/)
- **winston**
    - Description: Winston is a versatile logging library for Node.js.
    - [More information](https://github.com/winstonjs/winston)
- **node-geocoder**
    - Description: Node-geocoder is a geocoding library for Node.js, providing easy access to various geocoding services.
    - [More information](https://www.npmjs.com/package/node-geocoder)


## Project Structure

The folder structure of this app is explained below:

| Name             | Description                                                                                      |
|------------------|--------------------------------------------------------------------------------------------------|
| **node_modules** | Contains all  npm dependencies                                                                   |
| **config**       | Application configuration including inversify, exception, logger and server configs              
| **controllers**  | Controllers define functions to serve various express routes.                                    
| **dtos**         | Data Transfer Objects (DTOs)                                                                     
| **entities**     | Entities representing data structures                                                            
| **middleware**   | Middleware for handling requests including validate body request                                 |
| **repositories** | Repositories for data access                                                                     |
| **services**     | Contain all business logic for the Application                                                   |
| server.js        | Entry point to express app                                                                       |
| package.json     | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) | tsconfig.json            | Config settings for compiling source code only written in TypeScript    

-----------

# Future Consideration:

## Background Job for Email Sending

The current implementation (for faster implementation) of the email service allows asynchronous sending to prevent blocking the API during email
transmission. However, as a future enhancement, the application aims to optimize email sending by implementing a
background job approach.
**Sending Emails in Background Jobs**

To further improve the efficiency of the application, a plan is in place to leverage background job processing for
sending emails. By offloading the email sending process to a background job or a task queue system, the API's
responsiveness and scalability can be significantly improved. This enhancement would separate the email sending task
from the main API flow, ensuring smoother performance during high traffic or heavy usage periods.

## Adoption of Generic Email Content Template

As part of ongoing development efforts, there's a plan to enhance the email content retrieval process by implementing a
generic template strategy.
**Utilizing Generic Email Content Template**
The application intends to refactor the email content retrieval mechanism to use a generic template for composing email
content. By adopting a template-based approach, the application standardizes the structure and formatting of various
email notifications. This refactoring aims to streamline the management and customization of email content, facilitating
easier modification and maintenance in the future.