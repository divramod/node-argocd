import dotenv from 'dotenv';

export const loadValueFromEnvFile = (file: string, value: string): string | undefined => {
  const envs = dotenv.config({
    path: file,
    override: true
  }).parsed;
  const env = envs?.[value];
  return env;
};
