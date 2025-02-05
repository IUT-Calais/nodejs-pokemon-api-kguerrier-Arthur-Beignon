import { Router } from 'express';
import { getPokemonCards } from './pokemon_cards.controller';

export const PokemonCardsRouteur = Router();

// Route pour obtenir la liste des utilisateurs
PokemonCardsRouteur.get('/', getPokemonCards);