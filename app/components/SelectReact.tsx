import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Select from 'react-select';
type optionType = {
    value: string | number 
    label: string
}

type SelectProps = {
    valor?: any;
    options: Array<optionType>
    onChange?: (value: any) => void
    disabled: boolean
    label?: string
    id: string
    defaultValue?: number | undefined | string 
    cargando?: boolean
};

interface ModelSelect {
    validarCampo: Function
    value: Function
    getId: Function
    setValue: Function
}

const SelectReact = forwardRef(({defaultValue = undefined, options, onChange, disabled, label, id, cargando }: SelectProps, ref) => {
    // useEffect(() => {
    //     if (!defaultValue) {
    //         setValor(options[0].value)
    //     }
    // }, []);
    
    const [valor, setValor] = useState<number | undefined | string>(defaultValue);

    const handleChange = (option: any) => {
        const value = option ? option.value : null;
        setValor(value);
        if (onChange) {
            onChange(value);
        }
    };

    const value = () => {
        return valor
    }

    const setValue = (valor: number) => {
        setValor(valor)
    }

    const getId = () => {
        return id
    }

    const validarCampo = () => {
        if (!valor) {
            return `el campo '${label || id}' esta vacio`
        } else {
            return true
        }
    }

    useImperativeHandle(ref, () => ({
        validarCampo,
        getId,
        value,
        setValue
    }));

    return (
        <div>
            {
                label ? <label htmlFor={id} className="form-label">{label}</label> : null
            }
            {
                <Select<optionType, false>
                    classNamePrefix="form-select"
                    isDisabled={disabled}
                    isLoading={cargando}
                    isClearable={true}
                    isSearchable={true}
                    name={id}
                    id={id}
                    options={options}
                    onChange={handleChange}
                />
            }
        </div>
    );
})

export default SelectReact;
export type { ModelSelect };
