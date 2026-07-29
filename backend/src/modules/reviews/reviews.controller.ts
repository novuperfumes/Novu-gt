import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /** Público: lista reseñas de un perfume con promedio */
  @Get('perfume/:perfumeId')
  async getByPerfume(@Param('perfumeId', ParseIntPipe) perfumeId: number) {
    return this.reviewsService.findByPerfume(perfumeId);
  }

  /** Privado: ¿puede el usuario reseñar este perfume? */
  @Get('can-review/:perfumeId')
  @UseGuards(AuthGuard)
  async canReview(
    @Req() req: any,
    @Param('perfumeId', ParseIntPipe) perfumeId: number,
  ) {
    const userId = req.user.sub;
    return this.reviewsService.canReview(userId, perfumeId);
  }

  /** Privado: crear o actualizar (upsert) reseña */
  @Post(':perfumeId')
  @UseGuards(AuthGuard)
  async upsertReview(
    @Req() req: any,
    @Param('perfumeId', ParseIntPipe) perfumeId: number,
    @Body() dto: CreateReviewDto,
  ) {
    const userId = req.user.sub;
    return this.reviewsService.upsert(userId, perfumeId, dto);
  }

  /** Privado: borrar reseña propia */
  @Delete(':reviewId')
  @UseGuards(AuthGuard)
  async removeReview(
    @Req() req: any,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    const userId = req.user.sub;
    return this.reviewsService.remove(userId, reviewId);
  }
}
