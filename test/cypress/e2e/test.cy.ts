describe('Login', function () {
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('Login existoso', function () {

        cy.get('input[name="username"]').type('admin').should('have.value', 'admin');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');
    })



});