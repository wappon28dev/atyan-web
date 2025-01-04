type GetsType<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends "get"
  // ? { id: string } & DateType & Required<P>
  ? { id: string } & DateType & P
  : T extends "gets"
    // ? GetsType<{ id: string } & DateType & Required<P>>
    ? GetsType<{ id: string } & DateType & P>
    : Partial<DateType> & (T extends "patch" ? Partial<P> : P);

export type News<T = "get"> = Structure<
  T,
  {
  /**
   * タイトル
   */
    title: string;
    /**
     * タグ
     */
    tag?: ["動画の告知" | "イベント告知"];
    /**
     * 本文
     */
    body: any;
    /**
     * OGP 画像
     */
    ogpImage?: { url: string; width: number; height: number };
  }
>;

export type Fanart<T = "get"> = Structure<
  T,
  {
  /**
   * 掲載許可されているか
   */
    canBePublished: boolean;
    /**
     * ファンアート画像
     */
    image: { url: string; width: number; height: number };
    /**
     * ハンドルネーム
     */
    handleName?: string;
    /**
     * 外部リンク
     */
    externalLink?: string;
  }
>;

export type Blogs<T = "get"> = Structure<
  T,
  {
  /**
   * タイトル
   */
    title: string;
    /**
     * タグ
     */
    tag?: ["イベント振り返り"];
    /**
     * 本文
     */
    body: any;
    /**
     * OGP 画像
     */
    ogpImage?: { url: string; width: number; height: number };
  }
>;

export type EndPoints = {
  get: {
    news: News<"get">;
    fanart: Fanart<"get">;
    blogs: Blogs<"get">;
  };
  gets: {
    news: News<"gets">;
    fanart: Fanart<"gets">;
    blogs: Blogs<"gets">;
  };
  post: {
    news: News<"post">;
    fanart: Fanart<"post">;
    blogs: Blogs<"post">;
  };
  put: {
    news: News<"put">;
    fanart: Fanart<"put">;
    blogs: Blogs<"put">;
  };
  patch: {
    news: News<"patch">;
    fanart: Fanart<"patch">;
    blogs: Blogs<"patch">;
  };
};
