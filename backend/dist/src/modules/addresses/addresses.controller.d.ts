import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(req: any, dto: CreateAddressDto): Promise<{
        id: number;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    findAll(req: any): Promise<{
        id: number;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }[]>;
    findOne(req: any, id: number): Promise<{
        id: number;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    update(req: any, id: number, dto: UpdateAddressDto): Promise<{
        id: number;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
    remove(req: any, id: number): Promise<{
        id: number;
        id_usuario: number;
        direccion: string;
        departamento: string;
        municipio: string;
        referencias: string | null;
        codigo_postal: string | null;
    }>;
}
