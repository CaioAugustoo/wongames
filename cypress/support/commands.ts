// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: 'Cyberpunk 2077' })
    cy.findByRole('heading', {
      name: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.'
    })
    cy.findByRole('link', { name: 'Buy now' })

    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: 'Horizon Zero Dawn™ Complete Edition' })
    cy.findByRole('heading', {
      name: 'EARTH IS OURS NO MORE Experience Aloy’s entire legendary quest to unravel the mysteries of a world ruled by deadly Machines.'
    })
    cy.findByRole('link', { name: 'Buy now' })

    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)

    cy.findByRole('heading', {
      name: 'The Witcher 3: Wild Hunt - Game of the Year Edition'
    })
    cy.findByRole('heading', {
      name: 'This game is part of your Welcome Offer!'
    })
    cy.findByRole('link', { name: 'Buy now' })
  })
})

Cypress.Commands.add("shouldRenderShowcase", ({name, highlight = false}) => {
  cy.get(`[data-cy="${name}"]`).within(() => {
    cy.findByRole("heading", { name }).should('exist')
  })
})
