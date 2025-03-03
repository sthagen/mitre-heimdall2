/// <reference types="cypress" />

import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector';
import 'cypress-wait-until';
import RegistrationPage from '../support/pages/RegistrationPage';
import DatabaseHelper from './helpers/DatabaseHelper';

installLogsCollector();

const databaseHelper = new DatabaseHelper();

beforeEach(function () {
  // This mocks the 'check for updates' functionality to avoid
  // 403 errors on testing
  cy.intercept('https://api.github.com/repos/mitre/heimdall2/tags', [
    {
      name: 'v9.9.9'
    }
  ]);

  databaseHelper.clear();
});

// There seems to be an issue with v-slide-group that causes it to throw
// "Uncaught TypeError: Cannot read property 'getBoundingClientRect' of undefined"
// On a null-obj
Cypress.on('uncaught:exception', (err) => {
  // Return false if the error message includes `getBoundingClientRect`
  return !err.message.includes('getBoundingClientRect');
});

Cypress.Commands.add('login', ({email, password}) => {
  cy.get('input[name=email]').clear();
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').clear();
  cy.get('input[name=password]').type(password);
  cy.get('#login_button').click();
});

Cypress.Commands.add('register', (user) => {
  const registrationPage = new RegistrationPage();

  registrationPage.register(user);
});
