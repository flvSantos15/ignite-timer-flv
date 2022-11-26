/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('empty spec', () => {
  const task = '[data-cy=task]'
  const minutesAmount = '[data-cy=minutesAmount]'

  it('Visit the local host', () => {
    cy.visit('/')

    cy.get('#header').click()

    // cy.get(task).should('not.have.text')
    // cy.get(minutesAmount).should('not.have.text')

    // cy.get(task).type('Fazer café')
    // cy.get(minutesAmount).type('1')

    // cy.contains('button', 'Começar').click()

    // cy.contains('button', 'Interromper')
  })

  // it('Visit the history page', () => {
  //   cy.visit('http://localhost:5173/history')

  //   cy.contains('h1', 'Meu histórico')
  // })
})
