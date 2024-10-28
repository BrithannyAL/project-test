import 'cypress-file-upload';

describe("AddProduct Form", () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.visit('http://localhost:8080/shopping-cart/login.jsp');
    });

    it('PR0047 - No agrega producto con cantidad inválidos y campos vacios', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');

        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');

        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');

        cy.get('select[name="type"]').select('TV').should('have.value', 'tv');
        cy.get('textarea[name="info"]').type('Descripcion de producto').should('have.value', 'Descripcion de producto');
        cy.get('input[name="quantity"]').type('e')
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0048 - No agrega producto con cantidad inválida', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Hp laptop').should('have.value', 'Hp laptop');
        cy.get('select[name="type"]').select('TV').should('have.value', 'tv');
        cy.get('textarea[name="info"]').type('1111').should('have.value', '1111');
        cy.get('input[name="price"]').type('0').should('have.value', '0');
        cy.get('input[name="quantity"]').type('Texto')
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });
    
    it('PR0049 - Agrega producto con valores numéricos negativos', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('-1111').should('have.value', '-1111');
        cy.get('select[name="type"]').select('CAMERA').should('have.value', 'camera');
        cy.get('textarea[name="info"]').type('Descripcion de producto').should('have.value', 'Descripcion de producto');
        cy.get('input[name="price"]').type('-1111').should('have.value', '-1111');
        cy.get('input[name="quantity"]').type('-1111').should('have.value', '-1111');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('contain.text', 'Product Added Successfully');
    });

    it('PR0050 - No agregar producto con tipo de precio incorrecto', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('-1111').should('have.value', '-1111');
        cy.get('select[name="type"]').select('TV').should('have.value', 'tv');
        cy.get('textarea[name="info"]').type('-1111').should('have.value', '-1111');
        cy.get('input[name="price"]').type('Texto')
        cy.get('input[name="quantity"]').type('0').should('have.value', '0');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0051 - No agregar producto con nombre vacíos', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.get('select[name="type"]').select('MOBILE').should('have.value', 'mobile');
        cy.get('textarea[name="info"]').type('50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris').should('have.value', '50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris');
        cy.get('input[name="price"]').type('1111').should('have.value', '1111');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });
    
    it('PR0052 - No agrega producto con descripción y cantidad vacías', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Lenovo Legion').should('have.value', 'Lenovo Legion');
        cy.get('select[name="type"]').select('TV').should('have.value', 'tv');
        cy.get('input[name="price"]').type('-1111').should('have.value', '-1111');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });
    
    it('PR0053 - No agrega producto con tipo y descripción vacíos', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('-1111').should('have.value', '-1111');
        cy.get('input[name="quantity"]').type('1111').should('have.value', '1111');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0054 - No agrega producto con descripción vacía y valores numéricos', () => {
        // Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('1111').should('have.value', '1111');
        cy.get('select[name="type"]').select('MOBILE').should('have.value', 'mobile');
        cy.get('input[name="price"]').type('0').should('have.value', '0');
        cy.get('input[name="quantity"]').type('0').should('have.value', '0');
        cy.get('input[type="file"]').attachFile('img.jpg');
    
        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0055 - No agrega producto con cantidad invalida', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('1111').should('have.value', '1111');
        cy.get('select[name="type"]').select('CAMERA').should('have.value', 'camera');
        cy.get('textarea[name="info"]').type('-1111').should('have.value', '-1111');
        cy.get('input[name="price"]').type('1111').should('have.value', '1111');
        cy.get('input[name="quantity"]').type('Texto');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0056 - No agrega producto con tipo de datos incorrectos', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    

        cy.get('select[name="type"]').select('MOBILE').should('have.value', 'mobile');
        cy.get('textarea[name="info"]').type('1111').should('have.value', '1111');
        cy.get('input[name="price"]').type('Texto')
        cy.get('input[name="quantity"]').type('-1111');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0057 - No agrega producto con cantidad inválida', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('-1111').should('have.value', '-1111');
        cy.get('select[name="type"]').select('MOBILE').should('have.value', 'mobile');
        cy.get('textarea[name="info"]').type('1111').should('have.value', '1111');
        cy.get('input[name="price"]').type('-1111').should('have.value', '-1111');
        cy.get('input[name="quantity"]').type('Texto');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });

    it('PR0058 - Agrega producto con cantidad inválida', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Lenovo Legion').should('have.value', 'Lenovo Legion');
        cy.get('select[name="type"]').select('TABLET').should('have.value', 'tablet');
        cy.get('textarea[name="info"]').type('50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris').should('have.value', '50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris');
        cy.get('input[name="price"]').type('0').should('have.value', '0');
        cy.get('input[name="quantity"]').type('-1111');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').invoke('text').should('match', /Product Added Successfully with Product Id: P\d{14}/);
    });

    it('PR0059 - Agrega producto con precio invalido', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Hp laptop').should('have.value', 'Hp laptop');
        cy.get('select[name="type"]').select('TV').should('have.value', 'tv');
        cy.get('textarea[name="info"]').type('50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris').should('have.value', '50 ipsum dolor sit amet consectetur adipiscing elit Phasellus sit amet fermentum libero Quisque varius consectetur nibh vitae dignissim mauris');
        cy.get('input[name="price"]').type('-1111').should('have.value', '-1111');
        cy.get('input[name="quantity"]').type('0').should('have.value', '0');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').invoke('text').should('match', /Product Added Successfully with Product Id: P\d{14}/);
    });

    it('PR0060 - No agrega producto con tipo de precio invalido', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('1111').should('have.value', '1111');
        cy.get('select[name="type"]').select('LAPTOP').should('have.value', 'laptop');
        cy.get('textarea[name="info"]').type('Descripcion de producto').should('have.value', 'Descripcion de producto');
        cy.get('input[name="price"]').type('Texto');
        cy.get('input[name="quantity"]').type('1111').should('have.value', '1111');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').should('not.exist');
    });


    it('PR0061 - Agrega producto al catálogo', () => {
        //Se inicia sesión
        cy.get('input[name="username"]').type('admin@gmail.com').should('have.value', 'admin@gmail.com');
        cy.get('input[name="password"]').type('admin').should('have.value', 'admin');
        cy.get('#userrole').select('ADMIN').should('have.value', 'admin');
    
        cy.xpath('/html/body/div[2]/div/form/div[6]/div/button').click();
        cy.url().should('include', '/shopping-cart/LoginSrv');
    
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]').click();
        cy.xpath('/html/body/nav/div/div[2]/ul/li[6]/ul/li[1]/a').click();
        cy.url().should('include', '/shopping-cart/addProduct.jsp');
    
        cy.xpath('/html/body/div[2]/div/form/div[3]/div[1]/input').type('Lenovo Legion').should('have.value', 'Lenovo Legion');
        cy.get('select[name="type"]').select('CAMERA').should('have.value', 'camera');
        cy.get('textarea[name="info"]').type('1111').should('have.value', '1111');
        cy.get('input[name="price"]').type('1111').should('have.value', '1111');
        cy.get('input[name="quantity"]').type('1111').should('have.value', '1111');
        cy.get('input[type="file"]').attachFile('img.jpg');

        cy.xpath('/html/body/div[2]/div/form/div[7]/div[2]/button').click();
        cy.xpath('/html/body/div[2]/div/form/div[1]/p').invoke('text').should('match', /Product Added Successfully with Product Id: P\d{14}/);
    });

});