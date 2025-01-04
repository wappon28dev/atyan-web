/* eslint-disable no-console */
const cacheData: Record<string, any> = {};

export function setCache(key: string, data: any): void {
  console.info("set: ", key);
  cacheData[key] = data;
}

export function getCache<T>(key: string): T | undefined {
  console.info("hit: ", key);
  return cacheData[key];
}
