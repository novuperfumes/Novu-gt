import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateAddressDto): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    findAllByUser(userId: number): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }[]>;
    findOne(userId: number, addressId: number): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    update(userId: number, addressId: number, dto: UpdateAddressDto): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    remove(userId: number, addressId: number): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
}
