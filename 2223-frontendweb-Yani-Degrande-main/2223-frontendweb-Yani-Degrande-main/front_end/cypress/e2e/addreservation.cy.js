describe("Add reservation test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("add reservation test", () => {
    cy.visit("http://localhost:3000/reservation");

    cy.get("[data-cy=people_input]").type("2");
    cy.get("[data-cy=date_input]").type("2021-12-12T10:00:00");
    cy.get("[data-cy=ticket_type_basic]").check();

    cy.get("[data-cy=submit_reservation]").click();
  });

  it("foutieve datum", () => {
    cy.visit("http://localhost:3000/reservation");

    cy.get("[data-cy=people_input]").type("15");
    cy.get("[data-cy=date_input]").type("2021-12-12T10:00:00");
    cy.get("[data-cy=ticket_type_basic]").check();

    cy.get("[data-cy=submit_reservation]").click();

    cy.get("[data-cy=labelinput-error]").should("be.visible");
    cy.get("[data-cy=labelinput-error]")
      .eq(0)
      .contains("Date must be in the future");
  });
});
