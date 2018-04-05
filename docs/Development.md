# Development 

This document explains the development details and workflow for each application.

## API

The api represents the backbone of Sounds Social. It's an app that exposes a graphql endpoint where data can be changed and read.

* [Meteor](https://www.meteor.com/)
* [MongoDB](https://www.mongodb.com)
* [GraphQL](https://www.graphql.com/)
* [Apollo](https://www.apollographql.com/)

* Go into `code/api` directory
* Run `npm run dev`
* Open `localhost:3000/graphiql` in the browser to see the GraphiQL interface

### Testing

Testing is done with mocha and `.test.js` files. Check `imports/lib/resolvePromiseForCallback.test.js` as an example.
Tests can be run with `npm run test`.

## Web

The simple, responsive web app.

* [Webpack](https://webpack.js.org/)
* [Vue](https://vuejs.org/)
* [Apollo](https://www.apollographql.com/)

* Go into `code/api` directory
* Run `npm run dev`
* The app should automatically open in the browser

### Designing UI components

[Storybook](https://storybook.js.org/) as the UI explorer is used to design and test
new UI components. It also makes it easy to explore the component library for new devs.

* Run `npm run storybook`
* Open `localhost:6006` in the browser to explore

### Testing

Jest is used to do unit testing.

* Run `npm run unit` for single execution
* Or `npm run unit-watch` for watch mode

### Linting

By running `npm run lint` the source code can be linted against deviations from the coding style (eslint).

Prettier is used to provide a `format` command that automatically formats the code. There are git hooks on
pre commit to make the process automatic.
