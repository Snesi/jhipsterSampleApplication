import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobHistoryMySuffix } from './job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';

@Component({
    selector: 'jhi-job-history-my-suffix-detail',
    templateUrl: './job-history-my-suffix-detail.component.html'
})
export class JobHistoryMySuffixDetailComponent implements OnInit, OnDestroy {

    jobHistory: JobHistoryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobHistoryService: JobHistoryMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobHistories();
    }

    load(id) {
        this.jobHistoryService.find(id)
            .subscribe((jobHistoryResponse: HttpResponse<JobHistoryMySuffix>) => {
                this.jobHistory = jobHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobHistoryListModification',
            (response) => this.load(this.jobHistory.id)
        );
    }
}
