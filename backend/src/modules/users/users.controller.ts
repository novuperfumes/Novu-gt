import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

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
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getAdminMetrics() {
    return this.usersService.getAdminMetrics();
  }

  @Get('search')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async searchUsers(@Query('q') q: string) {
    return this.usersService.searchUsers(q || '');
  }

  @Patch(':id/sellos')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async updateSellos(
    @Param('id') id: string,
    @Body() body: { sellos: number },
  ) {
    return this.usersService.updateSellos(Number(id), body.sellos);
  }
}
