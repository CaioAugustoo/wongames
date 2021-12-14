/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate";

const user = createUser();

describe("User",() => {
  it.skip("should signup", () => {
    cy.visit("/sign-up")
    cy.shouldSignup({ ...user })
  })

  it("should signin and signout", () => {
    cy.visit("/sign-in")
    cy.shouldSignin()
  })
})
