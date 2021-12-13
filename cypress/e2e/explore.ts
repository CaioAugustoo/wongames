/// <reference path="../support/index.d.ts" />

describe('Explore Page', () => {
  before(() => {
    cy.visit("/games")
  })

  it('should render filters columns', () => {
    cy.findByRole("heading", { name: /Sort by price/i }).should("exist")
    cy.findByRole("heading", { name: /^price/i }).should("exist")
    cy.findByRole("heading", { name: /platforms/i }).should("exist")
    cy.findByRole("heading", { name: /genres/i }).should("exist")

    // fields
    cy.findByLabelText("Free").should("exist")
    cy.findByLabelText("Under $50").should("exist")
    cy.findByLabelText("Under $100").should("exist")
    cy.findByLabelText("Under $150").should("exist")
    cy.findByLabelText("Under $250").should("exist")
    cy.findByLabelText("Under $500").should("exist")

    cy.findByLabelText("Windows").should("exist")
    cy.findByLabelText("Linux").should("exist")
    cy.findByLabelText("Mac OS").should("exist")

    cy.findByLabelText("Lowest to highest").should("exist")
    cy.findByLabelText("Highest to lowest").should("exist")

    cy.findByLabelText("Action").should("exist")
    cy.findByLabelText("Adventure").should("exist")
    cy.findByLabelText("Sports").should("exist")
    cy.findByLabelText("Puzzle").should("exist")
    cy.findByLabelText("Horror").should("exist")
    cy.findByLabelText("Platform").should("exist")
    cy.findByLabelText("Fantasy").should("exist")
    cy.findByLabelText("RPG").should("exist")
    cy.findByLabelText("JRPG").should("exist")
    cy.findByLabelText("Simulation").should("exist")
    cy.findByLabelText("Strategy").should("exist")
    cy.findByLabelText("Shooter").should("exist")
  })

  it("should show 15 games and show more games when show more is clicked", () => {
    cy.getByDataCy("game-card").should("have.length", 15)
    cy.findByRole("button", { name: /show more/i}).click()
    cy.getByDataCy("game-card").should("have.length", 30)
  })

  it("should filter lowest to highest price games and vice versa", () => {
    cy.findByLabelText("Lowest to highest").click()
    cy.url().should('include', '/games?sort=price%3Aasc')
    cy.getByDataCy("game-card").should("have.length", 15).first().findByText("Free")

    cy.findByLabelText("Highest to lowest").click()
    cy.url().should('include', '/games?sort=price%3Adesc')
    cy.getByDataCy("game-card").should("have.length", 15).first().findByText("$536.29")
  })
})
