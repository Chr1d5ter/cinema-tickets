# DWP Code Test - Chris Wilson ( Application ID number: 8486827 )

## Background Information

- Firstly, wasn't sure if you were allowed to use Typescript so I didn't use it. The solution would have been different as I would have coded to an interface rather an implementation.

## Environment

- This application was built and tested using node version 18.15.0
- It has a .node-version file that sets the version of node for the project so if you use [nodenv](https://github.com/nodenv/nodenv) you should be fine

## How to run the service

- Change into the project directory and then execute `cd cinema-tickets-javascript && npm install`
- To run once `npm start`
- To run in development mode ( continually reloading if a file changes ) run `npm run start:dev`
- To run tests `npm test`

## Other Considerations

- I had a look at npm DWP logging packages [@dwp/node-logger](https://www.npmjs.com/package/@dwp/node-logger) but this appears to be for http access logging. Normally I'd look at any packages that have been created by the official DWP team and utilise those as much as possible
