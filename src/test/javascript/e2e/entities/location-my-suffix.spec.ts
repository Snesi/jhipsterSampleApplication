import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Location e2e test', () => {

    let navBarPage: NavBarPage;
    let locationDialogPage: LocationDialogPage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location-my-suffix');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle())
            .toMatch(/jhipsterSampleApplicationApp.location.home.title/);

    });

    it('should load create Location dialog', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage = new LocationDialogPage();
        expect(locationDialogPage.getModalTitle())
            .toMatch(/jhipsterSampleApplicationApp.location.home.createOrEditLabel/);
        locationDialogPage.close();
    });

    it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage.setStreetNumberInput('streetNumber');
        expect(locationDialogPage.getStreetNumberInput()).toMatch('streetNumber');
        locationDialogPage.setStreetAddressInput('streetAddress');
        expect(locationDialogPage.getStreetAddressInput()).toMatch('streetAddress');
        locationDialogPage.setPostalCodeInput('postalCode');
        expect(locationDialogPage.getPostalCodeInput()).toMatch('postalCode');
        locationDialogPage.setCityInput('city');
        expect(locationDialogPage.getCityInput()).toMatch('city');
        locationDialogPage.setStateProvinceInput('stateProvince');
        expect(locationDialogPage.getStateProvinceInput()).toMatch('stateProvince');
        locationDialogPage.countrySelectLastOption();
        locationDialogPage.save();
        expect(locationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LocationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-location-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LocationDialogPage {
    modalTitle = element(by.css('h4#myLocationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    streetNumberInput = element(by.css('input#field_streetNumber'));
    streetAddressInput = element(by.css('input#field_streetAddress'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    cityInput = element(by.css('input#field_city'));
    stateProvinceInput = element(by.css('input#field_stateProvince'));
    countrySelect = element(by.css('select#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStreetNumberInput = function(streetNumber) {
        this.streetNumberInput.sendKeys(streetNumber);
    };

    getStreetNumberInput = function() {
        return this.streetNumberInput.getAttribute('value');
    };

    setStreetAddressInput = function(streetAddress) {
        this.streetAddressInput.sendKeys(streetAddress);
    };

    getStreetAddressInput = function() {
        return this.streetAddressInput.getAttribute('value');
    };

    setPostalCodeInput = function(postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    };

    getPostalCodeInput = function() {
        return this.postalCodeInput.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setStateProvinceInput = function(stateProvince) {
        this.stateProvinceInput.sendKeys(stateProvince);
    };

    getStateProvinceInput = function() {
        return this.stateProvinceInput.getAttribute('value');
    };

    countrySelectLastOption = function() {
        this.countrySelect.all(by.tagName('option')).last().click();
    };

    countrySelectOption = function(option) {
        this.countrySelect.sendKeys(option);
    };

    getCountrySelect = function() {
        return this.countrySelect;
    };

    getCountrySelectedOption = function() {
        return this.countrySelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
