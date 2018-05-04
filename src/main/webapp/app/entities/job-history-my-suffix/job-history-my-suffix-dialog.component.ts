import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobHistoryMySuffix } from './job-history-my-suffix.model';
import { JobHistoryMySuffixPopupService } from './job-history-my-suffix-popup.service';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';
import { JobMySuffix, JobMySuffixService } from '../job-my-suffix';
import { DepartmentMySuffix, DepartmentMySuffixService } from '../department-my-suffix';
import { EmployeeMySuffix, EmployeeMySuffixService } from '../employee-my-suffix';

@Component({
    selector: 'jhi-job-history-my-suffix-dialog',
    templateUrl: './job-history-my-suffix-dialog.component.html'
})
export class JobHistoryMySuffixDialogComponent implements OnInit {

    jobHistory: JobHistoryMySuffix;
    isSaving: boolean;

    jobs: JobMySuffix[];

    departments: DepartmentMySuffix[];

    employees: EmployeeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobHistoryService: JobHistoryMySuffixService,
        private jobService: JobMySuffixService,
        private departmentService: DepartmentMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.jobService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: HttpResponse<JobMySuffix[]>) => {
                if (!this.jobHistory.jobId) {
                    this.jobs = res.body;
                } else {
                    this.jobService
                        .find(this.jobHistory.jobId)
                        .subscribe((subRes: HttpResponse<JobMySuffix>) => {
                            this.jobs = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.departmentService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: HttpResponse<DepartmentMySuffix[]>) => {
                if (!this.jobHistory.departmentId) {
                    this.departments = res.body;
                } else {
                    this.departmentService
                        .find(this.jobHistory.departmentId)
                        .subscribe((subRes: HttpResponse<DepartmentMySuffix>) => {
                            this.departments = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService
            .query({filter: 'jobhistory-is-null'})
            .subscribe((res: HttpResponse<EmployeeMySuffix[]>) => {
                if (!this.jobHistory.employeeId) {
                    this.employees = res.body;
                } else {
                    this.employeeService
                        .find(this.jobHistory.employeeId)
                        .subscribe((subRes: HttpResponse<EmployeeMySuffix>) => {
                            this.employees = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(
                this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobHistoryMySuffix>>) {
        result.subscribe((res: HttpResponse<JobHistoryMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobHistoryMySuffix) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJobById(index: number, item: JobMySuffix) {
        return item.id;
    }

    trackDepartmentById(index: number, item: DepartmentMySuffix) {
        return item.id;
    }

    trackEmployeeById(index: number, item: EmployeeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-history-my-suffix-popup',
    template: ''
})
export class JobHistoryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobHistoryPopupService
                    .open(JobHistoryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.jobHistoryPopupService
                    .open(JobHistoryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
