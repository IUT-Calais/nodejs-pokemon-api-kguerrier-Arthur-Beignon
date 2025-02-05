import { Router } from 'express';
import { getPokemonCards, getPokemonCardID, postPokemonCards, patchPokemon, deletePokemonCard } from './pokemon_cards.controller';

export const PokemonCardsRouteur = Router();

// Route pour obtenir la liste des utilisateurs
PokemonCardsRouteur.get('/', getPokemonCards);

// Route pour obtenir un pokemon spécifique
PokemonCardsRouteur.get('/:pokemon_id', getPokemonCardID);

PokemonCardsRouteur.post('/', postPokemonCards);

PokemonCardsRouteur.patch('/:pokemon_id', patchPokemon)

PokemonCardsRouteur.delete('/:pokemon_id', deletePokemonCard);
