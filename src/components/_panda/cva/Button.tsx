import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

export const cvaButton = cva({
  base: {
    colorPalette: "onBackground",
    p: "2",
    px: "4",
    rounded: "md",
    cursor: "pointer",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4,
    },
  },
  variants: {
    variant: {
      light: {
        bg: "colorPalette/5",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/10" } },
      },
      filled: {
        bg: "colorPalette",
        color: "bg",
        _enabled: { _hover: { bg: "colorPalette/90" } },
      },
      outlined: {
        outline: "1px solid",
        outlineColor: "colorPalette",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/5" } },
      },
      text: {
        bg: "colorPalette/5",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/10" } },
      },
    },
    size: {
      sm: {
        fontSize: "sm",
        px: "2",
        py: "1",
      },
      md: {
        fontSize: "md",
      },
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export const Button = p("button", cvaButton);
