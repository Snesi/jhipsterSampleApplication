/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobHistoryMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/job-history-my-suffix/job-history-my-suffix-delete-dialog.component';
import { JobHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/job-history-my-suffix/job-history-my-suffix.service';

describe('Component Tests', () => {

    describe('JobHistoryMySuffix Management Delete Component', () => {
        let comp: JobHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<JobHistoryMySuffixDeleteDialogComponent>;
        let service: JobHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JobHistoryMySuffixDeleteDialogComponent],
                providers: [
                    JobHistoryMySuffixService
                ]
            })
            .overrideTemplate(JobHistoryMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
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
