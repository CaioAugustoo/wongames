/// <reference path="../support/index.d.ts" />



describe("User",() => {
  it("should signup", () => {
    cy.visit("/sign-up")

    cy.shouldSignup()
  })
})
