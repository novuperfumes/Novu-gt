import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}
