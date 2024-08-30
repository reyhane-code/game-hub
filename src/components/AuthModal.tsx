import { useEffect, useState } from 'react';
import Modal from './common/Modal';
import LoginForm from './LoginForm';
import useAuthStore from '../auth.store';

const AuthModal = () => {
    const closeloginDialog = useAuthStore(s => s.closeLoginDialog)
    const loginDialog = useAuthStore(s => s.loginDialog)
    const [isOpen, setIsOpen] = useState(loginDialog);

    useEffect(() => {
        console.log('auth modal', loginDialog)
        setIsOpen(loginDialog)
    }, [loginDialog])


    const closeModal = () => {
        closeloginDialog()
        setIsOpen(false);
    };

    return (

        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title="Authentication"
            message="Please log in or register to continue."
        >
            <LoginForm />
        </Modal>
    );
};

export default AuthModal;
