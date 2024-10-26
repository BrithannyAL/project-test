describe('Forms Login', function () {
    
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR031- Iniciar Sesión', function () { // Prueba con usuario valido

        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');
    })

});