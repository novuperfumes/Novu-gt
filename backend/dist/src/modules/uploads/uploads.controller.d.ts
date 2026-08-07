import type { FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
export declare class UploadsController {
    private configService;
    private imagekit;
    constructor(configService: ConfigService);
    uploadImage(req: FastifyRequest): Promise<{
        url: string;
    }>;
}
