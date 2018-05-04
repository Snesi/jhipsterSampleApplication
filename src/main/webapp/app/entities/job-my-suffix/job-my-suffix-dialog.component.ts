import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobMySuffix } from './job-my-suffix.model';
import { JobMySuffixPopupService } from './job-my-suffix-popup.service';
import { JobMySuffixService } from './job-my-suffix.service';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';
import { TaskMySuffix, TaskMySuffixService } from '../task-my-suffix';

@Component({
    selector: 'jhi-job-my-suffix-dialog',
    templateUrl: './job-my-suffix-dialog.component.html'
})
export class JobMySuffixDialogComponent implements OnInit {

    job: JobMySuffix;
    isSaving: boolean;

    employees: EmployeeMySuffix[];

    tasks: TaskMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobService: JobMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private taskService: TaskMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: HttpResponse<EmployeeMySuffix[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.taskService.query()
            .subscribe((res: HttpResponse<TaskMySuffix[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(
                this.jobService.create(this.job));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobMySuffix>>) {
        result.subscribe((res: HttpResponse<JobMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobMySuffix) {
        this.eventManager.broadcast({ name: 'jobListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeeById(index: number, item: EmployeeMySuffix) {
        return item.id;
    }

    trackTaskById(index: number, item: TaskMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-job-my-suffix-popup',
    template: ''
})
export class JobMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobPopupService: JobMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobPopupService
                    .open(JobMySuffixDialogComponent as Component, params['id']);
            } else {
                this.jobPopupService
                    .open(JobMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
