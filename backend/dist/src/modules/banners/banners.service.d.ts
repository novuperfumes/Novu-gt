import { PrismaService } from '../../common/prisma/prisma.service';
export declare class BannersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(page?: string, includeInactive?: boolean): Promise<{
        id: number;
        activo: boolean;
        link: string | null;
        orden: number;
        desc: string | null;
        page: string;
        bgImage: string;
        tag: string | null;
        title: string;
        btnText: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(data: any): Promise<{
        id: number;
        activo: boolean;
        link: string | null;
        orden: number;
        desc: string | null;
        page: string;
        bgImage: string;
        tag: string | null;
        title: string;
        btnText: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        activo: boolean;
        link: string | null;
        orden: number;
        desc: string | null;
        page: string;
        bgImage: string;
        tag: string | null;
        title: string;
        btnText: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        id: number;
        activo: boolean;
        link: string | null;
        orden: number;
        desc: string | null;
        page: string;
        bgImage: string;
        tag: string | null;
        title: string;
        btnText: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
