import type { Nullable } from "@/types/utils";
import type { Type } from "@zag-js/toast";
import type { ReactElement } from "react";
import { toaster } from "@/lib/utils/toast";
import { Toast, Toaster } from "@ark-ui/react";
import { Icon } from "@iconify/react";
import { Divider, HStack, VStack } from "panda/jsx";
import { token, type Token } from "panda/tokens";
import { match } from "ts-pattern";
import { Button } from "./_panda/cva/Button";
import { svaToast } from "./_panda/sva/toast";
import { IconText } from "./IconText";

type Style = {
  icon: string;
  color?: Token;
  bgColor: Token;
};

const iconAndColor = {
  success: {
    icon: "mdi:check",
    color: "colors.text",
    bgColor: "colors.bg",
  },
  error: {
    icon: "mdi:alert",
    color: "colors.bg", // TODO: white
    bgColor: "colors.primary",
  },
  info: {
    icon: "mdi:information",
    color: "colors.text",
    bgColor: "colors.bg",
  },
  loading: {
    icon: "svg-spinners:ring-resize",
    color: "colors.text",
    bgColor: "colors.bg",
  },
} as const satisfies Record<Exclude<Type, string & object>, Style>;

function getIconAndColor(type: Nullable<Type>): Style {
  return match(type)
    .when(
      (t) => t != null && t in iconAndColor,
      (t) => iconAndColor[t as keyof typeof iconAndColor],
    )
    .otherwise(
      () =>
        ({
          bgColor: "colors.bg",
          icon: "",
        }) as const,
    );
}

export function StyledToast(): ReactElement {
  const cls = svaToast();

  return (
    <Toaster toaster={toaster}>
      {(toast) => {
        const { icon, bgColor, color } = getIconAndColor(toast.type);
        return (
          <Toast.Root
            className={cls.root}
            key={toast.id}
            style={{
              backgroundColor: token(bgColor),
              color: color != null ? token(color) : undefined,
            }}
          >
            <VStack alignItems="start">
              <HStack justifyContent="space-between" w="100%">
                <Toast.Title className={cls.title}>
                  <IconText icon={icon}>{toast.title}</IconText>
                </Toast.Title>
                <Toast.CloseTrigger className={cls.closeTrigger}>
                  <Icon icon="mdi:close" />
                </Toast.CloseTrigger>
              </HStack>
              <Toast.Description className={cls.description}>
                {toast.description}
              </Toast.Description>
              {toast.action != null && (
                <VStack alignItems="end" w="100%">
                  <Divider />
                  <Toast.ActionTrigger asChild>
                    <Button
                      colorPalette={color?.split(".").at(1) ?? "text"}
                      size="sm"
                      variant="text"
                    >
                      {toast.action?.label}
                    </Button>
                  </Toast.ActionTrigger>
                </VStack>
              )}
            </VStack>
          </Toast.Root>
        );
      }}
    </Toaster>
  );
}
