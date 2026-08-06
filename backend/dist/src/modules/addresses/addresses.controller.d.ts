import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(req: any, dto: CreateAddressDto): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    findAll(req: any): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }[]>;
    findOne(req: any, id: number): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    update(req: any, id: number, dto: UpdateAddressDto): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
    remove(req: any, id: number): Promise<{
        id: number;
        codigo_postal: string | null;
        referencias: string | null;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
    }>;
}
