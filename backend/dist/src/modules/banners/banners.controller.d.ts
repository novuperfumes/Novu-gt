import { BannersService } from './banners.service';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    findAll(page?: string, admin?: string): Promise<{
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
    update(id: string, data: any): Promise<{
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
    delete(id: string): Promise<{
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
