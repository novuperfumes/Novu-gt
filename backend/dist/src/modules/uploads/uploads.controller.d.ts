import type { FastifyRequest } from 'fastify';
export declare class UploadsController {
    uploadImage(req: FastifyRequest): Promise<{
        url: string;
    }>;
}
