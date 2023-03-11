describe("login", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should successfully log into the app", () => {
    cy.get("h1").should("exist").should("contain", "DEGRANDE");
  });

  it("should successfully log out of the app", () => {
    cy.logout();

    cy.visit("http://localhost:3000/reservation");
    cy.get("h1").should("exist").should("contain", "Login");
  });
});
