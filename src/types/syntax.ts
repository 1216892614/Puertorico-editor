import { z } from "zod";

export const ctxTags = z.union([
  z.literal("md"),
  z.literal("code_block"),
  z.literal("code_lang_name_block"),
  z.literal("tex_block"),
  z.literal("tex_macros_block"),
  z.literal("ts_eval"),
  z.literal("js_eval"),
]);

export const operatorType = z.object(
  {
    symbol: z.string(),
    isLineBeginning: z.boolean().optional(),
    isLineEnding: z.boolean().optional(),
    fix: z.enum(["prefix", "infix", "suffix"]),
    ctx: ctxTags.array().optional(),
    antiCtx: ctxTags.array().optional(),
    order: z.number().int().positive(),
    description: z.string(),
  },
);

/** Type of operators config
 *
 * @param symbol - symbol string
 * @param lineBeginning - is this symbol have to be the beginning of a line.
 * @param isLineEnding - is this symbol have to be the ending of a line.
 * @param fix - syntax way of this operator.
 * @param ctx - the context tags of this operator have to be in. provided by {@link Divider}
 * @param antiCtx - the context tags of this operator have to NOT be in. priority higher than ctx.
 * @param order - the parsing precedence of this operator.
 * @param description - what this operator for
 */
export type Operator = z.infer<typeof operatorType>;

export const dividerType = z.object({
  symbolTags: z.array(z.object({
    symbol: z.string(),
    isLineBeginning: z.boolean().optional(),
    isLineEnding: z.boolean().optional(),
    ctxTagStart: ctxTags.array().optional(),
    ctxTagEnd: ctxTags.array().optional(),
  })),
  ctx: ctxTags.array().optional(),
  antiCtx: ctxTags.array().optional(),
  order: z.number().int().positive(),
  description: z.string(),
});

/** Type of dividers config
 *
 * check {@link Operator} know more about prams
 *
 * # Example
 * a standalone tex block may look like this:
 *
 * ```
 * $$[macro_names]
 *   ...
 * $$
 * ```
 *
 * so u have these block divide symbols
 *
 * - `$$[`: start of `tex_macros_block`,
 * - `]\n`: start of `tex_block`, end of `tex_macros_block`,
 * - `$$\n`: end of `tex_block`,
 *
 * and all of them should use together in `md_block`,
 *
 * In that case, these dividers should with config like this:
 *
 * @example
 * const example = {
 *   symbolTags: [
 *     {
 *       symbol: "$$[",
 *       isLineBeginning: true,
 *       ctxTagStart: ["tex_macros_block"],
 *     },
 *     {
 *       symbol: "]\n",
 *       isLineEnding: true,
 *       ctxTagStart: ["tex_block"],
 *       ctxTagEnd: ["tex_macros_block"],
 *     },
 *     {
 *       symbol: "$$\n",
 *       isLineBeginning: true,
 *       isLineEnding: true,
 *       ctxTagEnd: ["tex_block"],
 *     },
 *   ],
 *   order: 1,
 *   ctx: ["md"],
 *   description: "...",
 * } as const satisfies Divider;
 */
export type Divider = z.infer<typeof dividerType>;

export type Token = (Operator | Divider | Token)[];

export const tokenType: z.ZodType<Token> = z
  .union([
    operatorType,
    dividerType,
    z.lazy(() => tokenType),
  ]).array();
