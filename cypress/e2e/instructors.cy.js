describe('Super Admin Web: Instructors', () =>{
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
    it('GUI checks', () =>{
      cy.contains('Instructors').click();

      cy.get('.breadcrumb-item')
        .eq(1)
        .should('be.visible')
        .should('contain.text', 'Instructors');
        cy.get('.breadcrumb-item')
        .eq(0)
        .should('contain.text', 'Manage Instructors');

        cy.contains('Filters').should('have.text', 'Filters').should('be.visible');
        // Checking the Filters pop-up modal window
        cy.contains('Filters').click();
        cy.get('.modal-header').should('contain.text', 'Filters');
        cy.get('.modal-body > label').should('have.text', 'Status');
        cy.get('.c-multi-select-options > :nth-child(1)').click();
        cy.get('.c-multi-select-options > :nth-child(2)').click();
        cy.get('.c-multi-select-options > :nth-child(3)').click();
        cy.get('.c-multi-select-options > :nth-child(4)').click();
        cy.get('.c-multi-select-options > :nth-child(5)').click();
        cy.contains('Apply').should('be.visible').should('contain.text', 'Apply');
        // Deleting the filters
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        // Close the "Filters" modal
        cy.get('.close').click();
        // Verify if buttons have correct text
        cy.contains('Add New').should('contain.text', 'Add New');
        cy.get('.modal-header').should('contain.text', 'Filters');
        // Verify if table have correct names of columns
        cy.get('tr').find('th').eq(0).should('contain.text', 'First Name');
        cy.get('tr').find('th').eq(1).should('contain.text', 'Last Name');
        cy.get('tr').find('th').eq(2).should('contain.text', 'Email');
        cy.get('tr').find('th').eq(3).should('contain.text', 'Hidden');
        cy.get('tr').find('th').eq(4).should('contain.text', 'Full Control');
        cy.get('tr').find('th').eq(5).should('contain.text', 'Status');
        cy.get('tr').find('th').eq(6).should('contain.text', 'Actions');
        // Verify if "Search" function works correctly
        cy.get('[placeholder="Search"]').should('be.visible')
        .type('Hello')
        .wait(1000)
        .clear();
        // Verify GUI on the "Add New" page
        cy.contains('Add New').should('contain.text', 'Add New').click();
        cy.get('.breadcrumb-item')
        .eq(1)
        .should('be.visible')
        .should('contain.text', 'Invite');
        cy.get('h2').should('contain.text', 'Invite Instructor');
        cy.get('label').eq(0).should('contain.text', 'First Name');
        cy.get('label').eq(1).should('contain.text', 'Last Name');
        cy.get('label').eq(2).should('contain.text', 'Email');
        cy.contains('Save').should('contain.text', 'Save').should('be.visible');
        // Verify if the URL was changed 
        cy.url('https://qa-admin.dashboardfit.com/instructors/invite').should('eq', 'https://qa-admin.dashboardfit.com/instructors/invite');
        cy.get('.breadcrumb-item')
        .eq(0)
        .click();
        // Verify if checkboxes works correctly
        cy.get('[type = "checkbox"]').eq(0)
        .check()
        .wait(1000)
        .uncheck();
        cy.get('[type = "checkbox"]').eq(1)
        .check()
        .wait(1000)
        .uncheck();
        // Checking the pagination
        cy.get('[class="btn mr-1 page_item_link btn-outline-secondary disabled"]').should('be.disabled');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').should('be.enabled');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').eq(0).should('contain.text', '2');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').eq(1).should('contain.text', '3');
        cy.get('[class="btn ml-1 page_item_link btn-outline-secondary"]').should('be.enabled');
    });
    it('Verify if the Add New works correctly', () => {
      cy.contains('Instructors').click();
      cy.contains('Add New').should('contain.text', 'Add New').click();
      cy.get('[autocomplete="first-name"]').type('Auto-test check');
      cy.get('[autocomplete="last-name"]').type('Auto-test check');
      cy.get('[autocomplete="email"]').type('auto_test01@yopmail.com');
      cy.contains('Save').click();
      // Verify the delete user function
      cy.contains('Delete').eq(0).click();
      cy.get('[class="modal-content"]').find('.modal-body').find('[class="btn mx-auto text-uppercase btn_yes btn-danger"]').eq(1).click({force: true});
      cy.get('.noty_body').should('contain.text', 'Deleted!');
    });
    it('Verify if the Filters works correctly for each filters', () => {
      cy.contains('Instructors').click();
      cy.contains('Filters').click();
      cy.get('.modal-header').should('contain.text', 'Filters');
      cy.get('.modal-body > label').should('have.text', 'Status');
      cy.get('.c-multi-select-options > :nth-child(1)').click();
      cy.contains('Apply').should('be.visible').should('contain.text', 'Apply').click().wait(1000);
      cy.get('[class="fas fa-times"]').click();
      cy.contains('Filters').click();
      cy.get('.modal-body > label').should('have.text', 'Status');
      cy.get('.c-multi-select-options > :nth-child(2)').click();
      cy.contains('Apply').should('be.visible').should('contain.text', 'Apply').click().wait(1000);
      cy.get('[class="fas fa-times"]').click();
      cy.contains('Filters').click();
      cy.get('.modal-body > label').should('have.text', 'Status');
      cy.get('.c-multi-select-options > :nth-child(3)').click();
      cy.contains('Apply').should('be.visible').should('contain.text', 'Apply').click().wait(1000);
      cy.get('[class="fas fa-times"]').click();
      cy.contains('Filters').click();
      cy.get('.modal-body > label').should('have.text', 'Status');
      cy.get('.c-multi-select-options > :nth-child(4)').click();
      cy.contains('Apply').should('be.visible').should('contain.text', 'Apply').click().wait(1000);
      cy.get('[class="fas fa-times"]').click();
      cy.contains('Filters').click();
      cy.get('.modal-body > label').should('have.text', 'Status');
      cy.get('.c-multi-select-options > :nth-child(5)').click();
      cy.contains('Apply').should('be.visible').should('contain.text', 'Apply').click().wait(1000);
      cy.get('[class="fas fa-times"]').click();
    });
});