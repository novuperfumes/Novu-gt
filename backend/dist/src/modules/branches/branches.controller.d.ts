import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    findAll(): Promise<any>;
    create(dto: CreateBranchDto): Promise<{
        id: number;
        telefono: string | null;
        direccion: string;
        departamento: string;
        municipio: string;
        nombre_sucursal: string;
    }>;
}
