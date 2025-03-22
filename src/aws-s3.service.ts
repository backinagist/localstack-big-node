import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';

@Injectable()
export default class AwsS3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    // Fetch AWS credentials and region from the environment
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID', 'xyz');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY', 'aaa');
    const region = this.configService.get<string>('AWS_REGION', 'eu-west-2');
    const endpoint = this.configService.get<string>('AWS_ENDPOINT_OVERRIDE', 'http://localhost:4566');
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME', 'back-in-a-gist');

    // setup configuration for s3
    const config: S3ClientConfig = {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint,
      forcePathStyle: true, // important to override default aws path behavior: {bucket}.{endpoint}
    };

    // Initialize AWS S3 Client
    this.s3 = new S3Client(config);
  }

  public async listObjects(): Promise<{ [key: string]: Array<string> }> {
    try {
      // List Objects
      const { Contents } = await this.s3.send(new ListObjectsCommand({
        Bucket: this.bucketName
      }));

      return { [this.bucketName]: Contents.map((s3Obj) => s3Obj.Key) };
    } catch (e) {
      console.log('here');
      throw new InternalServerErrorException(e, 'Unable to get bucket contents');
    }
  }
}
