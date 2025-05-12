import request from 'supertest';
import { app } from '../src/index'; // Assurez-vous que le chemin est correct vers le fichier d'initialisation d'Express
import { prismaMock } from './jest.setup'; // Mock Prisma correctement configuré
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock de bcrypt et jsonwebtoken
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User API', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: 1,
        email: 'testuser@example.com',
        password: 'hashedPassword',
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(createdUser);

      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Utilisateur créé avec succès !',
        user: {
          id: createdUser.id,
          email: createdUser.email,
        },
      });
    });

    it('should return 400 if email already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'testuser@example.com',
        password: '$2b$10$hashedPasswordHere123',
      });

      const response = await request(app).post('/users').send({
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "L'email est déjà utilisé !",
      });
    });
  });

  describe('POST /users/login', () => {
    it('should login a user and return a token', async () => {
      const loginData = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      const user = {
        id: 1,
        email: 'testuser@example.com',
        password: 'hashedPassword',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); 
      (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

      const response = await request(app).post('/users/login').send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Connexion réussie',
        token: 'mockedToken',
      });
    });

    it('should return 400 if password is incorrect', async () => {
      const user = {
        id: 1,
        email: 'testuser@example.com',
        password: 'hashedPassword',
      };

      prismaMock.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock bien placé avant la requête

      console.log("Résultat bcrypt.compare (test mot de passe incorrect) : ", await bcrypt.compare('wrongpassword', user.password)); // Vérification temporaire

      const response = await request(app).post('/users/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Mot de passe incorrect',
      });
    });

    it('should return 404 if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const response = await request(app).post('/users/login').send({
        email: 'unknown@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Utilisateur non trouvé',
      });
    });
  });
});