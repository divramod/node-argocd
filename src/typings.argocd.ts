import { z } from 'zod';

// Managed Fields Entry Schema
const ManagedFieldsEntrySchema = z.object({
  apiVersion: z.string(),
  fieldsType: z.string(),
  fieldsV1: z.object({ Raw: z.string().optional() }),
  manager: z.string(),
  operation: z.string(),
  subresource: z.string().optional(),
  time: z.string()
});

// Owner Reference Schema
const OwnerReferenceSchema = z.object({
  apiVersion: z.string(),
  blockOwnerDeletion: z.boolean().optional(),
  controller: z.boolean().optional(),
  kind: z.string(),
  name: z.string(),
  uid: z.string()
});

// Source Schema
const SourceSchema = z.object({
  chart: z.string().optional(),
  directory: z
    .object({
      exclude: z.string().optional(),
      include: z.string().optional(),
      jsonnet: z
        .object({
          extVars: z.array(z.any()).optional(),
          libs: z.array(z.string()).optional(),
          tlas: z.array(z.any()).optional()
        })
        .optional(),
      recurse: z.boolean().optional()
    })
    .optional(),
  helm: z
    .object({
      apiVersions: z.array(z.string()).optional(),
      fileParameters: z.array(z.object({ name: z.string(), path: z.string() })).optional(),
      ignoreMissingValueFiles: z.boolean().optional(),
      kubeVersion: z.string().optional(),
      namespace: z.string().optional(),
      parameters: z
        .array(
          z.object({
            forceString: z.boolean(),
            name: z.string(),
            value: z.string()
          })
        )
        .optional(),
      passCredentials: z.boolean().optional(),
      releaseName: z.string().optional(),
      skipCrds: z.boolean().optional(),
      valueFiles: z.array(z.string()).optional(),
      values: z.string().optional(),
      valuesObject: z.object({ raw: z.string().optional() }).optional(),
      version: z.string().optional()
    })
    .optional(),
  kustomize: z
    .object({
      apiVersions: z.array(z.string()).optional(),
      commonAnnotations: z.record(z.string()).optional(),
      commonAnnotationsEnvsubst: z.boolean().optional(),
      commonLabels: z.record(z.string()).optional(),
      components: z.array(z.string()).optional(),
      forceCommonAnnotations: z.boolean().optional(),
      forceCommonLabels: z.boolean().optional(),
      images: z.array(z.string()).optional(),
      kubeVersion: z.string().optional(),
      labelWithoutSelector: z.boolean().optional(),
      namePrefix: z.string().optional(),
      nameSuffix: z.string().optional(),
      namespace: z.string().optional(),
      patches: z
        .array(
          z.object({
            options: z.record(z.boolean()).optional(),
            patch: z.string().optional(),
            path: z.string().optional(),
            target: z
              .object({
                annotationSelector: z.string().optional(),
                labelSelector: z.string().optional(),
                resId: z.any().optional()
              })
              .optional()
          })
        )
        .optional(),
      replicas: z
        .array(
          z.object({
            count: z
              .object({
                intVal: z.number().optional(),
                strVal: z.string().optional(),
                type: z.number().optional()
              })
              .optional(),
            name: z.string().optional()
          })
        )
        .optional(),
      version: z.string().optional()
    })
    .optional(),
  path: z.string().optional(),
  plugin: z
    .object({
      env: z
        .array(
          z.object({
            name: z.string().optional(),
            value: z.string().optional()
          })
        )
        .optional(),
      name: z.string().optional(),
      parameters: z
        .array(
          z.object({
            array: z.array(z.any()).optional(),
            map: z.record(z.any()).optional(),
            name: z.string().optional(),
            string: z.string().optional()
          })
        )
        .optional()
    })
    .optional(),
  ref: z.string().optional(),
  repoURL: z.string().optional(),
  targetRevision: z.string().optional()
});

