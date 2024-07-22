import { Transform } from 'class-transformer';

export function ValidateOrder() {
    return Transform(({ value }: { value: string }) => {
        if (value === 'asc') {
            return 'asc';
        } else if (value === 'desc') {
            return 'desc';
        } else {
            throw new Error('Invalid order value');
        }
    });
}
