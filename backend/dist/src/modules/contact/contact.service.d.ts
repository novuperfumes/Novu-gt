import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ContactService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMessageDto): Promise<{
        id: number;
        correo: string;
        nombre: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        correo: string;
        nombre: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }[]>;
    markAsRead(id: number): Promise<{
        id: number;
        correo: string;
        nombre: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
}
