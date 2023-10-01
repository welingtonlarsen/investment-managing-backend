<div align="center">

# Investment Managing

![](https://img.shields.io/badge/Status-Development-blue)

</div>
<div align="center">

![](https://img.shields.io/badge/Autor-Welington%20Larsen-brightgreen)
![](https://img.shields.io/badge/Language-Typescript-brightgreen)
![](https://img.shields.io/badge/Framework-Nestjs-brightgreen)

</div>

## Description
My friends and I encountered a recurring issue every year when it came to sending our stock investment summary to our accountants. This predicament prompted me to develop a compact application that streamlines the process of generating a CSV report for submission to the accountant at the conclusion of each fiscal year of investment. Not only does this application simplify report creation, but it also provides the ability to input, list, and modify brokerage notes, fostering a more organized and efficient workflow.

## Features
- Create brokerage note
- List all brokerage notes
- Calculate annual CSV report

## Stack
- Nodejs
- Nestjs
- Reactjs
- MySQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test (API)

### Kinds

- End to end (e2e):
  - Located in `./test`.
  - Run the entire application.
  - Test the complete input/output flow.
- Integration tests:
  - Located inside modules directories.
  - Run the entire application.
  - Test external dependencies, like database.
- Unit tests :
  - Located inside modules directories.
  - Mock dependencies
  - Run functions and classes

### Commands

```bash
# unit tests
$ npm run test

# integration tests
$ docker-compose up -d
$ npm run test:int

# e2e tests
$ docker-compose up -d
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database migrations

Before generating a new migration, you must build your ts files into js files. To automatically build and generate a new migration based on our TypeORM entities, simply execute:

```bash
$ npm run migration:generate --filename=<NameOfTheMigration>
```

If you want to create a new migration empty migration, run:

```bash
$ npm run migration:create --filename=<NameOfTheMigration>
```

A migration file with .ts extension will be create in `src/migrations` folder.
