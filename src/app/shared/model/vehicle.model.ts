/**
 * Model that represents one star wars' vehicle from the list
 */
export interface Vehicle {
    name?: string;
    model?: string;
    vehicle_class?: string;
    manufacturer?: string;
    length?: string;
    cost_in_credits?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    cargo_capacity?: string;
    consumables?: string;
    pilots?: string[];
}