import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../client';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

// Création d'un utilisateur
export const postUsers = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Vérification des champs requis
        if (!email || !password) {
            res.status(400).send({ error: "Certains champs sont manquants !" });
            return
        }

        // Vérifier si l'email est déjà utilisé
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).send({ error: "L'email est déjà utilisé !" });
            return 
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Création de l'utilisateur
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès !",
            user: { id: newUser.id, email: newUser.email }
        });

    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// Connexion d'un utilisateur
export const postUserLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email et mot de passe requis" });
            return
        }

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return 
        }

        // Vérifier la correspondance du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: "Mot de passe incorrect" });
            return 
        }

        // Génération du JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(201).json({ message: "Connexion réussie", token });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};