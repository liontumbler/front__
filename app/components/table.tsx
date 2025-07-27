import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { useIsMobile } from "../utils/utils";

import Modal from "../components/modal";
import Pagination from "../components/pagination";

interface modeloItemTabla {
    label: string
    id: string
    type: 'date' | 'text' | 'boolean' | 'rud' | 'personalized'
    width?: string
    component?: any
    head?: 'center' | 'start' | 'end'
    body?: 'center' | 'start' | 'end'
    sort?: boolean
}

interface modeloTable {
    configution: {
        headersTable: Array<modeloItemTabla>
        language?: 'en' | 'es'
        classTable?: string
        classCard?: string
    }
    data: Array<any>
    read?: Function
    update?: Function
    delet?: Function
    disabled?: boolean
    totalPages: number
    onchangeTable: Function
    size?: number
    page?: number
    totalPage?: number
}

interface modelModal {
    show: Function
    hiden: Function
}

interface modelPagination {
    disabledPagination: Function
    refrescarValores: Function
    getSize: Function
}

export default forwardRef(({ configution = { headersTable: [] }, disabled = false, data = [], read, update, delet, totalPages, onchangeTable, size = 10, page = 1, totalPage = 0 }: modeloTable, ref) => {
    const cargarTooltip = () => {
        import('bootstrap/js/dist/tooltip').then(({ default: Tooltip }) => {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipTriggerList.forEach(el => new Tooltip(el, {
                trigger: 'hover'
            }));
        });
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            cargarTooltip()
        }
    }, [])

    const isMobile = useIsMobile();

    const refModalConfirmar = useRef<modelModal>(null)
    const refPagination = useRef<modelPagination>(null)

    const [sortConfig, setSortConfig] = useState<any[]>([]);
    //const [dataT, setDataT] = useState<any[]>(data);
    const [sizeT, setSizeT] = useState<number>(size);
    const [pageT, setPageT] = useState<number>(page);
    const [totalPageT, setTotalPageT] = useState<number>(totalPage);
    const [filterT, setFilterT] = useState<string | undefined>(undefined);


    let language = {
        titleBtnSee: configution.language && configution.language == 'es' ? 'Ver' : 'See',
        titleBtnUpdate: configution.language && configution.language == 'es' ? 'Actualizar' : 'Update',
        titleBtnDelete: configution.language && configution.language == 'es' ? 'Eliminar' : 'Delete',
        titleDefineComponent: configution.language && configution.language == 'es' ? 'Definir componente' : 'define component',
        titleNoType: configution.language && configution.language == 'es' ? 'Sin tipo definido' : 'No type defined',
    }

    const confirmar = (item: any) => {
        refModalConfirmar.current?.show(item)
    }

    const closeModal = () => {
        refModalConfirmar.current?.hiden()
    }

    const continueModal = (item: any) => {
        delet ? delet(item) : null
        refModalConfirmar.current?.hiden()
    }

    const cambiarOrden = (newSort: Array<any>) => {
        handleTable(newSort, sizeT, pageT, totalPageT, filterT)
    }

    const handleTable = (sort: Array<any>, size: number, page: number, totalP: number, filter: string | undefined) => {
        setSortConfig(sort);
        setSizeT(size)
        setPageT(page)
        setTotalPageT(totalP)
        setFilterT(filter)
        
        onchangeTable(sort, size, page, totalP, filter)
    }

    const requestSort = (key: string) => {
        let res = sortConfig.find((conf) => {
            return conf.key == key
        })

        if (!res) {
            let newSort = [...sortConfig, { key, direction: 'asc' }]
            cambiarOrden(newSort)
        } else {
            let direction = 'asc';
            if (res.direction === 'asc') {
                direction = 'desc';
            }

            res.direction = direction
            let newSort = [...sortConfig]
            cambiarOrden(newSort)
        }
    };

    const getArrow = (key: any) => {
        let res = sortConfig.find((conf) => {
            return key == conf.key
        });

        if (res) {
            return res.direction === 'asc' ? '▼' : '▲';//'⬆' : '⬇';
        } else {
            return '⬍';
        }
    };

    const alinear = (align: string = '') => {
        if (align == 'center') {
            return 'text-center'
        } else if (align == 'start') {
            return 'text-start'
        } else if (align == 'end') {
            return 'text-end'
        } else {
            return 'text-start'
        }
    }

    const formatearaDDMMYYYY = (fechaString: string) => {
        if (fechaString) {
            const fecha = new Date(fechaString);
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const anio = fecha.getFullYear();
            return `${dia}/${mes}/${anio}`;
        } else {
            return 'Sin fecha';
        }
    }

    const formatearaBoolean = (data: any) => {
        if (configution.language && configution.language == 'es') {
            return data == true || data == 'true' ? 'Si' : 'No'
        } else {
            return data == true || data == 'true' ? 'Yes' : 'Not'
        }
    }

    const pintarCampo = (item: any, head: modeloItemTabla) => {
        if (head.type == 'text') {
            return (
                <div>{item[head.id]}</div>
            )
        } else if (head.type == 'date') {
            return (
                <div>{formatearaDDMMYYYY(item[head.id])}</div>
            )
        } else if (head.type == 'boolean') {
            return (
                <div>{formatearaBoolean(item[head.id])}</div>
            )
        } else if (head.type == 'rud') {
            return (
                <div>
                    <div className="row">
                        {
                            read ?
                                <div className="col-4">
                                    <button className='rounded border border-0 cursor-pointer' onClick={() => read ? read(item) : null} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={language.titleBtnSee} disabled={disabled}>
                                        <i className="bi bi-eye-fill"></i>
                                    </button>
                                </div> : null
                        }
                        {
                            update ?
                                <div className="col-4">
                                    <button className='rounded border border-0 cursor-pointer' onClick={() => update ? update(item) : null} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={language.titleBtnUpdate} disabled={disabled}>
                                        <i className="bi bi-pencil-fill"></i>
                                    </button>
                                </div> : null
                        }
                        {
                            delet ?
                                <div className="col-4">
                                    <button className='rounded border border-0 cursor-pointer' onClick={() => delet ? confirmar(item) : null} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={language.titleBtnDelete} disabled={disabled}>
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                </div> : null
                        }
                    </div>
                </div>
            )
        } else if (head.type == 'personalized') {
            return (
                <div>
                    {head.component ? head.component(item) : 'Definir componente'}
                </div>
            )
        } else {
            return (
                <div>Sin tipo definido</div>
            )
        }
    }

    const pintarTabla = (data: Array<any>) => {
        return (
            <div className="table-responsive">
                <table className={`table ${configution.classTable ? configution.classTable : ''}`}>
                    <thead>
                        <tr>
                            {
                                configution.headersTable.map((head, keyHead) => {
                                    return (
                                        <th key={keyHead} onClick={() => { (head.sort == null || head.sort) && !disabled ? requestSort(head.id) : null }} className={alinear(head.head)} style={head.width ? { width: head.width?.includes('%') ? head.width : `${head.width}px` } : undefined} scope="col">{head.label} {head.sort == null || head.sort ? getArrow(head.id) : null}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        {
                                            configution.headersTable.map((head, keyHead) => {
                                                return (<td key={keyHead} className={`align-middle ${alinear(head.body)}`}>{pintarCampo(item, head)}</td>)
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    const pintarCards = (data: Array<any> = []) => {//text-truncate
        return (
            <div className='row w-100 p-0 m-0'>
                {
                    data.map((item, key) => {
                        return (
                            <div className='col-sm-12 col-md-6 col-lg-4 pb-2 d-flex justify-content-center' key={key}>
                                <div className={`card ${configution.classCard ? configution.classCard : ''}`} style={{
                                    width: '80%'
                                }}>
                                    <div className="card-body">
                                        {
                                            configution.headersTable.map((head, keyHead) => {
                                                return (
                                                    <div className='row' key={keyHead}>
                                                        <div className='col-6'>
                                                            {head.label}:
                                                        </div>
                                                        <div className='col-6'>
                                                            {pintarCampo(item, head)}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const onchangePagination = (size: number, page: number, filter: string | undefined) => {
        console.log(size, page, filter, 'onchangePagination');
        onchangeTable(sortConfig, size, page, totalPageT, filter)
        refPagination.current?.refrescarValores(size, page, filter)
    }

    const refrescarValores = (size: number, page: number, filter: string | undefined) => {
        refPagination.current?.refrescarValores(size, page, filter)
    }

    useImperativeHandle(ref, () => ({
        refrescarValores,
        cargarTooltip
    }));

    return (
        <div>
            <Pagination
                ref={refPagination}
                totalPages={totalPages}
                onchangePagination={onchangePagination}
                disabled={disabled}
            />

            {
            //isMobile ? pintarCards(dataT) : pintarTabla(dataT)
            }
            {isMobile ? pintarCards(data) : pintarTabla(data)}


            <Modal
                continueModal={continueModal}
                closeModal={closeModal}
                ref={refModalConfirmar}
                component={'¿Está seguro de eliminar la fila?'}
            />
        </div>
    )
})