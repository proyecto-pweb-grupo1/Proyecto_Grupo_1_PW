import express from 'express';
import { CATEGORIA } from '../models/index.js';

const router = express.Router();

// GET /api/categorias – Listar todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await CATEGORIA.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// POST /api/categorias – Agregar nueva categoría
router.post('/', async (req, res) => {
  try {
    const nueva = await CATEGORIA.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// PUT /api/categorias/:id – Actualizar categoría
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await CATEGORIA.update(req.body, { where: { id_categoria: id } });
    res.json({ message: 'Categoría actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// DELETE /api/categorias/:id – Eliminar categoría
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await CATEGORIA.destroy({ where: { id_categoria: id } });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

export default router;
