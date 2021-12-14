/// <reference path="../support/index.d.ts" />

describe('Cart', () => {
  it('should add and remove items from cart', () => {
    cy.visit("/")

    cy.getByDataCy("Free to play").within(() => {
      cy.findAllByRole("button").first().should("exist").click()
    })

    cy.findAllByLabelText(/cart items/i).first().should("have.text", 1)

    cy.findAllByLabelText(/cart items/i).first().click()
    cy.findByText("Remove").click()

    cy.findAllByLabelText(/cart items/i).should("not.exist")
    cy.findByRole("heading", { name: /Your cart is empty/i }).should("exist")
  })
})
