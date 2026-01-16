import { useEffect, useState } from 'react';
import { fetchAboutUs } from '../../services/cmsService';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

const AboutUs = () => {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('About Us');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const result = await fetchAboutUs();
            if (result?.success && result?.data) {
                // Handle different response structures
                const data = result.data;
                if (Array.isArray(data) && data.length > 0) {
                    const aboutData = data.find((item) =>
                        item.type === 'about-us' ||
                        item.slug === 'about-us' ||
                        item.title?.toLowerCase().includes('about')
                    ) || data[0];
                    setContent(aboutData.content || aboutData.description || '');
                    setTitle(aboutData.title || 'About Us');
                } else if (data.content || data.description) {
                    setContent(data.content || data.description);
                    setTitle(data.title || 'About Us');
                }
            }
        } catch (error) {
            console.error('Error fetching about us:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner text="Loading About Us..." />;
    }

    return (
        <div className="cms-page container" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{
                color: 'var(--green)',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
            }}>
                {title}
            </h1>
            {content ? (
                <div
                    className="cms-content"
                    style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        lineHeight: '1.8',
                        color: '#333'
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            ) : (
                <EmptyState
                    icon="ℹ️"
                    title="Content Not Available"
                    description="About Us content is not available at the moment"
                />
            )}
        </div>
    );
};

export default AboutUs;

