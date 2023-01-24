/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('empty spec', () => {
  const task = '[data-cy=task]'
  const minutesAmount = '[data-cy=minutesAmount]'

  it('Visit the local host', () => {
    cy.visit('/')
  })

<<<<<<< HEAD
    cy.get('#header').click()

    // cy.get(task).should('not.have.text')
    // cy.get(minutesAmount).should('not.have.text')

    // cy.get(task).type('Fazer café')
    // cy.get(minutesAmount).type('1')
=======
  it('should not be able to start the countdown if the text and number input is empty', () => {
    cy.get(task).should('not.have.text')
    cy.get(minutesAmount).should('not.have.text')

    cy.contains('button', 'Começar').should('be.disabled')
  })

  it('should be able to type a text and time and start the countdown', () => {
    cy.get(task).type('Fazer café') // digo pra digitar
    cy.get(minutesAmount).type('1')

    cy.contains('button', 'Começar').should('not.be.disabled').click() // digo pra clicar no button
>>>>>>> b4c760ca2e1fab087caee6af83ca47d726b6f6c9

    // cy.contains('button', 'Começar').click()

    // cy.contains('button', 'Interromper')
  })

  it('Visit the history page', () => {
    cy.visit('http://localhost:5173/history')

    cy.contains('h1', 'Meu histórico')
  })
})
