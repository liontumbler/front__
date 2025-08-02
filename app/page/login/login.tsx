import logo from "./adminLig.svg";

import "./login.css";

import { useRef, useState } from 'react';

import { useIsMobile, validarCampos } from "../../utils/utils";

import { usuarioService } from "../../services/usuario/usuarioService";

import Input, { type modelInput } from "../../components/Input";
import Button from "../../components/Button";

export function Login() {
  const service = new usuarioService()

  const [disabled, setDisabled] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const refCorreo = useRef<modelInput>(null)
  const refPassword = useRef<modelInput>(null)

  const login = async () => {
    const consultar = {
      refCorreo,
      refPassword
    } as any

    let validar = validarCampos(consultar)
    if (validar === true) {
      let data = {
        correo: refCorreo.current?.value(),
        password: refPassword.current?.value()
      }

      setDisabled(true)
      setCargando(true)
      let res = await service.loginService(data)
      setDisabled(false)
      setCargando(false)

      if (res && res.code == 200) {
        window.location.href = '/table';
      } else {
        alert('datos incorrectos')
        console.error('login', res);
      }
    } else {
      alert(validar)
    }
  }

  return (
    <>
      <div className="vh-100 d-flex align-content-center">
        <div className={`shadow-lg d-block m-auto bg-white rounded ${isMobile ? 'w-50' : 'w-25'}`}>
          <div className="row px-4 py-3">
            <div className="col-lg-12 mb-1">
              <img
                src={logo}
                alt="React Router"
                className="block w-50 d-grid justify-self-center"
              />
            </div>
            <div className="col-lg-12 mb-1 py-2">
              <Input
                label={'correo'}
                type={'email'}
                ref={refCorreo}
                correjir={true}
                id='correo'
                placeholder='correo@dominio.com'
                classNameInput='text-center'
                className={'w-100'}
                maxLength={255}
                minLength={1}
                disabled={disabled}
              />
            </div>
            <div className="col-lg-12 mb-1 py-2">
              <Input
                label={'Contraseña'}
                type={'password'}
                ref={refPassword}
                correjir={true}
                id='password'
                placeholder='Contraseña'
                classNameInput='text-center'
                className={'w-100'}
                maxLength={255}
                minLength={1}
                disabled={disabled}
              />
            </div>
            <div className="col-lg-12 mb-1">
              <div className="d-grid gap-2">
                <Button
                  cargando={cargando}
                  disabled={disabled}
                  onClick={login}
                  text="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}