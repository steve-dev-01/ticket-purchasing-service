import { Transform } from 'class-transformer';

export function TransformNumberParam() {
    return Transform(({ value }) => parseInt(value));
}
