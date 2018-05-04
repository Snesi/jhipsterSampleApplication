/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegionMySuffixComponent } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix.component';
import { RegionMySuffixService } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix.service';
import { RegionMySuffix } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix.model';

describe('Component Tests', () => {

    describe('RegionMySuffix Management Component', () => {
        let comp: RegionMySuffixComponent;
        let fixture: ComponentFixture<RegionMySuffixComponent>;
        let service: RegionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RegionMySuffixComponent],
                providers: [
                    RegionMySuffixService
                ]
            })
            .overrideTemplate(RegionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RegionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.regions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
