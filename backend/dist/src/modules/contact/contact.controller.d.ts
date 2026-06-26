import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
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
