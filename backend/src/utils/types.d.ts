export interface NewFoodEntry {
    nombre: string;
    origen: string;
    ingredientes: string[];
    kilocalorias: number;
    carbohidratos: number;
    grasas: number;
    peso: number;
    precio: number;
    tipo: string;
    imagen: string;
    descripcion: string;
    stock: string;
}

// export type NonSensitiveInfoFoodEntry = FoodEntry;

export type NewFoodEntry = Omit<FoodEntry , 'id'>;


export interface UpdateFoodEntry {
    nombre?: string;
    origen?: string;
    ingredientes?: string[];
    kilocalorias?: number;
    carbohidratos?: number;
    grasas?: number;
    peso?: number;
    precio?: number;
    tipo?: string;
    imagen?: string;
    descripcion?: string;
    stock?: string;
}