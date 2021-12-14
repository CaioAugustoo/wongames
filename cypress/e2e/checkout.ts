/// <reference path="../support/index.d.ts" />

import { createUser, User } from "../support/generate"

describe('Checkout', () => {


  it('should buy free games', () => {
    let user: User = createUser()
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

  it("should buy paid games", () => {
    let user: User = createUser()
    cy.visit("/sign-up")
    cy.shouldSignup({ ...user })

    cy.getByDataCy("News").within(() => {
      cy.findAllByLabelText("Add to cart").first().should("exist").click()
    })

    cy.findAllByLabelText(/cart items/i).first().click()
    cy.findAllByText(/buy now/i).first().click()

    cy.fillElementsInput('cardNumber', '4242424242424242');
    cy.fillElementsInput('cardExpiry', '1025'); // MMYY
    cy.fillElementsInput('cardCvc', '123');

    cy.findByRole("button", { name: /buy now/i }).first().click()

    cy.wait(1000)
    cy.findByText("Your purchase was successful!").should("exist")
  })
})
