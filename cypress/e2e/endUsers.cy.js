describe('Super Admin: EndUsers', () => {
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
    it('GUI checking of elements that present on the page', () => {
        cy.contains('End Users').click().wait(1000);
        // Checking if the breadcrumbs works correctly
        cy.get('.breadcrumb-item')
        .eq(1)
        .should('be.visible')
        .should('contain.text', 'Users');
        cy.get('.breadcrumb-item')
        .eq(0)
        .should('contain.text', 'End Users Administration');
        // Checking if the buttons have the correct name
        cy.contains('Subscriptions').should('have.text', 'Subscriptions').should('be.visible');
        cy.contains('Subscriptions').click();
        cy.contains('List of Users').should('contain.text', 'List of Users');
        cy.get('tr').find('th').eq(0).should('contain.text', 'First Name');
        cy.get('tr').find('th').eq(1).should('contain.text', 'Last Name');
        cy.get('tr').find('th').eq(2).should('contain.text', 'Email');
        cy.get('tr').find('th').eq(3).should('contain.text', 'Subscription');
        cy.get('tr').find('th').eq(4).should('contain.text', 'Type');
        cy.get('tr').find('th').eq(5).should('contain.text', 'Period');
        cy.get('tr').find('th').eq(6).should('contain.text', 'Source');
        cy.get('tr').find('th').eq(7).should('contain.text', 'Dates');
        cy.get('tr').find('th').eq(8).should('contain.text', 'Family');
        cy.get('tr').find('th').eq(9).should('contain.text', 'Admin Subscription Type');
        cy.get(':nth-child(1) > :nth-child(10) > .d-flex > a').click();
        cy.get('.modal-title').should('contain.text', 'Set User Subscription');
        cy.get('.form-group > label').should('contain.text', 'Subscription');
        cy.get('.form-control').eq(1).select(1);
        cy.get('.vc-pane-container').should('be.visible');
        cy.get('[class="d-flex mt-3 align-items-center justify-content-center"]').find('button').eq(0).should('be.enabled').should('contain.text', 'Cancel');
        cy.get('[class="d-flex mt-3 align-items-center justify-content-center"]').find('button').eq(1).should('be.enabled').should('contain.text', 'Set');
        cy.get('[class="d-flex mt-3 align-items-center justify-content-center"]').find('button').eq(0).click();
        cy.contains('General info').should('contain.text', 'General info').should('be.visible');
        cy.contains('General info').click();
        cy.contains('Filters').should('have.text', 'Filters').should('be.visible');
        // Checking the Filters pop-up modal window
        cy.contains('Filters').click();
        cy.get('[data-v-b0b0e2ae=""][data-v-744e20ba=""] > .modal > .modal-dialog > .modal-content > .modal-header').should('contain.text', 'Filters');
        cy.get('.modal-body > label').should('have.text', 'Status');
        cy.get('.c-multi-select-options > :nth-child(1)').click();
        cy.get('.c-multi-select-options > :nth-child(2)').click();
        cy.get('.c-multi-select-tag').should('be.visible');
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[class="c-multi-select-tag-delete close"]').eq(0).click();
        cy.get('[data-v-b0b0e2ae=""][data-v-744e20ba=""] > .modal > .modal-dialog > .modal-content > .modal-header > .close').click();
        cy.get('[placeholder="Search"]').should('be.visible').type('Hello').clear();
        cy.get('.c-header-nav-link').should('be.visible').click();
        cy.get('.breadcrumb-item')
        .eq(1)
        .click();
        // Checking the name of columns
        cy.contains('List of Users').should('contain.text', 'List of Users');
        cy.get('tr').find('th').eq(0).should('contain.text', 'First Name');
        cy.get('tr').find('th').eq(1).should('contain.text', 'Last Name');
        cy.get('tr').find('th').eq(2).should('contain.text', 'Email');
        cy.get('tr').find('th').eq(3).should('contain.text', 'Registration Date');
        cy.get('tr').find('th').eq(4).should('contain.text', 'Last Active');
        cy.get('tr').find('th').eq(5).should('contain.text', 'SSO');
        cy.get('tr').find('th').eq(6).should('contain.text', 'Verified');
        cy.get('tr').find('th').eq(7).should('contain.text', 'Status');
        cy.get('tr').find('th').eq(8).should('contain.text', 'Actions');
        cy.get('tbody').find('tr');
        cy.get('tbody').find('tr').find('[class="d-flex"]');
        // Checking the dropdown list
        cy.get('tbody').find('tr').eq(0).find('[aria-haspopup="true"]').click();
        // cy.get('[class="dropdown-menu show"]').find('.dropdown-item').eq(0).should('contain.text', 'Resend Verification');
        // cy.get('[class="dropdown-menu show"]').find('.dropdown-item').eq(1).should('contain.text', 'Verify');
        // Checking the pagination
        cy.get('[class="btn mr-1 page_item_link btn-outline-secondary disabled"]').should('be.disabled');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').should('be.enabled');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').eq(0).should('contain.text', '2');
        cy.get('[class="btn mx-1 page_item_link btn-outline-secondary"]').eq(1).should('contain.text', '3');
        cy.get('[class="btn ml-1 page_item_link btn-outline-secondary"]').should('be.enabled');
    });
    it('Check if the Edit user function works correctly | POSITIVE', () => {
        cy.contains('End Users').click().wait(1000);
        cy.contains('Edit').click();
        cy.get('h2').should('contain.text', 'Edit User');
        cy.get('[autocomplete="first-name"]').clear().type('Auto-test First name');
        cy.get('[autocomplete="last-name"]').clear().type('Auto-test Last name');
        cy.get('[autocomplete="email"]').clear().type('auto_test_email@yopmail.com');
        cy.get('[class="btn btn-primary"]').click();
        cy.get('[class="noty_body"]').should('be.visible').should('contain.text', 'Updated');
    });
    it('Check if the Edit user function works correctly | NEGATIVE #1', () => {
        cy.contains('End Users').click().wait(1000);
        cy.contains('Edit').click();
        cy.get('[autocomplete="first-name"]').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur');
        cy.get('[autocomplete="last-name"]').clear().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur');
        cy.get('[class="btn btn-primary"]').click();
        cy.get('.invalid-feedback').should('be.visible');
        cy.get('[class="noty_body"]').should('be.visible').should('contain.text', 'The given data was invalid.');
    });
    it('Check if the Edit user function works correctly | NEGATIVE #2', () => {
        // This test failed
        cy.contains('End Users').click().wait(1000);
        cy.contains('Edit').click();
        cy.get('[autocomplete="first-name"]').clear().type('Auto-test First name');
        cy.get('[autocomplete="last-name"]').clear().type('Auto-test Last name');
        cy.get('[autocomplete="email"]').clear().type('auto_test_emailyopmail.com');
        cy.get('[class="btn btn-primary"]').click();
        cy.get('.invalid-feedback').should('be.visible');
        cy.get('[class="noty_body"]').should('be.visible').should('contain.text', 'The given data was invalid.');
    });
    it('Check if the Block/Unblock user function works correctly', () => {
        // This test failed
        cy.contains('End Users').click().wait(1000);
        cy.contains('Block').click();
        cy.contains('Yes').click();
        cy.get('.noty_body').should('contain.text', 'Blocked!');
        cy.contains('Unblock').click();
        cy.get('.noty_body').should('contain.text', 'Unblocked!');
    });
});