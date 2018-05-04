import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LocationMySuffix } from './location-my-suffix.model';
import { LocationMySuffixPopupService } from './location-my-suffix-popup.service';
import { LocationMySuffixService } from './location-my-suffix.service';
import { CountryMySuffix, CountryMySuffixService } from '../country-my-suffix';

@Component({
    selector: 'jhi-location-my-suffix-dialog',
    templateUrl: './location-my-suffix-dialog.component.html'
})
export class LocationMySuffixDialogComponent implements OnInit {

    location: LocationMySuffix;
    isSaving: boolean;

    countries: CountryMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private locationService: LocationMySuffixService,
        private countryService: CountryMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService
            .query({filter: 'location-is-null'})
            .subscribe((res: HttpResponse<CountryMySuffix[]>) => {
                if (!this.location.countryId) {
                    this.countries = res.body;
                } else {
                    this.countryService
                        .find(this.location.countryId)
                        .subscribe((subRes: HttpResponse<CountryMySuffix>) => {
                            this.countries = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(
                this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(
                this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LocationMySuffix>>) {
        result.subscribe((res: HttpResponse<LocationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LocationMySuffix) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: CountryMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-location-my-suffix-popup',
    template: ''
})
export class LocationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private locationPopupService: LocationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.locationPopupService
                    .open(LocationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.locationPopupService
                    .open(LocationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
