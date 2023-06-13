describe('template spec', () => {
  it('passes', () => {
    cy.visit('/new')
    cy.get('#tittle').type(`Este es el titulo`)
    cy.get('#description').type(`Esta es la descripción`)
    cy.get('form').submit()

    cy.location('pathname').should('not.eq', '/new') // Espera a que se haya producido la redirección
    // Ahora, estás en la nueva página. Puedes realizar acciones en ella.
    cy.get('.bg-gray-700').click()
    cy.get('#tittle').type(`Este es el titulo MODIFICADO!!!`)
    cy.get('#description').type(`Esta es la descripción MODIFICADA!!`)
    cy.get('#button-save-change').click()

    cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .rounded-xl').click()
  })
})