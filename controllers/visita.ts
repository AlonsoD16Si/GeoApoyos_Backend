// src/controllers/VisitaController.ts
import { Request, Response } from 'express';
import Visita from '../models/visita';
import Solicitante from '../models/solicitante';
import Domicilio from '../models/domicilio';

export const visitasPendientes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const visitas = await Visita.findAll({
      where: {
        confirmacionSolicitante: false,
        solicitante_id: id
      },
      include: [
        { model: Solicitante },
        { model: Domicilio }
      ]
    });
    res.json(visitas);
  } catch (error) {
    console.error('Error al obtener las visitas pendientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const actualizarEstatus = async (req: Request, res: Response) => {
  try {
    const { id, estatus, razon, latitud, longitud, fotoCasa } = req.body;
    await Visita.update(
      { estatus, razon, latitudVisita: latitud, longitudVisita: longitud, fotoDomicilio: fotoCasa },
      { where: { idVisita: id } }
    );
    res.json({ message: 'Estatus actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el estatus de la visita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const confirmarVisita = async (req: Request, res: Response) => {
  try {
    const { idSolicitante, fecha, hora, latitud, longitud } = req.body;
    await Visita.create({
      confirmacionSolicitante: true,
      estatus: 'EN',
      razon: 'encontrado',
      fecha,
      hora,
      latitudVisita: latitud,
      longitudVisita: longitud,
      solicitante_id: idSolicitante
    });
    res.json({ message: 'Visita confirmada correctamente' });
  } catch (error) {
    console.error('Error al confirmar la visita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const fotoSolicitante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json({ message: 'Foto del solicitante correctamente' });
  } catch (error) {
    console.error('Error al obtener la foto del solicitante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

