describe('Forms Register', function () {
    
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0042- Registrarse como usuario', function () { // Prueba con usuario valido
        
        // Ir a la seccion de Register
        cy.xpath('/html/body/nav/div/div[2]/ul/li[2]/a').click();

        // Ingresar los datos del usuario
        // Name
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('user_test').should('have.value', 'user_test');
        // Email
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[2]/input').type('usertest@gmail.com').should('have.value', 'usertest@gmail.com');
        // Address
        cy.xpath('/html/body/div[2]/div/form/div[4]/textarea').type('TEC SC').should('have.value', 'TEC SC');
        // Mobile
        cy.xpath('/html/body/div[2]/div/form/div[5]/div[1]/input').type('8182838485').should('have.value', '8182838485');
        // Pin code 
        cy.xpath('/html/body/div[2]/div/form/div[5]/div[2]/input').type('506').should('have.value', '506');
        // Password
        cy.xpath('/html/body/div[2]/div/form/div[6]/div[1]/input').type('123').should('have.value', '123');
        // Confirm Password
        cy.xpath('/html/body/div[2]/div/form/div[6]/div[2]/input').type('123').should('have.value', '123');
        
        // Click en el boton de Register
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();

        // Verificar que se haya registrado correctamente User Registered Successfully!
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('have.text','\n\t\t\t\t\t\tUser Registered Successfully!\n\t\t\t\t\t');
        
    })

});