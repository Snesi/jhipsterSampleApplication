/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix-detail.component';
import { CountryMySuffixService } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.service';
import { CountryMySuffix } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.model';

describe('Component Tests', () => {

    describe('CountryMySuffix Management Detail Component', () => {
        let comp: CountryMySuffixDetailComponent;
        let fixture: ComponentFixture<CountryMySuffixDetailComponent>;
        let service: CountryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [CountryMySuffixDetailComponent],
                providers: [
                    CountryMySuffixService
                ]
            })
            .overrideTemplate(CountryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CountryMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
