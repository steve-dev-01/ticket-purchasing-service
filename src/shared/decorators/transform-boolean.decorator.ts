import { Transform } from 'class-transformer';

export function TransformBooleanParam() {
    return Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    );
}
