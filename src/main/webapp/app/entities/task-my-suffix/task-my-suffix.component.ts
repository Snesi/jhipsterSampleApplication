import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaskMySuffix } from './task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-task-my-suffix',
    templateUrl: './task-my-suffix.component.html'
})
export class TaskMySuffixComponent implements OnInit, OnDestroy {
tasks: TaskMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taskService: TaskMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.taskService.query().subscribe(
            (res: HttpResponse<TaskMySuffix[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TaskMySuffix) {
        return item.id;
    }
    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
