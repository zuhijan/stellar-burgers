describe("app works correctly with routes", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open burger constructor by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should open feed page after click on nav link", function () {
    cy.get("a").find("p").contains("Лента заказов").click();
    cy.contains("Лента заказов");
  });

  it("should open Login page after click on nav link Profile", function () {
    cy.get("a").find("p").contains("Личный кабинет").click();
    cy.contains("Вход");
  });
});
