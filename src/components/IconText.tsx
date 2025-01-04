import type { OmitStrict } from "@/types/utils";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { HStack } from "panda/jsx";

export function IconText({
  icon,
  children,
  containerProps,
  iconProps,
}: {
  icon: ComponentProps<typeof Icon>["icon"];
  children: ReactNode;
  containerProps?: ComponentProps<typeof HStack>;
  iconProps?: OmitStrict<ComponentProps<typeof Icon>, "icon">;
}): ReactElement {
  return (
    <HStack {...containerProps}>
      <Icon {...iconProps} icon={icon} />
      {children}
    </HStack>
  );
}
