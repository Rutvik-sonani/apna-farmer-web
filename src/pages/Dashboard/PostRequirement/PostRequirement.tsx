import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import ProfileCompletionModal from '@/components/ProfileCompletionModal';
import { homeAction } from '@/redux/dashboardSlice';
import {
    fetchCropCategories,
    fetchCropNames,
    fetchCropTypes
} from '@/services/homeService';
import ImageUpload from '@/components/ImageUpload';

import type { RootState } from '@/redux/store';
import { Category } from '@/types';

interface PostRequirementProps {
    onClose?: () => void;
}

const PostRequirement = ({ onClose }: PostRequirementProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Profile Completion Check
    const {
        showCompletionModal,
        handleGoToProfile,
        handleCloseModal,
        checkCompletion
    } = useProfileCompletion();

    const { cropType: cropTypeList, categoryList, cropName: cropNameList } = useSelector((state: RootState) => state.home);

    const [formData, setFormData] = useState({
        cropType: '',
        category: '',
        cropName: '',
        productName: '',
        brand: '',
        qty: '',
        qtyUnit: '',
        price: '',
        priceUnit: '',
        specification: '',
        cropQuality: '',
        cropTypes: '', // For Regular/Organic radio
        images: [] as string[]
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const types = await fetchCropTypes();
                if (types?.success) dispatch(homeAction.fetchCropType(types.data));

                const cats = await fetchCropCategories();
                if (cats?.success) dispatch(homeAction.fetchHomeCategory(cats.data));
            } catch (error) {
                console.error("Failed to load metadata", error);
            }
        };
        loadInitialData();
    }, [dispatch]);

    useEffect(() => {
        const loadCrops = async () => {
            if (formData.category) {
                try {
                    const crops = await fetchCropNames(formData.category);
                    if (crops?.success) dispatch(homeAction.fetchCropname(crops.data));
                } catch (error) {
                    console.error("Failed to fetch crop names", error);
                }
            }
        };
        loadCrops();
    }, [formData.category, dispatch]);

    const qtyUnits = [
        { value: 'Quintal', label: 'Quintal' },
        { value: 'Kg', label: 'Kg' },
        { value: 'Ton', label: 'Ton' },
        { value: 'Bag', label: 'Bag' }
    ];

    const priceUnits = [
        { value: 'Per Quintal', label: 'Per Quintal' },
        { value: 'Per Kg', label: 'Per Kg' },
        { value: 'Per Ton', label: 'Per Ton' },
        { value: 'Per Bag', label: 'Per Bag' }
    ];

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.cropType) {
            newErrors.cropType = 'Please select crop type';
        }

        const isCrops = ['680918a92215ca25074b3f13'].includes(formData.cropType) || formData.cropType === 'crops';

        if (!formData.qty.trim()) {
            newErrors.qty = 'Please enter quantity';
        } else if (!formData.qtyUnit) {
            newErrors.qtyUnit = 'Please select quantity unit';
        }

        if (!formData.specification.trim()) {
            newErrors.specification = 'Please enter product description';
        }

        if (isCrops) {
            if (!formData.category) {
                newErrors.category = 'Please select crop category';
            } else if (!formData.cropName) {
                newErrors.cropName = 'Please select crop name';
            } else if (!formData.cropQuality) {
                newErrors.cropQuality = 'Select crop quality';
            } else if (!formData.cropTypes) {
                newErrors.cropTypes = 'Select crop type';
            }
        } else {
            if (!formData.productName.trim()) {
                newErrors.productName = 'Please enter product name';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkCompletion()) {
            return;
        }

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            // TODO: Implement actual Post Requirement API call
            console.log('Form Data:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('Requirement posted successfully!');
            if (onClose) {
                onClose();
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error posting requirement:', error);
            alert('Failed to post requirement. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '100%' }}>
            <ProfileCompletionModal
                isOpen={showCompletionModal}
                onClose={handleCloseModal}
                onAction={handleGoToProfile}
            />
            <form onSubmit={handleSubmit}>
                {/* Crop Type */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--title)',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}>
                        Select the crop/product category you want to buy (Select) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        value={formData.cropType}
                        onChange={(e) => handleChange('cropType', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.cropType ? 'red' : 'var(--border)'}`,
                            borderRadius: '8px',
                            fontSize: '1rem',
                            background: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">Select</option>
                        {Array.isArray(cropTypeList) && cropTypeList.map((type) => (
                            <option key={type._id} value={type._id}>{type.name}</option>
                        ))}
                    </select>
                    {errors.cropType && (
                        <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.cropType}
                        </span>
                    )}
                </div>

                {/* Category - Show only if cropType is 'crops' */}
                {(['680918a92215ca25074b3f13'].includes(formData.cropType) || formData.cropType === 'crops') && (
                    <>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--title)',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}>
                                Select Sell Crop Category/ फसल श्रेणी <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: `2px solid ${errors.category ? 'red' : 'var(--border)'}`,
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">Select</option>
                                {Array.isArray(categoryList) && categoryList.map((cat: Category) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                    {errors.category}
                                </span>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--title)',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}>
                                Select Crop Name / फसल का नाम <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                value={formData.cropName}
                                onChange={(e) => handleChange('cropName', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: `2px solid ${errors.cropName ? 'red' : 'var(--border)'}`,
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">Select</option>
                                {Array.isArray(cropNameList) && cropNameList.map((crop) => (
                                    <option key={crop._id} value={crop._id}>{crop.name}</option>
                                ))}
                            </select>
                            {errors.cropName && (
                                <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                    {errors.cropName}
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* Product Name - Show only if cropType is NOT 'crops' */}
                {formData.cropType && !(['680918a92215ca25074b3f13'].includes(formData.cropType) || formData.cropType === 'crops') && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Enter the name of the product you need (Enter) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.productName}
                            onChange={(e) => handleChange('productName', e.target.value)}
                            placeholder="Enter the name of the product you need (Enter)"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.productName ? 'red' : 'var(--border)'}`,
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                        {errors.productName && (
                            <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                {errors.productName}
                            </span>
                        )}
                    </div>
                )}

                {/* Brand - Optional */}
                {formData.cropType && !(['680918a92215ca25074b3f13'].includes(formData.cropType) || formData.cropType === 'crops') && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Enter preferred brand name, if any (Enter)
                        </label>
                        <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => handleChange('brand', e.target.value)}
                            placeholder="Enter preferred brand name, if any (Enter)"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                )}

                {/* Quantity and Unit */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Enter required quantity and select unit(Quantity – Enter | Unit – Select) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.qty}
                            onChange={(e) => handleChange('qty', e.target.value)}
                            placeholder="0"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.qty ? 'red' : 'var(--border)'}`,
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                        {errors.qty && (
                            <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                {errors.qty}
                            </span>
                        )}
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Unit <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={formData.qtyUnit}
                            onChange={(e) => handleChange('qtyUnit', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `2px solid ${errors.qtyUnit ? 'red' : 'var(--border)'}`,
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">Select</option>
                            {qtyUnits.map(unit => (
                                <option key={unit.value} value={unit.value}>{unit.label}</option>
                            ))}
                        </select>
                        {errors.qtyUnit && (
                            <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                {errors.qtyUnit}
                            </span>
                        )}
                    </div>
                </div>

                {/* Price and Price Unit - Optional */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Expected Price
                        </label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                            placeholder="Enter price"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--title)',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Price Unit
                        </label>
                        <select
                            value={formData.priceUnit}
                            onChange={(e) => handleChange('priceUnit', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="">Select</option>
                            {priceUnits.map(unit => (
                                <option key={unit.value} value={unit.value}>{unit.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Additional Crop Details: Quality and Type (Only for Crops) */}
                {(['680918a92215ca25074b3f13'].includes(formData.cropType) || formData.cropType === 'crops') && (
                    <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {/* Quality Radio */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Crop Quality / गुणवत्ता</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Large (Grade A)', value: 'GRADE_A' },
                                    { label: 'Medium (Grade B)', value: 'GRADE_B' },
                                    { label: 'Small (Grade C)', value: 'SMALL_GRADE_C' }
                                ].map(item => (
                                    <label key={item.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="cropQuality"
                                            checked={formData.cropQuality === item.value}
                                            onChange={() => handleChange('cropQuality', item.value)}
                                            style={{ accentColor: '#00590D', marginRight: '8px' }}
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                            {errors.cropQuality && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cropQuality}</span>}
                        </div>

                        {/* Type Radio */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Crop Type / प्रकार</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { label: 'Regular', value: 'REGULAR' },
                                    { label: 'Organic', value: 'ORGANICS' }
                                ].map(item => (
                                    <label key={item.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="cropTypes"
                                            checked={formData.cropTypes === item.value}
                                            onChange={() => handleChange('cropTypes', item.value)}
                                            style={{ accentColor: '#00590D', marginRight: '8px' }}
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                            {errors.cropTypes && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.cropTypes}</span>}
                        </div>
                    </div>
                )}

                {/* Image Upload */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--title)',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}>
                        Upload Images (Optional)
                    </label>
                    <ImageUpload
                        images={formData.images}
                        onChange={(imgs) => setFormData(prev => ({ ...prev, images: imgs }))}
                        maxImages={3}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--title)',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}>
                        Product Details / उत्पाद विवरण <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        value={formData.specification}
                        onChange={(e) => handleChange('specification', e.target.value)}
                        placeholder="Write complete details about your requirement (e.g. quality, packing, delivery time)"
                        rows={5}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.specification ? 'red' : 'var(--border)'}`,
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                    {errors.specification && (
                        <span style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                            {errors.specification}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '0.875rem',
                                background: 'white',
                                color: 'var(--green)',
                                border: '2px solid var(--green)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--light-green)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 2,
                            padding: '0.875rem',
                            background: loading ? 'var(--sub-title)' : 'var(--green)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.background = 'var(--splash)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.background = 'var(--green)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {loading ? 'Posting...' : 'Post Requirement'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostRequirement;
