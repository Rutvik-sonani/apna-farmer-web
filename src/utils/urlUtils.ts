/**
 * Helper to proxy URLs through the local dev server to avoid CORS issues
 * @param url The absolute URL to potentially proxy
 * @returns The proxied URL (relative path) or the original URL
 */
export const getProxiedUrl = (url: string | undefined | null): string => {
    if (!url) return '';

    const targetDomain = 'https://api.apnafarmer.in';

    if (url.startsWith(targetDomain)) {
        return url.replace(targetDomain, '/api');
    }

    return url;
};
