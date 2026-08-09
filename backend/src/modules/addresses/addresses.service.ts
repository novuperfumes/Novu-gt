import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateAddressDto) {
    return this.prisma.direccion.create({
      data: {
        ...dto,
        id_usuario: userId,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.direccion.findMany({
      where: { id_usuario: userId },
    });
  }

  async findOne(userId: number, addressId: number) {
    const address = await this.prisma.direccion.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Dirección no encontrada');
    }

    if (address.id_usuario !== userId) {
      throw new ForbiddenException('No tienes permiso para ver esta dirección');
    }

    return address;
  }

  async update(userId: number, addressId: number, dto: UpdateAddressDto) {
    await this.findOne(userId, addressId); // Ensure it exists and belongs to user

    return this.prisma.direccion.update({
      where: { id: addressId },
      data: dto,
    });
  }

  async remove(userId: number, addressId: number) {
    await this.findOne(userId, addressId); // Ensure it exists and belongs to user

    return this.prisma.direccion.delete({
      where: { id: addressId },
    });
  }
}
