/**
 * Model that represents one star wars' starship from the list
 */
export interface Starship {
    name?: string;
    model?: string;
    starship_class?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    hyperdrive_rating?: string;
    MGLT?: string;
    consumables?: string;
    pilots?: string[];
}