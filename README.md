# my-stays-ui
This is a repository for the application ui: myStays.com

## How to develop on my-stays-ui

### Configuring the environment

Download and install the current LTS version of NodeJS from https://nodejs.org.
\
Minimum node version required is 16+ (16.13.1 ideally).

`npm` (Node Package Manager) is automatically installed with NodeJS.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`

Run all the tests and display details and coverage % for each file in the console

### `npm run lint`

Lists out lint errors in the console and auto fix the errors if, possible

### `npm run format`

Lists out Prettier format errors in the console and auto fixes the format, if possible

#### Linting and formatting will happen automatically with every commit you made on this repo.

### `npm run analyse`

Get visualizations of what’s in your production webpack bundle.\
Open [http://127.0.0.1:8888](http://127.0.0.1:8888) to view it in the browser.

## Docker commands to run in local

#### Build the Docker image

`docker build -t my-stays-ui .`

#### Run the Docker container

`docker run -e AUTH_SERVER_URI=http://172.17.0.4:9000 -e API_GATEWAY_URI=http://172.17.0.5:9192 -d -p 3000:80 --name my-stays-ui-app my-stays-ui`

NOTE : The ip in the url has to be replaced by the container ip of the respective containers. To get the container ip run the following command.

docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-name

eg:- docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' auth-server

if your backend apps still runs in localhost only, you can directly run this command

`docker run --env-file ./.env -d -p 3000:80 --name my-stays-ui-app my-stays-ui`



