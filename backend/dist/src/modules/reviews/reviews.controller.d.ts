import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getByPerfume(perfumeId: number): Promise<{
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
    canReview(req: any, perfumeId: number): Promise<{
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
    upsertReview(req: any, perfumeId: number, dto: CreateReviewDto): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        id_perfume: number;
        calificacion: number;
        comentario: string;
        compra_label: string | null;
    }>;
    removeReview(req: any, reviewId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        id_perfume: number;
        calificacion: number;
        comentario: string;
        compra_label: string | null;
    }>;
}
