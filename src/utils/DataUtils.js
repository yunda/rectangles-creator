export default class DataUtils {
    static dbDataToArray(data) {
        const keys = Object.keys(data).filter(key => !!data[key]);
        
        return keys.map(key => ({
            id: key,
            ...data[key]
        }));
    }

    static getTotalWidth(rectangles) {
        return Object.values(rectangles).filter(val => !!val).reduce((sum, rect) => sum + rect.width, 0);
    }
}
