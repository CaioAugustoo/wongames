/// <reference path="../support/index.d.ts" />

describe('Wishlist', () => {
  it('should add and remove in wishlist', () => {
    cy.visit("/sign-in")
    cy.shouldSignin()

    cy.getByDataCy("News").within(() => {
      cy.findAllByLabelText("Add to Wishlist").first().should("exist").click()
    })

    cy.findByText("cypress").click()
    cy.findAllByText("Wishlist").first().click()

    cy.findByLabelText("Remove from Wishlist").click()
    cy.findByText("Your wishlist is empty").should("exist")
  })
})
