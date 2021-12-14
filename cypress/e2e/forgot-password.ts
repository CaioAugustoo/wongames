/// <reference path="../support/index.d.ts" />

describe('Forgot Password', () => {
  it('should fill the inputs and receive a success message', () => {
    cy.intercept("POST", "**/auth/forgot-password", res => {
      res.reply({
        status: 200,
        body: { ok: true }
      })

      expect(res.body.email).to.eq("cy@wongames.com")
    })

    cy.visit("/forgot-password")

    cy.findAllByPlaceholderText(/email/i).type("cy@wongames.com")
    cy.findByRole("button", { name: /send email/i }).click()

    cy.findByText("Email sent!").should("exist")
  })

  it("should fill the input with invalid email and receive an error", () => {
    cy.intercept("POST", "**/auth/forgot-password", res => {
      res.reply({
        status: 400,
        body: {
          error: "Bad Request",
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit("/forgot-password")

    cy.findAllByPlaceholderText(/email/i).type('cy@wongames.com')
    cy.findByRole('button', { name: /send email/i }).click()


    cy.findByText(/This email does not exist/i).should('exist')
  })
})
