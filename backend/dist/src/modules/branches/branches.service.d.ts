import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreateBranchDto } from './dto/create-branch.dto';
export declare class BranchesService {
    private prisma;
    private redisService;
    private readonly CACHE_KEY;
    private readonly CACHE_TTL;
    constructor(prisma: PrismaService, redisService: RedisService);
    create(dto: CreateBranchDto): Promise<{
        id: number;
        telefono: string | null;
        direccion: string;
        departamento: string;
        municipio: string;
        nombre_sucursal: string;
    }>;
    findAll(): Promise<any>;
    private invalidateCache;
}
