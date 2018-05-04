/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TaskMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/task-my-suffix/task-my-suffix-detail.component';
import { TaskMySuffixService } from '../../../../../../main/webapp/app/entities/task-my-suffix/task-my-suffix.service';
import { TaskMySuffix } from '../../../../../../main/webapp/app/entities/task-my-suffix/task-my-suffix.model';

describe('Component Tests', () => {

    describe('TaskMySuffix Management Detail Component', () => {
        let comp: TaskMySuffixDetailComponent;
        let fixture: ComponentFixture<TaskMySuffixDetailComponent>;
        let service: TaskMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TaskMySuffixDetailComponent],
                providers: [
                    TaskMySuffixService
                ]
            })
            .overrideTemplate(TaskMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TaskMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.task).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
