import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import ImageUpload from '@/components/ImageUpload';
import Modal from '@/components/Modal';

const AddPost = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('Please Provide post message');
            return;
        }

        setLoading(true);
        try {
            // Mock API call
            console.log('Posting:', { content, images });
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowSuccessModal(true);
            setTimeout(() => {
                navigate('/community');
            }, 2000);
        } catch (error) {
            console.error(error);
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-post-page" style={{ padding: '1rem', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '1rem' }} />
                <h2 style={{ margin: 0 }}>Create Post</h2>
            </div>

            {/* Form */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind? Share farming tips, experiences, or ask questions..."
                    style={{
                        width: '100%',
                        minHeight: '150px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                    }}
                />

                <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem', fontWeight: 500 }}>
                        <Camera size={18} />
                        Add Photos (Optional)
                    </label>
                    <ImageUpload
                        images={images}
                        onChange={setImages}
                        maxImages={4}
                        maxSizeMB={3}
                    />
                </div>
            </div>

            {/* Tips */}
            <div style={{
                background: '#DFF0DD',
                border: '1px solid #00590D20',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
            }}>
                <strong style={{ color: '#00590D' }}>💡 Tips for great posts:</strong>
                <ul style={{ margin: '0.5rem 0 0 1.25rem', color: '#666', fontSize: '0.9rem' }}>
                    <li>Share useful farming knowledge</li>
                    <li>Ask questions to learn from others</li>
                    <li>Post updates about your crops</li>
                    <li>Be respectful and helpful</li>
                </ul>
            </div>

            {/* Submit Button */}
            <CustomButton
                title="Post to Community"
                onPress={handleSubmit}
                isLoading={loading}
                disabled={!content.trim()}
            />

            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onClose={() => { }}
                showCloseButton={false}
                size="sm"
            >
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3>Post Created!</h3>
                    <p style={{ color: '#666' }}>Your post has been shared with the community.</p>
                </div>
            </Modal>
        </div>
    );
};

export default AddPost;
