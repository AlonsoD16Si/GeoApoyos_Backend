import { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import Visita from '../models/visita';
import Solicitante from '../models/solicitante';
import Domicilio from '../models/domicilio';

// Configure multer for image uploads
const upload = multer({
  dest: 'uploads/', // Temporary upload directory
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    if (!allowedExtensions.includes(path.extname(file.originalname))) {
      return cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed'));
    }
    cb(null, true);
  }
});

// Get pending visits for a user
export const getVisitasPendientes = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const visitas = await Visita.findAll({
      where: {
        confirmacionSolicitante: false,
        usuario_idUsuario: id
      },
      include: [{
        model: Solicitante,
        include: [Domicilio]
      }]
    });
    res.json(visitas);
  } catch (error) {
    console.error('Error al obtener visitas pendientes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Update the status of a visit
export const actualizarEstatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { estatus, razon, latitud, longitud } = req.body;

  try {
    // Handle image upload using multer
    const file = req.file;
    if (!file) {
      return res.status(400).send('No se ha seleccionado una foto');
    }

    // Generate a unique filename for the image
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    // Move the uploaded file to the uploads directory
    fs.writeFileSync(filePath, file.buffer);

    // Update the visit with all the data
    await Visita.update({
      estatus,
      razon,
      latitudVisita: latitud,
      longitudVisita: longitud,
      fotoDomicilio: fileName // Use the generated filename
    }, {
      where: { idVisita: id }
    });

    res.send('Estatus de visita actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el estatus de la visita:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Confirm a visit
export const confirmarVisita = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { idSolicitante, fecha, hora, latitud, longitud } = req.body;

  try {
    await Visita.update({
      confirmacionSolicitante: true,
      estatus: 'EN',
      razon: 'encontrado',
      fecha,
      hora,
      latitudVisita: latitud,
      longitudVisita: longitud
    }, {
      where: { idVisita: id }
    });

    res.send('Visita confirmada exitosamente');
  } catch (error) {
    console.error('Error al confirmar la visita:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Get solicitante photo (not implemented yet)
export const fotoSolicitante = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const solicitante = await Solicitante.findByPk(id);
    if (!solicitante) {
      res.status(404).send('Solicitante no encontrado');
      return;
    }

    // Get the photo filename from the solicitante
    const photoFilename = solicitante.foto; // Assuming 'foto' is the property that stores the filename
    if (!photoFilename) {
      res.status(404).send('Foto de solicitante no encontrada');
      return;
    }

    // Construct the photo path
    const photoPath = path.join(__dirname, '..', 'solicitante-photos', photoFilename);

    // Check if the photo file exists
    if (!fs.existsSync(photoPath)) {
      res.status(404).send('Foto de solicitante no encontrada');
      return;
    }

    // Send the photo file as a response
    res.sendFile(photoPath);
  } catch (error) {
    console.error('Error al obtener la foto del solicitante:', error);
    res.status(500).send('Error interno del servidor');
  }
};