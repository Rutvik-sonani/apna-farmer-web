import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchNotifications, NotificationItem } from '../../services/notificationService';
import './Notification.css';

interface DisplayNotification {
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
}

const NotificationPage = () => {
    const [notifications, setNotifications] = useState<DisplayNotification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Helper function to format time
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} min ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchNotifications();

                if (response.success && response.data?.docs) {
                    // Transform API data to display format
                    const transformedNotifications: DisplayNotification[] = response.data.docs.map((item: NotificationItem) => ({
                        id: item._id,
                        title: item.title || 'Notification',
                        message: item.message || '',
                        time: formatTime(item.createdAt),
                        unread: !item.isRead,
                    }));

                    setNotifications(transformedNotifications);
                } else {
                    setNotifications([]);
                }
            } catch (err) {
                console.error('Error loading notifications:', err);
                setError('Failed to load notifications');
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const handleMarkAllAsRead = () => {
        // Update local state
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        // TODO: Call API to mark all as read when endpoint is available
    };

    if (loading) {
        return <LoadingSpinner text="Loading notifications..." />;
    }

    if (error) {
        return (
            <div className="notification-page">
                <EmptyState
                    icon={<Bell size={48} />}
                    title="Error Loading Notifications"
                    description={error}
                />
            </div>
        );
    }

    return (
        <div className="notification-page">
            <div className="notification-header">
                <h1>Notifications</h1>
                {notifications.length > 0 && notifications.some(n => n.unread) && (
                    <button className="mark-all-read" onClick={handleMarkAllAsRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <EmptyState
                    icon={<Bell size={48} />}
                    title="No Notifications"
                    description="You're all caught up! No new notifications."
                />
            ) : (
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-card ${notification.unread ? 'unread' : ''}`}
                        >
                            <div className="notification-avatar">
                                <span>{notification.title.charAt(0)}</span>
                            </div>
                            <div className="notification-content">
                                <div className="notification-top">
                                    <h3 className="notification-title">{notification.title}</h3>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                                <p className="notification-message">{notification.message}</p>
                            </div>
                            {notification.unread && <div className="unread-dot" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
