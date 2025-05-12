import { Router } from 'express';
import { getPokemonCards, getPokemonCardID, postPokemonCards, patchPokemon, deletePokemonCard } from './pokemon_cards.controller';
import { verifyJWT } from '../common/jwt.middleware';

export const PokemonCardsRouteur = Router();

// 🔓 Public: Obtenir tous les Pokémon
PokemonCardsRouteur.get('/', getPokemonCards);

// 🔓 Public: Obtenir un Pokémon par ID
PokemonCardsRouteur.get('/:pokemon_id', getPokemonCardID);

// 🔐 Privé: Créer un Pokémon (auth nécessaire)
PokemonCardsRouteur.post('/', verifyJWT, postPokemonCards);

// 🔐 Privé: Modifier un Pokémon (auth nécessaire)
PokemonCardsRouteur.patch('/:pokemon_id', verifyJWT, patchPokemon);

// 🔐 Privé: Supprimer un Pokémon (auth nécessaire)
PokemonCardsRouteur.delete('/:pokemon_id', verifyJWT, deletePokemonCard);

