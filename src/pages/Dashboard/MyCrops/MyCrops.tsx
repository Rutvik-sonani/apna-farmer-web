import { useState, useEffect } from 'react';
import { Edit2, Trash2, AlertCircle } from 'lucide-react'
import FarmerCard from '../../../components/cards/FarmerCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyState from '../../../components/EmptyState';
import Modal from '@/components/Modal';
import { fetchMyCrops as fetchMyCropsService } from '../../../services/cropService';
import { localDb } from '../../../services/endpoints';
import type { Crop } from '../../../types';

interface CropWithStatus extends Crop {
    status?: string;
    createdAt?: string;
}

const MyCrops = () => {
    const [crops, setCrops] = useState<CropWithStatus[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; cropId: string | null }>({
        open: false,
        cropId: null
    });

    useEffect(() => {
        fetchMyCrops();
    }, []);

    const fetchMyCrops = async () => {
        try {
            setLoading(true);
            const authData = localStorage.getItem(localDb.AUTH);
            if (!authData) return;

            const parsed = JSON.parse(authData);
            const userId = parsed?.user?.id || parsed?.user?._id || parsed?.id || parsed?._id;

            if (userId) {
                const response = await fetchMyCropsService(userId);
                if (response.success && response.data) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setCrops((response.data as any).docs || response.data as unknown as CropWithStatus[]);
                } else {
                    setCrops([]);
                }
            }
        } catch (error) {
            console.error(error);
            setCrops([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cropId: string) => {
        window.location.href = `/sell?edit=${cropId}`;
    };

    const handleDeleteClick = (cropId: string) => {
        setDeleteModal({ open: true, cropId });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.cropId) return;

        try {
            // await api.delete(`${endPoints.SELL_CROP}/${deleteModal.cropId}`);
            setCrops(prev => prev.filter((c) => c._id !== deleteModal.cropId));
            setDeleteModal({ open: false, cropId: null });
            alert('Crop deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to delete crop');
        }
    };

    return (
        <div className="my-crops-page" style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#00590D', margin: 0 }}>My Crops</h2>
                <button
                    onClick={() => window.location.href = '/sell'}
                    style={{
                        background: '#00590D',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    + Add New Crop
                </button>
            </div>

            {loading ? (
                <LoadingSpinner text="Loading your crops..." />
            ) : (
                <div className="crops-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>
                    {crops.length > 0 ? crops.map((crop) => (
                        <div key={crop._id} style={{ position: 'relative' }}>
                            <FarmerCard
                                item={crop}
                                onClick={() => console.log('View details:', crop._id)}
                            />
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                marginTop: '8px'
                            }}>
                                <button
                                    onClick={() => handleEdit(crop._id)}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '8px',
                                        border: '1px solid #00590D',
                                        background: 'white',
                                        color: '#00590D',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(crop._id)}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '8px',
                                        border: '1px solid #ff4d4d',
                                        background: 'white',
                                        color: '#ff4d4d',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div style={{ gridColumn: '1/-1' }}>
                            <EmptyState
                                icon="🌾"
                                title="No Crops Posted Yet"
                                description="Start selling by posting your first crop"
                                action={{
                                    label: 'Post a Crop',
                                    onClick: () => window.location.href = '/sell'
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, cropId: null })}
                title="Delete Crop"
                size="sm"
            >
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <AlertCircle size={48} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
                    <p>Are you sure you want to delete this crop posting?</p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>This action cannot be undone.</p>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
                        <button
                            onClick={() => setDeleteModal({ open: false, cropId: null })}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: '1px solid #ddd',
                                background: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteConfirm}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                background: '#ff4d4d',
                                color: 'white',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyCrops;
