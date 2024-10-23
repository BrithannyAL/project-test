describe("Home Page search", () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0032 - Búsqueda de productos', () => {

        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se busca un producto

        cy.get('input[name="search"]').type('iphone').should('have.value', 'iphone');
        cy.xpath('/html/body/div[1]/form/div/div/input').click();

        cy.url().should('include', '/shopping-cart/index.jsp?search=iphone');
        cy.get('div.row.text-center').children().should('have.length.greaterThan', 0);
    })
})