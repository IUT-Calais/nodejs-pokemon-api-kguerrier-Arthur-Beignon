import { Router } from 'express';
import { getPokemonCards, getPokemonCardID, postPokemonCards, patchPokemon, deletePokemonCard } from './pokemon_cards.controller';
import { verifyJWT} from '../common/jwt.middleware'


export const PokemonCardsRouteur = Router();

// Route pour obtenir la liste des utilisateurs
PokemonCardsRouteur.get('/', getPokemonCards);

// Route pour obtenir un pokemon spécifique
PokemonCardsRouteur.get('/:pokemon_id', getPokemonCardID);

PokemonCardsRouteur.post('/',verifyJWT, postPokemonCards);

PokemonCardsRouteur.patch('/:pokemon_id', verifyJWT,  patchPokemon)

PokemonCardsRouteur.delete('/:pokemon_id',verifyJWT, deletePokemonCard);
