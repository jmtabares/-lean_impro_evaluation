import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('the user is on the login page', () => {
  cy.visit('/')
})

When('the user enters a valid email and password', () => {
  cy.get("input[placeholder='Email']").type('test@example.com')
  cy.get("input[placeholder='Password']").type('1234')
})

When('the user enters an incorrect email and a correct password', () => {
  cy.get("input[placeholder='Email']").type('wrong@example.com')
  cy.get("input[placeholder='Password']").type('1234')
})

When('the user enters a correct email and an incorrect password', () => {
  cy.get("input[placeholder='Email']").type('test@example.com')
  cy.get("input[placeholder='Password']").type('wrongpassword')
})

When('the user enters an incorrect email and an incorrect password', () => {
  cy.get("input[placeholder='Email']").type('wrong@example.com')
  cy.get("input[placeholder='Password']").type('wrongpassword')
})

When(
  'the user leaves the email field empty and enters a correct password',
  () => {
    cy.get("input[placeholder='Email']").clear()
    cy.get("input[placeholder='Password']").type('1234')
  }
)

When(
  'the user enters a correct email and leaves the password field empty',
  () => {
    cy.get("input[placeholder='Email']").type('test@example.com')
    cy.get("input[placeholder='Password']").clear()
  }
)

When('the user leaves both the email and password fields empty', () => {
  cy.get("input[placeholder='Email']").clear()
  cy.get("input[placeholder='Password']").clear()
})

When('the user clicks on the {string} button', (buttonText: string) => {
  cy.contains('button', buttonText).click()
})

Then('the system should redirect him\\/her to the welcome page', () => {
  cy.contains('h1', '¡Bienvenido!').should('be.visible')
})

Then(
  'the system should display an error message stating {string}',
  (message: string) => {
    cy.contains(message).should('be.visible')
  }
)

Then(
  'the system should display a message stating that the field {string} is required',
  (field: string) => {
    const placeholder = field === 'email' ? 'Email' : 'Password'
    cy.wait(1000) //for proper video creations
    cy.get(`input[placeholder='${placeholder}']`).then(($input) => {
      cy.wait(1000) //for proper video creations
      const inputElement = $input[0] as HTMLInputElement
      inputElement.setCustomValidity('Please fill out this field.')
      inputElement.reportValidity()
      expect(inputElement.validationMessage).to.equal(
        'Please fill out this field.'
      )
    })
  }
)

Then(
  'the system should display a message stating that the fields are required',
  () => {
    cy.get("input[placeholder='Email']").then(($input) => {
      const inputElement = $input[0] as HTMLInputElement
      inputElement.focus()
      inputElement.reportValidity()
      expect(inputElement.validationMessage).to.not.be.empty
    })
  }
)
