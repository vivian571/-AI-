import React, { useState, useEffect } from "react";
import { PROMPT_TEMPLATES } from "../data";
import { PromptTemplate } from "../types";
import { Copy, Check, Sparkles, Terminal, FileText, Code, Loader2, AlertCircle } from "lucide-react";

export function CopilotSandbox() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("demand_discovery");
  const [inputsState, setInputsState] = useState<Record<string, string>>({});
  const [compiledPromptPreview, setCompiledPromptPreview] = useState<string>("");
  const [aiOutputResult, setAiOutputResult] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isCopiedText, setIsCopiedText] = useState<boolean>(false);
  const [isCopiedCompiled, setIsCopiedCompiled] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState<number>(0);

  const ROTATING_PHRASES = [
    "正在梳理细分痛点场景词...",
    "正在对标主流竞品差评突破路径...",
    "正在严格死守 MVP 5个功能边界...",
    "正在精算商业订阅最佳免费/Pro触发阻断壁画...",
    "正在撰写并润色完美的小红书大流量宣发文案...",
    "Gemini 3.5 AI 导师正在做最终合规和排版审查，马上呈现..."
  ];

  const currentTemplate = PROMPT_TEMPLATES.find((t) => t.id === selectedTemplateId) || PROMPT_TEMPLATES[0];

  // Initialize defaults on template change
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    currentTemplate.inputs.forEach((inp) => {
      initialValues[inp.key] = inp.defaultValue || "";
    });
    setInputsState(initialValues);
    setCompiledPromptPreview("");
    setAiOutputResult("");
    setApiError("");
  }, [selectedTemplateId]);

  // Handle inputs change
  const handleInputChange = (key: string, value: string) => {
    setInputsState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Compile prompt preview string locally
  const compilePromptLocally = () => {
    let result = "";
    switch (currentTemplate.id) {
      case "demand_discovery":
        result = `你是发现蓝海需求的虚心产品顾问。我观察到的现象/话题是：\n【${inputsState.scenario || ""}】\n\n请帮我分析其背后核心用户痛点、现有方案不足、新App的一人高性价比差异化切入方案、付费意愿及变现组合方案、直接输出 3 个可行的极简 App 定位 Elevator Pitch。`;
        break;
      case "competitor_analysis":
        result = `假设我要分析【${inputsState.appName || ""}】这款产品，特色为【${inputsState.description || ""}】。请深入分析：价值主张、最常见高频的5条好评、5条最核心真实差评与用户抱怨折磨点、竞品突破差异路径、以及它的变现槽点。`;
        break;
      case "prd_generation":
        result = `你是10年经验产品总监，擅长 0-1 极简产品设计。根据以下输入输出一份精细核心 PRD markdown：名称：${inputsState.appName || ""}, 目标用户：${inputsState.targetAudience || ""}, 痛点：${inputsState.corePainPoints || ""}, 差异亮点：${inputsState.differentiation || ""}。拒绝功能蔓延，MVP必须死守在 5 个核心基础功能内，包含 P0/P1 功能区分、变现权益说明、以及不做功能列表！`;
        break;
      case "code_framework":
        result = `你是一位拥有8年经验的 Flutter/Web 全栈开发导师。现在请为我的产品【${inputsState.appName || ""}】开发核心逻辑模块。技术栈：${inputsState.techStack || ""}。产品PRD要点信息：\n【${inputsState.prdNotes || ""}】\n请写出渐进式、最少代码量项目目录结构，单文件职责分工，以及开发防爆、状态死锁与本地同步的关键排坑经验。`;
        break;
      case "db_design":
        result = `你是一位资深后端与数据库架构师。根据产品 PRD 要点【${inputsState.prdNotes || ""}】设计数据库 Schema。请输出最简数据结构模型（字段、类型及核心注释）、最严数据库安全防护规则、需要的单键或复合索引、并指示哪些操作容易产生计费灾难需要绕离。`;
        break;
      case "marketing_red":
        result = `请帮我为我的产品【${inputsState.appName || ""}】撰写一篇小红书种草高转化推广笔记。特色包含：${inputsState.appFeatures || ""}。风格：${inputsState.styleOption || ""}。请按标题（3个带情绪爆款标题）、长笔记正文（600-800字，高频Emoji，遇到痛苦->遍寻无果->神器解痛的故事线）、热搜话题标签（10个）及封面抓字眼标语输出。`;
        break;
      case "marketing_aso":
        result = `假设你是 App Store ASO 优化专家，请帮我优化以下元数据。微型产品：${inputsState.appName || ""}, 定位：${inputsState.coreFunction || ""}, 目标用户：${inputsState.targetUsers || ""}。输出：推荐的应用商店标题（3个，30字内带核心词）、副标题（3个，30字内加权词）、100字符内英文逗号分隔关键词词包、直击灵魂的详情第一自然段前 3 行、5张核心功能截图画面标语配文引导（各15字内）。`;
        break;
      case "price_design":
        result = `为产品【${inputsState.appName || ""}】规划一整套商业化盈利与付费触发诱导墙。核心为：${inputsState.coreFeatures || ""}。竞品定价为：${inputsState.competitorsPrice || ""}。请设计分析：免费版和Pro专业版功能阶梯卡点分配、Pro 按月按年及终身买断推荐价格、最精准的 3 处付费阻断时机及高情商付费文案。`;
        break;
      case "privacy_policy":
        result = `请帮我为独立应用【${inputsState.appName || ""}】生成满足上架审核的公开中英文双语隐私政策（Privacy Policy）模版。我们仅收集这些精简个人数据：${inputsState.collectedData || ""}。最终用途是：${inputsState.purpose || ""}。不共享或交易给任何第三平台。`;
        break;
      case "review_notes":
        result = `精通提审机制的专家，请撰写一章专门致 App Store 审核员的 Review Notes。产品名：${inputsState.appName || ""}, 亮点英文描述：${inputsState.coreFunction || ""}, 演示账号测试路径：${inputsState.credentials || ""}。提供语气绝对真诚细心、易读、不卡人的全英文 Review 说明与常见硬件权限自辨（200字内）。`;
        break;
      default:
        result = "暂无此模板的解析逻辑。";
    }
    setCompiledPromptPreview(result);
  };

  // Rotating loading phrases
  useEffect(() => {
    if (!isCompiling) return;
    const interval = setInterval(() => {
      setLoadingPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isCompiling]);

  // Send request to Gemini API backend Express Route
  const generateWithAIPilot = async () => {
    setIsCompiling(true);
    setApiError("");
    setAiOutputResult("");
    setLoadingPhraseIndex(0);

    try {
      const response = await fetch("/api/companion/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptType: currentTemplate.id,
          inputs: inputsState,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiOutputResult(data.responseText);
        if (data.compiledPrompt) {
          setCompiledPromptPreview(data.compiledPrompt);
        }
      } else {
        setApiError(data.error || "调用 AI 构建助手失败，未能正常响应");
      }
    } catch (err: any) {
      console.error(err);
      setApiError("连接到本地服务器异常，请确认后端 Dev 进程已启动就绪，且已在 secrets 下录入 'GEMINI_API_KEY'。");
    } finally {
      setIsCompiling(false);
    }
  };

  const copyToClipboard = (text: string, isCompiled: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCompiled) {
      setIsCopiedCompiled(true);
      setTimeout(() => setIsCopiedCompiled(false), 2000);
    } else {
      setIsCopiedText(true);
      setTimeout(() => setIsCopiedText(false), 2000);
    }
  };

  return (
    <div id="copilot_sandbox_root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Template Selector & Input Form */}
      <div className="lg:col-span-6 space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
              选择实战手册 Prompt 蓝图模板 (Page 23 - 29)
            </label>
            <select
              id="select_copilot_template"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-150 focus:outline-none focus:border-emerald-500 font-sans"
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
            >
              <optgroup label="💡 Phase 1: 洞察、需求与基本盘评估">
                <option value="demand_discovery">P-01 热门现象与蓝海痛点挖掘</option>
                <option value="competitor_analysis">P-02 目标竞品价值极速解构</option>
                <option value="prd_generation">P-03 黄金极简 PRD 生成器</option>
              </optgroup>
              <optgroup label="⚙️ Phase 2: MVP 框架、技术与存储架构">
                <option value="code_framework">P-04 MVP 项目目录与渐进职责分配</option>
                <option value="db_design">P-06 极简单集合数据库存储 Schema</option>
              </optgroup>
              <optgroup label="📈 Phase 3: 运营种草、爆款ASO与转化设计">
                <option value="marketing_red">P-07 痛点故事流——小红书种草高转化笔记</option>
                <option value="marketing_aso">P-08 商店 ASO 元数据与截图文案包</option>
                <option value="price_design">P-09 付费阻断点分配与精细定价模型</option>
              </optgroup>
              <optgroup label="🛡️ Phase 4: 上架合规、免拒指引备忘录">
                <option value="privacy_policy">P-10 App Store标配中英文双语隐私政策</option>
                <option value="review_notes">P-11 给 Apple / Google 审查员的 Review Notes</option>
              </optgroup>
            </select>
            <p className="text-[11px] text-slate-450 mt-1.5 leading-normal">
              指导：{currentTemplate.description}
            </p>
          </div>

          {/* Form Fields Renderer */}
          <div id="prompt_fields_list" className="space-y-4 pt-3 border-t border-slate-800/60 font-sans">
            {currentTemplate.inputs.map((inp) => (
              <div key={inp.key} className="space-y-1.5">
                <label className="text-xs font-medium text-slate-350">{inp.label}</label>
                {inp.type === "textarea" ? (
                  <textarea
                    id={`input_field_${inp.key}`}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                    value={inputsState[inp.key] || ""}
                    placeholder={inp.placeholder}
                    onChange={(e) => handleInputChange(inp.key, e.target.value)}
                  />
                ) : inp.type === "select" ? (
                  <select
                    id={`input_field_${inp.key}`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-150 focus:outline-none focus:border-emerald-500"
                    value={inputsState[inp.key] || ""}
                    onChange={(e) => handleInputChange(inp.key, e.target.value)}
                  >
                    {inp.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`input_field_${inp.key}`}
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    value={inputsState[inp.key] || ""}
                    placeholder={inp.placeholder}
                    onChange={(e) => handleInputChange(inp.key, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* Actions for prompts compiles */}
            <div className="flex gap-3 pt-3">
              <button
                id="btn_compile_prompt"
                type="button"
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700/50"
                onClick={compilePromptLocally}
              >
                <Terminal className="w-3.5 h-3.5" />
                编译并预览核心指令
              </button>

              <button
                id="btn_ai_pilot_run"
                type="button"
                disabled={isCompiling}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs py-2.5 px-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={generateWithAIPilot}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isCompiling ? "智能生成中..." : "🚀 呼叫 AI 导师一键生成"}
              </button>
            </div>
          </div>
        </div>

        {/* Local compiled prompt area if available */}
        {compiledPromptPreview && (
          <div id="box_compiled_prompt" className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 relative">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                已编译的底层 Prompt 信息条 (直接投入任意大模型)
              </span>
              <button
                id="btn_copy_compiled"
                onClick={() => copyToClipboard(compiledPromptPreview, true)}
                className="text-slate-400 hover:text-slate-200 text-[10px] flex items-center gap-1"
                title="一键复制指令"
              >
                {isCopiedCompiled ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">已拷贝!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="font-mono">复制指令</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[10px] text-slate-350 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48 bg-slate-950/20 p-2 rounded">
              {compiledPromptPreview}
            </pre>
          </div>
        )}
      </div>

      {/* Right Column: AI Output result panel */}
      <div className="lg:col-span-6 flex flex-col min-h-[460px] bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden p-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />

        {/* Top bar */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4 z-10">
          <span className="text-xs font-bold text-slate-150 flex items-center gap-1.5 uppercase tracking-wide">
            <FileText className="w-4 h-4 text-emerald-400" />
            AI 导师落地指导输出面板 (.MD 格式)
          </span>

          {aiOutputResult && (
            <button
              id="btn_copy_output"
              onClick={() => copyToClipboard(aiOutputResult, false)}
              className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs py-1 px-2.5 rounded border border-slate-700/60 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              {isCopiedText ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">一键拷贝完成!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>复写产出文档</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Content body with responsive states */}
        <div className="flex-1 flex flex-col justify-center overflow-y-auto max-h-[640px] z-10">
          {isCompiling ? (
            <div id="ai_loading_view" className="space-y-4 text-center my-auto py-12">
              <div className="relative inline-block">
                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto stroke-[1.5]" />
                <Sparkles className="w-5 h-5 text-emerald-300 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-semibold text-slate-200">AI 创业导师正在深度分析中</h5>
                <p id="loading_phrase_text" className="text-xs text-emerald-400 font-mono h-4 min-w-[200px]">
                  {ROTATING_PHRASES[loadingPhraseIndex]}
                </p>
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed max-w-sm mx-auto">
                温馨自析：我们的全栈服务器正在为您连接 Google Gemini 3.5 极速思考端，自动依照手册规范编译最优输出。请稍等约 5 - 10 秒...
              </p>
            </div>
          ) : apiError ? (
            <div id="ai_error_panel" className="bg-red-950/20 border border-red-900/40 p-5 rounded-xl space-y-3 my-auto mx-auto max-w-md">
              <div className="flex gap-2 text-red-400 font-semibold text-xs items-center">
                <AlertCircle className="w-4 h-4" />
                调用 AI 构建引擎失败！原因如下：
              </div>
              <p className="text-xs text-slate-350 leading-relaxed font-mono">
                {apiError}
              </p>
              <div className="border-t border-red-900/30 pt-3 text-[10px] text-slate-400">
                <strong>💡 修复手段：</strong>
                检查项目是否没有挂载正确的 API KEY。该密匙应由 AI Studio 自动读取；如因环境变故缺失，请用电脑端打开 AI Studio 在 Settings &gt; Secrets 中配置变量。
              </div>
            </div>
          ) : aiOutputResult ? (
            <div id="ai_output_viewer" className="text-xs text-slate-250 font-sans leading-relaxed space-y-4 overflow-y-auto pr-1">
              {/* Parse headers/lists simply for visual elegance without complex library to ensure zero breakdown */}
              {aiOutputResult.split("\n").map((line, idx) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={idx} className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-1 mt-4">
                      {line.replace("# ", "")}
                    </h1>
                  );
                } else if (line.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-sm font-bold text-emerald-400 mt-3 flex items-center gap-1">
                      <span>✦</span>
                      <span>{line.replace("## ", "")}</span>
                    </h2>
                  );
                } else if (line.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xs font-bold text-slate-200 mt-2">
                      {line.replace("### ", "")}
                    </h3>
                  );
                } else if (line.startsWith("- ") || line.startsWith("* ")) {
                  return (
                    <div key={idx} className="flex gap-2 items-start pl-3 py-0.5 text-slate-300">
                      <span className="text-emerald-500 font-mono text-[10px] mt-0.5">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                } else if (/^\d+\.\s/.test(line)) {
                  // Ordered list
                  return (
                    <div key={idx} className="pl-3 py-0.5 text-slate-300">
                      <span className="text-emerald-400 font-semibold font-mono mr-1.5">{line.match(/^\d+/)![0]}.</span>
                      <span>{line.replace(/^\d+\.\s/, "")}</span>
                    </div>
                  );
                } else if (line.trim() === "") {
                  return <div key={idx} className="h-2" />;
                } else {
                  return <p key={idx} className="text-slate-300 pl-1">{line}</p>;
                }
              })}
            </div>
          ) : (
            <div id="ai_empty_view" className="text-center my-auto space-y-3 py-16">
              <FileText className="w-12 h-12 text-slate-600 stroke-[1] mx-auto opacity-75" />
              <div className="space-y-1.5">
                <h5 className="text-xs font-semibold text-slate-300">当前没有生成物</h5>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  请在左列调整参数并点击<strong>『呼叫 AI 导师一键生成』</strong>，或先点击<strong>『编译预览指令』</strong>导出为标准的外部对话格式。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
