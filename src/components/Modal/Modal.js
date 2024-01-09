import React from 'react';
import './modal.css'
import {useDispatch, useSelector} from 'react-redux';
import {closeModal, selectIsModal} from '../../redux/slices/modal';

export const Modal = ({
                          title = '',
                          children
                      }) => {
    const dispatch = useDispatch()
    const isModal = useSelector(selectIsModal)
    const onClose = () => {
        dispatch(closeModal())
    }
    if (!isModal) return null;


    return <div className="modal" >
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <span className="modal-close" onClick={onClose}>&#10060;</span>
            </div>
            <div className="modal-body">
                <div className="modal-content">{children}</div>
            </div>
            <div className="modal-footer">
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    </div>
}

