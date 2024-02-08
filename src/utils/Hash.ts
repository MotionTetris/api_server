import { createHash } from 'crypto';

export class HashEncryptor {
  public static generateHash(message: string, salt: string) {
    message ??
      (() => {
        throw new Error('message is null');
      })();
    salt ??= '';
    const hashCompute = createHash('sha512');
    hashCompute.update(message + salt);
    return hashCompute.digest('hex');
  }
}
