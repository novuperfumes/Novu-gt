import { Controller, Get, Patch, Body, UseGuards, Req, NotFoundException, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req: any) {
    const userId = req.user.sub;
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Patch('me')
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.usersService.updateProfile(userId, dto);
  }

  @Get('admin/metrics')
  async getAdminMetrics(@Req() req: any) {
    if (req.user.role !== 'ADMIN') throw new NotFoundException('No autorizado');
    return this.usersService.getAdminMetrics();
  }

  @Get('search')
  async searchUsers(@Req() req: any, @Query('q') q: string) {
    if (req.user.role !== 'ADMIN') throw new NotFoundException('No autorizado');
    return this.usersService.searchUsers(q || '');
  }

  @Patch(':id/sellos')
  async updateSellos(@Req() req: any, @Param('id') id: string, @Body() body: { sellos: number }) {
    if (req.user.role !== 'ADMIN') throw new NotFoundException('No autorizado');
    return this.usersService.updateSellos(Number(id), body.sellos);
  }
}
