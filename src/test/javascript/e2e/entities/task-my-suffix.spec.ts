import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Task e2e test', () => {

    let navBarPage: NavBarPage;
    let taskDialogPage: TaskDialogPage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tasks', () => {
        navBarPage.goToEntity('task-my-suffix');
        taskComponentsPage = new TaskComponentsPage();
        expect(taskComponentsPage.getTitle())
            .toMatch(/jhipsterSampleApplicationApp.task.home.title/);

    });

    it('should load create Task dialog', () => {
        taskComponentsPage.clickOnCreateButton();
        taskDialogPage = new TaskDialogPage();
        expect(taskDialogPage.getModalTitle())
            .toMatch(/jhipsterSampleApplicationApp.task.home.createOrEditLabel/);
        taskDialogPage.close();
    });

    it('should create and save Tasks', () => {
        taskComponentsPage.clickOnCreateButton();
        taskDialogPage.setTitleInput('title');
        expect(taskDialogPage.getTitleInput()).toMatch('title');
        taskDialogPage.setDescriptionInput('description');
        expect(taskDialogPage.getDescriptionInput()).toMatch('description');
        taskDialogPage.save();
        expect(taskDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TaskComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-task-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaskDialogPage {
    modalTitle = element(by.css('h4#myTaskLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
