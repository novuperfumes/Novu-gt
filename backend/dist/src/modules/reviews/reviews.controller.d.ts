import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getByPerfume(perfumeId: number): Promise<({
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
    createReview(req: any, perfumeId: number, dto: CreateReviewDto): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        calificacion: number;
        comentario: string | null;
        id_perfume: number;
    }>;
    removeReview(req: any, reviewId: number): Promise<{
        id: number;
        id_usuario: number;
        fecha: Date;
        calificacion: number;
        comentario: string | null;
        id_perfume: number;
    }>;
}
