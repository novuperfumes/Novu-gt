import { Controller, Get, Post, Delete, Param, UseGuards, Req, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Req() req: any) {
    const userId = req.user.sub;
    return this.favoritesService.getUserFavorites(userId);
  }

  @Post(':perfumeId')
  async addFavorite(@Req() req: any, @Param('perfumeId', ParseIntPipe) perfumeId: number) {
    const userId = req.user.sub;
    return this.favoritesService.addFavorite(userId, perfumeId);
  }

  @Delete(':perfumeId')
  @HttpCode(HttpStatus.OK)
  async removeFavorite(@Req() req: any, @Param('perfumeId', ParseIntPipe) perfumeId: number) {
    const userId = req.user.sub;
    return this.favoritesService.removeFavorite(userId, perfumeId);
  }
}
