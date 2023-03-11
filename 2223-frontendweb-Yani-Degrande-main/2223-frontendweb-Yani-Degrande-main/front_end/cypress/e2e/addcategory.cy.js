describe("Add category", () => {
  beforeEach(() => {
    cy.login();
  });

  it("add category", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("test");
    cy.get("[data-cy=categoryDuration]").type("02:00");
    cy.get("[data-cy=categoryPrice]").type("10");

    cy.get("[data-cy=categorySave]").click();
  });

  it("add category without name", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryDuration]").type("02:00");
    cy.get("[data-cy=categoryPrice]").type("10");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("This is required!");
  });

  it("add category wit a short name", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("t");
    cy.get("[data-cy=categoryDuration]").type("02:00");
    cy.get("[data-cy=categoryPrice]").type("10");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("Min length is 2");
  });

  it("add category without duration", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("test");
    cy.get("[data-cy=categoryPrice]").type("10");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("This is required!");
  });

  it("add category without price", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("test");
    cy.get("[data-cy=categoryDuration]").type("10:00");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("This is required!");
  });

  it("add category with a price <= 0", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("test");
    cy.get("[data-cy=categoryDuration]").type("10:00");
    cy.get("[data-cy=categoryPrice]").type("0");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("min 1");
  });

  it("add category with a price > 5000", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_add]").click();

    cy.get("[data-cy=categoryName]").type("test");
    cy.get("[data-cy=categoryDuration]").type("10:00");
    cy.get("[data-cy=categoryPrice]").type("5001");

    cy.get("[data-cy=categorySave]").click();

    cy.get("[data-cy=modal_error]").should("be.visible");
    cy.get("[data-cy=modal_error]").contains("max 5000");
  });
});
