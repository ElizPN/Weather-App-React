describe("WeatherContainer", () => {
  it("should render city card after adding city", () => {
    cy.visit("https://elizpn.github.io/Weather-App-React/");

    cy.contains("Add location");

    cy.get("[data-testid=add-city-field]").type("Oslo");
    cy.get("[data-testid=add-button]").click();

    cy.get("[data-testid=city-card-0]").contains("Oslo");
  });

  it("should render error message with invalid value ", () => {
    cy.visit("https://elizpn.github.io/Weather-App-React/");

    cy.contains("Add location");

    cy.get("[data-testid=add-city-field]").type("I wanna beer");
    cy.get("[data-testid=add-button]").click();

    cy.get("[data-testid=404-error]").contains(
      "Please search for a valid city!"
    );
  });

  it("should render message about same city when entered city already exists", () => {
    cy.visit("https://elizpn.github.io/Weather-App-React/");

    cy.contains("Add location");

    cy.get("[data-testid=add-city-field]").type("Oslo");
    cy.get("[data-testid=add-button]").click();

    cy.get("[data-testid=city-card-0]").contains("Oslo");

    cy.get("[data-testid=add-city-field]").type("Oslo");
    cy.get("[data-testid=add-button]").click();

    cy.get("[data-testid='same-city-message']").contains(
      "The weather of this city is already shown 😉"
    );
  });
});
