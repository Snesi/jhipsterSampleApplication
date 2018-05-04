/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JobMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/job-my-suffix/job-my-suffix-detail.component';
import { JobMySuffixService } from '../../../../../../main/webapp/app/entities/job-my-suffix/job-my-suffix.service';
import { JobMySuffix } from '../../../../../../main/webapp/app/entities/job-my-suffix/job-my-suffix.model';

describe('Component Tests', () => {

    describe('JobMySuffix Management Detail Component', () => {
        let comp: JobMySuffixDetailComponent;
        let fixture: ComponentFixture<JobMySuffixDetailComponent>;
        let service: JobMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JobMySuffixDetailComponent],
                providers: [
                    JobMySuffixService
                ]
            })
            .overrideTemplate(JobMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.job).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
