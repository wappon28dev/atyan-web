import type { EndPoints } from "@/types/cms";
import type { Media } from "@/types/media";
import { fetchResult, type RequestResult } from "@/lib/utils/fetch";
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import { okAsync } from "neverthrow";
import { match, P } from "ts-pattern";
import { getCache, setCache } from "./cache";
import { ENV } from "./env";

export const client = createClient({
  apiKey: ENV.MICROCMS_API_KEY,
  serviceDomain: ENV.MICROCMS_SERVICE_DOMAIN,
});

const MOCK_BASE_URL = "http://localhost:4321/mocks";

type MediaRes = {
  media: Media[];
  totalCount: number;
  token: string;
};

export function fetchMediaAll(): RequestResult<MediaRes> {
  const key = "media-res";

  const queries = new URLSearchParams({
    limit: "100",
    imageOnly: "true",
  }).toString();

  const url = match(import.meta.env.PROD)
    .with(true, () => `https://${ENV.MICROCMS_SERVICE_DOMAIN}.microcms-management.io/api/v2/media?${queries}`)
    .otherwise(() => `${MOCK_BASE_URL}/media.json`);

  return match(getCache<MediaRes>(key)).with(
    P.nonNullable,
    (c) => okAsync(c),
  ).otherwise(
    () => fetchResult<MediaRes>(
      url,
      {
        headers: {
          "X-MICROCMS-API-KEY": ENV.MICROCMS_API_KEY,
        },
      },
    ).map((res) => {
      setCache(key, res);
      return res;
    }),
  );
}

export function fetchMediaSingle(
  name: string,
): RequestResult<Media> {
  return fetchMediaAll().map((media) => {
    if (media.media.length === 0) {
      throw new Error(`Media not found: ${name}`);
    }

    const [mediaSingle] = media.media.filter(
      (m) => m.url.split("/").at(-1)?.split(".").at(0) === `__${name}`,
    );

    if (mediaSingle == null) {
      throw new Error(`Media not found: ${name}`);
    }

    return mediaSingle;
  });
}

export function fetchDefaultOGPImage(): RequestResult<Media> {
  return fetchMediaSingle("ogp-image");
}

export async function fetchContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries?: MicroCMSQueries,
): Promise<EndPoints["gets"][T]> {
  if (import.meta.env.DEV) {
    const res = ((await fetchResult<EndPoints["gets"][T]>(`${MOCK_BASE_URL}/contents.json`))._unsafeUnwrap());
    return {
      ...res,
      contents: res.contents.toSorted(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    };
  }

  return client.get({
    endpoint: key,
    queries: {
      limit: 100,
      orders: "-publishedAt",
      ...queries,
    },
  });
}

export async function fetchContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["get"][T]> {
  if (import.meta.env.DEV) {
    const result = await fetchResult<EndPoints["gets"][T]>(`${MOCK_BASE_URL}/contents.json`);
    const content = result._unsafeUnwrap().contents.find((c) => c.id === id);
    if (!content) {
      throw new Error(`Content with id ${id} not found`);
    }
    return content as EndPoints["get"][T];
  }

  return client.getListDetail<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries,
  });
}
