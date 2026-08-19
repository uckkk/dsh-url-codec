// dsh-url-codec — URL 编解码（DeepSeek Harness）。纯 Node。
import { defineTool } from "@deepseek-ai/dsh-tools";

const name = "URL 编解码";
const inject = ["tools"];

async function apply(ctx, _config) {
  ctx.tools.register(defineTool({
    name: "url_encode",
    description: "URL 编码（百分号编码）。`text` 传原文；`component` true 用 encodeURIComponent（编码更多字符），默认 false 用 encodeURI。",
    parameters: { text: { type: "string", required: true, description: "原文。" }, component: { type: "boolean", description: "用 encodeURIComponent，默认 false。" } },
    output: { schema: { type: "object", additionalProperties: false, properties: { result: { type: "string", required: true } } }, render: (_a, v) => [{ type: "text", text: v.result }] },
    execute: async (args) => ({ result: args.component ? encodeURIComponent(String(args.text)) : encodeURI(String(args.text)) }),
  }));

  ctx.tools.register(defineTool({
    name: "url_decode",
    description: "URL 解码（百分号解码）。`text` 传已编码文本；`component` true 用 decodeURIComponent。",
    parameters: { text: { type: "string", required: true, description: "已编码文本。" }, component: { type: "boolean", description: "用 decodeURIComponent，默认 false。" } },
    output: { schema: { type: "object", additionalProperties: false, properties: { result: { type: "string", required: true } } }, render: (_a, v) => [{ type: "text", text: v.result }] },
    execute: async (args) => {
      try { return { result: args.component ? decodeURIComponent(String(args.text)) : decodeURI(String(args.text)) }; }
      catch { throw new Error("URL 解码失败"); }
    },
  }));
}

export { apply, inject, name };
