/// <reference path="../support/index.d.ts" />

describe('Home Page', () => {
  it('should render home sections', () => {
    cy.visit('/')
    cy.shouldRenderBanner()

    cy.shouldRenderShowcase({
      name: "News"
    })
    cy.shouldRenderShowcase({
      name: "Most popular",
      highlight: true,
    })
    cy.shouldRenderShowcase({
      name: "Recommended for you",
    })
    cy.shouldRenderShowcase({
      name: "Free to play",
      highlight: true,
    })
  })
})
