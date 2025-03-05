import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  // Suppression de tous les posts
  await prisma.type.deleteMany();
  await prisma.pokemonCard.deleteMany();
  await prisma.user.deleteMany();

  // Réinitialisation de l'auto-incrémentation sur SQLite
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='User'`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Post'`;


  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  await prisma.user.createMany({
    data : [
      {
        "email" : "admin@gmail.com",
        "password" : "admin"
      },
      {
        "email" : "user@gmail.com",
        "password" : "user"
      }
    ]
  })

  await prisma.pokemonCard.createMany({
    data: [
      {
        id : 1,
        name : 'Bulbizar',
        typeId: 4,
        pokedexId : 1,
        lifePoints : 45,
        size : 0.7,
        weight : 6.9,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
      },
      {
        id : 2, 
        name: 'Herbizar',
        typeId: 4,
        pokedexId : 2,
        lifePoints : 60,
        size : 1.0,
        weight : 13.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png',
      },
      {
        id : 3, 
        name: 'Florizar',
        typeId: 4,
        pokedexId : 3,
        lifePoints : 80,
        size : 1.1,
        weight : 18.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png',
      },
      {
        id : 4, 
        name: 'Salamèche',
        typeId: 1,
        pokedexId : 4,
        lifePoints : 39,
        size : 0.6,
        weight : 8.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
      },
      {
        id : 5, 
        name: 'Reptincel',
        typeId: 1,
        pokedexId : 5,
        lifePoints : 78,
        size : 1.0,
        weight : 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png',
      },
      {
        id : 6, 
        name: 'Dracaufeu',
        typeId: 1,
        pokedexId : 6,
        lifePoints : 100,
        size : 1.6,
        weight : 150.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
      },
      {
        id : 7, 
        name: 'Carapuce',
        typeId: 4,
        pokedexId : 7,
        lifePoints : 44,
        size : 0.8,
        weight : 9.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      },
      {
        id : 8, 
        name: 'Carabaffe',
        typeId: 4,
        pokedexId : 8,
        lifePoints : 58,
        size : 1.3,
        weight : 110.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/008.png',
      },
      {
        id : 9, 
        name: 'Tortank',
        typeId: 4,
        pokedexId : 9,
        lifePoints : 75,
        size : 1.3,
        weight : 550.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png',
      },
      {
        id : 10, 
        name: 'Chenipan',
        typeId: 7,
        pokedexId : 10,
        lifePoints : 39,
        size : 0.5,
        weight : 8.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/010.png',
      },
      {
        id : 11, 
        name: 'Chrysacier',
        typeId: 7,
        pokedexId : 11,
        lifePoints : 52,
        size : 1.0,
        weight : 100.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/011.png',
      },
      {
        id : 12, 
        name: 'Papilusion',
        typeId: 7,
        pokedexId : 12,
        lifePoints : 39,
        size : 0.7,
        weight : 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
      },
      {
        id : 13, 
        name: 'Aspicot',
        typeId: 7,
        pokedexId : 13,
        lifePoints : 62,
        size : 0.8,
        weight : 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/013.png',
      },
      {
        id : 14,
        name: 'Coconfort',
        typeId: 7,
        pokedexId : 14,
        lifePoints : 45,
        size : 0.6,
        weight : 11.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/014.png',
      },
      {
        id : 25, 
        name: 'Pikachu',
        typeId: 5,
        pokedexId : 25,
        lifePoints : 40,
        size : 0.4,
        weight : 6.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
      },
    ]
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
