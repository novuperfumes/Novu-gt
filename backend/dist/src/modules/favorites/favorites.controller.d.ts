import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(req: any): Promise<({
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_usuario: number;
        fecha_agregado: Date;
        id_perfume: number;
    })[]>;
    addFavorite(req: any, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha_agregado: Date;
        id_perfume: number;
    }>;
    removeFavorite(req: any, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha_agregado: Date;
        id_perfume: number;
    }>;
}
