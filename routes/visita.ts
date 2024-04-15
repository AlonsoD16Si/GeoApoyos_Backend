import { Router } from 'express';
import {
    getVisitasPendientes,
    actualizarEstatus,
    confirmarVisita,
    fotoSolicitante
} from '../controllers/visita';

const router = Router();

// Rutas para las visitas
router.get('/visita/visitasPendientes/:id', getVisitasPendientes);
router.post('/visita/actualizarEstatus/:id', actualizarEstatus);
router.post('/visita/confirmarVisita/:id', confirmarVisita);
router.get('/visita/fotoSolicitante/:id', fotoSolicitante);

export default router;
