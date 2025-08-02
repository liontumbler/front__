import { useEffect, useState, useRef } from 'react';

import Table from "../../components/Table";
import Formulario from "../../components/Formulario";
import Button from "../../components/Button";
import Modal, { type modelModal } from "../../components/Modal";

import { licenciaService } from "../../services/licencia/licenciaService";

interface modelTable {
  refrescarValores: Function
  cargarTooltip: Function
}

type modelForm = {
  formAction: Function
}

export function Licencias() {
  useEffect(() => {
    cargarDatos()
  }, []);

  const refModalCrear = useRef<modelModal>(null)
  const refForm = useRef<modelForm>(null)
  

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
    refTable.current?.refrescarValores(size, page, filter)
    refTable.current?.cargarTooltip();
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

  const select = [
    { value: 10, label: 'uno' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
    { value: 50, label: '50' },
    { value: 60, label: '60' },
    { value: 70, label: '70' },
    { value: 80, label: '80' },
    { value: 90, label: '90' },
    { value: 100, label: '100' }
  ]

  const crearLicencia = (data: any) => {
    console.log(data, 'data');
    
  }

  const abrirModalCrear = () => {
    refModalCrear.current?.show()
  }

  const continueModal = () => {
    const values = refForm.current?.formAction()
    console.log('continueModal', values);
    
  }

  const closeModal = () => {

  }

  const onchangeTable = async (sort: Array<any>, size: number, page: number, filter: string | undefined) => {
    await cargarDatos(size, page, sort, filter)
  }

  return (
    <>
      <Modal
        classDialog="modal-lg"
        continueModal={continueModal}
        closeModal={closeModal}
        ref={refModalCrear}
        component={
          <Formulario
            ref={refForm}
            //sutmit={crearLicencia}
            campos={[
              {
                id: 'hola',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola1',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola2',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola3',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola4',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola5',
                type: 'text',
                placeholder: 'hola'
              },
              {
                id: 'hola6',
                type: 'selectReact',
                options: select
              },
              {
                id: 'hola7',
                type: 'select',
                options: select
              }
            ]}

            disabled={disabled}
            cargando={false}
            textBoton='hooolllaaa'
          />
        }
      />
      <div className='container'>
        <Button
          cargando={false}
          disabled={disabled}
          onClick={abrirModalCrear}
          text={'textBoton'}
        />
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
    </>

  );
}