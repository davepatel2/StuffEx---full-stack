/* E2E test for the happy path of searching for an item and adding it to your wishlist
 * checks routing works correctly on UI and pages appear as expected
 * assume this user is just visiting site to find items, not post
 */
/// <reference types="cypress" />

describe('End-to-End Test', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.visit('http://localhost:3000')
  })

  it('should perform an end to end test visiting all pages', () => {
    // Click on About page
    cy.wait(5000)
    cy.get('a').contains('About').click()
    cy.url().should('include', '/About')
    cy.wait(2000)
    // Click on List page, redirects to login
    cy.contains('List').click()
    cy.url().should('include', '/login')
    cy.wait(2000)
    // Click on Create Account
    cy.contains('Create Account').click()
    cy.url().should('include', '/Profile')
    cy.wait(2000)
    // Enter user info and create profile
    cy.get('input[name="username"]').type('cypress')
    cy.get('input[name="password"]').type('test_password')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="phone"]').type('421-234-1231')
    cy.get('[data-cy="create-profile-button"]').click()
    cy.url().should('include', '/login') // successfully redirects to login
    //  Enter new user info and login
    cy.wait(2000)
    cy.get('input[name="username"]').type('cypress')
    cy.get('input[name="password"]').type('test_password')
    cy.get('[data-cy="login-button"]').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/') // successfully redirects to home
    })
    cy.wait(2000)
    cy.contains('Hey').should('be.visible') //checks if new header is displayed

    // search for item
    cy.get('[data-cy="search-button"]').type('Mac')
    cy.get('input').type('{enter}')
    cy.wait(2000)
    cy.contains('Mac monitor').click()
    // add to wishlist
    cy.wait(5000)
    cy.contains('Wishlist').click()
    cy.contains('Remove').should('be.visible') //checks added to wishlist (removed only displayed if added)
    //check seller profile
    cy.contains('Listed By').click()
    cy.wait(2000)
    // check list item page
    cy.get('[data-cy="list"]').click() // list item page now avaiable
    cy.url().should('include', '/Form')
    cy.wait(2000)
    // navigate to wishlist on user page
    cy.get('[data-cy="options"]').click()
    cy.get('[data-cy="profile-option"]').click()
    cy.contains('Wishlist').click()
    cy.url().should('include', '/wishlist')
    cy.wait(2000)

    //logout
    cy.go(-2)
    cy.wait(4000)
    cy.get('[data-cy="logout-option"]').click()
    cy.url().should('include', '/login')
  })
})
