# Klasserom

_Et nettbasert applikasjon for å organisere klasserommet._

## How to run this application

You need:

- Node v10.16.3 or higher (recommended)
- Mysql

## Run the application locally

After cloning the repository, you can run the application locally with:

- cd into the both folder _/api_ and _/client_ foldiers
- run the following command to install all the dependencies:

`npm install `

### Set up the database

Create a database called _klasserom_ in mysql

_ cd to /api_

create .env file in the _/api_ folder with the variables:

PORT=8080 or prefered port
JWT_SECRET="secret"
DATABSE="mysql://user:password@localhost:3306/klasserom"

_replace user and password with your mysql user and password_

\_ run the following command to set up the database:
`npx prisma generate`
`npx prisma db push`

#### Populate the database

_ cd to /api_
\_ run the following command to populate the database:
`npx prisma db seed`

_This creates an admin user with username name "admin" and password "admin"_

#### Start the application

for the server to start you need to run the following command:
cd into _/api_
`node server.js`

for the client to start you need to run the following command:
cd into _/client_
`npm start`

_Log inn as as admin and create a teacher user to use the application_
