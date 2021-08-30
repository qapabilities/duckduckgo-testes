/// <reference types="Cypress" />

describe('Tipos de Buscas', () => {
    beforeEach(() => {
        cy.visit('https://duckduckgo.com/')
    })

it('Buscar clicando na lupa', () => {
    cy.get('[name="q"]').type('cachorro vira-lata')
    cy.get('#search_button_homepage').click()
    
    cy.get('.results.js-results').should('contain', 'cachorro vira-lata')
})

it('Buscar pressionando enter no campo', () => {
    cy.get('.js-search-input.search__input--adv').type('covid-23{enter}')
    
    cy.contains('.results.js-results', 'covid-23').should('be.visible')
})

it('Buscar um filme, deve exibir Título do filme destacado', () => {
    cy.get('[name="q"]').type('covid-23')
    cy.get('#search_button_homepage').click()
    
    cy.get('.module__title__link').should('contain', 'Songbird')
    .should('be.visible')
})

it('Buscar um filme, deve conter link para mais informações', () => {
    cy.get('[name="q"]').type('covid-23')
    cy.get('#search_button_homepage').click()
    
    cy.get('.module__image').should('have.attr', 'href', 'https://en.wikipedia.org/wiki/Songbird_(film)')
})

it('Buscar e clicar em "Mais resultados"', () => {
    cy.get('#search_form_input_homepage').type(`${'ornitorrinco'}{enter}`)
    cy.get('.results .result').should('have.length', 11)
    cy.get('.result--more__btn').click()
    
    cy.get('.results .result').should('have.length.above', 29)
})

it ('Filtrar o resultado da busca por país "Argentina"', () => {
    cy.get('[name="q"]').type('covid')
    cy.get('#search_button_homepage').click()
    cy.get('.dropdown__switch').click()
    cy.get('[data-id="ar-es"]') //assert pela linguagem que alterou?
})

it ('Filtrar o resultado da busca por "Mês passado"', ()=> {
    cy.get('[name="q"]').type('covid')
    cy.get('#search_button_homepage').click()
    //cy.get('.dropdown--date').select('Mês passado') //como usar o .select do cypress?
    cy.get('.dropdown--date').click()
    cy.get(':nth-child(5) > .modal__list__link').should('be.visible').click({force:true})
    // como seria o assert? (visualmente não tem data)
 })

it ('Buscar e visualizar "Imagens"', ()=> {
    cy.get('[name="q"]').type('covid')
    cy.get('#search_button_homepage').click()
    cy.get('a[data-zci-link="images"]').click()
        
    cy.get('.zci__main--tiles').contains('covid').should('be.visible')
})
})