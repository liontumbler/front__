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
        let parametros: modelGetService = {} 
        if (page) {
            console.log(page, 'page');
            parametros['page'] = page
        }

        if (filter) {
            console.log(filter, 'filter');
            parametros['filter'] = filter
        }

        if (size) {
            console.log(size, 'size');
            parametros['size'] = size
        }

        if (sort.length > 0) {
            console.log(sort, 'sort');
            const sortString = sort.map((s) => {
                return `${s.key}:${s.direction}`
            }).join(',')
            
            parametros['sort'] = sortString as any
        }

        

        const params = new URLSearchParams(parametros as any);
        let dataServices = {
            url: `http://127.0.0.1:8000/api/licencias/${id}${(Object.keys(parametros).length > 0) ? '?'+params.toString() : null }`, 
            method: 'GET'
        } as modelService

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