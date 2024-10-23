import { describe } from "node:test";

describe("Home Page search", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/shopping-cart/index.jsp');
    });

    it('PR0032 - Búsqueda de productos', () => {
        cy.get('input[name="search"]').type('apple').should('have.value', 'apple');
        cy.get('button[name="searchButton"]').click();
    })
})