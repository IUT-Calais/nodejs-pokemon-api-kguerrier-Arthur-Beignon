import { Router } from 'express';
import { postUsers, postUserLogin } from './user.controller';

export const UserRouteur = Router();

// Route pour créer un utilisateur
UserRouteur.post('/', postUsers);

// Route pour se connecter
UserRouteur.post('/login', postUserLogin);
