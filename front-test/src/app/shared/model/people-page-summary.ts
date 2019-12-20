import { Character } from './character.model';

export interface PeoplePageSummary {
    count?: number;
    next?: string;
    previous?: string;
    results?: Character[];
}
