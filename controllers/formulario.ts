import { Request, Response } from 'express';
import Formulario from '../models/formulario';

class FormularioController {
  async crearFormulario(req: Request, res: Response) {
    try {
      const nuevoFormulario = await Formulario.create(req.body);
      res.status(201).json({ mensaje: 'Formulario creado exitosamente', formulario: nuevoFormulario });
    } catch (error) {
      console.error('Error al crear formulario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

}

export default FormularioController;
