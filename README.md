# TeamMeUp

This project requires a running json-server at localhost:3000 with the following object structure:

{
  "teams": [
    {
      "id": 1,
      "name": "Team 1",
      "members": [
      ],
      "color": "#a8e6cf"
    }
  ],
  "members": [
    {
      "id": 1,
      "name": "Player 1",
      "active": true,
      "color": "#a8e6cf",
      "team": 1,
      "image": ""
    }
  ],
  "settings": {
    "oneAgainstAll": false,
    "groups": true,
    "numberOfTeams": 5,
    "members": false,
    "numberOfMembers": 6,
    "colored": true
  }
}

The Teams will be generated but you can prepare some users. the color and team property will be set on team generation so you can leave them empty. The image contains the base64 of an image you can upload during member creation. I recommend creating all data with the application to avoid inconsistencies.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
