describe('Burrito Builder Main Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: 'sample-orders.json' })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        id: 4,
        ingredients:[ "beans", "carnitas", "guacamole" ],
        name: "Shirley"
      }
    })
    cy.visit('http://localhost:3000');
  });

  it('Should have a page title', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should display 3 existing orders', () => {
    cy.get('.orders-section').children().should('have.length', 3)
    cy.get('.order').first().contains('Cypress - Pat')
    cy.get('.order').first().contains('carnitas')
  })

  it('Should not be able to submit form without both name and ingredients selected/filled out', () => {
    cy.get('.form-submit').click()
    cy.get('.order-error-msg').first().contains('Please add a name for your order!')
    cy.get('.order-error-msg').last().contains('Please add ingredients to your order!')
    cy.get('input').first().type('Shirley')
    cy.get('.order-error-msg').first().contains('Please add ingredients to your order!')
  })

  it('Should be able to submit', () => {
    cy.get('input').first().type('Shirley')
    cy.get('p').first().contains('Order: Nothing selected')
    cy.get('button').contains('beans').click()
    cy.get('p').first().contains('Order: beans')
    cy.get('button').contains('carnitas').click()
    cy.get('button').contains('guacamole').click()
    cy.get('p').first().contains('Order: beans, carnitas, guacamole')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: 'posted-orders.json' })
    cy.get('.form-submit').click()
  })


})