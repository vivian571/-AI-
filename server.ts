import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialization of Gemini API
let aiClient: GoogleGenAI | null = null;
function getAIInstance() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY target variable is missing. Please configure it in AI Studio Settings > Secrets under the key 'GEMINI_API_KEY'.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Endpoint 1: Generate response for any of the manual prompts
  app.post("/api/companion/generate", async (req, res) => {
    try {
      const { promptType, inputs } = req.body;
      const ai = getAIInstance();

      let compiledPrompt = "";
      let systemInstruction = "你是一位擅长微型应用（MVP）落地与变现的超级一人公司AI开发导师，精通非程序员如何快速实现 0-1 独立站/H5/App 变现开发。请使用流利、严谨且极具启发性的中文回答。";

      switch (promptType) {
        case "demand_discovery": {
          // P-01
          const { scenario } = inputs;
          compiledPrompt = `
你是一位擅长发现蓝海需求的虚心产品顾问。
我观察到的现象/话题是：
【${scenario}】

请帮我详细分析：
1. 这背后的核心用户痛点是什么？（请尽量使用用户自己的语言描述）
2. 现有主流App/方案是如何满足的？目前有哪些明显的痛点满足得不够好？
3. 如果我要做一个全新的 App，能放大一人开发的高效优势，切入的极简差异化特异化切入点（differentiation vector）在哪里？
4. 这个需求的付费意愿如何？推荐什么样的商业变现模式与组合定价？
5. 直接输出 3 个包含完整产品定位与一句短语描述（elevator pitch）的具体可行极简 App 方向。
`;
          break;
        }

        case "competitor_analysis": {
          // P-02
          const { appName, description } = inputs;
          compiledPrompt = `
假设我要分析【${appName}】这款产品，它是【${description}】。

请帮我深入分析：
1. 它的核心价值主张（core value proposition）与亮点是什么？
2. 用户评论/各大反馈中，最常见的优势/好评点（提炼5条核心高频理由）有哪些？
3. 用户评论中，最常见、最核心的痛点/差评/投诉/不耐烦（提炼5条高频真实差评）有哪些？
4. 如果我要做竞品，最容易突破或被忽略的、低竞争壁垒的一人公司突破路径差异化在哪里？
5. 它的商业变现模式（Monetization model）是什么？有什么明显的槽点和优化空间？
`;
          break;
        }

        case "prd_generation": {
          // P-03
          const { appName, targetAudience, corePainPoints, differentiation } = inputs;
          compiledPrompt = `
你是拥有10年经验的 Senior 产品经理（Product Director），擅长 0-1 的极轻量 MVP 产品设计与极速发布。

根据以下输入，帮我输出一份完整、可直接交付给 AI 进行辅助开发的标准 PRD 文档：
- 产品名称：${appName}
- 目标用户：${targetAudience}
- 核心痛点：${corePainPoints}
- 差异化亮点：${differentiation}

要求如下：
1. 语言简洁、可测度、高度聚焦，解释“做什么”和“为什么这么做”。
2. MVP 边界要死守，核心功能控制在 5 个以内。
3. 明确标注哪些功能是本期 MVP 必须包含（P0），哪些是后续迭代（P1/P2）。
4. 商业变现设计要具体，包含免费版限制与 Pro 订阅权益定价方案。
5. 必须严格遵循下列结构框架输出 markdown 文档：
   # 产品基本信息 (产品名称、一句话 Elevator Pitch、目标画像、核心痛点、差异化优势)
   # 产品目标 (第一阶段 MVP 核心下载/活跃目标、短期变现/月收入目标)
   # 核心功能列表 (MVP P0、下版本 P1、未来考虑 P2)
   # 用户核心主流程逻辑 (打开 -> 主干场景一 -> 主干场景二 -> 付费转化触发点)
   # 变现方案与定价 (免费版额度限制、Pro 专业版定价、付费触发时机文案)
   # MVP 边界 (严格不做、排除在外的列表，防止功能蔓延开发受挫)
`;
          break;
        }

        case "code_framework": {
          // P-04
          const { appName, prdNotes, techStack } = inputs;
          compiledPrompt = `
你是一位拥有8年经验的 Flutter/Web 全栈开发工程师，熟练掌握快速出 MVP、高效干净集成的技巧。
现在请为我的产品【${appName}】开发核心逻辑模块。

技术栈：${techStack || "TypeScript + React + Tailwind + LocalStorage"}
产品PRD定义及核心要点：
【${prdNotes}】

严格请输出：
1. 完美、清晰、简洁的渐进式目录结构（推荐最少的代码文件数满足微型应用）。
2. 单文件/模块职责划分方案。
3. 提示在开发时需要防范的最重要 API 或本地数据失效、状态死锁等实战坑。
`;
          break;
        }

        case "db_design": {
          // P-06
          const { prdNotes } = inputs;
          compiledPrompt = `
你是一位资深后端与数据库架构师。根据以下 MVP 产品需求，设计极简、高扩展性的数据库结构与规则。
产品 PRD 要点：
【${prdNotes}】

请帮我设计并输出：
1. 最简数据模型（包含所有必要字段、类型及核心注释）。对于一人公司，倾向于单表/单集合设计或者轻量本地 key-value JSON。
2. 基础的数据库安全过滤规则，防止非授权越权或重置。
3. 对于多表/多文档情况，指出需要建立哪些必要单键或复合索引，保障查询效率。
4. 提醒哪些高耗费、易产生百万级读写计费的坑需要绝对规避。
`;
          break;
        }

        case "marketing_red": {
          // P-07
          const { appName, appFeatures, styleOption } = inputs;
          compiledPrompt = `
请帮我为我的产品【${appName}】撰写一篇小红书（RED）的高转化种草推广笔记。
其基本特色包含：${appFeatures}
文案风格偏好：${styleOption || "真实用户体验，突出教程/对比痛点"}

输出规范：
1. 标题（提供 3 个极具张力、高点击率、带情绪并包含痛点的红薯流量标题）。
2. 长笔记正文（600-800 字，运用红薯语言、高频添加Emoji图、极佳排版。口语化，突出：遇到哪些痛点 -> 疯狂找寻未果 -> 发现神器体验 -> 10倍效率惊喜 -> 引导下载试用）。
3. 话题标签（提供 10 个最相关的爆款高热标签）。
4. 封面设计建议（15字内高对比高冲击字样，突出抓眼痛点画面）。
`;
          break;
        }

        case "marketing_aso": {
          // P-08
          const { appName, coreFunction, targetUsers } = inputs;
          compiledPrompt = `
假设你是一位 App Store ASO（应用商店搜索引擎优化）专家，请帮我优化以下应用的商店元数据。
产品名称：${appName}
核心定位：${coreFunction}
目标用户：${targetUsers}

请输出完美直接使用的元数据策略：
1. 推荐 App 名称（3个方案，各控制在30字内，包含最核心关联词作为权重）。
2. 推荐副标题（3个方案，各30字内，补充功能亮点优势，放次要关键检索词）。
3. 关键词标签列表（100字以内，英文逗号分隔，无多余空格与重合，精确命中搜索习惯）。
4. 精心排版的商店详情描述第一段（这前3行最关键，旨在直观展示最痛、最刚性的应用核心价值与用户体验，控制在150字内）。
5. 5张核心屏幕截图画面排布文案建议（每张写 15 字内的吸睛功能标语，直接震撼视觉）。
`;
          break;
        }

        case "price_design": {
          // P-09
          const { appName, coreFeatures, competitorsPrice } = inputs;
          compiledPrompt = `
为产品【${appName}】设计整套商业化与付费墙转换模型。
核心功能是：${coreFeatures}
同类竞品常见定价：${competitorsPrice || "无/类似App价格 18-68 元买断"}

分析设计并规划：
1. 免费版到底限制什么？（如何保证用户即满足核心基本体验、又对未解锁功能极度渴望，具有高价值感知而非残废版）。
2. 精准的 Pro 专业版阶梯定价方案方案（推荐设置：按月、年、终身买断/按次三类，给出具体建议金额）。
3. 最精确的 3 个付费触发时机，以及相应的付费墙诱导触发推荐文案（在用户刚刚爽到或产生最强依赖的瞬间弹出）。
4. 第一周/月刺激付费的限时返现或立减营销方案。
`;
          break;
        }

        case "privacy_policy": {
          // P-10
          const { appName, collectedData, purpose } = inputs;
          compiledPrompt = `
请帮我为微型独立应用【${appName}】生成一份满足苹果 App Store 及谷歌 Google Play 审核标准的中英文双语隐私政策模版。
我们收集以下最少化数据：${collectedData || "邮箱、设备标示、极简本地偏好配置"}
数据核心用途是：${purpose || "用于维护个人同步配置与提升排错体验"}
我们是否出让给第三方？“绝对不”

请输出结构极为正规、易于自部署为静态网页URL的：
1. 英文版 Privacy Policy
2. 中文版 隐私政策
`;
          break;
        }

        case "review_notes": {
          // P-11
          const { appName, coreFunction, credentials } = inputs;
          compiledPrompt = `
你是一位极其精通 App Store / Google Play 审核机制的上架合规专家。请帮我写一份用于 App Store 连接提审的审核备忘录（Review Notes）。
应用名称：${appName}
核心体验：${coreFunction}
演示测试账号与流程：${credentials || "无/如果是免登录直接开始体验"}

请输出一份极为得体、逻辑紧密的英文 Review Notes：
1. 核心功能及受限硬件（例如摄像头/定位）的合理自辩理由（200字内，清晰有据，让审核员快速阅过）。
2. 让审核员最快切入并完整体验核心主干路径的 1-2-3 操作指南。
3. 说明如果需要任何附加凭证或操作视频，如何最快联系到我方（开发者）。
`;
          break;
        }

        default:
          return res.status(400).json({ error: "Invalid promptType requested" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: compiledPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        responseText: response.text,
        compiledPrompt,
      });
    } catch (error: any) {
      console.error("Gemini API Error in backend:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Unknown error occurred on server",
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development Server started successfully on port ${PORT}`);
  });
}

startServer();
