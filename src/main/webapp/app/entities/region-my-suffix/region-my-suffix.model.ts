import { BaseEntity } from './../../shared';

export class RegionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public regionName?: string,
    ) {
    }
}
