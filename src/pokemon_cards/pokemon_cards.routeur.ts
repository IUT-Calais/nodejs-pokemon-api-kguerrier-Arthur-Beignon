import { Router } from 'express';
import { getPokemonCards, getPokemonCardID } from './pokemon_cards.controller';

export const PokemonCardsRouteur = Router();
export const PokemonCardsRouteurID = Router();

// Route pour obtenir la liste des utilisateurs
PokemonCardsRouteur.get('/', getPokemonCards);

// Route pour obtenir un pokemon spécifique
PokemonCardsRouteurID.get('/', getPokemonCardID);