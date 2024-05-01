import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { ENV } from './configs';
import { DEFAULT_REGION } from '../constants/configConstants';

const publicKeyName = `/csm/${ENV}/internal/publicKey`;
const client = new SecretsManagerClient({ region: DEFAULT_REGION });

let publicKey = null;

export async function fetchSecrets() {
  const command = new GetSecretValueCommand({ SecretId: publicKeyName, VersionStage: 'AWSCURRENT' });
  const response = await client.send(command);
  publicKey = response.SecretString;
  return 'complete';
}

export function getPublicKey() {
  if (publicKey) {
    return publicKey;
  }
  throw new Error('Public Key Not Available');
}
