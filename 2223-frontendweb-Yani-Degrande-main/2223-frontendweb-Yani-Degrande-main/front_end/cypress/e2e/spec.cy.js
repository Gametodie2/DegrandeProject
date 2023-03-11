describe("Visit my website", () => {
  beforeEach(() => {
    cy.login();
  });
  it("draait de applicatie", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("exist");
  });
});
