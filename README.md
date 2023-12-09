# csc307-stuffex

[Check out our deployment!](https://white-flower-03a4c811e.4.azurestaticapps.net)

# Description

StuffEX is a full-stack application running a React.js frontend and an express backend, using MongoDB for persistant storage. To read about the product vision, check out [our about page](https://white-flower-03a4c811e.4.azurestaticapps.net/About).

# Contributing

Style Checker: Please run `npm run format` from the project root before committing changes.

Linter: Please follow default configurations of ESLint  
(Rules Reference: https://eslint.org/docs/latest/rules/ and Formatters Reference: https://eslint.org/docs/latest/use/formatters/)

# UI Prototype

Check out the [Figma boards](https://www.figma.com/file/Gy5IwCW3syWOpzQZmMxzYT/Untitled?type=design&node-id=0-1&mode=design) for UI prototypes. Last updated: 12-1-23

# Class Diagram

Here is our original [UML Diagram!] (https://github.com/KeithJLZ/csc307-stuffex/blob/main/diagram.md)

# Getting Started

After cloning the repository, navigate to the project root and run `npm install`.

## Frontend Setup

By default, the frontend will connect to the production backend server running on [Azure](https://stuffex.azurewebsites.net/). If you would like to run the frontend with your local development server, change the frontend's `AppConfig.js` such that `backendRoot` is set to `http://localhost:8000` (or whichever port/host you are running a dev server on).

## Backend Setup

To run the backend, you need to set two environment variables. Set `MONGODB_URI` to a connection string with credentials AND specify the stuffex database in the string. You must also set `TOKEN_SECRET` to a string used to hash passwords.

## Running

To run either the frontend or the backend, run `npm run start -w stuffex-frontend` and/or `npm run start -w express-backend`.

# Sprint Planning, Backlog, and Issues

Due to issues when setting up CI/CD, this is actually a fork of our original repo! Our project board is over there. [Check it out](https://github.com/users/joshuaSmith2021/projects/2/views/1)

# Component Test

https://github.com/KeithJLZ/csc307-stuffex/blob/component-test/packages/stuffex-frontend/src/App.test.js

# E2E Test

https://github.com/KeithJLZ/csc307-stuffex/blob/main/cypress/e2e/stuffex-e2e.cy.js
