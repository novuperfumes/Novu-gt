import { Controller, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ImageKit from 'imagekit';

@Controller('uploads')
@UseGuards(AuthGuard, RolesGuard)
export class UploadsController {
  private imagekit: ImageKit;

  constructor(private configService: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY') || '',
      privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY') || '',
      urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT') || '',
    });
  }
  
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

    // Read the file stream into a buffer for ImageKit
    const fileBuffer = await data.toBuffer();

    // Upload to ImageKit
    const uploadResponse = await this.imagekit.upload({
      file: fileBuffer,
      fileName: filename,
      folder: '/novu-gt', // Optional: group images in a folder
    });

    return {
      url: uploadResponse.url
    };
  }
}
