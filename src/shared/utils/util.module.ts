import { Module, Global } from '@nestjs/common';
import { UtilService } from './utl.service';

@Global()
@Module({
    providers: [UtilService],
    exports: [UtilService],
})
export class UtilModule { }