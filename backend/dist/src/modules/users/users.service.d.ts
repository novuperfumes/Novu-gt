import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
    findOneByCorreo(correo: string): Promise<Usuario | null>;
    findOneById(id: number): Promise<Omit<Usuario, 'contrasenia'> | null>;
    updateProfile(id: number, data: Prisma.UsuarioUpdateInput): Promise<Omit<Usuario, 'contrasenia'>>;
}
