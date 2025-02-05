import{ Request, Response } from 'express';


export const getPokemonCards = async (_req: Request, res: Response) => {
    res.status(200).send('Liste des Pokémons');
}