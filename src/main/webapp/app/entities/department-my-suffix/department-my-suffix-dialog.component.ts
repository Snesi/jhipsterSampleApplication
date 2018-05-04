import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DepartmentMySuffix } from './department-my-suffix.model';
import { DepartmentMySuffixPopupService } from './department-my-suffix-popup.service';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { LocationMySuffix, LocationMySuffixService } from '../location-my-suffix';

@Component({
    selector: 'jhi-department-my-suffix-dialog',
    templateUrl: './department-my-suffix-dialog.component.html'
})
export class DepartmentMySuffixDialogComponent implements OnInit {

    department: DepartmentMySuffix;
    isSaving: boolean;

    locations: LocationMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private departmentService: DepartmentMySuffixService,
        private locationService: LocationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService
            .query({filter: 'department-is-null'})
            .subscribe((res: HttpResponse<LocationMySuffix[]>) => {
                if (!this.department.locationId) {
                    this.locations = res.body;
                } else {
                    this.locationService
                        .find(this.department.locationId)
                        .subscribe((subRes: HttpResponse<LocationMySuffix>) => {
                            this.locations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(
                this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(
                this.departmentService.create(this.department));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DepartmentMySuffix>>) {
        result.subscribe((res: HttpResponse<DepartmentMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DepartmentMySuffix) {
        this.eventManager.broadcast({ name: 'departmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: LocationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-department-my-suffix-popup',
    template: ''
})
export class DepartmentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.departmentPopupService
                    .open(DepartmentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.departmentPopupService
                    .open(DepartmentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
