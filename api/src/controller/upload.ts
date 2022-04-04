import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { keys } from '../util';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId!,
    secretAccessKey: keys.secretAccessKey!,
  },
  region: keys.region,
});

export const upload = (_req: Request, res: Response) => {
  const userId = 'test_user_id';
  const key = `${userId}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'image-upload-sample-blog-app-123',
      ContentType: 'image/jpeg',
      Key: key,
    },
    (_err: any, url: string) => res.send({ key, url }),
  );
};
