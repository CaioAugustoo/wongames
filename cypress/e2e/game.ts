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

    // content
    cy.getByDataCy("content").within(() => {
      cy.findByRole("heading", { name: "Description" }).should("exist")
    })

    cy.getByDataCy("content").children().should("have.length.at", 2)

    // details
    cy.getByDataCy("game-details").within(() => {
      cy.findByRole("heading", { name: "Game details" }).should("exist")

      cy.findByRole("heading", { name: "Developer" }).should("exist")

      cy.findByRole("heading", { name: "Release Date" }).should("exist")
      cy.findByText(/Dec 8, 2020/i)

      cy.findByRole("heading", { name: "Platforms" }).should("exist")
      cy.findByTitle(/Windows/i)

      cy.findByRole("heading", { name: "Publisher" }).should("exist")
      cy.findAllByText(/CD PROJEKT RED/i).should("have.length.at", 1)

      cy.findByRole("heading", { name: "Rating" }).should("exist")
      cy.findByText(/FREE/i)

      cy.findByRole("heading", { name: "Genres" }).should("exist")
      cy.findByText("Action / Role-playing / Sci-fi")
    })

    // showcase
    cy.shouldRenderShowcase({
      name: "Recommended for you"
    })
  })
})
