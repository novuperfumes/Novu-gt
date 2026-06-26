import { PrismaService } from '../../common/prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    }>;
    removeFavorite(userId: number, perfumeId: number): Promise<{
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    }>;
    getUserFavorites(userId: number): Promise<({
        perfume: {
            nombre: string;
            descripcion: string;
            categoria: string;
            imagen: string;
            marca: string;
            activo: boolean;
            id: number;
        };
    } & {
        id: number;
        id_usuario: number;
        id_perfume: number;
        fecha_agregado: Date;
    })[]>;
}
