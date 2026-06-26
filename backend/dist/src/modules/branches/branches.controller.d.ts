import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    findAll(): Promise<any>;
    create(dto: CreateBranchDto): Promise<{
        id: number;
        direccion: string;
        telefono: string | null;
        departamento: string;
        municipio: string;
        nombre_sucursal: string;
    }>;
}
