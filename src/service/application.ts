import { ApiSector } from '@/lib/sector';
import { ApplicationsResponseSchema } from '@/typings.argocd';
import { generateCommand } from '@/utils/generate-command';

/**
 * KV secrets engine - version 1
 *
 * @link https://developer.hashicorp.com/vault/api-docs/secret/kv/kv-v1
 */
export class Application extends ApiSector {
  /**
   * Read secret
   *
   * @link https://developer.hashicorp.com/vault/api-docs/secret/kv/kv-v1#read-secret
   */
  get list() {
    return generateCommand({
      method: 'GET',
      path: '/applications',
      client: this.client,
      schema: {
        response: ApplicationsResponseSchema
      }
    });
  }
}
