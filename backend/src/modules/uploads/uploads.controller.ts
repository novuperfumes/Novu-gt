import { Controller, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';

@Controller('uploads')
@UseGuards(AuthGuard, RolesGuard)
export class UploadsController {
  
  @Post('image')
  @Roles('ADMIN')
  async uploadImage(@Req() req: FastifyRequest) {
    const data = await req.file();
    if (!data) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(data.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const ext = path.extname(data.filename) || '.jpg';
    const filename = `${uuidv4()}${ext}`;
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const saveTo = path.join(uploadsDir, filename);

    // Save the file
    await pipeline(data.file, fs.createWriteStream(saveTo));

    return {
      url: `/uploads/${filename}`
    };
  }
}
