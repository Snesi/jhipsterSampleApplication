/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix-detail.component';
import { RegionMySuffixService } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix.service';
import { RegionMySuffix } from '../../../../../../main/webapp/app/entities/region-my-suffix/region-my-suffix.model';

describe('Component Tests', () => {

    describe('RegionMySuffix Management Detail Component', () => {
        let comp: RegionMySuffixDetailComponent;
        let fixture: ComponentFixture<RegionMySuffixDetailComponent>;
        let service: RegionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RegionMySuffixDetailComponent],
                providers: [
                    RegionMySuffixService
                ]
            })
            .overrideTemplate(RegionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RegionMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.region).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
