import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { X, Home, Heart, List, UserPlus, FileText, Phone, MessageCircle, ShoppingCart, Info, PhoneCall, Share2, Languages, FileText as TermsIcon, LogOut, User, Building2, Store, Users } from 'lucide-react';
import type { RootState } from '../redux/store';
import { authAction } from '../redux/authSlice';
import { logout } from '../services/authService';
import { images } from '../utils/images';
import { useLanguage } from '../hooks/useLanguage';

interface DrawerItem {
    name?: string;
    icon?: React.ElementType;
    route?: string;
    subRoute?: string;
    isSubItem?: boolean;
    section?: string;
    action?: () => void;
    hideOnDesktop?: boolean;
}

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authData } = useSelector((state: RootState) => state.auth);
    const { t } = useLanguage();
    const [userType, setUserType] = useState<string>('');

    useEffect(() => {
        const role = localStorage.getItem('selectedRole') || authData?.userType || '';
        setUserType(role);
    }, [authData]);

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = async () => {
        try {
            await logout();
            dispatch(authAction.logout());
            navigate('/login');
            onClose();
        } catch (error) {
            console.error('Logout error:', error);
            // Clear local storage even if API call fails
            dispatch(authAction.logout());
            navigate('/login');
            onClose();
        } finally {
            setShowLogoutConfirm(false);
        }
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Apna Farmer',
                    text: 'Check out Apna Farmer App',
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const isActive = (path: string) => location.pathname === path;

    // Common items for all user types
    const commonData: DrawerItem[] = [
        {
            name: t.drawer.HOME,
            icon: Home,
            route: '/',
            hideOnDesktop: true,
        },
        {
            name: 'Sell Crops', // Localization check needed?
            icon: Building2,
            route: '/sell',
        },
        {
            name: t.drawer.BUYERS,
            icon: Users,
            route: '/buyers',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.AGROBIZ,
            icon: Store,
            route: '/agroshop',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.FARMERS,
            icon: Building2,
            route: '/marketplace',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.PROFILE,
            icon: User,
            route: '/profile',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.FAVORITES,
            icon: Heart,
            route: '/favorites',
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: List,
            route: '/community',
        },
        {
            section: 'Buyers Tools',
        },
        {
            name: t.drawer.POST_REQUIREMENT,
            icon: UserPlus,
            route: '/community', // Update with actual route
            isSubItem: true,
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: FileText,
            route: '/community', // Update with actual route
            isSubItem: true,
        },
        {
            name: t.drawer.CALLS_RECEIVED,
            icon: Phone,
            isSubItem: true,
            action: () => alert('Calls Received - Coming Soon'),
        },
        {
            name: t.drawer.CHAT,
            icon: MessageCircle,
            isSubItem: true,
            action: () => alert('Chat - Coming Soon'),
        },
        {
            name: 'Community',
            icon: MessageCircle,
            route: '/community',
        },
        {
            section: 'Others',
        },
        {
            name: 'Mandi Rate',
            icon: ShoppingCart,
            action: () => alert('Mandi Rate - Coming Soon'),
        },
        {
            name: t.drawer.OUR_SERVICES,
            icon: Info,
            route: '/our-services',
        },
        {
            name: t.drawer.ABOUT_US,
            icon: Info,
            route: '/about-us', // Update with actual route
        },
        {
            name: t.drawer.CONTACT_US,
            icon: PhoneCall,
            route: '/contact-us', // Update with actual route
        },
        {
            name: t.drawer.SHARE_APP,
            icon: Share2,
            action: handleShare,
        },
        {
            name: t.drawer.LANGUAGE,
            icon: Languages,
            route: '/language', // Update with actual route
        },
        {
            name: t.drawer.TERMS_CONDITIONS,
            icon: TermsIcon,
            route: '/terms-conditions',
        },
    ];

    // Buyer specific items
    const buyersData: DrawerItem[] = [
        {
            name: t.drawer.HOME,
            icon: Home,
            route: '/',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.AGROBIZ,
            icon: Store,
            route: '/agroshop',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.PROFILE,
            icon: User,
            route: '/profile',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.FAVORITES,
            icon: Heart,
            route: '/favorites',
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: List,
            route: '/community',
        },
        {
            section: 'Buyers Tools',
        },
        {
            name: t.drawer.FARMERS,
            icon: Building2,
            route: '/marketplace',
            isSubItem: true,
            hideOnDesktop: true,
        },
        {
            name: t.drawer.POST_REQUIREMENT,
            icon: UserPlus,
            route: '/community',
            isSubItem: true,
            hideOnDesktop: true,
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: FileText,
            route: '/community',
            isSubItem: true,
        },
        {
            name: t.drawer.CALLS_RECEIVED,
            icon: Phone,
            isSubItem: true,
            action: () => alert('Calls Received - Coming Soon'),
        },
        {
            name: t.drawer.CHAT,
            icon: MessageCircle,
            isSubItem: true,
            action: () => alert('Chat - Coming Soon'),
        },
        {
            section: 'Others',
        },
        {
            name: t.drawer.OUR_SERVICES,
            icon: Info,
            route: '/our-services',
        },
        {
            name: t.drawer.ABOUT_US,
            icon: Info,
            route: '/about-us',
        },
        {
            name: t.drawer.CONTACT_US,
            icon: PhoneCall,
            route: '/contact-us',
        },
        {
            name: t.drawer.SHARE_APP,
            icon: Share2,
            action: handleShare,
        },
        {
            name: t.drawer.LANGUAGE,
            icon: Languages,
            route: '/language',
        },
        {
            name: t.drawer.TERMS_CONDITIONS,
            icon: TermsIcon,
            route: '/terms-conditions',
        },
    ];

    // AgroShop specific items
    const agroShopData: DrawerItem[] = [
        {
            name: t.drawer.HOME,
            icon: Home,
            route: '/',
            hideOnDesktop: true,
        },
        {
            name: t.drawer.PROFILE,
            icon: User,
            route: '/profile',
            isSubItem: true,
            hideOnDesktop: true,
        },
        {
            name: t.drawer.FAVORITES,
            icon: Heart,
            route: '/favorites',
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: List,
            route: '/community',
        },
        {
            section: 'Buyers Tools',
        },
        {
            name: t.drawer.FARMERS,
            icon: Building2,
            route: '/marketplace',
            isSubItem: true,
            hideOnDesktop: true,
        },
        {
            name: t.drawer.POST_REQUIREMENT,
            icon: UserPlus,
            route: '/community',
            isSubItem: true,
            hideOnDesktop: true,
        },
        {
            name: t.drawer.VIEW_REQUIREMENT,
            icon: FileText,
            route: '/community',
            isSubItem: true,
        },
        {
            name: t.drawer.CALLS_RECEIVED,
            icon: Phone,
            isSubItem: true,
            action: () => alert('Calls Received - Coming Soon'),
        },
        {
            name: t.drawer.CHAT,
            icon: MessageCircle,
            isSubItem: true,
            action: () => alert('Chat - Coming Soon'),
        },
        {
            section: 'Others',
        },
        {
            name: t.drawer.OUR_SERVICES,
            icon: Info,
            route: '/our-services',
        },
        {
            name: t.drawer.ABOUT_US,
            icon: Info,
            route: '/about-us',
        },
        {
            name: t.drawer.CONTACT_US,
            icon: PhoneCall,
            route: '/contact-us',
        },
        {
            name: t.drawer.SHARE_APP,
            icon: Share2,
            action: handleShare,
        },
        {
            name: t.drawer.LANGUAGE,
            icon: Languages,
            route: '/language',
        },
        {
            name: t.drawer.TERMS_CONDITIONS,
            icon: TermsIcon,
            route: '/terms-conditions',
        },
    ];

    // Get drawer data based on user type
    const getDrawerData = (): DrawerItem[] => {
        if (userType === 'BUYER') {
            return buyersData;
        } else if (userType === 'AGROSHOP') {
            return agroShopData;
        } else {
            // FARMER, FPO, or default
            return commonData;
        }
    };

    const drawerData = getDrawerData();
    const userDetails = authData || JSON.parse(localStorage.getItem('Auth') || '{}');

    return (
        <>
            {/* Overlay */}
            <div
                className={`drawer-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                {/* Drawer Header */}
                <div className="drawer-header">
                    <div className="drawer-profile">
                        <div className="drawer-profile-image">
                            <img
                                src={userDetails?.avatar || images.App}
                                alt="Profile"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = images.App;
                                }}
                            />
                        </div>
                        <div className="drawer-profile-info">
                            <h3>Hi {userDetails?.firstName || ''} {userDetails?.lastName || ''}</h3>
                            <p>+91-{userDetails?.mobile?.slice(-10) || ''}</p>
                            {userDetails?.whatsappNumber && (
                                <p className="whatsapp-info">
                                    <span>WhatsApp:</span> +91-{userDetails.whatsappNumber.slice(-10)}
                                </p>
                            )}
                            {userDetails?.city && (
                                <p className="location-info">
                                    <span>City:</span> {userDetails.city}
                                </p>
                            )}
                            <p className="profile-type">
                                <span>Profile Type:</span> {userType || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <button className="drawer-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="drawer-content">
                    {drawerData.map((item, index) => {
                        if (item.section) {
                            return (
                                <div key={index} className="drawer-section-header">
                                    {item.section}
                                </div>
                            );
                        }

                        const Icon = item.icon;
                        if (!Icon || !item.name) return null;
                        const active = item.route ? isActive(item.route) : false;

                        if (item.action) {
                            return (
                                <button
                                    key={index}
                                    className={`drawer-item ${item.isSubItem ? 'sub-item' : ''} ${item.hideOnDesktop ? 'hide-on-desktop' : ''}`}
                                    onClick={() => {
                                        item.action?.();
                                        onClose();
                                    }}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        }

                        if (item.route) {
                            return (
                                <Link
                                    key={index}
                                    to={item.route}
                                    className={`drawer-item ${item.isSubItem ? 'sub-item' : ''} ${active ? 'active' : ''} ${item.hideOnDesktop ? 'hide-on-desktop' : ''}`}
                                    onClick={onClose}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        }

                        return null;
                    })}

                    {/* Logout Button */}
                    <button className="drawer-logout" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>{t.drawer.LOGOUT}</span>
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            {showLogoutConfirm && (
                <div className="logout-dialog-overlay" onClick={cancelLogout}>
                    <div className="logout-dialog" onClick={(e) => e.stopPropagation()}>
                        <h3 className="logout-dialog-title">{t.drawer.LOGOUT}</h3>
                        <p className="logout-dialog-message">Are you sure you want to logout?</p>
                        <div className="logout-dialog-actions">
                            <button className="logout-dialog-btn cancel" onClick={cancelLogout}>
                                Cancel
                            </button>
                            <button className="logout-dialog-btn confirm" onClick={confirmLogout}>
                                {t.drawer.LOGOUT}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Drawer;

