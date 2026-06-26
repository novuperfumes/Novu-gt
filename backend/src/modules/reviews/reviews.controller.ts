import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('perfume/:perfumeId')
  async getByPerfume(@Param('perfumeId', ParseIntPipe) perfumeId: number) {
    return this.reviewsService.findByPerfume(perfumeId);
  }

  @Post(':perfumeId')
  @UseGuards(AuthGuard)
  async createReview(
    @Req() req: any,
    @Param('perfumeId', ParseIntPipe) perfumeId: number,
    @Body() dto: CreateReviewDto,
  ) {
    const userId = req.user.sub;
    return this.reviewsService.create(userId, perfumeId, dto);
  }

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
