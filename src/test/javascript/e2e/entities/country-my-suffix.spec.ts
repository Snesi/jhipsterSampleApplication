import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Country e2e test', () => {

    let navBarPage: NavBarPage;
    let countryDialogPage: CountryDialogPage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country-my-suffix');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle())
            .toMatch(/jhipsterSampleApplicationApp.country.home.title/);

    });

    it('should load create Country dialog', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage = new CountryDialogPage();
        expect(countryDialogPage.getModalTitle())
            .toMatch(/jhipsterSampleApplicationApp.country.home.createOrEditLabel/);
        countryDialogPage.close();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage.setCountryNameInput('countryName');
        expect(countryDialogPage.getCountryNameInput()).toMatch('countryName');
        countryDialogPage.regionSelectLastOption();
        countryDialogPage.save();
        expect(countryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CountryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-country-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CountryDialogPage {
    modalTitle = element(by.css('h4#myCountryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    countryNameInput = element(by.css('input#field_countryName'));
    regionSelect = element(by.css('select#field_region'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCountryNameInput = function(countryName) {
        this.countryNameInput.sendKeys(countryName);
    };

    getCountryNameInput = function() {
        return this.countryNameInput.getAttribute('value');
    };

    regionSelectLastOption = function() {
        this.regionSelect.all(by.tagName('option')).last().click();
    };

    regionSelectOption = function(option) {
        this.regionSelect.sendKeys(option);
    };

    getRegionSelect = function() {
        return this.regionSelect;
    };

    getRegionSelectedOption = function() {
        return this.regionSelect.element(by.css('option:checked')).getText();
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
