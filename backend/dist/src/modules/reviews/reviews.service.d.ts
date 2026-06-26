import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, perfumeId: number, dto: CreateReviewDto): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        calificacion: number;
        comentario: string | null;
        id_perfume: number;
    }>;
    findByPerfume(perfumeId: number): Promise<({
        usuario: {
            nombre: string;
            apellido: string;
        };
    } & {
        id: number;
        id_usuario: number;
        fecha: Date;
        calificacion: number;
        comentario: string | null;
        id_perfume: number;
    })[]>;
    remove(userId: number, reviewId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        calificacion: number;
        comentario: string | null;
        id_perfume: number;
    }>;
}
