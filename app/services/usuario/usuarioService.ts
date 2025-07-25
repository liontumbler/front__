import { service, type modelService } from "../service";
import { name } from "../../services/capura";

interface modelUsuario {
    correo: string
    password: string
}

class usuarioService extends service {
    async loginService(dataExterna: modelUsuario) {
        let data = {
            "correo": dataExterna.correo,
            "password": dataExterna.password,
        } as modelUsuario;

        const serviceName = new name()
        await serviceName.obtener()

        let res = await this.service({
            url: "http://127.0.0.1:8000/api/login",
            method: 'POST',
            data
        }, serviceName.getGeo())

        if (res.code == 200) {
            this.bearer = res.access_token
            this.refreshTokenString = res.refresh_token
        }

        return res;
    }


    /*async postUsuarioService (dataExterna: modelUsuario) {
        let data = {
            "codigo": dataExterna.codigo,
            "valor": dataExterna.valor,
            "fecha_inicio": formatearFecha(dataExterna.fecha_inicio),
        } as modelUsuario;

        if (dataExterna.fecha_fin) {
            data['fecha_fin'] = formatearFecha(dataExterna.fecha_fin)
        }

        if (dataExterna.estado) {
            data['estado'] = dataExterna.estado
        }

        return await this.service({
            url: "http://127.0.0.1:8000/api/Usuarios", 
            method: 'POST', 
            data
        })
    }

    putUsuarioService (id: number, dataExterna: modelUsuario) {
        let data = {
            "codigo": dataExterna.codigo,
            "valor": dataExterna.valor,
            "fecha_inicio": formatearFecha(dataExterna.fecha_inicio),
        } as modelUsuario;

        if (dataExterna.fecha_fin) {
            data['fecha_fin'] = formatearFecha(dataExterna.fecha_fin)
        }

        if (dataExterna.estado) {
            data['estado'] = dataExterna.estado
        }
        return this.service({
            url: `http://127.0.0.1:8000/api/Usuarios/${id}`, 
            method: 'PUT', 
            data
        })
    }

    patchUsuarioService (id: number, dataExterna: modelUsuario) {
        let data = {} as modelUsuario;

        if (dataExterna.codigo) {
            data['codigo'] = dataExterna.codigo
        }

        if (dataExterna.valor) {
            data['valor'] = dataExterna.valor
        }

        if (dataExterna.fecha_inicio) {
            data['fecha_inicio'] = formatearFecha(dataExterna.fecha_inicio)
        }

        if (dataExterna.fecha_fin) {
            data['fecha_fin'] = formatearFecha(dataExterna.fecha_fin)
        }

        if (dataExterna.estado) {
            data['estado'] = dataExterna.estado
        }
        return this.service({
            url: `http://127.0.0.1:8000/api/Usuarios/${id}`, 
            method: 'PATCH', 
            data
        })
    }

    async getUsuarioService ({id = '', page = 1, size = 10, sort = [], filter = undefined}: modelGetService ) {
        let dataServices = {
            url: `http://127.0.0.1:8000/api/Usuarios/${id}`, 
            method: 'GET'
        } as modelService

        if (page) {
            dataServices['page'] = page
        }

        if (size) {
            dataServices['size'] = size
        }

        if (sort) {
            dataServices['sort'] = sort
        }

        if (filter) {
            dataServices['filter'] = filter
        }

        return await this.service(dataServices)
    }

    deleteUsuarioService (id: number) {
        return this.service({
            url: `http://127.0.0.1:8000/api/Usuarios/${id}`, 
            method: 'DELETE'
        })
    }
    */
}

export { usuarioService, type modelUsuario }