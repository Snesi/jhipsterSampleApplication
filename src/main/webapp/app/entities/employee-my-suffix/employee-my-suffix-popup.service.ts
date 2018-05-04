import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EmployeeMySuffix } from './employee-my-suffix.model';
import { EmployeeMySuffixService } from './employee-my-suffix.service';

@Injectable()
export class EmployeeMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private employeeService: EmployeeMySuffixService

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
                this.employeeService.find(id)
                    .subscribe((employeeResponse: HttpResponse<EmployeeMySuffix>) => {
                        const employee: EmployeeMySuffix = employeeResponse.body;
                        employee.hireDate = this.datePipe
                            .transform(employee.hireDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.employeeModalRef(component, employee);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeeModalRef(component, new EmployeeMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeeModalRef(component: Component, employee: EmployeeMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employee = employee;
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
