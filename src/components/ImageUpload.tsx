import { X, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
    maxSizeMB?: number;
}

const ImageUpload = ({ images, onChange, maxImages = 5, maxSizeMB = 5 }: ImageUploadProps) => {
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setError('');

        if (images.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        const validFiles: string[] = [];

        files.forEach(file => {
            // Check file type
            if (!file.type.startsWith('image/')) {
                setError('Only image files are allowed');
                return;
            }

            // Check file size
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`Image size should be less than ${maxSizeMB}MB`);
                return;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                validFiles.push(reader.result as string);
                if (validFiles.length === files.length) {
                    onChange([...images, ...validFiles]);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <div className="image-upload-container">
            <div className="image-preview-grid">
                {images.map((img, index) => (
                    <div key={index} className="image-preview-item">
                        <img src={img} alt={`Preview ${index + 1}`} />
                        <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(index)}
                            aria-label="Remove image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {images.length < maxImages && (
                    <label className="image-upload-trigger">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                        <div className="upload-icon">
                            <Upload size={24} />
                        </div>
                        <span>Add Photo</span>
                    </label>
                )}
            </div>

            {error && <div className="upload-error">{error}</div>}

            <div className="upload-hint">
                {images.length}/{maxImages} images • Max {maxSizeMB}MB each
            </div>
        </div>
    );
};

export default ImageUpload;
