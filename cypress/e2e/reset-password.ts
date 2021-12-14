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
})
