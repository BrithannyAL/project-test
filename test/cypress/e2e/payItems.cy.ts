describe("Shopping cart payment", () => {
    beforeEach(() => {

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0043- Realizar el pago del carrito', () => {
        
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se agregan productos al carrito
        cy.get('div[class="col-sm-4"]').find('button.btn-success').contains('Add to Cart').first().then(($btn) => {
            // Encuentra el nombre del producto asociado al botón "Add to Cart"
            cy.wrap($btn).closest('div[class="col-sm-4"]').find('p[class="productname"]').invoke('text').then((text) => {        
                const productName = text.trim();
                cy.wrap($btn).click();  // Hace clic en el botón "Add to Cart"
                cy.get('p[id="message"]').should('have.text', 'Product Successfully Updated to Cart!');

                // Visita la página de detalles del carrito
                cy.visit('http://localhost:8080/shopping-cart/cartDetails.jsp');
                cy.get('tbody').children().eq(-3).within(() => {
                    // Verifica que el valor del input de cantidad sea 1
                    cy.get('td').eq(3).find('input[type="number"]').invoke('val').should('equal', '1'); // Verificar el valor del input
                });
            });
        });

        //Se realiza el pago, al darle click al botón “Pay now”
        cy.get('button[formaction^="payment.jsp"]').click();

        // Se ingresan los datos e el formulario de pago con tarjeta
        
        // Nombre de la tarjeta 
        cy.get('input[name="cardholder"]').type('John Doe').should('have.value', 'John Doe');

        // Numero de la tarjeta
        cy.get('input[name="cardnumber"]').type('4242424242424242').should('have.value', '4242424242424242');

        // Mes de expiracion
        cy.get('input[name="expmonth"]').type('12').should('have.value', '12');

        // Año de expiracion
        cy.get('input[placeholder="YYYY"]').type('2030').should('have.value', '2030');

        // CVV 
        cy.get('input[placeholder="123"]').type('123').should('have.value', '123');

        // Boton de Pay
        cy.get('form .btn-success').click(); // Selector más específico
        
        // Verificar que se haya registrado correctamente Order Placed Successfully!
        cy.xpath('/html/body/div[1]/p').should('have.text','Order Placed Successfully!');

    });

    it('PR0044- Ver mis órdenes de compra', () => {
        
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        // Ir a la seccion de Orders
        cy.xpath('/html/body/nav/div/div[2]/ul/li[4]/a').click();

        // Verificar que haya una lista de ordenes y que su estado sea ORDER_PLACED
        cy.get('tbody').children().each(($row) => {
            cy.wrap($row).within(() => {
                cy.get('td').eq(6).should('have.text', 'ORDER_PLACED');
            });
        });
        
    });

});