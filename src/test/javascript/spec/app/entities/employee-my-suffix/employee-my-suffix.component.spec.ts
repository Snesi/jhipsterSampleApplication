/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EmployeeMySuffixComponent } from '../../../../../../main/webapp/app/entities/employee-my-suffix/employee-my-suffix.component';
import { EmployeeMySuffixService } from '../../../../../../main/webapp/app/entities/employee-my-suffix/employee-my-suffix.service';
import { EmployeeMySuffix } from '../../../../../../main/webapp/app/entities/employee-my-suffix/employee-my-suffix.model';

describe('Component Tests', () => {

    describe('EmployeeMySuffix Management Component', () => {
        let comp: EmployeeMySuffixComponent;
        let fixture: ComponentFixture<EmployeeMySuffixComponent>;
        let service: EmployeeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EmployeeMySuffixComponent],
                providers: [
                    EmployeeMySuffixService
                ]
            })
            .overrideTemplate(EmployeeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmployeeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
