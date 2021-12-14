/// <reference path="../support/index.d.ts" />

describe("User",() => {
  it("should signup", () => {
    cy.visit("/sign-up")

    cy.findByRole("heading", { name: /Sign Up/i }).should("exist")
    cy.findByPlaceholderText(/User Name/i).should("exist").type("cypress")
    cy.findByPlaceholderText(/Email/i).should("exist").type("e2e@gmail.com")
    cy.findByPlaceholderText(/^Password/i).should("exist").type("cypress-password")
    cy.findByPlaceholderText(/Confirm Password/i).should("exist").type("cypress-password")
    cy.findByRole("button", { name: /Sign Up now!/i }).should("exist").click()
  })
})
