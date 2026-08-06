import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    canReview(userId: number, perfumeId: number): Promise<{
        canReview: boolean;
        existing: {
            id: number;
            id_usuario: number;
            fecha: Date;
            id_perfume: number;
            calificacion: number;
            comentario: string;
            compra_label: string | null;
        } | null;
        compra_label: string | null;
    }>;
    private buildCompraLabel;
    upsert(userId: number, perfumeId: number, dto: CreateReviewDto): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        id_perfume: number;
        calificacion: number;
        comentario: string;
        compra_label: string | null;
    }>;
    findByPerfume(perfumeId: number): Promise<{
        resenias: ({
            usuario: {
                nombre: string;
                apellido: string;
            };
        } & {
            id: number;
            id_usuario: number;
            fecha: Date;
            id_perfume: number;
            calificacion: number;
            comentario: string;
            compra_label: string | null;
        })[];
        promedio: number;
        total: number;
    }>;
    remove(userId: number, reviewId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        id_perfume: number;
        calificacion: number;
        comentario: string;
        compra_label: string | null;
    }>;
}
