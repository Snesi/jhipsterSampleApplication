/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountryMySuffixComponent } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.component';
import { CountryMySuffixService } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.service';
import { CountryMySuffix } from '../../../../../../main/webapp/app/entities/country-my-suffix/country-my-suffix.model';

describe('Component Tests', () => {

    describe('CountryMySuffix Management Component', () => {
        let comp: CountryMySuffixComponent;
        let fixture: ComponentFixture<CountryMySuffixComponent>;
        let service: CountryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [CountryMySuffixComponent],
                providers: [
                    CountryMySuffixService
                ]
            })
            .overrideTemplate(CountryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CountryMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
