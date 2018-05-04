import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { JhipsterSampleApplicationCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { JhipsterSampleApplicationLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { JhipsterSampleApplicationDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { JhipsterSampleApplicationTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { JhipsterSampleApplicationEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { JhipsterSampleApplicationJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { JhipsterSampleApplicationJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationRegionMySuffixModule,
        JhipsterSampleApplicationCountryMySuffixModule,
        JhipsterSampleApplicationLocationMySuffixModule,
        JhipsterSampleApplicationDepartmentMySuffixModule,
        JhipsterSampleApplicationTaskMySuffixModule,
        JhipsterSampleApplicationEmployeeMySuffixModule,
        JhipsterSampleApplicationJobMySuffixModule,
        JhipsterSampleApplicationJobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
