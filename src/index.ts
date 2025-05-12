import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { PokemonCardsRouteur } from './pokemon_cards/pokemon_cards.routeur';
import { UserRouteur } from './user/user.routeur';

// Charger le fichier Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

export const app = express();
app.use(express.json());

// Intégrer Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes API
app.use('/pokemon-cards', PokemonCardsRouteur);
app.use('/users', UserRouteur);

const port = process.env.PORT || 3000;

let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📜 Swagger documentation available at http://localhost:${port}/api-docs`);
  });
}

export { server };

export function stopServer() {
  if (server) server.close();
}