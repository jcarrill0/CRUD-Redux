import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
// import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

// Crear un nuevo producto - Funcion Principal 
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch( nuevoProducto() );

        // Insertar en la API
        clienteAxios.post('/libros', producto)
            .then(respuesta => {
                // Si se inserta correctamente
                dispatch( agregarProductoExito(producto) );
            })
            .catch(error => {
                console.log(error);
                // Si hay un error
                dispatch( agregarProductoError() );
            })
    }
} 

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = () => ({
    type: AGREGAR_PRODUCTO_ERROR
});


// Obtener listado de productos (consultar API)
export function obtenerProductosAction() {
    return dispatch => {
        dispatch( obtenerProductosComienzo() );

        // Consultar la API 
        clienteAxios.get('/libros')
            .then(respuesta => {
                // console.log(respuesta);
                dispatch( descargaProductosExitosa(respuesta.data) );
            })
            .catch(error => {
                console.log(error);
                dispatch( descargaProductosError() );
            })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos   
});

export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR   
});


// Funcion que elimina un producto en especifico 
export function borrarProductoAction(id) {
    return dispatch => {
        dispatch( obtenerProductoEliminar() );
    
        // Eliminar en la API 
        clienteAxios.delete(`/libros/${id}`)
            .then(respuesta => {
                dispatch( eliminarProductoExito(id) );
            })
            .catch(error => {
                dispatch( eliminarProductoError() );
            })
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
});

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
});


// Funcion para editar un producto en especifico
export function obtenerProductoEditarAction(id) {
    return dispatch => {
        dispatch( obtenerProductoAction() );

        // Obtener producto de la API
        clienteAxios.get(`/libros/${id}`)
            .then(respuesta => {    
                // console.log(respuesta.data);
                dispatch(obtenerProductoEditarExito(respuesta.data));
            })
            .catch(error => {
                // console.log(error);
                dispatch(obtenerProductoEditarError());
            })
    }
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
});

/** Modifica un producto en la API y state **/
export function editarProductoAction(producto) {
    return dispatch => {
        dispatch( comenzarEdicionProducto() );

        // Consultar la API 
        clienteAxios.put(`/libros/${producto.id}`, producto)
            .then(respuesta => {
                // console.log(respuesta);
                // Swal.fire(
                //     'Almacenado',
                //     'El producto se actualizó correctamente',
                //     'success'
                // )
                dispatch( productoEditadoExito(respuesta.data) );
            })
            .catch(error => {
                // console.log(error);
                dispatch( productoEditadoError() ); 
            })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

export const productoEditadoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

export const productoEditadoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
});







