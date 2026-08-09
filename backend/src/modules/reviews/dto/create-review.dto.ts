import {
  IsInt,
  Min,
  Max,
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @MaxLength(400, {
    message: 'El comentario no puede tener más de 400 caracteres',
  })
  // Strip HTML/script tags to prevent XSS (Prisma already prevents SQL injection via parameterized queries)
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value
          .replace(/<[^>]*>/g, '')
          .replace(/['"`;\\]/g, '')
          .trim()
      : value,
  )
  comentario: string;

  @IsOptional()
  @IsString()
  compra_label?: string;
}
