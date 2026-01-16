import { serverCall } from './api';
import { endPoints, reqestMethod } from './endpoints';

export interface NotificationItem {
    _id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
    type?: string;
}

export interface NotificationResponse {
    success: boolean;
    data: {
        docs: NotificationItem[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
    };
    message?: string;
}

export const fetchNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await serverCall(endPoints.NOTIFICATION, reqestMethod.GET);
        return response as NotificationResponse;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return {
            success: false,
            data: {
                docs: [],
                totalDocs: 0,
                limit: 10,
                page: 1,
                totalPages: 0,
            },
            message: 'Failed to fetch notifications',
        };
    }
};

export const markNotificationAsRead = async (notificationId: string): Promise<unknown> => {
    try {
        // TODO: Add the actual endpoint when available
        const response = await serverCall(
            `${endPoints.NOTIFICATION}/${notificationId}/read`,
            reqestMethod.PUT
        );
        return response;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return { success: false };
    }
};
