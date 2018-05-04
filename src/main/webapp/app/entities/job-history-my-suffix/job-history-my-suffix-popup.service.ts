import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JobHistoryMySuffix } from './job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';

@Injectable()
export class JobHistoryMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private jobHistoryService: JobHistoryMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobHistoryService.find(id)
                    .subscribe((jobHistoryResponse: HttpResponse<JobHistoryMySuffix>) => {
                        const jobHistory: JobHistoryMySuffix = jobHistoryResponse.body;
                        jobHistory.startDate = this.datePipe
                            .transform(jobHistory.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        jobHistory.endDate = this.datePipe
                            .transform(jobHistory.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.jobHistoryModalRef(component, jobHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobHistoryModalRef(component, new JobHistoryMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobHistoryModalRef(component: Component, jobHistory: JobHistoryMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobHistory = jobHistory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
