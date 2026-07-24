import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(dto: CreateMessageDto): Promise<{
        id: number;
        nombre: string;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        nombre: string;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }[]>;
    markAsRead(id: number): Promise<{
        id: number;
        nombre: string;
        correo: string;
        asunto: string;
        mensaje: string;
        fecha_creacion: Date;
        leido: boolean;
    }>;
}
