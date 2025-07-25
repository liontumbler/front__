import {service, type modelService} from "../service";

interface modelLicencia {
    codigo: string
    valor: number
    fecha_inicio: string
    fecha_fin?: string
    estado: 'activa' | 'inactiva' | 'vencida'
}

interface modelGetService {
    id?: string
    page?: number  
    size?: number
    sort?: Array<any>
    filter?: string | undefined
}

const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString)
    return fecha.toLocaleString('sv-SE').replace('T', ' ');
}

class licenciaService extends service{
    async postLicenciaService (dataExterna: modelLicencia) {
        let data = {
            "codigo": dataExterna.codigo,
            "valor": dataExterna.valor,
            "fecha_inicio": formatearFecha(dataExterna.fecha_inicio),
        } as modelLicencia;

        if (dataExterna.fecha_fin) {
            data['fecha_fin'] = formatearFecha(dataExterna.fecha_fin)
        }

        if (dataExterna.estado) {
            data['estado'] = dataExterna.estado
        }

        return await this.service({
            url: "http://127.0.0.1:8000/api/licencias", 
            method: 'POST', 
            data
        })
    }

    putLicenciaService (id: number, dataExterna: modelLicencia) {
        let data = {
            "codigo": dataExterna.codigo,
            "valor": dataExterna.valor,
            "fecha_inicio": formatearFecha(dataExterna.fecha_inicio),
        } as modelLicencia;

        if (dataExterna.fecha_fin) {
            data['fecha_fin'] = formatearFecha(dataExterna.fecha_fin)
        }

        if (dataExterna.estado) {
            data['estado'] = dataExterna.estado
        }
        return this.service({
            url: `http://127.0.0.1:8000/api/licencias/${id}`, 
            method: 'PUT', 
            data
        })
    }

    patchLicenciaService (id: number, dataExterna: modelLicencia) {
        let data = {} as modelLicencia;

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
            url: `http://127.0.0.1:8000/api/licencias/${id}`, 
            method: 'PATCH', 
            data
        })
    }

    async getLicenciaService ({id = '', page = 1, size = 10, sort = [], filter = undefined}: modelGetService ) {
        let dataServices = {
            url: `http://127.0.0.1:8000/api/licencias/${id}`, 
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

    deleteLicenciaService (id: number) {
        return this.service({
            url: `http://127.0.0.1:8000/api/licencias/${id}`, 
            method: 'DELETE'
        })
    }
}

export {licenciaService, type modelLicencia, type modelGetService}