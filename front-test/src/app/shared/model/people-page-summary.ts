import { Character } from './character.model';

export class PeoplePageSummary {

    constructor(
        public count?: number,
        public next?: string,
        public previous?: string,
        public results?: Character[]
    ) {}
}
