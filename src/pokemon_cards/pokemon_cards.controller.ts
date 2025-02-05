import{ Request, Response } from 'express';
import prisma from '../client';


// Obtenir une liste de pokémon
export const getPokemonCards = async (_req: Request, res: Response) => {
    const pokemons = await prisma.pokemonCard.findMany(); // Récupère tous les utilisateurs et leurs posts
    res.status(200).send(pokemons);
}

// Obtenir un Pokémon spécifique
export const getPokemonCardID = async (req: Request, res: Response) => {
  const {pokemonCardId} = req.params;
  res.status(200).send(`Détails du Pokémon avec l'ID : ${pokemonCardId}`);
};
