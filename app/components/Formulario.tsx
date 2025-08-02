import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Input, { type modelInput } from "./Input";
import Button from "./Button";
import SelectReact from './SelectReact';
import { default as SelectNative, type modelSelect } from "./Select";
import { validarCampos } from "../utils/utils";

import Modal , {type modelModal} from "./Modal";

type option = {
    label: string
    value: number | string
}

type campo = {
    id: string
    type: 'text' | 'password' | 'select' | 'email' | 'number' | 'selectReact'
    placeholder?: string
    label?: string
    maxLength?: number
    minLength?: number
    max?: number
    min?: number
    options?: Array<option>
}

type FormularioProps = {
    campos: Array<campo>
    disabled: boolean
    cargando: boolean
    textBoton: string
    sutmit?: Function
};

export default forwardRef(({ campos, disabled, cargando, textBoton, sutmit }: FormularioProps, ref) => {
    const [msg, setMsg] = useState<string | boolean>('');
    const col = 6

    const refModalMsg = useRef<modelModal>(null)
    //let refCampos = useRef<Array<modelInput | modelSelect | null>>([]);

    const refCampos = campos.map((campo) => {
        return useRef<modelInput | modelSelect>(null);
    });

    const formAction = () => {
        let validar = validarCampos(refCampos)
        if (validar === true){
            if (sutmit) {
                sutmit(getValues())
            } else {
                return getValues()
            }
        } else {
            setMsg(validar)
            refModalMsg.current?.show();
            console.error(validar)
        }
    }

    const getValues = () => {
        let valorRetorno = []
        for (const key in refCampos) {
            const ref = refCampos[key];
            valorRetorno[ref.current?.getId()] = ref.current?.value()
        }
        return valorRetorno
    }

    const tipoCampo = (campo: campo, key: number) => {
        if (campo.type == 'text') {
            return (
                <Input
                    label={campo.label}
                    type={campo.type}
                    ref={refCampos[key]}
                    correjir={true}
                    id={campo.id}
                    placeholder={campo.placeholder}
                    //classNameInput='text-center'
                    //className={'w-100'}
                    maxLength={campo.maxLength}
                    minLength={campo.minLength}
                    max={campo.max}
                    min={campo.min}
                    disabled={disabled}
                />
            )
        } else if (campo.type == 'select') {
            return (
                <SelectNative 
                    ref={refCampos[key]}
                    id={campo.id} 
                    disabled={disabled}
                    label={campo.label}
                    options={campo.options ? campo.options : []}
                />
            )
        } else if (campo.type == 'selectReact') {
            return (
                <SelectReact
                    ref={refCampos[key]}
                    id={campo.id} 
                    disabled={disabled}
                    label={campo.label}
                    options={campo.options ? campo.options : []}
                />
            )
        }
    }

    const continueModal = () => {
        console.log('hola');
        refModalMsg.current?.hiden();
    }

    useImperativeHandle(ref, () => ({
        formAction
    }));

    return (
        <div className="row">
            {
                campos.map((campo, key) => {
                    return (
                        <div key={key} className={`col-sm-12 col-md-${col} mt-2`}>
                            {tipoCampo(campo, key)}
                        </div>
                    )
                })
            }
            {
                sutmit ? (
                    <div className="col-sm-12 mt-2">
                        <Button
                            cargando={cargando}
                            disabled={disabled}
                            onClick={formAction}
                            text={textBoton}
                        />
                    </div>
                ) : null
            }
            
            <Modal
                classDialog="modal-dialog-centered"
                continueModal={continueModal}
                ref={refModalMsg}
                component={msg}
            />
        </div>
    );
})
