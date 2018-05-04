/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LocationMySuffixComponent } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix.component';
import { LocationMySuffixService } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix.service';
import { LocationMySuffix } from '../../../../../../main/webapp/app/entities/location-my-suffix/location-my-suffix.model';

describe('Component Tests', () => {

    describe('LocationMySuffix Management Component', () => {
        let comp: LocationMySuffixComponent;
        let fixture: ComponentFixture<LocationMySuffixComponent>;
        let service: LocationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [LocationMySuffixComponent],
                providers: [
                    LocationMySuffixService
                ]
            })
            .overrideTemplate(LocationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LocationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.locations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
