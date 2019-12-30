import { Character } from './character.model';

/**
 * Model that represents the object
 * that comes from the request to the api: /people
 */
export class PeoplePageSummary {

    constructor(
        public count?: number,
        public next?: string,
        public previous?: string,
        public results?: Character[]
    ) {}
}
