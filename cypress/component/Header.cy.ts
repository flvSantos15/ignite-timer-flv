/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('<Header>', () => {
  before(() => {
    cy.visit('http://localhost:5173')
  })

  it('mounts', () => {
    // cy.mount(<Header />)
    // mount(<Header />)
    cy.get('#header').contains('Hello world')
  })
})

// import Stepper from './Stepper'

// describe('<Stepper>', () => {
//   it('mounts', () => {
//     cy.mount(<Stepper />)
//   })
// })
