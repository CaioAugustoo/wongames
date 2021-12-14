/// <reference path="../support/index.d.ts" />

import { createUser, User } from "../support/generate"

describe('Checkout', () => {
  let user: User = createUser()

  it.skip('should buy free games', () => {
    cy.visit("/sign-up")
    cy.shouldSignup({ ...user })

    cy.getByDataCy("Free to play").within(() => {
      cy.findAllByLabelText("Add to cart").first().should("exist").click()
    })

    cy.findAllByLabelText(/cart items/i).first().click()
    cy.findAllByText(/buy now/i).first().click()
    cy.findByText("Only free games, click buy and enjoy!").should("exist")
    cy.findByRole("button", { name: /buy now/i }).first().click()

    cy.findByText("Your purchase was successful!").should("exist")
  })
})
