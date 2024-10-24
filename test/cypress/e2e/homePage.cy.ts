describe("HomePage", () => {
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
    });

    it('PR0033- Visualización de productos en el catálogo', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se accede a la sección products
        cy.xpath('/html/body/nav/div/div[2]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/userHome.jsp');
    });

    it('PR0034 - Agregar producto al carrito', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se agrega un producto al carrito
        cy.get('div[class="col-sm-4"]').find('button.btn-success').contains('Add to Cart').first().then(($btn) => {
            cy.wrap($btn).closest('div[class="col-sm-4"]').find('p[class="productname"]').invoke('text').then((text) => {        
                const productName = text.trim();
                cy.wrap($btn).click();

                cy.get('p[id="message"]').should('have.text', 'Product Successfully Updated to Cart!');

                cy.visit('http://localhost:8080/shopping-cart/cartDetails.jsp');
                cy.get('tbody').children().eq(-3).find('td').eq(1).invoke('text').then((cartText) => {
                    expect(cartText.trim()).to.equal(productName); 
                });
            });
        });
    });

    it('PR0036- Búsqueda de productos inexistentes', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se busca un producto inexistente
        cy.get('input[name="search"]').type('qwerty').should('have.value', 'qwerty');
        cy.xpath('/html/body/div[1]/form/div/div/input').click();

        cy.url().should('include', '/shopping-cart/index.jsp?search=qwerty');
        cy.get('div[class="text-center"]').should('have.text', "No items found for the search 'qwerty'");
    });

    it('PR0038- Cantidad de productos en el carrito', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('guest@gmail.com').should('have.value', 'guest@gmail.com');
        cy.get('input[name="password"]').type('guest').should('have.value', 'guest');
        cy.get('#userrole').select('CUSTOMER').should('have.value', 'customer');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Se agrega un producto al carrito
        cy.get('div[class="col-sm-4"]').find('button.btn-success').contains('Add to Cart').first().then(($btn) => {
            cy.wrap($btn).closest('div[class="col-sm-4"]').find('p[class="productname"]').invoke('text').then((text) => {        
                const productName = text.trim();
                cy.wrap($btn).click();
                cy.get('p[id="message"]').should('have.text', 'Product Successfully Updated to Cart!');

                cy.visit('http://localhost:8080/shopping-cart/cartDetails.jsp');
                cy.get('tbody').children().eq(-3).within(() => {
                    cy.get('td').eq(4).find('i[class="fa fa-plus"]').click();
                    cy.wait(500);
                    cy.get('td').eq(4).find('i[class="fa fa-plus"]').click();
                });
                cy.get('tbody').children().eq(-3).within(() => {
                    cy.get('td').eq(3).find('input[type="number"]').invoke('val').should('equal', '3'); // Verificar el valor del input
                });
            });
        });
    });
    
});