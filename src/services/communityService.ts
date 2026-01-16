import { endPoints, reqestMethod } from './endpoints';
import { serverCall } from './api';

export const communityService = {
    getCommunityData: async (page = 1, limit = 10) => {
        const url = `${endPoints.COMMUNTY_DATA}?page=${page}&limit=${limit}`;
        const response = await serverCall(url, reqestMethod.GET);
        return response;
    },

    likePost: async (postId: string) => {
        const url = endPoints.COMMUNITY_LIKE_DISLIKE;
        const body = { postId };
        const response = await serverCall(url, reqestMethod.POST, body);
        return response;
    },

    addComment: async (postId: string, comment: string) => {
        const url = endPoints.COMMUNTY_COMMENT;
        const body = { postId, comment };
        const response = await serverCall(url, reqestMethod.POST, body);
        return response;
    }
};
