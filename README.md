# README

This README provides instructions for using the ticket-purchase-service with Docker or by installing Prisma using npm.

## Description

This project allows authorized users to purchase tickets and allows public users to view all available tickets. To make a purchase, users need to register first.

This project allows authorized users to purchase tickets and allows public users to view all available tickets. To make a purchase, users need to register first.

## Docker

To use the ticket-purchase-service with Docker, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project.
4. Build the Docker image by running the following command:

```
docker-compose up --build

```

6. The ticket-purchase-service will now be accessible at `http://localhost:3000`.

## NPM Install

To install using npm, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run the following command to install the required dependencies:

```
npm install
```

4. Once the dependencies are installed, you can start the ticket-purchase-service by running the following command:

```
npm run start:dev
```

5. The ticket-purchase-service will now be accessible at `http://localhost:3000`.

## Unit Testing

To run unit tests for the ticket-purchase-service, follow these steps:

1. Clone the repository to your local machine if you haven't already.
2. Navigate to the root directory of the project.
3. Run the following command to execute the unit tests:

```
npm run test
```

4. The unit tests will now be executed, and you will see the test results in the console.

## API Documentation

## Sample db file in the repository
