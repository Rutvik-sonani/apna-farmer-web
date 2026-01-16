import { useEffect } from 'react';
import HeaderSection from './components/HeaderSection';
import CommunityCard from './components/CommunityCard';
import { useDispatch, useSelector } from 'react-redux';
import { communityAction } from '../../redux/communitySlice';
import { communityService } from '../../services/communityService';
import type { RootState } from '../../redux/store';
import type { CommunityPost } from '../../types';

const Community = () => {
    const dispatch = useDispatch();
    const { communityData } = useSelector((state: RootState) => state.community);

    useEffect(() => {
        const fetchCommunityPosts = async () => {
            try {
                dispatch(communityAction.setLoading(true));
                const response = await communityService.getCommunityData();

                if (response?.statusCode === 200 && response?.data) {
                    dispatch(communityAction.setCommunity(response.data));
                } else {
                    console.error('Failed to fetch community posts:', response?.message);
                    dispatch(communityAction.setCommunity([]));
                }
            } catch (error) {
                console.error('Error fetching community posts:', error);
                dispatch(communityAction.setCommunity([]));
            } finally {
                dispatch(communityAction.setLoading(false));
            }
        };

        fetchCommunityPosts();
    }, [dispatch]);

    const handleSearch = (text: string) => {
        console.log('Searching:', text);
    };

    const handleAddPost = () => {
        alert('Add Post feature coming soon!');
    };

    const handleViewMyPosts = () => {
        alert('My Posts feature coming soon!');
    };

    return (
        <div className="community-page">
            <h2 style={{ color: '#407755', marginBottom: '1rem', textAlign: 'center' }}>Apna Farmer Community</h2>

            <HeaderSection
                onSearch={handleSearch}
                onAddPost={handleAddPost}
                onViewMyPosts={handleViewMyPosts}
            />

            <div className="community-feed">
                {communityData && communityData.length > 0 ? (
                    communityData.map((item: CommunityPost) => (
                        <CommunityCard key={item._id} item={item} />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>No posts found.</div>
                )}
            </div>

            {/* Add Post FAB */}
            <div
                onClick={() => window.location.href = '/add-post'}
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    background: '#00590D',
                    color: 'white',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    zIndex: 100
                }}
            >
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>+</span>
            </div>
        </div>
    );
};

export default Community;
