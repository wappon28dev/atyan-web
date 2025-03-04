import { addAnchorCopy } from "./rewriters/add-anchor-copy";
import { imageOpt } from "./rewriters/image-opt";

export type Rewriter = (html: string) => Promise<string> | string;

export async function rewriteHTML(
  html: string,
  additionalRewriters: Rewriter[] = [],
): Promise<string> {
  let result = html;

  const writers: Rewriter[] = [
    imageOpt,
    addAnchorCopy,
    ...additionalRewriters,
  ];

  for await (const rewriter of writers) {
    result = await rewriter(result ?? "");
  }

  return result;
}
