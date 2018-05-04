/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobHistoryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/job-history-my-suffix/job-history-my-suffix-detail.component';
import { JobHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/job-history-my-suffix/job-history-my-suffix.service';
import { JobHistoryMySuffix } from '../../../../../../main/webapp/app/entities/job-history-my-suffix/job-history-my-suffix.model';

describe('Component Tests', () => {

    describe('JobHistoryMySuffix Management Detail Component', () => {
        let comp: JobHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<JobHistoryMySuffixDetailComponent>;
        let service: JobHistoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JobHistoryMySuffixDetailComponent],
                providers: [
                    JobHistoryMySuffixService
                ]
            })
            .overrideTemplate(JobHistoryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobHistoryMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
