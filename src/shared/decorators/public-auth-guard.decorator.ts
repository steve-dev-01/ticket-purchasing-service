import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'allow';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
