/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EmployeeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/employee-my-suffix/employee-my-suffix-delete-dialog.component';
import { EmployeeMySuffixService } from '../../../../../../main/webapp/app/entities/employee-my-suffix/employee-my-suffix.service';

describe('Component Tests', () => {

    describe('EmployeeMySuffix Management Delete Component', () => {
        let comp: EmployeeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EmployeeMySuffixDeleteDialogComponent>;
        let service: EmployeeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EmployeeMySuffixDeleteDialogComponent],
                providers: [
                    EmployeeMySuffixService
                ]
            })
            .overrideTemplate(EmployeeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
