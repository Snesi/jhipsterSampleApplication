import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('JobHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let jobHistoryDialogPage: JobHistoryDialogPage;
    let jobHistoryComponentsPage: JobHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load JobHistories', () => {
        navBarPage.goToEntity('job-history-my-suffix');
        jobHistoryComponentsPage = new JobHistoryComponentsPage();
        expect(jobHistoryComponentsPage.getTitle())
            .toMatch(/jhipsterSampleApplicationApp.jobHistory.home.title/);

    });

    it('should load create JobHistory dialog', () => {
        jobHistoryComponentsPage.clickOnCreateButton();
        jobHistoryDialogPage = new JobHistoryDialogPage();
        expect(jobHistoryDialogPage.getModalTitle())
            .toMatch(/jhipsterSampleApplicationApp.jobHistory.home.createOrEditLabel/);
        jobHistoryDialogPage.close();
    });

    it('should create and save JobHistories', () => {
        jobHistoryComponentsPage.clickOnCreateButton();
        jobHistoryDialogPage.setStartDateInput(12310020012301);
        expect(jobHistoryDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        jobHistoryDialogPage.setEndDateInput(12310020012301);
        expect(jobHistoryDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        jobHistoryDialogPage.languageSelectLastOption();
        jobHistoryDialogPage.jobSelectLastOption();
        jobHistoryDialogPage.departmentSelectLastOption();
        jobHistoryDialogPage.employeeSelectLastOption();
        jobHistoryDialogPage.save();
        expect(jobHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JobHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-job-history-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JobHistoryDialogPage {
    modalTitle = element(by.css('h4#myJobHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    languageSelect = element(by.css('select#field_language'));
    jobSelect = element(by.css('select#field_job'));
    departmentSelect = element(by.css('select#field_department'));
    employeeSelect = element(by.css('select#field_employee'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setLanguageSelect = function(language) {
        this.languageSelect.sendKeys(language);
    };

    getLanguageSelect = function() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    };

    languageSelectLastOption = function() {
        this.languageSelect.all(by.tagName('option')).last().click();
    };
    jobSelectLastOption = function() {
        this.jobSelect.all(by.tagName('option')).last().click();
    };

    jobSelectOption = function(option) {
        this.jobSelect.sendKeys(option);
    };

    getJobSelect = function() {
        return this.jobSelect;
    };

    getJobSelectedOption = function() {
        return this.jobSelect.element(by.css('option:checked')).getText();
    };

    departmentSelectLastOption = function() {
        this.departmentSelect.all(by.tagName('option')).last().click();
    };

    departmentSelectOption = function(option) {
        this.departmentSelect.sendKeys(option);
    };

    getDepartmentSelect = function() {
        return this.departmentSelect;
    };

    getDepartmentSelectedOption = function() {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    };

    employeeSelectLastOption = function() {
        this.employeeSelect.all(by.tagName('option')).last().click();
    };

    employeeSelectOption = function(option) {
        this.employeeSelect.sendKeys(option);
    };

    getEmployeeSelect = function() {
        return this.employeeSelect;
    };

    getEmployeeSelectedOption = function() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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
