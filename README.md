# Module Federation with Webpack 5 in React

This repo uses Webpack5 Module Federation plugin to build a React microfrontend

## Get started

To run the project, in the root of the repo, run

```shell
yarn install
yarn start
```

Then go to http://localhost:3000

## How it works

Host is the shell app which imports Remote1. Host is hosted on port 3000.

Remote1 is hosted port 3001 and exposes RemoteCounter
