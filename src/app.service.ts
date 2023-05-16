import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiTitle(): string {
    return 'INOVATION-STORE API';
  }
}
