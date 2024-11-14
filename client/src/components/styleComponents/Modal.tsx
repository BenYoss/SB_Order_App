import React, { useState } from 'react';

import errorIcon from '../../img/errorModalIcon.png';
import infoIcon from '../../img/infoModalIcon.png';
import verifyIcon from '../../img/verifyModalIcon.png';
import { motion, Variants} from 'framer-motion';

interface ModalInterface {
    title: string
    variant: string
    body: ModalBody
    setExited: Function
}

interface ModalBody {
    header: string | null
    text: string
    buttonRoute: string | null
    inputRequired: boolean
    inputHandler: Function | null
    inputResult: boolean

}

interface VariantTypes {
    [key: string]: {
        [innerKey: string]: string
    }
}

const variantsList: VariantTypes = {
    "warning": {
        "generic": 'warning',
        "icon": '',
    },
    "urgent": {
        "generic": 'urgent',
        "icon": errorIcon,
    },
    "info": {
        "generic": 'info',
        "icon": infoIcon,
    },
    "verification": {
        "generic": 'verify',
        "icon": verifyIcon,
    },
}

const modalMotion: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1.0 }
}


const Modal: React.FC<ModalInterface> = ({ title, variant, body, setExited }) => {

    const [inputValue, setInputValue] = useState<string>();

    const handleInputValue = (_event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = _event.target;
        setInputValue(value);
    }

    return (
        <motion.div 
            variants={modalMotion}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}

            className={`modal-container ${variantsList[variant].generic}`}
            >
                <div className={`modal-header ${variantsList[variant].generic}`}>
                    <div className={`modal-icon-container ${variantsList[variant].generic}`}>
                        <img src={variantsList[variant].icon} alt="" className="modal-icon" />
                    </div>
                    <span className="modal-header-text">{title}</span>
                    <button type="button" onClick={() => setExited(true)}className={`modal-icon-container btn-icon ${variantsList[variant].generic}`}>
                        X
                    </button>
                </div>
                <div className="line"></div>
                <div className={`modal-body ${variantsList[variant].generic}`}>
                    {
                        body.header && (
                            <div className="modal-body-header">
                                <span className="modal-body-header-text hdr">
                                    {body.header}
                                </span>
                            </div>
                        )
                    }
                    {
                        body.inputRequired && (
                            <div className="modal-input-handler" style={body.inputResult ? {border: '2px solid lime'}: {}}>
                                <input type="text" value={inputValue} onChange={handleInputValue} className="modal-input" />
                            </div>
                        )
                    }
                    <div className="modal-body-text">
                        {body.text}
                    </div>
                </div>
                <div className={`modal-footer ${variantsList[variant].generic}`}>
                    {
                        variantsList[variant].generic == 'verify' && 
                        body.inputRequired ? (
                            <button className="verify-code btn" onClick={() => { body.inputHandler && body.inputHandler(inputValue) }}>
                                Verify Code
                            </button>
                        ) : null
                    }
                </div>
            </motion.div>
    )
}

export default Modal;
