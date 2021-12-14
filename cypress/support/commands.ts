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
import { User } from './generate'

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args)
})

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

Cypress.Commands.add("shouldRenderShowcase", ({ name, highlight = false }) => {
  cy.getByDataCy(name).within(() => {
    cy.findByRole("heading", { name }).should('exist')

    cy.getByDataCy("highlight").should(highlight ? "exist" : "not.exist")

    if(highlight) {
      cy.getByDataCy("highlight").within(() => {
        cy.findByRole("link", { name: "Buy now" }).should("have.attr", "href")
      })
    }

    cy.getByDataCy("game-card").should("have.length.gt", 3)
  })
})

Cypress.Commands.add("shouldSignup", ({ username, email, password }: User) => {
  cy.findByRole("heading", { name: /Sign Up/i }).should("exist")

  cy.findByPlaceholderText(/User Name/i).should("exist").type(username)
  cy.findByPlaceholderText(/Email/i).should("exist").type(email)
  cy.findByPlaceholderText(/^Password/i).should("exist").type(password)
  cy.findByPlaceholderText(/Confirm Password/i).should("exist").type(password)
  cy.findByRole("button", { name: /Sign Up now!/i }).should("exist").click()

  cy.url().should("eq", `${Cypress.config().baseUrl}/`)
  cy.findByText(username).should("exist")
})

Cypress.Commands.add("shouldSignin", (user: User) => {
  cy.findByPlaceholderText(/Email/i).should("exist").type(user?.email || "e2e@wongames.com")
  cy.findByPlaceholderText(/^Password/i).should("exist").type(user?.password || "123456")
  cy.findByRole("button", { name: /Sign In now!/i }).should("exist").click()
  cy.findByText( user?.username || "cypress").should("exist")

  cy.url().should("eq", `${Cypress.config().baseUrl}/`)

  cy.findByText(user?.username || "cypress").click()
  cy.findByText("Log out").click()
})
