import os from 'os'
import path from 'path'
import { z } from 'zod'

import { ClientOptionsSchema, ZodAnyRecord } from '@/schema'
import { Application } from '@/service/application'
import { ClientOptions, Fetcher } from '@/typings'
import { generateCommand } from '@/utils/generate-command'
import { loadValueFromEnvFile } from '@/utils/load-vaule-from-env-file'

class Client {
  endpoint: string
  apiVersion: string
  pathPrefix: string
  namespace: string | undefined
  token: string | undefined
  request: Partial<Omit<RequestInit, 'url'>> | undefined
  fetcher: Fetcher | undefined

  constructor(protected opts: ClientOptions = {}) {
    const { request, fetcher, ...restOpts } = opts
    const options = ClientOptionsSchema.parse(restOpts)

    // --- possible configuration files
    const envMoFile = path.resolve(
      os.homedir(),
      '.config',
      'mo',
      '.env'
    )
    const envMoPlugFile = path.resolve(
      os.homedir(),
      '.config',
      'mo',
      'plugs',
      'argocd',
      '.env'
    )
    const envArgoCDFile = path.resolve(
      os.homedir(),
      '.config',
      'argocd',
      '.env'
    )

    // --- endpoint
    const endpoint =
      options.endpoint ||
      process.env.ARGOCD_SERVER ||
      loadValueFromEnvFile(
        envArgoCDFile,
        'ARGOCD_SERVER'
      ) ||
      loadValueFromEnvFile(envMoFile, 'ARGOCD_SERVER') ||
      loadValueFromEnvFile(envMoPlugFile, 'ARGOCD_SERVER')
    if (!endpoint)
      throw new Error('❌ ARGOCD_SERVER is required')
    this.endpoint = endpoint

    const token =
      options.endpoint ||
      process.env.ARGOCD_TOKEN ||
      loadValueFromEnvFile(envArgoCDFile, 'ARGOCD_TOKEN') ||
      loadValueFromEnvFile(envMoFile, 'ARGOCD_TOKEN') ||
      loadValueFromEnvFile(envMoPlugFile, 'ARGOCD_TOKEN')
    if (!token)
      throw new Error('❌ ARGOCD_TOKEN is required')
    this.token = token
    console.log('this.token', this.token)

    // --- other options
    this.apiVersion = options.apiVersion || 'v1'
    this.pathPrefix = options.pathPrefix || ''
    this.namespace =
      options.namespace || process.env.VAULT_NAMESPACE

    // --- fetcher and request
    this.fetcher = fetcher
    this.request = request
  }

  /**
   * Application Service
   */
  get application() {
    return new Application(this)
  }

  /**
   * This property is a GET command that resolves an HTTP GET request to the given path. Also, it
   * can be overridden by you're custom commands inside the client instance.
   */
  read = generateCommand({
    method: 'GET',
    path: '/{{path}}',
    client: this,
    schema: {
      path: z.object({
        path: z.string()
      }),
      response: ZodAnyRecord
    }
  })

  /**
   * This property is a POST command that sends the `data` parameter as JSON to the given path.
   * Also, it can be overridden by you're custom commands inside the client instance.
   */
  write = generateCommand({
    method: 'POST',
    path: '/{{path}}',
    client: this,
    schema: {
      path: z.object({
        path: z.string()
      }),
      body: z.object({
        data: ZodAnyRecord
      }),
      response: z.union([ZodAnyRecord, z.boolean()])
    },
    refine: (init) => {
      // Flatten the body.data
      init.body = init.body
        ? (init.body as any).data || {}
        : {}
      return init
    }
  })

  /**
   * This property is a DELETE command that resolves an HTTP DELETE request to the given path. Also,
   * it can be overridden by you're custom commands inside the client instance.
   */
  delete = generateCommand({
    method: 'DELETE',
    path: '/{{path}}',
    client: this,
    schema: {
      path: z.object({
        path: z.string()
      }),
      response: z.boolean()
    }
  })

  /**
   * This property is a LIST command that resolves an HTTP GET request to the given path. Also, it
   * can be overridden by you're custom commands inside the client instance.
   */
  list = generateCommand({
    method: 'LIST',
    path: '/{{path}}',
    client: this,
    schema: {
      path: z.object({
        path: z.string()
      }),
      response: ZodAnyRecord
    }
  })
}

export { Client }
