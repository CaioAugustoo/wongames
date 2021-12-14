/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate";

const user = createUser();

describe("User",() => {
  it("should signup", () => {
    cy.visit("/sign-up")
    cy.shouldSignup({ ...user })
  })
})
