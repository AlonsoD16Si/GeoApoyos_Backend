import { Request, Response } from 'express';
import Usuario from '../models/usuarioM';
import Solicitante from '../models/solicitante';
import { UsuarioInstance } from '../models/usuarioM';
import { SolicitanteInstance } from '../models/solicitante';

class SolicitanteController {
    async crearSolicitante(req: Request, res: Response): Promise<void> {
        try {
            const { idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo } = req.body;
            
            // Creamos el solicitante
            const nuevoSolicitante = await this.crearNuevoSolicitante({
                idSolicitante,
                nombre,
                primerApellido,
                segundoApellido,
                genero,
                edad,
                institucion,
                grado,
                tipoApoyo,
                estatus,
                correo
            });

            // Seleccionamos un visitador disponible
            const visitadorDisponible: UsuarioInstance = await this.seleccionarVisitadorDisponible();

            // Asignamos el solicitante al visitador
            await visitadorDisponible.set('Solicitante', nuevoSolicitante);

            // Respondemos con el solicitante creado y la asignación del visitador
            res.status(201).json({ mensaje: 'Solicitante creado exitosamente', solicitante: nuevoSolicitante });
        } catch (error) {
            console.error('Error al crear solicitante:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    async crearNuevoSolicitante({idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo }: 
        {idSolicitante: number; nombre: string; primerApellido: string; segundoApellido: string; genero: string; edad: string; institucion: string; grado: string; tipoApoyo: string; estatus: string; correo: string; }): Promise<SolicitanteInstance> {
        try {
            const nuevoSolicitante = await Solicitante.create({
                idSolicitante,
                nombre,
                primerApellido,
                segundoApellido,
                genero,
                edad,
                institucion,
                grado,
                tipoApoyo,
                estatus,
                correo
            });
            return nuevoSolicitante;
        } catch (error) {
            throw new Error(`Error al crear el solicitante: ${error}`);
        }
    }

    async seleccionarVisitadorDisponible(): Promise<UsuarioInstance> {
        const visitador = await Usuario.findOne({ where: { puesto: 'visitador', estatus: 'AC' } }); 
        if (!visitador) {
            throw new Error('No hay visitadores disponibles');
        }
        return visitador;
    }
}

export default SolicitanteController;
