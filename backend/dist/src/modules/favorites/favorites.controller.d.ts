import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(req: any): Promise<({
        perfume: {
            id: number;
            nombre: string;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            genero: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
            activo: boolean;
        };
    } & {
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    })[]>;
    addFavorite(req: any, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    }>;
    removeFavorite(req: any, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    }>;
}
