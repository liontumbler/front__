'use client';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface modeloModal {
    title?: string
    closeModal?: Function
    continueModal?: Function
    component: any
    textBtnClose?: string
    textBtnOpen?: string
}

export default forwardRef(({ title = '', closeModal, continueModal, component, textBtnClose = 'Cancelar', textBtnOpen = 'Continuar' }: modeloModal, ref) => {

    const [modalVisible, setModalVisible] = useState<string>('');
    const [dataModal, setDataModal] = useState<any>(null);
    const show = (data: any = null) => {
        if (data) {
            setDataModal(data)
        }

        setModalVisible('d-block')
    }

    const hiden = () => {
        setModalVisible('')
    }

    useImperativeHandle(ref, () => ({
        show,
        hiden
    }));

    return (
        <div className={`modal fade show ${modalVisible}`} style={{background: '#000000b8'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{title}</h1>
                        {
                            closeModal ? <button type="button" className="btn-close" onClick={(e) => { closeModal() }} aria-label="Close"></button> : null
                        }
                    </div>
                    <div className="modal-body">
                        {component}
                    </div>
                    <div className="modal-footer">
                        {
                            closeModal ? <button type="button" className="btn btn-secondary" onClick={(e) => { closeModal() }}>{textBtnClose}</button> : null
                        }
                        {
                            continueModal ? <button type="button" className="btn btn-primary" onClick={(e) => { continueModal(dataModal) }}>{textBtnOpen}</button> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )

})