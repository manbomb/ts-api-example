/* eslint-disable no-constant-condition */
export default interface Page<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const getAllItems = async <T>(
    getItems: (pageNumber: number, pageSize: number) => Promise<Page<T>>
): Promise<Array<T>> => {
    const allItems: Array<T> = [];

    let pageNumber = 1;
    const pageSize = 10;

    while (true) {
        const page = await getItems(pageNumber, pageSize);
        
        if (page.data.length === 0) {
            break;
        }

        allItems.push(...page.data);
        pageNumber++;
    }

    return allItems;
};