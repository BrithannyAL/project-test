describe("Profile", () => {
    beforeEach(() => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0045- Ver mi perfil de usuario', () => {
        
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        // Ir a la seccion de Profile
        cy.xpath('/html/body/nav/div/div[2]/ul/li[5]/a').click();

        // Verificar los datos de la cuenta 

        //Nombre 
        cy.get('.card-body .row').eq(0).within(() => {
            cy.get('.col-sm-3').should('contain', 'Full Name');
            cy.get('.col-sm-9').should('contain', 'Guest User');
        });

        // Correo
        cy.get('.card-body .row').eq(1).within(() => {
            cy.get('.col-sm-3').should('contain', 'Email');
            cy.get('.col-sm-9').should('contain', 'guest@gmail.com');
        });

        // Telefono
        cy.get('.card-body .row').eq(2).within(() => {
            cy.get('.col-sm-3').should('contain', 'Phone');
            cy.get('.col-sm-9').should('contain', '9876543234');
        });

        // Dirección
        cy.get('.card-body .row').eq(3).within(() => {
            cy.get('.col-sm-3').should('contain', 'Address');
            cy.get('.col-sm-9').should('contain', 'K.P Road, Gaya, Bihar - India');
        });

        //Código Postal
        cy.get('.card-body .row').eq(4).within(() => {
            cy.get('.col-sm-3').should('contain', 'PinCode');
            cy.get('.col-sm-9').should('contain', '879767');
        });    
        
    });

});