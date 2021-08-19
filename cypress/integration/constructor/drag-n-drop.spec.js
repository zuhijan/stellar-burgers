describe("constructore drag-n-drop", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should add drag bun-element to drop area", function () {
    cy.get("img").first().parent().trigger("dragstart");

    cy.get("div").contains("Перетащите ингредиенты").trigger("drop");

    cy.get(".constructor-element").should("have.length", 2);
  });
});
