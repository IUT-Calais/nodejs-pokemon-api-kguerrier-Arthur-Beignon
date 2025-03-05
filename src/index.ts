import express from 'express';
import { Request, Response } from 'express';

import { PokemonCardsRouteur} from './pokemon_cards/pokemon_cards.routeur';
import { UserRouteur } from './user/user.routeur';


export const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

app.use('/pokemons-cards', PokemonCardsRouteur);
app.use('/users', UserRouteur);