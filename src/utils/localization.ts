/**
 * Get localized name based on current language
 * If language is Hindi and 'hi' field exists, return 'hi', otherwise return 'name'
 */
export const getLocalizedName = (item: unknown, langCode: string): string => {
    if (!item || typeof item !== 'object') return '';

    // Type assertion after checking it's an object
    const obj = item as { hi?: string; name?: string };

    // If language is Hindi and 'hi' field exists, use it
    if (langCode === 'hi' && obj.hi) {
        return obj.hi;
    }

    // Otherwise, use 'name' field
    return obj.name || '';
};

/**
 * Get localized text from an object with name and hi fields
 */
export const getLocalizedText = (item: { name?: string; hi?: string } | string | undefined, langCode: string): string => {
    if (!item) return '';

    // If it's already a string, return it
    if (typeof item === 'string') {
        return item;
    }

    // If language is Hindi and 'hi' field exists, use it
    if (langCode === 'hi' && item.hi) {
        return item.hi;
    }

    // Otherwise, use 'name' field
    return item.name || '';
};
