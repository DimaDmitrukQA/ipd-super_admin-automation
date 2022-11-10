describe('Super Admin Web: Classes', () => {
    beforeEach('Log In', () => {
        cy.visit('https://qa-admin.dashboardfit.com/login');
        cy.get('[autocomplete="email"]').invoke('attr', 'placeholder').should('contain', 'E-mail');
        cy.get('[autocomplete="email"]').type('super_admin@admin.com');
        cy.get('[autocomplete="current-password"]').type('123123123');
        cy.get('[class="input-group-append"]')
          .eq(1)
          .click();
        cy.get('[class="form-check-input"]').check()
        .uncheck();
        cy.get('[class="btn mt-3 px-5 mb-3 align-self-center text-uppercase btn-primary"]').click().wait(1000);
    });
    it('Checking GUI for Classes page', () => {
        cy.contains('Classes').should('contain.text', 'Classes').click();

        cy.get('.breadcrumb-item')
        .eq(1)
        .should('be.visible')
        .should('contain.text', 'Classes');
        cy.get('.breadcrumb-item')
        .eq(0)
        .should('contain.text', 'Classes Administration');

        // Checking the Nav bar
        cy.get('.nav-pills').find('a').eq(0).should('contain.text', 'Classes').should('have.class', 'active');
        cy.get('.nav-pills').find('a').eq(1).should('contain.text', 'Home Category Order');
        cy.get('.nav-pills').find('a').eq(2).should('contain.text', 'Help Videos');
        cy.get('.nav-pills').find('a').eq(3).should('contain.text', 'Studios');

        // Verify if buttons have correct text
        cy.contains('Add New').should('contain.text', 'Add New');
        cy.get('.modal-header').should('contain.text', 'Filters');

        // Verify if the table have a correct column names 
        cy.contains('List of Classes').should('contain.text', 'List of Classes');
        cy.get('tr').find('th').eq(0).should('contain.text', 'Name');
        cy.get('tr').find('th').eq(1).should('contain.text', 'Categories');
        cy.get('tr').find('th').eq(2).should('contain.text', 'Instructors');
        cy.get('tr').find('th').eq(3).should('contain.text', 'Length');
        cy.get('tr').find('th').eq(4).should('contain.text', 'Type');
        cy.get('tr').find('th').eq(5).should('contain.text', 'Language');
        cy.get('tr').find('th').eq(6).should('contain.text', 'Production Date');
        cy.get('tr').find('th').eq(7).should('contain.text', 'Release Date');
        cy.get('tr').find('th').eq(8).should('contain.text', 'Actions');

        // Verify if the "Search" function works properly
        cy.get('.form-control').invoke('attr', 'placeholder').should('eq', 'Search');
        cy.get('.form-control').eq(0).type('Test QA', {force: true}).wait(1000);
        cy.get('.form-control').eq(0).clear().type('Dmitry', {force: true}).wait(1500);
        cy.get('.form-control').eq(0).clear().type('Fail test', {force: true}).wait(1500);
        cy.get('.text-center > h2').should('contain.text', 'No items');
        cy.get('.form-control').eq(0).clear();
    });
    it('Checking the GUI for Home Category Order', () => {
        cy.contains('Classes').should('contain.text', 'Classes').click();

        cy.get('.nav-pills').find('a').eq(1).should('contain.text', 'Home Category Order').click();

        cy.get('.fa-question-circle').click();

        // Verify if button has correct text
        cy.contains('Add New').should('contain.text', 'Add New');

        // Verify if the table have a correct column names 
        cy.contains('List of Categories').should('contain.text', 'List of Categories');
        cy.get('tr').find('th').eq(0).should('contain.text', '#');
        cy.get('tr').find('th').eq(1).should('contain.text', 'Name');
        cy.get('tr').find('th').eq(2).should('contain.text', 'Actions');

        //Verify if element are displayed correctly on the "Add new" page
        cy.contains('Add New').click();

        cy.get('h2').should('contain.text', 'New Category');
        cy.get('label').should('contain.text', 'Name');
        cy.get('.form-control').should('be.visible');
        cy.get('button').should('be.visible').should('contain.text', 'Save');

        cy.go('back');
    });
    it.only('Checking the GUI of Help Video section', () => {
        cy.contains('Classes').should('contain.text', 'Classes').click();

        cy.get('.nav-pills').find('a').eq(2).should('contain.text', 'Help Videos').click();
    });
});