import { useState, useEffect } from 'react';

const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString)
    return fecha.toLocaleString('sv-SE').replace('T', ' ');
}

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, [breakpoint]);

    return isMobile;
}

const validarCampos = (consultar: any) => {
    let valido = true;
    for (const key in consultar) {
        let campo = consultar[key]
        let validar = campo.current?.validarCampo()
        console.log(validar, campo);

        if (validar !== true) {
            //alert(validar)
            valido = validar;
            break;
        }
    }
    return valido;
}

export { formatearFecha, useIsMobile, validarCampos }