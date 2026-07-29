import { PrismaService } from '../../common/prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_perfume: number;
        id_usuario: number;
        fecha_agregado: Date;
    }>;
    removeFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_perfume: number;
        id_usuario: number;
        fecha_agregado: Date;
    }>;
    getUserFavorites(userId: number): Promise<({
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
        id_perfume: number;
        id_usuario: number;
        fecha_agregado: Date;
    })[]>;
}
