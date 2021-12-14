/// <reference path="../support/index.d.ts" />

describe('Forgot Password', () => {
  it("should show error if password does not match", () => {
    cy.visit("/reset-password?code=1234567")

    cy.findByPlaceholderText(/^password/i).type("1234")
    cy.findByPlaceholderText(/confirm password/i).type("12345")

    cy.findByRole("button", { name: /Reset password/i }).should("exist").click()

    cy.findByText("confirm password does not match with password").should("exist")
  })

  it("should show error if code is invalid", () => {
    cy.intercept("POST", "**/auth/reset-password", res => {
      res.reply({
        status: 400,
        body: {
          error: "Bad Request",
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided.'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit("/reset-password?code=1234567")

    cy.findByPlaceholderText(/^password/i).type("123456")
    cy.findByPlaceholderText(/confirm password/i).type("123456")

    cy.findByRole("button", { name: /Reset password/i }).should("exist").click()
    cy.findByText("Incorrect code provided.").should("exist")
  })

  it("should fill the input and redirect to home page with the user signed in", () => {
    cy.intercept("POST", "**/auth/reset-password", {
      statusCode: 200,
      body: { user: { email: "cypress@wongames.com" } }
    })

    cy.intercept("POST", "**/auth/callback/credentials*", {
      statusCode: 200,
      body: { user: { email: "cypress@wongames.com" } }
    })

    cy.intercept("GET", "**/auth/session*", {
      statusCode: 200,
      body: { user: { name: "cypress", email: "cypress@wongames.com" } }
    })

    cy.visit("/reset-password?code=12345678910")

    cy.findByPlaceholderText(/^password/i).type("12345")
    cy.findByPlaceholderText(/confirm password/i).type("12345")

    cy.findByRole("button", { name: /Reset password/i }).should("exist").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/`)
    cy.findByText("cypress").should("exist")
  })
})
