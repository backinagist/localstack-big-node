import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import AwsS3Service from './aws-s3.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<{ [key: string]: Array<string> }> {
    return this.appService.listObjects();
  }
}
