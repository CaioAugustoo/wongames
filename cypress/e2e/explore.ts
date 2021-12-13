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

  it("should filter games by price", () => {
    cy.findByLabelText("Free").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=0')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("Free")

    cy.findByLabelText("Under $50").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=50')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("$50.00")

    cy.findByLabelText("Under $100").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=100')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("$96.18")

    cy.findByLabelText("Under $150").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=150')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("$149.90")

    cy.findByLabelText("Under $250").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=250')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("$200.09")

    cy.findByLabelText("Under $500").click()
    cy.url().should('include', '/games?sort=price%3Adesc&price_lte=500')
    cy.wait(500)
    cy.getByDataCy("game-card").should("have.length.at.least", 2).first().findByText("$275.39")
  })

  it("should filter by platform and genre", () => {
    cy.findByLabelText("Windows").click()
    cy.url().should('contain', 'platforms=windows')

    cy.findByLabelText("Linux").click()
    cy.url().should('contain', 'platforms=linux')

    cy.findByLabelText("Mac OS").click()
    cy.url().should('contain', 'platforms=mac')

    cy.findByLabelText("Puzzle").click()
    cy.url().should('contain', 'categories=puzzle')
  })

  it("should render empty search if no games match", () => {
    cy.visit("/games")

    cy.findByLabelText("Linux").click()
    cy.findByLabelText("Sports").click()

    cy.findByText("We didn't find any games with this filter").should("exist")
  })
})
