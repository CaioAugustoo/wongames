/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom comand to visit Google Page
     * @example cy.google()
     */
    google(): Chainable<Window>,
    /**
     * Custom comand to get by data-cy value
     * @example cy.getByDataCy('selector')
     */
     getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>,
    /**
     * Custom comand to render banner
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): void,
    /**
     * Custom comand to render showcase
     * @example cy.shouldRenderShowcase()
     */
     shouldRenderShowcase(attrs: ShowcaseAttributes): void
  }
}
