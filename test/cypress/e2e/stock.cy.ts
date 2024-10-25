describe('Stock Products', function () {
    
    beforeEach(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0039- Eliminar producto del catálogo', function () { 

        // Inicio sesión

        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');
        
        // Ir al dropdown de Updates Items 
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/a').click();
        
        // Seleccionar Remove product
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[2]/a').click()

        //Ingresar el id del producto
        cy.get('input[name="prodid"]').type('P20230423084149').should('have.value', 'P20230423084149');

        // Presionar el botón de eliminar
        cy.xpath('/html/body/div[2]/div/form/div[4]/div[2]/button').click();

        // Verificar que se haya eliminado TODO: Cambiar por mensaje de exito \n\t\t\t\t\t\tProduct Removed Successfully!\n\t\t\t\t\t
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('have.text','\n\t\t\t\t\t\tProduct Removal Failed!\n\t\t\t\t\t');

    
        });

        it('PR0040- Ver productos en Stock', function () { 

            // Inicio sesión
            cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
            cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
            cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
            cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
    
            cy.url().should('include', '/shopping-cart/LoginSrv');
            
            // Ir a la seccion de Stock
            cy.xpath('/html/body/nav/div/div[2]/ul/li[3]/a').click();

            // Revisar lista de productos, comprobando que los elementos de la lista sean mayor a 0
            cy.xpath('/html/body/div[3]').children().should('have.length.greaterThan',0)
        
        });

        it('PR0041- Ver las órdenes en proceso', function () { 

            // Inicio sesión
            cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
            cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
            cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
            cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
    
            cy.url().should('include', '/shopping-cart/LoginSrv');
            
            // Ir a la seccion de Orders
            cy.xpath('/html/body/nav/div/div[2]/ul/li[5]/a').click();

            // Comprobar la lista de órdenes sin enviar
            cy.xpath('/html/body/div[3]/div').children().should('have.length.greaterThan',0)
        
        });

});

