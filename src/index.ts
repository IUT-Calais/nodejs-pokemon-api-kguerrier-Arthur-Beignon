import express from 'express';
import { Request, Response } from 'express';


export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

// Liste de tous les Pokémons
app.get('/pokemons-cards', (_req: Request, res: Response) => {
  res.status(200).send('Liste de tous les Pokémons');
});

// Obtenir un Pokémon spécifique
app.get('/pokemons-cards/:pokemonCardId', (req: Request, res: Response) => {
  const { pokemonCardId } = req.params;
  res.status(200).send(`Détails du Pokémon avec l'ID : ${pokemonCardId}`);
});

// Enregistrer un Pokémon
app.post('/pokemons-cards', (req: Request, res: Response) => {
  const pokemonData = req.body;
  res.status(201).send(`Pokémon ajouté : ${JSON.stringify(pokemonData)}`);
});

// Modifier un Pokémon
app.patch('/pokemons-cards/:pokemonCardId', (req: Request, res: Response) => {
  const { pokemonCardId } = req.params;
  const updatedData = req.body;
  res.status(200).send(`Pokémon ${pokemonCardId} mis à jour avec : ${JSON.stringify(updatedData)}`);
});

// Supprimer un Pokémon
app.delete('/pokemons-cards/:pokemonCardId', (req: Request, res: Response) => {
  const { pokemonCardId } = req.params;
  res.status(200).send(`Pokémon ${pokemonCardId} supprimé`);
});