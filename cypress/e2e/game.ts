/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  it('should render game sections', () => {
    cy.visit('/game/cyberpunk-2077')

    // Wait page load
    cy.wait(4500)

    cy.getByDataCy("game-info").within(() => {
      cy.findByRole("heading", { name: "Cyberpunk 2077" }).should("exist")
      cy.findByText(/^Cyberpunk 2077 is an open-world, action-adventure story set in Night Cit/i)
      cy.findByText("$199.90").should("exist")
      cy.findByRole("button", { name: 'Add to cart' }).should("exist")
    })

    // gallery
    cy.findAllByRole("button", { name: /thumb \-/i }).should("have.length.gt", 0)
  })
})
