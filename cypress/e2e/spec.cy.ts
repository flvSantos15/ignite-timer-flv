/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('empty spec', () => {
  const task = '[data-cy=task]'
  const minutesAmount = '[data-cy=minutesAmount]'

  it('Visit the local host', () => {
    cy.visit('/')
    cy.contains('button', 'Começar').should('be.disabled').wait(3000)
  })

  it('Should change from dark to light color', () => {
    cy.get('#taskLabel')
      .should('have.css', 'color')
      .and('equal', 'rgb(225, 225, 230)')
      .wait(3000)

    cy.get('#toggle').click().wait(3000)

    cy.get('#taskLabel')
      .should('have.css', 'color')
      .and('eq', 'rgb(50, 50, 56)')
      .wait(3000)
  })

  it('should not be able to start the countdown if the text and number input is empty', () => {
    cy.get(task).should('not.have.text')
    cy.get(minutesAmount).should('not.have.text')

    cy.contains('button', 'Começar').should('be.disabled').wait(3000)
  })

  it('should be able to type a text and time and start the countdown', () => {
    cy.get(task).type('Fazer café') // digo pra digitar
    cy.wait(1000)
    cy.get(minutesAmount).type('1')
    cy.wait(1000)

    cy.contains('button', 'Começar').should('not.be.disabled').click() // digo pra clicar no button
    cy.wait(2000)
    cy.contains('button', 'Interromper').click()
    cy.wait(2000)
  })

  it('Visit the history page', () => {
    cy.get('#history').click()
    cy.wait(1000)

    cy.contains('h1', 'Meu histórico')
  })

  it('Should go back to the home page', () => {
    cy.get('#timer').click()
    cy.wait(1000)

    cy.contains('button', 'Começar').should('be.disabled').wait(3000)
  })
})
