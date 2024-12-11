import { backendURL } from '../../../Frontend/api/api';

describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/register/'); // Adjust the URL to match your application's routing
    });
  
    it('should pre-fill the email input with the email query parameter', () => {
        cy.visit('/register?email=test@example.com');
        cy.get('input[aria-label="email"]').should('have.value', 'test@example.com');
      });

    it('should display the register form', () => {
      cy.get('input[aria-label="name"]').should('be.visible');
      cy.get('input[aria-label="email"]').should('be.visible');
      cy.get('input[aria-label="password"]').should('be.visible');
      cy.get('button[aria-label="registerButton"]').should('be.visible');
    });
  
    it('should show an error message if name is not provided', () => {
      cy.get('input[aria-label="email"]').type('test@example.com');
      cy.get('input[aria-label="password"]').type('password123');
      cy.wait(500); // wait for 500ms to ensure the button is available
      cy.get('button[aria-label="registerButton"]').click();
      cy.get('div[aria-label="registerError"]').contains('Name is required').should('be.visible');
    });
  
    it('should show an error message if email is invalid', () => {
      cy.get('input[aria-label="name"]').type('Test User');
      cy.get('input[aria-label="email"]').type('invalid-email');
      cy.get('input[aria-label="password"]').type('password123');
      cy.get('button[aria-label="registerButton"]').click();
      cy.get('div[aria-label="registerError"]').contains('Invalid email address').should('be.visible');
    });
  
    it('should show an error message if password is less than 6 characters', () => {
      cy.get('input[aria-label="name"]').type('Test User');
      cy.get('input[aria-label="email"]').type('test@example.com');
      cy.get('input[aria-label="password"]').type('123');
      cy.get('button[aria-label="registerButton"]').click();
      cy.get('div[aria-label="registerError"][aria-label="registerError"]').contains('Password must be at least 6 characters').should('be.visible');
    });
    
    it('should register a user successfully', () => {
      cy.intercept('POST', `${backendURL}/user`, {
        statusCode: 200,
        body: { message: 'User registered successfully' },
      }).as('registerUser');
  
      cy.get('input[aria-label="name"]').type('Test User');
      cy.get('input[aria-label="email"]').type('test@example.com');
      cy.get('input[aria-label="password"]').type('password123');
      cy.get('button[aria-label="registerButton"]').click();
  
      cy.wait('@registerUser');
      cy.url().should('include', '/userHome'); 
    });
  
    it('should show an error message if registration fails', () => {
      cy.intercept('POST', `${backendURL}/user`, {
        statusCode: 500,
        body: { message: 'Failed to register user' },
      }).as('registerUserFail');
  
      cy.get('input[aria-label="name"]').type('Test User');
      cy.get('input[aria-label="email"]').type('test@example.com');
      cy.get('input[aria-label="password"]').type('password123');
      cy.get('button[aria-label="registerButton"]').click();
  
      cy.wait('@registerUserFail');
      cy.get('div[aria-label="registerError"]').contains('Failed to register user').should('be.visible');
    });
  });