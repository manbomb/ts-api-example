import Page from './Page';

export default interface Repository<T> {
    save(item: T): Promise<T>;
    update(item: T): Promise<T | null>;
    get(id: string): Promise<T | null>;
    scan(pageNumber: number, pageSize: number): Promise<Page<T>>;
    delete(id: string): Promise<T | null>;
}
