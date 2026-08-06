import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const perfumeImages = [
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590156546946-cb5afb43bc0e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=800&auto=format&fit=crop'
];

async function main() {
  console.log('Actualizando fotos de perfumes...');
  const perfumes = await prisma.perfume.findMany();

  for (let i = 0; i < perfumes.length; i++) {
    const p = perfumes[i];
    
    // Elegir imagen principal aleatoria
    const mainImgIndex = Math.floor(Math.random() * perfumeImages.length);
    const mainImg = perfumeImages[mainImgIndex];

    // Determinar cantidad de imágenes para galería (0 a 3)
    const galleryCount = Math.floor(Math.random() * 4);
    const galeria: string[] = [];
    
    for (let j = 0; j < galleryCount; j++) {
      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * perfumeImages.length);
      } while (randIndex === mainImgIndex && perfumeImages.length > 1);
      
      galeria.push(perfumeImages[randIndex]);
    }

    await prisma.perfume.update({
      where: { id: p.id },
      data: {
        imagen: mainImg,
        galeria: galeria
      }
    });
  }

  console.log(`Se actualizaron ${perfumes.length} perfumes con nuevas imágenes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
