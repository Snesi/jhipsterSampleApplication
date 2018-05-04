/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { DepartmentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/department-my-suffix/department-my-suffix-detail.component';
import { DepartmentMySuffixService } from '../../../../../../main/webapp/app/entities/department-my-suffix/department-my-suffix.service';
import { DepartmentMySuffix } from '../../../../../../main/webapp/app/entities/department-my-suffix/department-my-suffix.model';

describe('Component Tests', () => {

    describe('DepartmentMySuffix Management Detail Component', () => {
        let comp: DepartmentMySuffixDetailComponent;
        let fixture: ComponentFixture<DepartmentMySuffixDetailComponent>;
        let service: DepartmentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [DepartmentMySuffixDetailComponent],
                providers: [
                    DepartmentMySuffixService
                ]
            })
            .overrideTemplate(DepartmentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DepartmentMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.department).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
