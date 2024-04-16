import express, { Application } from 'express';
import userRoutes from '../routes/usuarioR';
import visitaRoutes from '../routes/visita';
import cors from 'cors';

import db from '../database/connection';
import { Usuario, Solicitante, Visita } from './asociaciones'; // Importa las asociaciones

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/GeoA',
        visita: '/api/visitaU'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Métodos iniciales
        this.init();
    }

    private async init() {
        // Conexión a la base de datos
        await this.dbConnection();

        // Llamamos a los middlewares
        this.middlewares();

        // Definimos nuestras rutas
        this.routes();

        // Configuración de las asociaciones
        this.setupAssociations();
    }

    private async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error: any) {
            console.error('Error connecting to database:', error);
            throw new Error('Could not connect to database');
        }
    }

    private middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    private routes() {
        // Rutas de usuarios
        this.app.use(this.apiPaths.usuarios, userRoutes);

        // Rutas de visitas
        this.app.use(this.apiPaths.visita, visitaRoutes);
    }

    private setupAssociations() {
        // No necesitas hacer nada aquí, las asociaciones se configurarán automáticamente al importarlas
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}

export default Server;
