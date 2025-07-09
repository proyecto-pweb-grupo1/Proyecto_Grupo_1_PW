// backend/controladores/categoriasControlador.js
import { CATEGORIA } from '../models/index.js';

export async function listarCategorias(req, res) {
  try {
    const categorias = await CATEGORIA.findAll({ order: [['id_categoria', 'ASC']] });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function crearCategoria(req, res) {
  try {
    const categoria = await CATEGORIA.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function actualizarCategoria(req, res) {
  try {
    const categoria = await CATEGORIA.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "No existe la categoría" });
    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminarCategoria(req, res) {
  try {
    const categoria = await CATEGORIA.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "No existe la categoría" });
    await categoria.destroy();
    res.json({ mensaje: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
