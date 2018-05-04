import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Employee e2e test', () => {

    let navBarPage: NavBarPage;
    let employeeDialogPage: EmployeeDialogPage;
    let employeeComponentsPage: EmployeeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Employees', () => {
        navBarPage.goToEntity('employee-my-suffix');
        employeeComponentsPage = new EmployeeComponentsPage();
        expect(employeeComponentsPage.getTitle())
            .toMatch(/jhipsterSampleApplicationApp.employee.home.title/);

    });

    it('should load create Employee dialog', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage = new EmployeeDialogPage();
        expect(employeeDialogPage.getModalTitle())
            .toMatch(/jhipsterSampleApplicationApp.employee.home.createOrEditLabel/);
        employeeDialogPage.close();
    });

    it('should create and save Employees', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage.setFirstNameInput('firstName');
        expect(employeeDialogPage.getFirstNameInput()).toMatch('firstName');
        employeeDialogPage.setLastNameInput('lastName');
        expect(employeeDialogPage.getLastNameInput()).toMatch('lastName');
        employeeDialogPage.setEmailInput('email');
        expect(employeeDialogPage.getEmailInput()).toMatch('email');
        employeeDialogPage.setPhoneNumberInput('phoneNumber');
        expect(employeeDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        employeeDialogPage.setHireDateInput(12310020012301);
        expect(employeeDialogPage.getHireDateInput()).toMatch('2001-12-31T02:30');
        employeeDialogPage.setSalaryInput('5');
        expect(employeeDialogPage.getSalaryInput()).toMatch('5');
        employeeDialogPage.setCommissionPctInput('5');
        expect(employeeDialogPage.getCommissionPctInput()).toMatch('5');
        employeeDialogPage.departmentSelectLastOption();
        employeeDialogPage.managerSelectLastOption();
        employeeDialogPage.save();
        expect(employeeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EmployeeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-employee-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmployeeDialogPage {
    modalTitle = element(by.css('h4#myEmployeeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    hireDateInput = element(by.css('input#field_hireDate'));
    salaryInput = element(by.css('input#field_salary'));
    commissionPctInput = element(by.css('input#field_commissionPct'));
    departmentSelect = element(by.css('select#field_department'));
    managerSelect = element(by.css('select#field_manager'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    };

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    };

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    };

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setHireDateInput = function(hireDate) {
        this.hireDateInput.sendKeys(hireDate);
    };

    getHireDateInput = function() {
        return this.hireDateInput.getAttribute('value');
    };

    setSalaryInput = function(salary) {
        this.salaryInput.sendKeys(salary);
    };

    getSalaryInput = function() {
        return this.salaryInput.getAttribute('value');
    };

    setCommissionPctInput = function(commissionPct) {
        this.commissionPctInput.sendKeys(commissionPct);
    };

    getCommissionPctInput = function() {
        return this.commissionPctInput.getAttribute('value');
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

    managerSelectLastOption = function() {
        this.managerSelect.all(by.tagName('option')).last().click();
    };

    managerSelectOption = function(option) {
        this.managerSelect.sendKeys(option);
    };

    getManagerSelect = function() {
        return this.managerSelect;
    };

    getManagerSelectedOption = function() {
        return this.managerSelect.element(by.css('option:checked')).getText();
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
