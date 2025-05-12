import request from 'supertest';
import { app } from '../src'; // Remplace par le chemin vers ton fichier où tu initialises Express
import { prismaMock } from './jest.setup'; // Assure-toi que prismaMock est correctement configuré
import { generateToken } from '../src/pokemon_cards/pokemon_cards.controller'; // Assure-toi d'importer la fonction JWT

describe('PokemonCard API', () => {
  // Générer un JWT valide pour les tests
  const validToken = generateToken(1); // Simule un utilisateur avec l'ID 1

  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards = [
        {
          id: 1,
          name: 'Pikachu',
          typeId: 5,
          pokedexId: 25,
          lifePoints: 40,
          size: 0.4,
          weight: 6.0,
          imageUrl: 'url',
        },
      ];

      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);

      const response = await request(app).get('/pokemon-cards');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCards);
    });
  });

  describe('GET /pokemon-cards/:pokemonCardId', () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard = {
        id: 1,
        name: 'Pikachu',
        typeId: 5,
        pokedexId: 25,
        lifePoints: 40,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'url',
      };

      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard);

      const response = await request(app).get('/pokemon-cards/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCard);
    });

    it('should return 404 if PokemonCard is not found', async () => {
      prismaMock.pokemonCard.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/pokemon-cards/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'PokemonCard not found' });
    });
  });

  describe('POST /pokemon-cards', () => {
    it('should create a new PokemonCard', async () => {
      const newPokemonCard = {
        name: 'Pikachu',
        typeId: 5,
        pokedexId: 25,
        lifePoints: 40,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'url',
      };

      const createdPokemonCard = { id: 1, ...newPokemonCard };

      prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard);

      const response = await request(app)
        .post('/pokemon-cards')
        .set('Authorization', `Bearer ${validToken}`) // Ajout du token JWT
        .send(newPokemonCard);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdPokemonCard);
    });
  });

  describe('PATCH /pokemon-cards/:pokemonCardId', () => {
    it('should update an existing PokemonCard', async () => {
      const updateData = { name: 'Raichu' };
      const updatedPokemonCard = {
        id: 1,
        name: 'Raichu',
        typeId: 5,
        pokedexId: 25,
        lifePoints: 40,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'url',
      };

      prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard);

      const response = await request(app)
        .patch('/pokemon-cards/1')
        .set('Authorization', `Bearer ${validToken}`) // Ajout du token JWT
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Pokémon modifié', // Ajustement du test pour la réponse réelle de l'API
        pokemon: updatedPokemonCard,
      });
    });
  });

  describe('DELETE /pokemon-cards/:pokemonCardId', () => {
    it('should delete a PokemonCard', async () => {
      prismaMock.pokemonCard.delete.mockResolvedValue({
        id: 1,
        name: 'Pikachu',
        typeId: 5,
        pokedexId: 25,
        lifePoints: 40,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'url',
      });

      const response = await request(app)
        .delete('/pokemon-cards/1')
        .set('Authorization', `Bearer ${validToken}`); // Ajout du token JWT

      expect(response.status).toBe(204);
    });
  });
});