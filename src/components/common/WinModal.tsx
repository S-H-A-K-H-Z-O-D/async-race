import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import {ModalProps} from "./data.ts";

const WinModal: React.FC<ModalProps> = ({ isOpen, onClose, modalInfo }) => {



    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            center
            classNames={{
                modal: 'w-[300px] !bg-neutral-700 rounded-lg shadow-lg !text-white',
                closeButton: "!bg-neutral-300 rounded !text-white"
            }}
        >
            <div className={'p-2 pb-8 bg--700'}>
                <h2 className="text-center text-3xl border-b text-white">Winner</h2>
                <p className="text-center text-2xl text-white mt-4">{modalInfo?.name}</p>
                <p className="text-center text-2xl text-white">Time: {(modalInfo?.time/1000).toFixed(2)} s</p>

            </div>
        </Modal>
    )
}

export default WinModal
