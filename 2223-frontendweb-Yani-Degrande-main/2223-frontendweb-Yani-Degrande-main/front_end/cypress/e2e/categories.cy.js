describe("Categories test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("show categories ", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.intercept("GET", "http://localhost:9000/api/categories", {
      fixture: "categories.json",
    });

    cy.get("[data-cy=category_list]").should("have.length", 1);
    cy.get("[data-cy=category_name]").eq(0).contains("Basic");
    cy.get("[data-cy=category_duration]").eq(0).contains("02:00");
    cy.get("[data-cy=category_price]").eq(0).contains(15);
  });

  it("very slow response ", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.intercept("http://localhost:9000/api/categories", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");

    cy.get("[data-cy=loading").should("be.visible");
  });
  it("check order by", () => {
    cy.visit("http://localhost:3000/dashboard/categories");

    cy.get("[data-cy=categories_order-by]").eq(0).contains("name");
    cy.get("[data-cy=categories_order-by]").select("duration");
    cy.get("[data-cy=categories_order-by]").eq(0).contains("duration");
    cy.get("[data-cy=categories_order-by]").select("price");
    cy.get("[data-cy=categories_order-by]").eq(0).contains("price");
  });
});
