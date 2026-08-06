import { PrismaService } from '../../common/prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha_agregado: Date;
        id_perfume: number;
    }>;
    removeFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha_agregado: Date;
        id_perfume: number;
    }>;
    getUserFavorites(userId: number): Promise<({
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
}
