import { createToaster } from "@ark-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 24,
  max: 3,
});

export function notifyErrorInToast(
  caller: string,
  error: Error,
  { title, duration, ...rest }: Parameters<typeof toaster.error>[0],
): void {
  toaster.error({
    id: `handleToasterError-${title}`,
    title,
    duration: duration === Infinity ? 60 * 1000 : duration,
    ...rest,
  });

  console.error(`[${caller}]: ${title}`, error, error.cause);
}
