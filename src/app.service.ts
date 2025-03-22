import { Injectable } from '@nestjs/common';
import AwsS3Service from "./aws-s3.service";

@Injectable()
export class AppService {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  async listObjects(): Promise<{ [key: string]: Array<string> }> {
    return await this.awsS3Service.listObjects();
  }
}
