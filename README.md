Next application created to solve a problem of Secret santa players distribution.

## How to develop it

- Clone this repo
- Run `npm run install` to install all the dependencies.
- Run `npm run dev` to start development server.

Application will start at http://localhost:3000

## How to use production build

- Instead of `npm run dev` use `npm run build` to create production build
- Run `npm run start` to start production build server

## Details

Application uses husky and prettier to prettify code. You can do it manually running `npm run prettify` or
it will be executed automatically on `git commit`

The idea of application is to implement logic that can split players into pairs as randomly as possible in one iteration.

`src/controllers/santa/santaController.ts` is the place where most of the logic stored
