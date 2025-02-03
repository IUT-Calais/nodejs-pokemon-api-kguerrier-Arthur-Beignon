import express from 'express';
import { Request, Response } from 'express';


export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

//Liste de tous les pokémons
app.get('/pokemons-cards', (_req: Request, _res: Response) => {
  _res.status(200).send('Liste de tous les Pokémons');
});


app.get('/pokemons-cards/:pokemonCardId', (_req: Request, _res: Response) => {
  _res.status(200).send('Liste du Pkémons');
});

app.post('/pokemon-cards', (_req: Request, _res: Response) => {
  _res.status(200).send('Liste de tous les Pokémons');
});

app.patch('/pokemon-cards/:pokemonCardId', (_req: Request, _res: Response) => {
  _res.status(200).send('Liste de tous les Pokémons');
});

app.delete('/pokemon-cards/:pokemonCardId:', (_req: Request, _res: Response) => {
  _res.status(200).send('Liste de tous les Pokémons');
});
