import { Request, Response } from 'express';
import prisma from '../client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Configuration JWT et bcrypt
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Middleware pour vérifier le JWT (authentification)
export const verifyJWT = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Token manquant ou invalide" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token invalide" });
    }
};

// Fonction pour générer un JWT
export const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Obtenir une liste de Pokémon
export const getPokemonCards = async (_req: Request, res: Response) => {
    try {
        const pokemons = await prisma.pokemonCard.findMany();
        res.status(200).json(pokemons);
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Requête GET échouée avec code 400" });
    }
};

// Obtenir un Pokémon spécifique
export const getPokemonCardID = async (req: Request, res: Response) => {
    try {
        const { pokemon_id } = req.params;
        const pokemon = await prisma.pokemonCard.findUnique({
            where: { id: Number(pokemon_id) }
        });

        if (!pokemon) {
            res.status(404).json({ error: "PokemonCard not found" });
            return;
        }

        res.status(200).json(pokemon);
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Requête GET échouée" });
    }
};

// Créer un Pokémon (authentification requise)
export const postPokemonCards = async (req: Request, res: Response) => {
    try {
        const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl } = req.body;

        if (!name || !pokedexId || !typeId || !lifePoints) {
            res.status(400).json({ error: "Certains champs sont manquants !" });
            return;
        }

        const newPokemonCard = await prisma.pokemonCard.create({
            data: { name, pokedexId, typeId, lifePoints, size, weight, imageUrl }
        });

        res.status(201).json(newPokemonCard);
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Erreur lors de la création du Pokémon" });
    }
};

// Modifier un Pokémon (authentification requise)
export const patchPokemon = async (req: Request, res: Response) => {
    try {
        const { pokemon_id } = req.params;
        const { name, pokedexId, lifePoints, size, weight, imageUrl } = req.body;

        const updatedPokemon = await prisma.pokemonCard.update({
            where: { id: Number(pokemon_id) },
            data: { name, pokedexId, lifePoints, size, weight, imageUrl }
        });

        res.status(200).json({ message: "Pokémon modifié", pokemon: updatedPokemon });
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Erreur lors de la modification" });
    }
};

// Supprimer un Pokémon (authentification requise)
export const deletePokemonCard = async (req: Request, res: Response) => {
    try {
        const { pokemon_id } = req.params;

        await prisma.pokemonCard.delete({
            where: { id: Number(pokemon_id) }
        });

        res.status(204).send();
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Erreur lors de la suppression" });
    }
};

// Ajouter un utilisateur avec un mot de passe hashé
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Nom d'utilisateur et mot de passe requis" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.status(201).json({ message: "Utilisateur créé", user: newUser });
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
};

// Connexion utilisateur et génération d'un JWT
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: "Identifiants incorrects" });
            return;
        }

        const token = generateToken(user.id);
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Database error:", error);
        res.status(400).json({ error: "Erreur lors de la connexion" });
    }
};