import{ Request, Response } from 'express';
import prisma from '../client';


// Obtenir une liste de pokémon
export const getPokemonCards = async (_req: Request, res: Response) => {
    try{
        const pokemons = await prisma.pokemonCard.findMany(); 
        res.status(200).send(pokemons);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Requête GET réussie avec code 200\n');
    }
    catch(error){
        console.error("Database error:", error);
        res.end('Requête GET échoué avec code 400')
    }
}

// Obtenir un Pokémon spécifique
export const getPokemonCardID = async (req: Request, res: Response) => {
    try{
        const {pokemon_id} = req.params;
        const pokemon = await prisma.pokemonCard.findUnique({where: { id: Number(pokemon_id) }});
        res.status(200).send(pokemon);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Requête GET réussie avec code 200\n');
    }
    catch(error){
        console.error("Database error:", error);
        res.end('Requête GET échoué avec code 404')
    }
};

// Créer un pokémon spécifique
export const postPokemonCards = async (req: Request, res: Response) => {
    try{
        const { id, name, pokedexId, typeId, type, lifePoints, size, weight, imageUrl } = req.body;

        if (!name || !pokedexId || !typeId || !lifePoints) {
            res.status(400).send({ error: "Certains champs sont manquants !" });
            res.end('requête POST avec erreur 400')
        }

        const newPokemonCard = await prisma.pokemonCard.create({
            data: {
                id,
                name,
                pokedexId,
                typeId,
                type,
                lifePoints,
                size,
                weight,
                imageUrl,
            },
        });
        res.status(201).json(newPokemonCard);
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('Requête GET réussie avec code 201\n');
    }
    catch(error){
        console.error("Database error:", error);
        res.end('Requête GET échoué avec code 404')
    }
};

export const patchPokemon = async (req: Request, res: Response) => {
    const { pokemon_id } = req.params;
    const { name, pokedexId, lifePoints, size, weight, typeID, imageUrl } = req.body;
    try {
        const modifiPokemon = await prisma.pokemonCard.update({
            where : {id : Number(pokemon_id)},
            data: {
                name: name,
                pokedexId: pokedexId,
                lifePoints: lifePoints,
                size: size,
                weight: weight,
                imageUrl: imageUrl,
            },
        });

        res.status(201).json({ message: "Pokémon modifier", pokemon: modifiPokemon });
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('Requête GET réussie avec code 201\n');
    } catch (error) {
        console.error("Database error:", error);
        res.end('Requête GET échoué avec code 400')
    }
};


export const deletePokemonCard = async (req: Request, res: Response) => {
    try{
        const {pokemon_id} = req.params;
        await prisma.pokemonCard.delete({ where: { id: Number(pokemon_id) } });
        res.status(201).send();
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('Requête GET réussie avec code 201\n');
    }
    catch (error) {
        console.error("Database error:", error);
        res.status(400).send({ error: "Erreur lors de la suppression du Pokémon" });
        res.end('Requête GET échoué avec code 400')
    }
};