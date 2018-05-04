import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegionMySuffix } from './region-my-suffix.model';
import { RegionMySuffixPopupService } from './region-my-suffix-popup.service';
import { RegionMySuffixService } from './region-my-suffix.service';

@Component({
    selector: 'jhi-region-my-suffix-delete-dialog',
    templateUrl: './region-my-suffix-delete-dialog.component.html'
})
export class RegionMySuffixDeleteDialogComponent {

    region: RegionMySuffix;

    constructor(
        private regionService: RegionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regionListModification',
                content: 'Deleted an region'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-region-my-suffix-delete-popup',
    template: ''
})
export class RegionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regionPopupService
                .open(RegionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
