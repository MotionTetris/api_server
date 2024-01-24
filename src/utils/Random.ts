import { randomBytes } from 'crypto';

export class Random {
  public static generateRandomString(length: number) {
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));
    const randomString = randomBytesBuffer.toString('hex').slice(0, length);

    return randomString;
  }
}
