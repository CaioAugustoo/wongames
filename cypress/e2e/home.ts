/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home sections', () => {
    cy.visit('/')

    cy.get('.slick-slider').within(() => {
      cy.findByRole("heading", { name: 'Cyberpunk 2077' })
      cy.findByRole("heading", { name: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.'})
      cy.findByRole("link", { name: 'Buy now' })
    })
  })
})
