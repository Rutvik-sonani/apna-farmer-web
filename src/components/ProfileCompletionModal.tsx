import React from 'react';
import Modal from './Modal';
import CustomButton from './CustomButton';
import { User } from 'lucide-react';

interface ProfileCompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void;
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ isOpen, onClose, onAction }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Complete Your Profile"
            size="sm"
        >
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: '#E8F5E9',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <User size={30} color="#00590D" />
                </div>

                <h3 style={{ margin: '0 0 1rem', color: '#1a1a1a' }}>Complete Your Profile</h3>

                <p style={{ color: '#666', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                    To post crop details, please complete your basic information first.
                </p>

                <div style={{
                    background: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    color: '#444'
                }}>
                    <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Required info:</div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Phone Number</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: '1px solid #ddd',
                            background: 'white',
                            borderRadius: '8px',
                            color: '#666',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </button>
                    <div style={{ flex: 1 }}>
                        <CustomButton
                            title="Go to Basic Info"
                            onPress={onAction}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileCompletionModal;
