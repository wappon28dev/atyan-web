import { type ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function PromiseBoundary({
  onError,
  onLoading,
  children,
}: {
  onError: ReactElement;
  onLoading: ReactElement;
  children: ReactElement;
}): ReactElement {
  return (
    <ErrorBoundary fallback={onError}>
      <Suspense fallback={onLoading}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
