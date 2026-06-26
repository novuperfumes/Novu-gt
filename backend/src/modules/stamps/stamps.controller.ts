import { Controller, Get, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { StampsService } from './stamps.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('stamps')
@UseGuards(AuthGuard)
export class StampsController {
  constructor(private readonly stampsService: StampsService) {}

  @Get()
  async getMyStamps(@Req() req: any) {
    const userId = req.user.sub;
    return this.stampsService.getUserStamps(userId);
  }

  @Get('admin/user/:userId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getUserStampsForAdmin(@Param('userId', ParseIntPipe) userId: number) {
    return this.stampsService.getUserStamps(userId);
  }
}
