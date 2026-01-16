import React from 'react';
import { Clock } from 'lucide-react';
import Modal from './Modal';
import CustomButton from './CustomButton';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
    isOpen,
    onClose,
    title = 'Coming Soon',
    message = 'We are working hard to bring this feature to you. Stay tuned!'
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1rem'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--light-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <Clock size={40} color="var(--green)" />
                </div>

                <h3 style={{
                    color: 'var(--title)',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    marginTop: 0
                }}>
                    {title}
                </h3>

                <p style={{
                    color: 'var(--subtitle)',
                    lineHeight: '1.6',
                    margin: '0 0 2rem 0',
                    maxWidth: '300px'
                }}>
                    {message}
                </p>

                <div style={{ width: '100%', maxWidth: '200px' }}>
                    <CustomButton
                        title="Okay, Got it"
                        onPress={onClose}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ComingSoonModal;
