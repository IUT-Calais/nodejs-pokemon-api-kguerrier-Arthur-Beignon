import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Suppression des données existantes
  await prisma.pokemonCard.deleteMany();
  await prisma.type.deleteMany();
  await prisma.user.deleteMany();

  // Réinitialisation des auto-incréments pour SQLite
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='PokemonCard'`);
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='Type'`);
  await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name='User'`);

  // Création des types (un par un pour récupérer les IDs)
  const normal = await prisma.type.create({ data: { name: 'Normal' } });
  const fire = await prisma.type.create({ data: { name: 'Fire' } });
  const water = await prisma.type.create({ data: { name: 'Water' } });
  const grass = await prisma.type.create({ data: { name: 'Grass' } });
  const electric = await prisma.type.create({ data: { name: 'Electric' } });
  const bug = await prisma.type.create({ data: { name: 'Bug' } });

  // Création des utilisateurs
  await prisma.user.createMany({
    data: [
      { email: 'admin@gmail.com', password: 'admin' },
      { email: 'user@gmail.com', password: 'user' },
    ]
  });

  // Création des cartes Pokémon
  await prisma.pokemonCard.createMany({
    data: [
      {
        name: 'Bulbizar',
        typeId: grass.id,
        pokedexId: 1,
        lifePoints: 45,
        size: 0.7,
        weight: 6.9,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
      },
      {
        name: 'Herbizar',
        typeId: grass.id,
        pokedexId: 2,
        lifePoints: 60,
        size: 1.0,
        weight: 13.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png',
      },
      {
        name: 'Florizar',
        typeId: grass.id,
        pokedexId: 3,
        lifePoints: 80,
        size: 1.1,
        weight: 18.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png',
      },
      {
        name: 'Salamèche',
        typeId: fire.id,
        pokedexId: 4,
        lifePoints: 39,
        size: 0.6,
        weight: 8.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
      },
      {
        name: 'Reptincel',
        typeId: fire.id,
        pokedexId: 5,
        lifePoints: 78,
        size: 1.0,
        weight: 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png',
      },
      {
        name: 'Dracaufeu',
        typeId: fire.id,
        pokedexId: 6,
        lifePoints: 100,
        size: 1.6,
        weight: 150.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png',
      },
      {
        name: 'Carapuce',
        typeId: water.id,
        pokedexId: 7,
        lifePoints: 44,
        size: 0.8,
        weight: 9.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
      },
      {
        name: 'Carabaffe',
        typeId: water.id,
        pokedexId: 8,
        lifePoints: 58,
        size: 1.3,
        weight: 110.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/008.png',
      },
      {
        name: 'Tortank',
        typeId: water.id,
        pokedexId: 9,
        lifePoints: 75,
        size: 1.3,
        weight: 550.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/009.png',
      },
      {
        name: 'Chenipan',
        typeId: bug.id,
        pokedexId: 10,
        lifePoints: 39,
        size: 0.5,
        weight: 8.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/010.png',
      },
      {
        name: 'Chrysacier',
        typeId: bug.id,
        pokedexId: 11,
        lifePoints: 52,
        size: 1.0,
        weight: 100.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/011.png',
      },
      {
        name: 'Papilusion',
        typeId: bug.id,
        pokedexId: 12,
        lifePoints: 39,
        size: 0.7,
        weight: 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/012.png',
      },
      {
        name: 'Aspicot',
        typeId: bug.id,
        pokedexId: 13,
        lifePoints: 62,
        size: 0.8,
        weight: 19.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/013.png',
      },
      {
        name: 'Coconfort',
        typeId: bug.id,
        pokedexId: 14,
        lifePoints: 45,
        size: 0.6,
        weight: 11.5,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/014.png',
      },
      {
        name: 'Pikachu',
        typeId: electric.id,
        pokedexId: 25,
        lifePoints: 40,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
      },
    ]
  });

  console.log('Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error('Erreur lors de l’exécution du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
