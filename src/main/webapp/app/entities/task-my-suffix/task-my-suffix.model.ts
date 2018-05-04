import { BaseEntity } from './../../shared';

export class TaskMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public jobs?: BaseEntity[],
    ) {
    }
}
