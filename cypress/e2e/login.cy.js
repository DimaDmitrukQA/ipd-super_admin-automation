describe('Super Admin Web: Login', () => {
  beforeEach('Visit the main page', () => {
    cy.visit('https://qa-admin.dashboardfit.com/login');
  }),
  it('Log In | Positive', () => {
    cy.contains('p', 'Login').should('contain.text', 'Login');
    cy.get('[autocomplete="email"]').invoke('attr', 'placeholder').should('contain', 'E-mail');
    cy.get('[autocomplete="email"]').type('super_admin@admin.com');
    cy.get('[autocomplete="current-password"]').type('123123123');
    cy.get('[class="input-group-append"]')
      .eq(1)
      .click();
    cy.get('[class="form-check-input"]').check()
    .uncheck();
    cy.contains('Forgot Password?').should('contain.text', 'Forgot Password?');
    cy.get('[class="btn mt-3 px-5 mb-3 align-self-center text-uppercase btn-primary"]').click();
  });
  it('Log In | Negative #1', () => {
    cy.contains('p', 'Login').should('contain.text', 'Login');
    cy.get('[autocomplete="email"]').invoke('attr', 'placeholder').should('contain', 'E-mail');
    cy.get('[autocomplete="email"]').type('super_puper_admin@admin.com');
    cy.get('[autocomplete="current-password"]').type('123123123');
    cy.get('[class="input-group-append"]')
      .eq(1)
      .click();
    cy.get('[class="form-check-input"]').check()
    .uncheck();
    cy.contains('Forgot Password?').should('contain.text', 'Forgot Password?');
    cy.get('[class="btn mt-3 px-5 mb-3 align-self-center text-uppercase btn-primary"]').click();
  });
  it('Log In | Negative #2', () => {
    cy.contains('p', 'Login').should('contain.text', 'Login');
    cy.get('[autocomplete="email"]').invoke('attr', 'placeholder').should('contain', 'E-mail');
    cy.get('[autocomplete="current-password"]').invoke('attr', 'placeholder').should('contain', 'Password');
    cy.get('[class="input-group-append"]')
      .eq(1)
      .click();
    cy.get('[class="form-check-input"]').check()
    .uncheck();
    cy.contains('Forgot Password?').should('contain.text', 'Forgot Password?');
    cy.get('[class="btn mt-3 px-5 mb-3 align-self-center text-uppercase btn-primary"]').click();
    cy.get('[autocomplete="email"]').invoke('attr', 'class').should('contain', 'is-invalid');
    cy.get('[autocomplete="current-password"]').invoke('attr', 'class').should('contain', 'is-invalid');
    cy.get('.invalid-feedback').should('be.visible');
  });
});