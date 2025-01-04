import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

export const cvaExpanded = cva({
  base: {
    w: "100%",
    h: "100%",
  },
  variants: {
    basedOn: {
      container: {
        w: "100%",
        h: "100%",
      },
      screen: {
        h: ["100dvh", "100vh"],
      },
    },
    items: {
      center: {
        display: "grid",
        placeItems: "center",
        alignItems: "center",
      },
    },
  },
});

export const Expanded = p("div", cvaExpanded);
