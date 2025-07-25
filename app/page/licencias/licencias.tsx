import Table from "../../components/table";

import { useEffect, useState, useRef } from 'react';
import { licenciaService } from "../../services/licencia/licenciaService";

interface modelTable {
  refrescarValores: Function
  cargarTooltip: Function
}

export function Licencias() {
  useEffect(() => {
    cargarDatos()
  }, []);

  const service = new licenciaService()

  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);

  const refTable = useRef<modelTable>(null)

  const cargarDatos = async (size: number = 10, page: number = 1, sort: Array<any> | undefined = undefined, filter: string | undefined = undefined) => {
    setDisabled(true)
    let dataService = await service.getLicenciaService({ size, page, sort, filter })
    setDisabled(false)

    console.log(dataService);

    setData(dataService.datos.data)
    setTotalPages(dataService.datos.total)
    refTable.current?.cargarTooltip();
    refTable.current?.refrescarValores(data, size, page, totalPages, filter)
  };

  const delet = async (item: any) => {
    if (item.id) {
      setDisabled(true)
      let dataService = await service.deleteLicenciaService(item.id)
      await cargarDatos()
      setDisabled(false)
      console.log(dataService);
    }
  }

  // const test = (item: any) => {
  //   console.log('holaaaaa', item);
  // }

  // const component = (item: any) => {
  //   return (
  //     <div>
  //       hola
  //       <button onClick={() => test(item)}> hola escucho personalizado</button>
  //     </div>
  //   )
  // }

  const onchangeTable = async (sort: Array<any>, size: number, page: number, filter: string | undefined) => {
    await cargarDatos(size, page, sort, filter)
  }

  return (
    <div className='container'>
      <Table
        ref={refTable}
        totalPages={totalPages}
        configution={{
          language: 'en',
          classTable: 'table-bordered border-primary',
          classCard: 'border-primary',
          headersTable: [
            {
              label: 'Codigos',
              id: 'codigo',
              type: 'text',
              head: 'center'
            },
            {
              label: 'Valor',
              id: 'valor',
              type: 'text',
              head: 'end'
            },
            {
              label: 'Fecha inicio',
              id: 'fecha_inicio',
              type: 'date',
              body: 'center'
            },
            {
              label: 'Fecha fin',
              id: 'fecha_fin',
              type: 'date',
              body: 'end'
            },
            {
              label: 'Estado',
              id: 'estado',
              type: 'text',
              body: 'end'
            },
            {
              label: 'Accion',
              id: '',
              type: 'rud',
              sort: false
            },
            // {
            //   label: 'personalizado',
            //   id: '',
            //   type: 'personalized',
            //   sort: false,
            //   width: '50%',
            //   component: component
            // }
          ]
        }}
        disabled={disabled}
        onchangeTable={onchangeTable}
        data={data}
        delet={delet}
      />
    </div>
  );
}