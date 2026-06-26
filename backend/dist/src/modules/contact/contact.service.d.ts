import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ContactService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMessageDto): Promise<{
        nombre: string;
        id: number;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
    findAll(): Promise<{
        nombre: string;
        id: number;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }[]>;
    markAsRead(id: number): Promise<{
        nombre: string;
        id: number;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
}
