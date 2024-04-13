import { Router } from 'express';
import FormularioController from '../controllers/formulario';

const router = Router();
const formularioController = new FormularioController();

router.post('/formulario', formularioController.crearFormulario);


export default router;
