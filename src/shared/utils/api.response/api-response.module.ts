import { Module, Global } from '@nestjs/common';
import { ApiResponse } from './apiResponse';

@Global()
@Module({
  providers: [ApiResponse],
  exports: [ApiResponse],
})
export class ApiResponseModule { }