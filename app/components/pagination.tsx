import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Input, {type modelInput} from "./Input";
import Select from "./";

interface modeloPagination {
    totalPages: number
    onchangePagination: Function
    disabled: boolean
}

export default forwardRef(({ totalPages, onchangePagination, disabled } : modeloPagination, ref) => {
    const [filter, setFilter] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [sizeP, setSizeP] = useState<number>(10);

    const refPaginacion = useRef<modelInput>(null)
    const refSearch = useRef<modelInput>(null)

    function handlePage(size: number, page: number, filter: string | undefined) {
        console.log(size, '....');
        //setSizeP(size)
        setPage(page)
        setFilter(filter)
        onchangePagination(size, page, filter)
    }

    const refrescarValores = (size: number, page: number, filter: string | undefined) => {
        setSizeP(size)
        setPage(page)
        setFilter(filter)
    }

    const handleChageSize = (size: number) => {
        console.log(size, 'ooo');
        
        const pg = refPaginacion.current?.value()
        handlePage(size, pg, filter)
    }

    const handleChageInput = (pg: number) => {
        handlePage(sizeP, pg, filter)
    }

    const handleSiguiente = () => {
        const pg = refPaginacion.current?.value()
        const nextPg = pg +1
        if (nextPg <= totalPages) {
            refPaginacion.current?.setValue(nextPg)
            handlePage(sizeP, nextPg, filter)
        }
    }

    const handleAnterior = () => {
        const pg = refPaginacion.current?.value()
        const formerPg = pg -1
        if (formerPg > 0) {
            refPaginacion.current?.setValue(formerPg)
            handlePage(sizeP, formerPg, filter)
        }
    }

    const handlePrimero = () => {
        const pg = 1
        refPaginacion.current?.setValue(pg)
        handlePage(sizeP, pg, filter)
    }

    const handleUltimo = () => {
        const pg = totalPages
        refPaginacion.current?.setValue(pg)
        handlePage(sizeP, pg, filter)
    }

    const handleBuscar = () => {
        const pg = refPaginacion.current?.value()
        const filter = refSearch.current?.value()
        console.log('handleBuscar', sizeP, pg, filter);
        
        handlePage(sizeP, pg, filter)
    }

    const getSize = () => {
        return sizeP;
    }

    useImperativeHandle(ref, () => ({
        //disabledPagination,
        refrescarValores,
        getSize
    }));

    return (
        <div className='row'>
            <div className="col-sm-12 col-md-2 align-self-center">
                <div className='row py-2'>
                    <div className='col-6 align-self-center'>
                        Mostrar:
                    </div>
                    <div className='col-6'>
                        <Select id="mostrar" valor={sizeP} onChange={handleChageSize} disabled={disabled}
                            options={[
                                { value: 10, label: '10' },
                                { value: 20, label: '20' },
                                { value: 30, label: '30' },
                                { value: 40, label: '40' },
                                { value: 50, label: '50' },
                                { value: 60, label: '60' },
                                { value: 70, label: '70' },
                                { value: 80, label: '80' },
                                { value: 90, label: '90' },
                                { value: 100, label: '100' }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-5 align-self-center">
                <div className="row py-2">
                    <div className='col-9'>
                        <Input
                            type={'text'}
                            ref={refSearch}
                            correjir={true}
                            id='terceroopt'
                            placeholder='Buscar...'
                            classNameInput='text-center'
                            className={'w-100'}
                            maxLength={255}
                            minLength={1}
                            disabled={disabled}
                        />
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-primary w-100' disabled={disabled} onClick={handleBuscar}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-5 align-self-center">
                <div className="row py-2">
                    <div className="col-2 px-0 align-self-center text-center">
                        <button className='btn btn-primary' disabled={disabled}>
                            <i className="bi bi-chevron-bar-left" onClick={handlePrimero}></i>
                        </button>
                    </div>
                    <div className="col-2 px-0 align-self-center text-center">
                        <button className='btn btn-primary' disabled={disabled}>
                            <i className="bi bi-chevron-left" onClick={handleAnterior}></i>
                        </button>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-6 px-0">
                                <Input
                                    type={'number'}
                                    ref={refPaginacion}
                                    correjir={true}
                                    id='terceroopt'
                                    placeholder='pagina'
                                    classNameInput='text-center'
                                    max={totalPages}
                                    min={1}
                                    defaultValue={page}
                                    onChange={handleChageInput}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-6 px-0 align-self-center text-center">
                                /{totalPages}
                            </div>
                        </div>
                    </div>
                    <div className="col-2 px-0 align-self-center text-center">
                        <button className='btn btn-primary' disabled={disabled}>
                            <i className="bi bi-chevron-right" onClick={handleSiguiente}></i>
                        </button>
                    </div>
                    <div className="col-2 px-0 align-self-center text-center">
                        <button className='btn btn-primary' disabled={disabled}>
                            <i className="bi bi-chevron-bar-right" onClick={handleUltimo}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})