// Metadata Schema
const MetadataSchema = z.object({
  annotations: z.record(z.string()).optional(),
  creationTimestamp: z.string().optional(),
  deletionGracePeriodSeconds: z.number().optional(),
  deletionTimestamp: z.string().optional(),
  finalizers: z.array(z.string()).optional(),
  generateName: z.string().optional(),
  generation: z.number().optional(),
  labels: z.record(z.string()).optional(),
  managedFields: z.array(ManagedFieldsEntrySchema).optional(),
  name: z.string(),
  namespace: z.string(),
  ownerReferences: z.array(OwnerReferenceSchema).optional(),
  resourceVersion: z.string(),
  selfLink: z.string().optional(),
  uid: z.string()
});

// Operation Schema (mostly required but could have optional parts)
const OperationSchema = z.object({
  info: z.array(z.object({ name: z.string(), value: z.string() })).optional(),
  initiatedBy: z
    .object({
      automated: z.boolean().optional(),
      username: z.string().optional()
    })
    .optional(),
  retry: z
    .object({
      backoff: z
        .object({
          duration: z.string().optional(),
          factor: z.number().optional(),
          maxDuration: z.string().optional()
        })
        .optional(),
      limit: z.number().optional()
    })
    .optional(),
  sync: z
    .object({
      dryRun: z.boolean().optional(),
      manifests: z.array(z.string()).optional(),
      prune: z.boolean().optional(),
      resources: z
        .array(
          z.object({
            group: z.string().optional(),
            kind: z.string().optional(),
            name: z.string().optional(),
            namespace: z.string().optional()
          })
        )
        .optional(),
      revision: z.string().optional(),
      revisions: z.array(z.string()).optional(),
      source: SourceSchema.optional(),
      sources: z.array(SourceSchema).optional(),
      syncOptions: z.array(z.string()).optional(),
      syncStrategy: z
        .object({
          apply: z
            .object({
              force: z.boolean().optional()
            })
            .optional(),
          hook: z
            .object({
              syncStrategyApply: z
                .object({
                  force: z.boolean().optional()
                })
                .optional()
            })
            .optional()
        })
        .optional()
    })
    .optional()
});

// Spec Schema
const SpecSchema = z.object({
  destination: z
    .object({
      name: z.string().optional(),
      namespace: z.string().optional(),
      server: z.string().optional()
    })
    .optional(),
  ignoreDifferences: z
    .array(
      z.object({
        group: z.string().optional(),
        jqPathExpressions: z.array(z.string()).optional(),
        jsonPointers: z.array(z.string()).optional(),
        kind: z.string().optional(),
        managedFieldsManagers: z.array(z.string()).optional(),
        name: z.string().optional(),
        namespace: z.string().optional()
      })
    )
    .optional(),
  info: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional(),
  project: z.string().optional(),
  revisionHistoryLimit: z.number().optional(),
  source: SourceSchema.optional(),
  sources: z.array(SourceSchema).optional(),
  syncPolicy: z
    .object({
      automated: z
        .object({
          allowEmpty: z.boolean().optional(),
          prune: z.boolean().optional(),
          selfHeal: z.boolean().optional()
        })
        .optional(),
      managedNamespaceMetadata: z
        .object({
          annotations: z.record(z.string()).optional(),
          labels: z.record(z.string()).optional()
        })
        .optional(),
      retry: z
        .object({
          backoff: z
            .object({
              duration: z.string().optional(),
              factor: z.number().optional(),
              maxDuration: z.string().optional()
            })
            .optional(),
          limit: z.number().optional()
        })
        .optional(),
      syncOptions: z.array(z.string()).optional()
    })
    .optional()
});

// Application Item Schema
const ApplicationItemSchema = z.object({
  metadata: MetadataSchema.optional(), // Previously assumed required based on context
  operation: OperationSchema.optional(),
  spec: SpecSchema.optional(),
  status: z.any() // This remains adaptable based on definitions
});

// Applications Response Schema
export const ApplicationsResponseSchema = z.object({
  items: z.array(ApplicationItemSchema),
  metadata: z.object({
    continue: z.string().optional(),
    remainingItemCount: z.number().optional(),
    resourceVersion: z.string(),
    selfLink: z.string().optional()
  })
});
