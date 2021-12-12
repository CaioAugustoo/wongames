/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom comand to visit Google Page
     * @example cy.google()
     */
    google(): Chainable<Window>,
    /**
     * Custom comand to render banner
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): void
  }
}
