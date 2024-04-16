import { registerAs } from '@nestjs/config';
import { S3 } from 'aws-sdk';

export default registerAs('aws', () => {
  const config: S3.Types.ClientConfiguration = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  };

  return {
    s3: {
      config,
      bucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    },
  };
});
