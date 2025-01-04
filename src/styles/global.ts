import type { GlobalStyleObject } from "@pandacss/dev";

export const globalCss: GlobalStyleObject = {
  "html, body": {
    "color": "text",
    "bg": "bg",
    "& body": {
      bg: "bg",
    },
    "fontFeatureSettings": "'palt'",
    "fontFamily": "sans",
    "scrollBehavior": "smooth",
    "scrollPaddingTop": "130px",

    "fontSize": {
      base: "large",
      mdDown: "md",
    },

    // ref: https://ics.media/entry/240411/#%E3%81%BE%E3%81%A8%E3%82%81
    "overflowWrap": "anywhere",
    "wordBreak": "normal",
    "lineBreak": "strict",
  },
  "p": {
    transform: "skewY(0.03deg)",
  },
  "pre, code": {
    fontFamily: "mono",
  },
};
