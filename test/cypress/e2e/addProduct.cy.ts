import 'cypress-file-upload';

describe("AddProduct", () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0037- Agregar Producto al catálogo', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();

        cy.url().should('include', '/shopping-cart/LoginSrv');

        //Acceder a la opción add product del combobox update items
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');

        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Nuevo producto de prueba').should('have.value', 'Nuevo producto de prueba');
        cy.get('select[name="type"]').select('LAPTOP').should('have.value', 'laptop');
        cy.get('textarea[name="info"]').type('Información del producto de prueba').should('have.value', 'Información del producto de prueba');
        cy.get('input[name="price"]').type('1000').should('have.value', '1000');
        cy.get('input[name="quantity"]').type('10').should('have.value', '10');
        //input type="file" name="image"
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();

        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('contain.text', 'Product Added Successfully');
    });
});