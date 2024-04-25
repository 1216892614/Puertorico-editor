import { Operator } from "@/types/syntax";

export default [{
  symbol: "# ",
  isLineBeginning: true,
  fix: "prefix",
  order: 1,
  ctx: ["md"],
  description: "First Header level, as `h1` tag in HTML",
}, {
  symbol: "#",
  isLineBeginning: true,
  fix: "prefix",
  order: 2,
  ctx: ["md"],
  description: "With no-space after `#` to give the page a tag",
}] as const satisfies Operator[];
