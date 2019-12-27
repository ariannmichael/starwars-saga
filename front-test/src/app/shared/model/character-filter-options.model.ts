/** Model to pass character's options to filter  */

export class CharacterFilterOptions {

    constructor(
        public height?: string,
        public mass?: string,
        public hairColors?: Set<string>,
        public skinColors?: Set<string>,
        public eyeColors?: Set<string>,
        public birthYear?: string[],
        public gender?: string[]
    ) {}
}