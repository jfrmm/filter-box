# ALTER SOLUTIONS PORTUGAL - Filter Box

> **Filter Box** is an Angular package developed by ALTER SOLUTIONS PORTUGAL. It has been developed using Angular 8.0.

## Table of Contents
- [Getting started](#getting-started)
  - [Configure environment](#configure-environment)
    - [Docker](#docker)
  - [Install](#install)
    - [Build the package](#build-the-package)
- [Unit Testing](#unit-testing)
- [Developing and running this demo app](#developing-and-running-this-demo-app)
  - [Library access points](#library-access-points)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
  - [Package generation not working](#package-generation-not-working)
  
## Getting started

The following instructions are guidelines for a development environment based on Docker.

### Configure environment

#### Docker

There's a customized Docker environment available for the project.

To start using it, in the project root run

```
git submodule init
git submodule update
```

### Install

Start by downloading and installing dependencies.

```shell
npm install
```

#### Build the package

You can now build the filter box package by running:

```shell script
ng build filter-box-library [--watch]
```

This outputs an angular package to `dist/filter-box-library`

> Adding the `--watch` flag will make it so that when you make changes to the library, angular-cli will rebuild the package, to make it available to your application. 

## Unit Testing

There are unit tests that you can run.

```shell script
ng test filter-box-library
```

> See also [Karma](https://karma-runner.github.io).

## Developing and running this demo app

Follow the development guidelines and standards found in [Angular](https://angular.io).
To run this project in a development environment simply run:

```shell script
ng serve
```

### Library access points

The public-api.ts file defines what is available for the consumers. Use a NgModule to expose services and components. A consumer of the library should be able to access public functionality through a single import path.

## Contributing

Please follow our contributing guide in [CONTRIBUTING.md](CONTRIBUTING.md)

## Troubleshooting

### Package generation not working

Sometimes the angular-cli will not generate our package when it has been ran a long time ago. usually removing the `dist` folder solves this problem.
