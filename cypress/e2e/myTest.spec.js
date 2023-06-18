/// <reference types="cypress" />
import * as data from "../support/constants"

describe('Test suite one', () => {

    beforeEach('country&city selection', () => {
        cy.visit('/')
        cy.selectCountryAndCity(data.rentalCountry, data.rentalCity)
    })

    it('successful rental', () => {

        //search form
        cy.get('#search_form')
            .get('input[type="date"][name="pickup"]')
            .type(data.pickUpDate)
            .get('input[type="date"][name="dropoff"]')
            .type(data.dropOffDate)
            .clickButton('Search')
        
        //search results
        cy.get('#search-results')
        .contains('tr', data.rentedCar[0], data.rentedCar[1], data.rentedCar[2]).then( tableRow => {
            cy.wrap(tableRow).find('.btn.btn-success').click()
        })

        //confirmation page
        cy.contains(data.rentedCar[2])
        cy.contains("Company: "+data.rentedCar[1])
        cy.contains("Location: "+data.rentalCountry+", "+data.rentalCity)
        cy.contains("Pickup date: "+data.pickUpDate)
        cy.contains("Dropoff date: "+data.dropOffDate)
        cy.get('div.card-body').clickButton('Rent!')


        //summary page
        cy.get('#name').type(data.firstName)
        cy.get('#last_name').type(data.lastName)
        cy.get('#card_number').type(data.cardNumber)
        cy.get('#email').type(data.email)
        cy.clickButton('Rent')
        cy.contains('Success')
    })


    it('no pickup date provided', () => {

        cy.get('#search_form')
            .get('input[type="date"][name="dropoff"]')
            .type(data.dropOffDate)
            .clickButton('Search')

        cy.contains(data.dateError)
    })

    
    it('no drop off date provided', () => {

        cy.get('#search_form')
            .get('input[type="date"][name="pickup"]')
            .type(data.pickUpDate)
            .clickButton('Search')

        cy.contains(data.dateError)
    })
})