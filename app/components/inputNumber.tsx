import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface input {
    label?: string
    className?: string
    classNameInput?: string
    id: string
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    placeholder?: string
    correjir?: boolean
    defaultValue?: number
    onChange?: Function
    type: 'number' | 'text' | 'email' | 'password'
    disabled?: boolean
}

interface modelInput {
    validarCampo: Function
    value: Function
    setValue: Function
}

export default forwardRef(({ type, defaultValue, label, classNameInput, className = 'col-sm-12 col-md-12', id, min, max, minLength, maxLength, placeholder, correjir = false, onChange, disabled }: input, ref) => {

    const [valor, setValor] = useState<number | undefined | string>(defaultValue);

    const validarCampo = () => {
        if (type == 'number') {
            if (!valor && valor != 0) {
                return `el campo '${label}' esta vacio`
            } else if (max && typeof valor === 'number' && max < valor) {
                return `el campo '${label}' es mayor recuerde que el maximo es ${max}`
            } else if (min && typeof valor === 'number' && min > valor) {
                return `el campo '${label}' es menor recuerde que el minimo es ${min}`
            } else {
                //console.log('validado', label);
                return true
            }
        } else if (type == 'text' || type == 'email' || type == 'password') {
            const texto = valor?.toString().trim() ?? '';
            if (texto === '') {
                return `el campo '${label}' esta vacio`
            } else if (maxLength && maxLength < texto.length) {
                return `el campo '${label}' es mayor recuerde que el maximo es ${maxLength}`
            } else if (minLength && minLength > texto.length) {
                return `el campo '${label}' es menor recuerde que el minimo es ${minLength}`
            } else {
                if (type == 'email') {
                    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!regex.test(valor as string)) {
                        return `el campo '${label}' formato invalido`
                    }
                }
                //console.log('validado', label);
                return true
            }
        } 

    }

    const value = () => {
        return valor
    }

    const setValue = (valor: number) => {
        setValor(valor)
    }

    useImperativeHandle(ref, () => ({
        validarCampo,
        value,
        setValue
    }));

    const handleChageNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const onlyNumbers = raw.replace(/[^0-9]/g, '');

        let aux = onlyNumbers === '' ? undefined : Number(onlyNumbers)

        if (correjir) {
            if ((max && aux != undefined) && aux > max) {
                aux = max
            } else if ((min && aux != undefined) && aux < min) {
                aux = min
            }
        }

        setValor(aux)

        onChange && aux != undefined ? onChange(aux) : null;
    }

    const handleChagePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const onlyValid = raw.replace(/[^a-zA-Z0-9$%&]/g, '');

        const aux = onlyValid.length
        let value = onlyValid

        if (correjir) {
            if ((maxLength && aux != undefined) && aux > maxLength) {
                value = value.slice(0, maxLength);
            }
        }

        setValor(value)

        onChange && value != undefined ? onChange(value) : null;
    }

    const handleChageText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const onlyValid = raw.replace(/[^a-zA-Z0-9 ]/g, '');

        const aux = onlyValid.length
        let value = onlyValid

        if (correjir) {
            if ((maxLength && aux != undefined) && aux > maxLength) {
                value = value.slice(0, maxLength);
            }
        }

        setValor(value)

        onChange && value != undefined ? onChange(value) : null;
    }

    const handleChageEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const onlyValid = raw.replace(/[^a-zA-Z0-9@\-\_.]/g, '');

        const aux = onlyValid.length
        let value = onlyValid

        if (correjir) {
            if ((maxLength && aux != undefined) && aux > maxLength) {
                value = value.slice(0, maxLength);
            }
        }

        setValor(value)

        onChange && value != undefined ? onChange(value) : null;
    }

    const input = (type: string) => {
        if (type == 'number') {
            return (
                <input type="text" className={`form-control ${classNameInput ? classNameInput : ''}`} name={id} id={id} min={min} max={max} placeholder={placeholder} value={valor ?? ''} onChange={handleChageNumber} disabled={disabled} />
            )
        } else if (type == 'text') {
            return (
                <input type="text" className={`form-control ${classNameInput ? classNameInput : ''}`} name={id} id={id} minLength={minLength} maxLength={maxLength} placeholder={placeholder} value={valor ?? ''} onChange={handleChageText} disabled={disabled} />
            )
        } else if (type == 'email') {
            return (
                <input type="email" className={`form-control ${classNameInput ? classNameInput : ''}`} name={id} id={id} minLength={minLength} maxLength={maxLength} placeholder={placeholder} value={valor ?? ''} onChange={handleChageEmail} disabled={disabled} />
            )
        } else if (type == 'password') {
            return (
                <input type="password" className={`form-control ${classNameInput ? classNameInput : ''}`} name={id} id={id} minLength={minLength} maxLength={maxLength} placeholder={placeholder} value={valor ?? ''} onChange={handleChagePass} disabled={disabled} />
            )
        }

    }

    return (
        <div className={className}>
            <div>
                {
                    label ? <label htmlFor={id} className="form-label">{label}</label> : null
                }
                {
                    input(type)
                }
            </div>
        </div>
    )
})

export { type modelInput } 