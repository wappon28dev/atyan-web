import { styled as p, VStack } from "panda/jsx";
import { type ReactElement, useEffect, useState } from "react";
import { Expanded } from "./_panda/cva/Expanded";

export function Splash({ children }: { children: ReactElement }): ReactElement {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <Expanded bg="background" items="center">
        <VStack gap="5">
          <p.p>読み込み中...</p.p>
        </VStack>
      </Expanded>
    );
  }

  return <Expanded fadeIn="20">{children}</Expanded>;
}
