import express from 'express';
import { CATEGORIA } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorias = await CATEGORIA.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre_categoria, imagen_url } = req.body;
    const nueva = await CATEGORIA.create({ nombre_categoria, imagen_url });
    res.json(nueva);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ mensaje: "Error interno" });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await CATEGORIA.update(req.body, { where: { id_categoria: id } });
    res.json({ message: 'Categoría actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

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
