describe('Buscas no duckduckgo.com', () => {
    beforeEach(() => {
        cy.visit('https://duckduckgo.com/')
    })

it('Buscar pela lupa', () => {
    cy.get('[name="q"]').type('cachorro vira-lata')
    cy.get('#search_button_homepage').click()
    cy.get('.results.js-results').should('contain', 'cachorro vira-lata')
})

it('Buscar com o enter no campo', () => {
    cy.get('.js-search-input.search__input--adv').type(`${'covid-23'}{enter}`)
    cy.get('.results.js-results').should('contain', 'covid-23')   
})

it("Deve exibir Título do filme destacado", () => {
    cy.get('[name="q"]').type('covid-23')
    cy.get('#search_button_homepage').click()
    cy.get('.module__title__link').should('contain', 'Songbird')
})

it("Deve conter o atributo href no filme destacado", () => {
    cy.get('[name="q"]').type('covid-23')
    cy.get('#search_button_homepage').click()
    cy.get('.module__image').should('have.attr', 'href')
})

it("Deve clicar no filme destacado", () => {
    cy.get('[name="q"]').type('covid-23')
    cy.get('#search_button_homepage').click()
    cy.get('.module--about__img').should('be.visible')
    //cy.get('.class="ddgsi.badge-link__close.js-badge-link-dismiss').click()
    cy.get('.module--about__img').click({force:true})
})

it("Deve clicar em Mais resultados", () => {
    cy.get('#search_form_input_homepage').type(`${'ornitorrinco'}{enter}`)
    cy.get('.results .result').should('have.length', 11)
    cy.get('.result--more__btn').click()
    cy.get('.results .result').should('have.length', 31)
})
})  