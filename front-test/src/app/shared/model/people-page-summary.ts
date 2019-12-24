import { Character } from './character.model';

/**
 * Model that represents the response
 * that comes from the request to people path
 */
export class PeoplePageSummary {

    constructor(
        public count?: number,
        public next?: string,
        public previous?: string,
        public results?: Character[]
    ) {}
}
