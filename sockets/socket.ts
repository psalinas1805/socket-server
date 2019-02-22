import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const UsuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket, io: socketIO.Server) =>{
    const usuario = new Usuario(cliente.id)
    UsuariosConectados.agregar(usuario);
}



export const desconectar = ( cliente: Socket, io: socketIO.Server ) =>{

    cliente.on('disconnect', () =>{
        UsuariosConectados.borrarUsuario(cliente.id)
        
        io.emit('usuarios-activos', UsuariosConectados.getLista());

        
    });
}

// Escuchar mensajes
export const mensaje = (cliente:Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje',(payload: { de:string, cuerpo:string})=>{
        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);


    });
}

// Configurar un usuario
export const configurarUsuario = (cliente:Socket, io: SocketIO.Server) =>{
    cliente.on('configurar-usuario',(payload: { nombre:string}, callback: Function)=>{
    UsuariosConectados.actualizarNombre(cliente.id, payload.nombre);        
    io.emit('usuarios-activos', UsuariosConectados.getLista());

        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
//        io.emit('Login Usuario', payload);
    });
}

export const obtenerUsuarios = (cliente:Socket, io: SocketIO.Server) =>{
    cliente.on('obtener-usuarios',()=>{
        io.to(cliente.id).emit('usuarios-activos', UsuariosConectados.getLista());

    });
}