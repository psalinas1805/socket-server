import Server from './classes/server'
import { SERVER_PORT } from "./global/environment";
import router  from './routes/routes';
import  cors from 'cors';
import bodyParse from 'body-parser';

const server = Server.instance;

//BodyParser

server.app.use(bodyParse.urlencoded({extended: true}) );
server.app.use(bodyParse.json() );

//CORS
server.app.use(cors({origin: true, credentials: true }) );

// Rutas de servicio
server.app.use('/', router);

server.start( ()=> {
    console.log(`Servidor corriendo en puerto: ${SERVER_PORT}`);    
})