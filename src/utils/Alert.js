import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Alert({ show, setShow, title, message, confirmText }) {
    return (
        <AwesomeAlert
            show={show}
            title={title}
            message={message}
            closeOnTouchOutside={true}
            confirmText={confirmText || 'Aceptar'}
        />
    );
}