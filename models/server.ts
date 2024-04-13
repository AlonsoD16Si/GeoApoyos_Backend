import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/connection';
import FormularioRoutes from '../routes/formulario'; // Importa las rutas de formularios
import UsuarioRoutes from '../routes/usuarioR'; // Importa las rutas de usuarios

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: '/api/GeoA',
    formularios: '/api/formularios' 
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    //* Métodos iniciales
    // Conexión a base de datos
    this.dbConnection();

    // Llamamos a los middlewares
    this.middlewares();

    // Definir mis rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static('public'));
  }

  routes() {
    // Rutas para usuarios
    this.app.use(this.apiPaths.usuarios, UsuarioRoutes);

    // Rutas para formularios
    this.app.use(this.apiPaths.formularios, FormularioRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
    });
  }
}

export default Server;
