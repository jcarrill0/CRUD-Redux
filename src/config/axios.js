import axios from 'axios';

const clienteAxios = axios.create({
    baseURL:'https://my-json-server.typicode.com/jcarrill0/productos'
});

export default clienteAxios;

