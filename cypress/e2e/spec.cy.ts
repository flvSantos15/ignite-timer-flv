/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('empty spec', () => {
  const task = '[data-cy=task]'
  const minutesAmount = '[data-cy=minutesAmount]'

  it('Visit the local host', () => {
    cy.visit('/')

    // Given user visits the main page
    // When they type a task and a timer amount
    // Then the button should be clicable
    cy.get(task).should('not.have.text')
    cy.get(minutesAmount).should('not.have.text')

    cy.get(task).type('Fazer café')
    cy.get(minutesAmount).type('1')

    cy.contains('button', 'Começar').click()

    cy.contains('button', 'Interromper')
  })

  // it('Visit the history page', () => {
  //   cy.visit('http://localhost:5173/history')

  //   cy.contains('h1', 'Meu histórico')
  // })
})

// Given a user visits https://example.cypress.io
// When they click the link labeled type
// And they type "fake@email.com" into the .action-email input
// Then the URL should include /commands/actions
// And the .action-email input has "fake@email.com" as its value
