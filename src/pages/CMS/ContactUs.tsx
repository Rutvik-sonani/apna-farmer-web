import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { submitContactUs } from '../../services/cmsService';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.mobile.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const result = await submitContactUs(formData);

            if (result?.success || result?.statusCode === 200) {
                setSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    subject: '',
                    message: ''
                });
            } else {
                setError(result?.message || result?.error || 'Failed to submit. Please try again.');
            }
        } catch (error: unknown) {
            const err = error as { message?: string; error?: string };
            setError(err?.message || err?.error || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="contact-page container" style={{
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'white',
                    padding: '3rem 2rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--light-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Mail size={40} color="var(--green)" />
                    </div>
                    <h2 style={{
                        color: 'var(--green)',
                        marginBottom: '1rem',
                        fontSize: '1.5rem'
                    }}>
                        Thank You!
                    </h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        We have received your message and will get back to you soon.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        style={{
                            padding: '0.75rem 2rem',
                            background: 'linear-gradient(to top right, var(--gradient-start), var(--gradient-end))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-page container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
                color: 'var(--green)',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
            }}>
                Contact Us
            </h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Have a question or feedback? We'd love to hear from you!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Contact Info */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ color: 'var(--green)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                        Get in Touch
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--light-green)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Phone size={20} color="var(--green)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Phone</div>
                                <div style={{ color: '#666' }}>+91 9876543210</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--light-green)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Mail size={20} color="var(--green)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email</div>
                                <div style={{ color: '#666' }}>support@apnafarmer.in</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--light-green)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <MapPin size={20} color="var(--green)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Address</div>
                                <div style={{ color: '#666' }}>
                                    Apna Farmer<br />
                                    India
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <form onSubmit={(e) => { void handleSubmit(e); }}>
                        <CustomTextInput
                            title="Name *"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(value) => handleChange('name', value)}
                            leftIcon={<Mail size={18} color="var(--green)" />}
                        />
                        <CustomTextInput
                            title="Email *"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(value) => handleChange('email', value)}
                            type="email"
                            leftIcon={<Mail size={18} color="var(--green)" />}
                        />
                        <CustomTextInput
                            title="Mobile *"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.mobile}
                            onChange={(value) => handleChange('mobile', value)}
                            maxLength={10}
                            inputMode="numeric"
                            leftIcon={<Phone size={18} color="var(--green)" />}
                        />
                        <CustomTextInput
                            title="Subject"
                            placeholder="Enter subject (optional)"
                            value={formData.subject}
                            onChange={(value) => handleChange('subject', value)}
                        />
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 600,
                                color: 'var(--title)'
                            }}>
                                Message *
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => handleChange('message', e.target.value)}
                                placeholder="Enter your message"
                                required
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--light-green)',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {error && (
                            <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                {error}
                            </p>
                        )}

                        <CustomButton
                            title="Send Message"
                            onPress={handleSubmit}
                            isLoading={loading}
                            icon={<Send size={18} />}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

