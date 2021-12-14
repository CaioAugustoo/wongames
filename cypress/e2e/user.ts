/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate";

const user = createUser();

describe("User",() => {
  it("should signup", () => {
    cy.visit("/sign-up")
    cy.shouldSignup({ ...user })
  })

  it("should signin and signout", () => {
    cy.visit("/sign-in")
    cy.shouldSignin()

    cy.findByText("cypress").click()
    cy.findByText("Log out").click()
  })

  it.only("should signin the user and redirect to the page that it was defined previously", () => {

    cy.visit("/profile/me")
    cy.location("href").should("eq", `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`)

    cy.shouldSignin()
    cy.location("href").should("eq", `${Cypress.config().baseUrl}/profile/me`)

    cy.findByLabelText("User Name").should("exist").should("have.value", "cypress")
    cy.findByLabelText("Email").should("exist").should("have.value", "e2e@wongames.com")
  })
})
