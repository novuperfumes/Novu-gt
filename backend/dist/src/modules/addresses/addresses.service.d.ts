import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateAddressDto): Promise<{
        direccion: string;
        id: number;
        id_usuario: number;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    findAllByUser(userId: number): Promise<{
        direccion: string;
        id: number;
        id_usuario: number;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }[]>;
    findOne(userId: number, addressId: number): Promise<{
        direccion: string;
        id: number;
        id_usuario: number;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    update(userId: number, addressId: number, dto: UpdateAddressDto): Promise<{
        direccion: string;
        id: number;
        id_usuario: number;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    remove(userId: number, addressId: number): Promise<{
        direccion: string;
        id: number;
        id_usuario: number;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
}
