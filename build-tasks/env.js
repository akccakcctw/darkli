export function getEnv() {
  return process.env.NODE_ENV || 'development';
}

export default getEnv;
