import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is authenticated and on any page of the system', () => {
  cy.visit('/')
  cy.get("input[placeholder='Email']").type('test@example.com')
  cy.get("input[placeholder='Password']").type('1234')
  cy.contains('button', 'Login').click()
  cy.contains('h1', '¡Bienvenido!').should('be.visible')
})
Given('the user tries to access the system without authentication', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.visit('/')
})
When('the user clicks on the {string} button', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then(
  'the system should automatically redirect him\\/her to the login page',
  () => {
    cy.wait(1000) //for proper video creations
    cy.contains('h1', 'Login').should('be.visible')
    cy.get("input[placeholder='Email']").should('be.visible')
    cy.get("input[placeholder='Password']").should('be.visible')
    cy.get("button[type='submit']").should('be.visible')
  }
)
