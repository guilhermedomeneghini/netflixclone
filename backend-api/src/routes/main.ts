import { Router } from 'express';
import { createProfile, getProfille } from '../controllers/profile.controller';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/profile', async (req, res) => {

    const result = await getProfille();
    res.json(result)
})

mainRouter.post('/profile', async (req, res) => {
    const { name, urlimage } = req.body;

    if (!name || !urlimage) {
        return res.status(400).json({ error: 'Nome e URL da imagem são obrigatórios.' });
    }

    try {
        const novoPerfil = await createProfile(name, urlimage);
        res.status(201).json(novoPerfil);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar perfil.' });
    }
})