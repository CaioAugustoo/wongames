/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home sections', () => {
    cy.visit('/')

    cy.get('.slick-slider').within(() => {
      cy.findByRole("heading", { name: 'Cyberpunk 2077' })
      cy.findByRole("heading", { name: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.'})
      cy.findByRole("link", { name: 'Buy now' })

      cy.get('.slick-dots > :nth-child(2) > button').click()
      cy.wait(500)

      cy.findByRole("heading", { name: 'Horizon Zero Dawn™ Complete Edition' })
      cy.findByRole("heading", { name: 'EARTH IS OURS NO MORE Experience Aloy’s entire legendary quest to unravel the mysteries of a world ruled by deadly Machines.'})
      cy.findByRole("link", { name: 'Buy now' })

      cy.get('.slick-dots > :nth-child(3) > button').click()
      cy.wait(500)

      cy.findByRole("heading", { name: 'The Witcher 3: Wild Hunt - Game of the Year Edition' })
      cy.findByRole("heading", { name: 'This game is part of your Welcome Offer!'})
      cy.findByRole("link", { name: 'Buy now' })
    })
  })
})
