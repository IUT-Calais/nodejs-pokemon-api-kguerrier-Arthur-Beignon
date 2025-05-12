import express from 'express';
import { PokemonCardsRouteur } from './pokemon_cards/pokemon_cards.routeur';
import { UserRouteur } from './user/user.routeur';

export const app = express();
app.use(express.json());

app.use('/pokemon-cards', PokemonCardsRouteur); 
app.use('/users', UserRouteur);

const port = process.env.PORT || 3000;

let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export { server };

export function stopServer() {
  if (server) server.close();
}
