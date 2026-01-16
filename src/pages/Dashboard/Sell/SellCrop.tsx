import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CustomTextInput from '@/components/CustomTextInput';
import ImageUpload from '@/components/ImageUpload';
import CustomButton from '@/components/CustomButton';
import { homeAction } from '../../../redux/dashboardSlice';
import type { RootState } from '../../../redux/store';
import type { Category } from '../../../types';
// Profile Check Imports
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import ProfileCompletionModal from '@/components/ProfileCompletionModal';

interface CropOption {
    _id: string;
    name: string;
}

const SellCrop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList, cropName } = useSelector((state: RootState) => state.home);

    // Profile Completion Check
    const {
        showCompletionModal,
        handleGoToProfile,
        handleCloseModal,
        checkCompletion
    } = useProfileCompletion();

    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        categoryId: '',
        cropId: '',
        quality: '',
        quantity: '',
        quantityUnit: 'KG' as 'KG' | 'TON' | 'QUENTAL',
        rate: '',
        rateUnit: 'KG' as 'KG' | 'TON' | 'QUENTAL',
        isOrganic: false,
        harvestDate: new Date().toISOString().split('T')[0],
        description: '',
        address: '', // Keeping for legacy/display if needed, but we will use granular fields
        village: '',
        tahsil: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
        availableYN: 'YES' as 'YES' | 'NO', // Default to YES (Available Now)
        images: [] as string[]
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories if not available (reusing home action logic basically)
        // ideally dispatch fetchCategory action if empty
    }, []);

    // Fetch crops when category changes
    useEffect(() => {
        if (formData.categoryId) {
            // Mock fetch crops for selected category
            // In real app, dispatch(fetchCrops(formData.categoryId))
            // For now we assume cropName list is populated or we mock it
            const mockCrops: CropOption[] = [
                { _id: 'c1', name: 'Sharbati Wheat' },
                { _id: 'c2', name: 'Lokwan Wheat' }
            ];
            dispatch(homeAction.fetchCropname(mockCrops));
        }
    }, [formData.categoryId, dispatch]);


    const handleChange = (key: keyof typeof formData, value: string | boolean | string[]) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Validation Logic from Mobile App (CropSellPost.tsx)
    const validate = () => {
        // Basic Info and Farmer Profile checks are assumed handled by Auth/Profile flow in web for now

        if (!formData.categoryId) {
            alert('Select category to proceed');
            return false;
        }
        if (!formData.cropId) {
            alert('Select crop to proceed');
            return false;
        }
        if (!formData.quality) {
            alert('Select crop quality');
            return false;
        }
        if (!formData.quantity) {
            alert('Select quantity');
            return false;
        }
        if (!formData.quantityUnit) {
            alert('Select quantity unit');
            return false;
        }
        if (!formData.rate) {
            alert('Select rate');
            return false;
        }
        // Mobile App uses "Select unit" for Rate Unit validation (Code 8)
        if (!formData.rateUnit) {
            alert('Select unit');
            return false;
        }

        if (!formData.availableYN) {
            alert('Select availability');
            return false;
        }

        if (formData.availableYN === 'NO' && !formData.harvestDate) {
            alert('Select harvest date');
            return false;
        }

        // Granular Address Validation
        if (!formData.country) {
            alert('Please insert country');
            return false;
        }
        if (!formData.state) {
            alert('Please insert state');
            return false;
        }
        if (!formData.district) {
            alert('Please insert district');
            return false;
        }
        if (!formData.tahsil) {
            alert('Please insert tahsil');
            return false;
        }
        if (!formData.village) {
            alert('Please insert village'); // Match mobile error Msg
            return false;
        }
        if (!formData.pincode) {
            alert('Please insert pincode');
            return false;
        }

        if (!formData.description) {
            alert('Enter crop details');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        // Double check profile completion on submit
        if (!checkCompletion()) {
            return;
        }
        if (!validate()) return;

        setLoading(true);
        try {
            // Mock API Call
            console.log('Submitting Sell Post:', formData);
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Crop sell post successfully');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    return (
        <div className="sell-page container" style={{ padding: '1rem' }}>
            <ProfileCompletionModal
                isOpen={showCompletionModal}
                onClose={handleCloseModal}
                onAction={handleGoToProfile}
            />
            <div className="header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <ArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '1rem' }} />
                <h2>🌾 Sell Your Crops / अपनी फसल बेचें</h2>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'space-between', padding: '0 1rem' }}>
                <div style={{ flex: 1, height: '4px', background: currentStep >= 1 ? '#00590D' : '#eee', marginRight: '5px' }}></div>
                <div style={{ flex: 1, height: '4px', background: currentStep >= 2 ? '#00590D' : '#eee', marginRight: '5px' }}></div>
                <div style={{ flex: 1, height: '4px', background: currentStep >= 3 ? '#00590D' : '#eee' }}></div>
            </div>

            <div className="form-content card" style={{ padding: '1.5rem', background: 'white', borderRadius: '12px' }}>

                {/* Step 1: Crop Selection */}
                {currentStep === 1 && (
                    <div>
                        <h3>Select Crop</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Crop Category / फसल की श्रेणी</label>
                            <div className="chip-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {categoryList?.map((cat: Category) => (
                                    <div
                                        key={cat._id}
                                        onClick={() => handleChange('categoryId', cat._id)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: `1px solid ${formData.categoryId === cat._id ? '#00590D' : '#ddd'} `,
                                            background: formData.categoryId === cat._id ? '#DFF0DD' : 'white',
                                            color: formData.categoryId === cat._id ? '#00590D' : 'black',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {formData.categoryId && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Crop Name / फसल का नाम</label>
                                <select
                                    value={formData.cropId}
                                    onChange={(e) => handleChange('cropId', e.target.value)}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select</option>
                                    {cropName?.map((crop) => (
                                        <option key={crop._id} value={crop._id}>{crop.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem' }}>
                            <CustomButton
                                title="Next"
                                onPress={nextStep}
                                disabled={!formData.categoryId || !formData.cropId}
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Quantity & Rate */}
                {currentStep === 2 && (
                    <div>
                        <h3>Details</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Crop Quality / फसल गुणवत्ता</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['Large (Grade A)', 'Medium (Grade B)', 'Small (Mix)'].map(grade => (
                                    <div
                                        key={grade}
                                        onClick={() => handleChange('quality', grade)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: `1px solid ${formData.quality === grade ? '#00590D' : '#ddd'} `,
                                            background: formData.quality === grade ? '#DFF0DD' : 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {grade}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <CustomTextInput
                                title="Available Quantity & Unit / उपलब्ध मात्रा"
                                value={formData.quantity}
                                onChange={(text) => handleChange('quantity', text)}
                                placeholder="Total Qty"
                                inputMode="numeric"
                            />
                            <div style={{ marginTop: '5px' }}>
                                <label style={{ fontSize: '14px', color: '#333', marginBottom: '5px', display: 'block' }}>Quantity Unit</label>
                                <select
                                    value={formData.quantityUnit}
                                    onChange={(e) => handleChange('quantityUnit', e.target.value)}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="KG">Kg</option>
                                    <option value="TON">Ton</option>
                                    <option value="QUENTAL">Quintal</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <CustomTextInput
                                title="Rate / अनुमानित दर"
                                value={formData.rate}
                                onChange={(text) => handleChange('rate', text)}
                                placeholder="Rate per unit"
                                inputMode="numeric"
                            />
                            <div style={{ marginTop: '5px' }}>
                                <label style={{ fontSize: '14px', color: '#333', marginBottom: '5px', display: 'block' }}>Rate Unit</label>
                                <select
                                    value={formData.rateUnit}
                                    onChange={(e) => handleChange('rateUnit', e.target.value)}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="KG">Kg</option>
                                    <option value="TON">Ton</option>
                                    <option value="QUENTAL">Quintal</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Is Harvested & Available? / क्या फसल कट चुकी है?</label>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="availableYN"
                                        checked={formData.availableYN === 'YES'}
                                        onChange={() => handleChange('availableYN', 'YES')}
                                        style={{ accentColor: '#00590D', marginRight: '8px', width: '20px', height: '20px' }}
                                    />
                                    Yes, Available Now
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="availableYN"
                                        checked={formData.availableYN === 'NO'}
                                        onChange={() => handleChange('availableYN', 'NO')}
                                        style={{ accentColor: '#00590D', marginRight: '8px', width: '20px', height: '20px' }}
                                    />
                                    No, Standing Crop (Later)
                                </label>
                            </div>

                            {formData.availableYN === 'NO' && (
                                <div>
                                    <CustomTextInput
                                        title="Expected Harvest Date / कटाई की तारीख"
                                        value={formData.harvestDate}
                                        onChange={(text) => handleChange('harvestDate', text)}
                                        placeholder="Select Date"
                                        type="date"
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button onClick={prevStep} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>Back</button>
                            <div style={{ flex: 1 }}>
                                <CustomButton
                                    title="Next"
                                    onPress={nextStep}
                                    disabled={!formData.quantity || !formData.rate || !formData.quality}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Images & Review */}
                {currentStep === 3 && (
                    <div>
                        <h3>Images & Description</h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Crop Images</label>
                            <ImageUpload
                                images={formData.images}
                                onChange={(images) => handleChange('images', images)}
                                maxImages={5}
                                maxSizeMB={5}
                            />
                        </div>

                        <CustomTextInput
                            title="Product Details / उत्पाद विवरण"
                            value={formData.description}
                            onChange={(text) => handleChange('description', text)}
                            placeholder="Add crop descriptions for better understanding... 🌾✍"
                        />

                        {/* Detailed Address Fields */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Address Details / पता विवरण</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <CustomTextInput
                                    title="Village / गाँव"
                                    value={formData.village}
                                    onChange={(text) => handleChange('village', text)}
                                    placeholder="Enter Village"
                                />
                                <CustomTextInput
                                    title="Tahsil / तहसील"
                                    value={formData.tahsil}
                                    onChange={(text) => handleChange('tahsil', text)}
                                    placeholder="Enter Tahsil"
                                />
                                <CustomTextInput
                                    title="District / ज़िला"
                                    value={formData.district}
                                    onChange={(text) => handleChange('district', text)}
                                    placeholder="Enter District"
                                />
                                <CustomTextInput
                                    title="State / राज्य"
                                    value={formData.state}
                                    onChange={(text) => handleChange('state', text)}
                                    placeholder="Enter State"
                                />
                                <CustomTextInput
                                    title="Country / देश"
                                    value={formData.country}
                                    onChange={(text) => handleChange('country', text)}
                                    placeholder="Enter Country"
                                />
                                <CustomTextInput
                                    title="Pincode / पिन कोड"
                                    value={formData.pincode}
                                    onChange={(text) => handleChange('pincode', text)}
                                    placeholder="Enter Pincode"
                                    inputMode="numeric"
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button onClick={prevStep} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>Back</button>
                            <div style={{ flex: 1 }}>
                                <CustomButton
                                    title="Submit"
                                    onPress={handleSubmit}
                                    isLoading={loading}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SellCrop;
