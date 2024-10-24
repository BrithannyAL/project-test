describe("CartItems", () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0035- Eliminación de producto del carrito', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se accede a la sección cart
        cy.xpath('/html/body/nav/div/div[2]/ul/li[3]/a/i').click();

        cy.url().should('include', 'shopping-cart/cartDetails.jsp');
        cy.get('tbody tr').its('length').then((initialRowCount) => {
            expect(initialRowCount).to.be.greaterThan(2); 
            cy.get('tbody tr').eq(0).find('td').eq(5).find('i[class="fa fa-minus"]').click();
            cy.get('tbody tr').its('length').should('equal', initialRowCount - 1);
        });
        
    });
});