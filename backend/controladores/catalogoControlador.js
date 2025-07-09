import {
  PAIS, REGION, TIPO_CLUB, EQUIPO, TEMPORADA, CATEGORIA,
  MARCA, GENERO, TALLA, TIPO_CAMISETA
} from '../models/index.js';

// CRUD sencillo para entidades maestras. Puedes replicar la estructura para cada modelo si deseas más control/granularidad.

export const obtenerPaises = async (_, res) => {
  try {
    const paises = await PAIS.findAll();
    res.json(paises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const crearPais = async (req, res) => {
  try {
    const pais = await PAIS.create(req.body);
    res.status(201).json(pais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lo mismo para REGION, TIPO_CLUB, TEMPORADA, CATEGORIA, MARCA, GENERO, TALLA, TIPO_CAMISETA...

// Ejemplo para REGION
export const obtenerRegiones = async (_, res) => {
  try {
    const regiones = await REGION.findAll();
    res.json(regiones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const crearRegion = async (req, res) => {
  try {
    const region = await REGION.create(req.body);
    res.status(201).json(region);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
