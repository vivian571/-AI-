import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Info, Sparkles, TrendingUp, Cpu, Award } from "lucide-react";

export function EvaluatorsList() {
  const [activeSubTab, setActiveSubTab] = useState<"five_questions" | "traffic_model" | "aso_audit">("five_questions");

  // --- FIVE QUESTIONS STATE ---
  const [q1, setQ1] = useState<number>(4);
  const [q2, setQ2] = useState<number>(4);
  const [q3, setQ3] = useState<number>(3);
  const [q4, setQ4] = useState<number>(4);
  const [q5, setQ5] = useState<number>(3);
  const [ideaText, setIdeaText] = useState<string>("古风壁纸和色彩纹样一键生成色卡APP");

  const totalScore = Math.round(((q1 + q2 + q3 + q4 + q5) / 25) * 100);

  const getVerdict = () => {
    if (totalScore >= 85) {
      return {
        badge: "🏆 黄金可行性",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
        desc: "非常出色的微型产品雏形！痛点定位准确，AI实现壁垒极低。你可以极其简单地在 5 天内做出第一版并进入小红书内测阶段，强烈推荐立刻启动发布！",
        tips: "冷启动死守：前 100 个核心用户一定要在小红书、精准微信群里通过‘分享无版权中式纹样底色包’等高感知赠品拉入群，不可投入付费广告。"
      };
    } else if (totalScore >= 70) {
      return {
        badge: "🟢 良好通行",
        color: "text-blue-400 bg-blue-950/40 border-blue-800",
        desc: "绝大多数卡点都已具备闭环逻辑，基本面极佳。可以放心进入 PRD 阶段，开始细化 MVP 的首发 P0 功能列表。",
        tips: "优化建议：建议把不符合 5 星的弱项（比如冷启动获取或MVP功能太多）进一步削减，能砍掉多余功能就狠狠砍掉，确保单点击穿。"
      };
    } else if (totalScore >= 50) {
      return {
        badge: "⚠️ 存在过硬偏见（防范功能延展）",
        color: "text-amber-400 bg-amber-950/40 border-amber-800",
        desc: "你的项目设想现在有严重‘过载’或‘冷启动路径完全无感’的隐犯风险！非程序员一人开发非常容易在此卡死两三个月无法上线，最终丧失信心主动放弃。",
        tips: "修正手段：① 狠狠砍掉你的所有附带页面、不必须的数据库登录等，只留一个让用户看到能解决痛点操作的按钮；② 实地去微博贴吧搜你这个痛点，有少于10人高频讨论的话，建议马上降维重来。"
      };
    } else {
      return {
        badge: "🍎 建议 Pivoting（立刻变轨换题）",
        color: "text-red-400 bg-red-950/40 border-red-800",
        desc: "这个需求很大可能是你拍脑袋想出来的‘伪高频刚需’，或者 AI 无代码实现的方案过于复杂（如需要昂贵的服务器算力或重度依赖原生硬件底板）。",
        tips: "避坑指南：时间是极客最保贵和最有限的资源！不要在错误、冷门或零变现欲望的航线上死磕超过 2 天。请遵照手册的推荐指南在小红书或微博上物色新话题，重组一题测评！"
      };
    }
  };

  const verdict = getVerdict();

  // --- TRAFFIC MODEL STATE ---
  const [targetMonthlyIncome, setTargetMonthlyIncome] = useState<number>(15000);
  const [arpu, setArpu] = useState<number>(39);
  const [conversionRate, setConversionRate] = useState<number>(1.5); // %
  const [frequencyUnit, setFrequencyUnit] = useState<"monthly" | "once">("once");

  const requiredPayingCount = Math.ceil(targetMonthlyIncome / arpu);
  const requiredTrafficFactor = 100 / conversionRate;
  const requiredMonthlyTraffic = Math.ceil(requiredPayingCount * requiredTrafficFactor);
  const requiredDailyTraffic = Math.ceil(requiredMonthlyTraffic / 30);

  // --- ASO AUDIT STATE ---
  const [asoName, setAsoName] = useState<string>("华彩中式配色坊 - 传统典籍纯正国风配色与色卡");
  const [asoSubtitle, setAsoSubtitle] = useState<string>("手作娘、非遗设计师必备的古画色彩预览神具");
  const [asoKeywords, setAsoKeywords] = useState<string>("配色,中式,传统色,色卡,古风,插画,Procreate,古籍,传统配色,非遗配饰,古色彩值,配色大师");
  const [asoDesc, setAsoDesc] = useState<string>("这是一款专为国风非遗匠人、插画家、汉服服装设计师以及古风手作娘量身定制的中国古典传统风提取配色神器。来自考究唐宋元明宫廷彩典色彩！\n\n一键保存提取 RGB 色彩，多模型 3D 纸扇、油纸伞互动实时变色预览，一键导出iPad Procreate色卡包。解决你苦苦翻阅古籍盲配色彩、又根本无法预览成图的困扰！");

  const checkAso = () => {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check Name Length (Limit 30 char for standard store keywords boost)
    if (asoName.length > 30) {
      score -= 20;
      warnings.push(`App 名称字数过长 (${asoName.length} / 30字)。商店一般限制在30字内。超出的标题会被截断显示，甚至导致被拒（雷同/关键词堆砌）。`);
      suggestions.push("缩短应用名称，保留 1 个最刚性、权重最高的中文关键词（如：华彩中式色卡）。");
    } else if (asoName.length < 10) {
      warnings.push(`App 名称字数较短 (${asoName.length} 字)。`);
      suggestions.push("可以适当附加核心后缀，写入高流量、跟痛点息息相关的关键词进行提权（如：名称 +  - 中国传统色色盒）。");
    }

    // Check Subtitle (Limit 30 chars)
    if (asoSubtitle.length > 30) {
      score -= 15;
      warnings.push(`商店副标题字数过长 (${asoSubtitle.length} / 30字)。`);
      suggestions.push("副标题控制在 30 字符以内，以精炼展示产品主要特色文案，放次要引流量搜索词。");
    }

    // Check Keywords (Limit 100 chars formatted with comma)
    if (asoKeywords.length > 100) {
      score -= 20;
      warnings.push(`关键词标签字符长 (${asoKeywords.length} / 100字符)。商店会完全过滤掉超标的部分，造成流量浪费！`);
      suggestions.push("缩减冷门低搜词。去除任何空格，仅用半角英文逗号分隔单词（如：配色,古风,Procreate）。");
    }

    // Check duplicate words in Keywords
    const list = asoKeywords.split(/[,，]/).map(w => w.trim()).filter(Boolean);
    const duplicates = list.filter((item, index) => list.indexOf(item) !== index);
    if (duplicates.length > 0) {
      score -= duplicates.length * 5;
      warnings.push(`检测到重复的关键词：【${Array.from(new Set(duplicates)).join("，")}】。`);
      suggestions.push("在关键词里相同的字词已经合并提权，重复填写无法额外加重权重。删掉他们并用全新的痛点关键词填充。");
    }

    // Check first 3 lines of description
    const paragraphs = asoDesc.split("\n").filter(Boolean);
    const firstLine = paragraphs[0] || "";
    if (firstLine.length > 150) {
      score -= 10;
      warnings.push("详情描述前 3 行首段字数偏多，在商店默认会被展示为‘展开更多选项’按钮之前的区域，过长会导致无法核心突出价值。");
    }
    if (!firstLine.includes("神器") && !firstLine.includes("解决") && !firstLine.includes("困扰")) {
      suggestions.push("描述前三句建议直接开门见山写：‘这是一个专为 [谁] 解决 [什么痛点] 的 [什么解药]’。增加用户前 3 秒代入感，促进下载转化率！");
    }

    return {
      score: Math.max(10, score),
      warnings,
      suggestions: suggestions.length > 0 ? suggestions : ["完美通过元数据标准！您可以直接复制此元数据包到 App Store Connect 后台提审。"]
    };
  };

  const asoResult = checkAso();

  return (
    <div id="evaluators_container" className="space-y-6">
      {/* Mini tabs */}
      <div className="flex border-b border-slate-800">
        <button
          id="btn_subtab_five_questions"
          className={`py-3 px-5 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
            activeSubTab === "five_questions"
              ? "text-emerald-400 border-emerald-400 bg-emerald-950/20"
              : "text-slate-400 border-transparent hover:text-slate-200"
          }`}
          onClick={() => setActiveSubTab("five_questions")}
        >
          <Award className="w-4 h-4" />
          黄金 5 问可行性测评
        </button>
        <button
          id="btn_subtab_traffic"
          className={`py-3 px-5 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
            activeSubTab === "traffic_model"
              ? "text-emerald-400 border-emerald-400 bg-emerald-950/20"
              : "text-slate-400 border-transparent hover:text-slate-200"
          }`}
          onClick={() => setActiveSubTab("traffic_model")}
        >
          <TrendingUp className="w-4 h-4" />
          变现漏斗与目标推演
        </button>
        <button
          id="btn_subtab_aso"
          className={`py-3 px-5 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${
            activeSubTab === "aso_audit"
              ? "text-emerald-400 border-emerald-400 bg-emerald-950/20"
              : "text-slate-400 border-transparent hover:text-slate-200"
          }`}
          onClick={() => setActiveSubTab("aso_audit")}
        >
          <Cpu className="w-4 h-4" />
          元数据 ASO 硬核检测
        </button>
      </div>

      {/* TAB 1: FIVE QUESTIONS */}
      {activeSubTab === "five_questions" && (
        <div id="five_questions_panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
            <div>
              <h4 className="text-base font-medium text-slate-150 mb-1">
                第一步：输入项目的核心痛点切入点
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                一句话说明你想为你的细分客户群解除了什么高压痛点。
              </p>
              <input
                id="input_eval_idea"
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-sans"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="例如：专为留学生代配传统药膳养生粥和定制食材袋APP"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-medium text-slate-150 border-t border-slate-800 pt-4">
                第二步：按照 5 点黄金硬核指标严酷打分
              </h4>

              {/* Slider 1 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-350">① 客户痛点刚性：强烈或具有直接买单欲望？</span>
                  <span className="text-emerald-400 font-mono font-medium">{q1} / 5 分</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  value={q1}
                  onChange={(e) => setQ1(parseInt(e.target.value))}
                />
                <p className="text-[11px] text-slate-400">
                  {q1 >= 4 ? "极好：用户主动发帖寻求推荐，表示「做出来绝对立马交钱购买」" : "一般：大多是可有可无、多一步少一步都行的小体验舒适感优化"}
                </p>
              </div>

              {/* Slider 2 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-350">② AI与现代底层的高效技术快速实现度？</span>
                  <span className="text-emerald-400 font-mono font-medium">{q2} / 5 分</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  value={q2}
                  onChange={(e) => setQ2(parseInt(e.target.value))}
                />
                <p className="text-[11px] text-slate-400">
                  {q2 >= 4 ? "极好：单点逻辑，无长链路重度耗时服务器维护，AI写出即可运行" : "较低：架构较硬，需要重度硬件级通信调试、超大第三方收费API接口支撑"}
                </p>
              </div>

              {/* Slider 3 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-350">③ 现有竞品是否有极大明显断板或广告雷区？</span>
                  <span className="text-emerald-400 font-mono font-medium">{q3} / 5 分</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  value={q3}
                  onChange={(e) => setQ3(parseInt(e.target.value))}
                />
                <p className="text-[11px] text-slate-400">
                  {q3 >= 4 ? "高：竞品广告极多，要么全是昂贵买断，操作繁复，吐槽量极大" : "低：竞品体验已经炉火纯青，且大厂提供了全免费且精美的原生功能支持"}
                </p>
              </div>

              {/* Slider 4 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-350">④ MVP 级的极限核心功能是否卡死在 5 个以内？</span>
                  <span className="text-emerald-400 font-mono font-medium">{q4} / 5 分</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  value={q4}
                  onChange={(e) => setQ4(parseInt(e.target.value))}
                />
                <p className="text-[11px] text-slate-400">
                  {q4 >= 4 ? "极佳：只有一个核心操作（如输入配方→一键出图，无过多冗余支线）" : "危险：打算写支付、社交群聊、定位推荐、发帖互动全家桶，功能范围严重失控"}
                </p>
              </div>

              {/* Slider 5 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-350">⑤ 冷启动前 100 人的获取归置策略是否异常清晰？</span>
                  <span className="text-emerald-400 font-mono font-medium">{q5} / 5 分</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  value={q5}
                  onChange={(e) => setQ5(parseInt(e.target.value))}
                />
                <p className="text-[11px] text-slate-400">
                  {q5 >= 4 ? "明确：知道在哪个小组/哪个红书大V贴、知乎回答下通过优质干货发帖引流" : "空白：毫无概念，打算上线后随便靠熟人发圈，希望用户自然从天而降"}
                </p>
              </div>
            </div>
          </div>

          {/* Results Side card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />

            <div className="space-y-4">
              <span className="text-xs text-slate-400 tracking-wider uppercase font-mono">MVP 可行性评估综述</span>
              <div>
                <span className="text-4xl font-extrabold font-mono text-emerald-400">{totalScore}</span>
                <span className="text-slate-400 text-sm font-sans"> / 100 综合分</span>
              </div>

              <div className={`border rounded-lg p-3 text-xs ${verdict.color}`}>
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {verdict.badge}
                </div>
                <div className="leading-relaxed opacity-95">{verdict.desc}</div>
              </div>

              <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-400" />
                  当前评估：{ideaText || "未命名产品"}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-150">💡 实地秘诀：</strong>
                  {verdict.tips}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              一人公司纪律：单功能做到极致，不做出平庸大众应用
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAFFIC & ARPU MODEL */}
      {activeSubTab === "traffic_model" && (
        <div id="traffic_panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-200">输入变现期望，倒推流量漏斗需求</h4>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-350">每月实现期望净利润 (元)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono font-medium"
                    value={targetMonthlyIncome}
                    onChange={(e) => setTargetMonthlyIncome(Math.max(1, parseInt(e.target.value) || 0))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-350">客单价 / 年费定价 (元)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono font-medium"
                    value={arpu}
                    onChange={(e) => setArpu(Math.max(1, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-350">期望用户付费墙转化率 (%)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0.2"
                      max="10.0"
                      step="0.1"
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                    />
                    <span className="text-xs font-mono font-semibold text-emerald-400/90 w-12 text-right">
                      {conversionRate}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    行业基准：普通付费应用通常为 0.5% ~ 3.0%；痛点越极致，此比例越高。
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-350">变现收费周期模型</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-150 focus:outline-none focus:border-emerald-500 font-sans"
                    value={frequencyUnit}
                    onChange={(e: any) => setFrequencyUnit(e.target.value)}
                  >
                    <option value="once">单次/一次性终身买断 (简单易转化)</option>
                    <option value="monthly">按月/按年持续订阅 (复利收益高，需粘性)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-5 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-200 block mb-1">📖 变现设计指导原则（摘自手册第17页）：</span>
              不要把免费版写成垃圾残废版，应该满足核心解疼，但在额度（如每天生成限制）或高清大图无水印保存环节触发付费。
              <span className="text-emerald-400 font-medium block mt-1">心理定价：年付套餐金额可折算为月付×7-8倍，突出高感知价值。</span>
            </div>
          </div>

          {/* Results traffic card */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs text-slate-400 tracking-wider uppercase font-mono">漏斗逆算成果数据</span>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-800 bg-slate-950 p-3 rounded-xl">
                  <div className="text-[11px] text-slate-400 mb-0.5">每月所需付费客户</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">{requiredPayingCount} 位</div>
                </div>
                <div className="border border-slate-800 bg-slate-950 p-3 rounded-xl">
                  <div className="text-[11px] text-slate-400 mb-0.5">月访客/点击漏斗流量</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">{requiredMonthlyTraffic} PV</div>
                </div>
              </div>

              <div className="border border-slate-800 bg-slate-950/40 p-4 rounded-xl space-y-3">
                <h5 className="text-xs font-bold text-slate-150 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  一人公司 3 个变现关键战役阶段解构
                </h5>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>阶段一：MVP极速验证期 (目标10个付费)</span>
                      <span className="font-mono text-slate-200">10 / 10 位 (100%跑通)</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>阶段二：增长期 (打通1000位累积)</span>
                      <span className="font-mono text-slate-200">需要 {Math.min(requiredPayingCount, 1000)} / 1000 位</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (requiredPayingCount / 1000) * 100)}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>阶段三：规模扩展期 ($10k+ / 月收入)</span>
                      <span className="font-mono text-slate-200">月入目标：{targetMonthlyIncome}元</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${Math.min(100, (targetMonthlyIncome / 100000) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-400">
              <span className="text-amber-400 font-semibold">🚩 每日冷启动基本口粮目标：</span>
              您的爆款推广贴或ASO需要每天为你稳定引流大字报约 <strong className="text-emerald-400 font-mono text-xs">{requiredDailyTraffic}</strong> 名目标精准不含水分日访客（UV）即可绝对达成此月入目标！
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASO AUDIT */}
      {activeSubTab === "aso_audit" && (
        <div id="aso_panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              输入你准备好的应用商店元数据，进行字数合规和查重机制检测：
            </h4>

            {/* Title */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-350">推荐的 App 展现名称 (最多30字)</span>
                <span className={`font-mono ${asoName.length > 30 ? "text-red-400 font-semibold" : "text-emerald-400"}`}>
                  {asoName.length} / 30 字
                </span>
              </div>
              <input
                id="input_aso_name"
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                value={asoName}
                onChange={(e) => setAsoName(e.target.value)}
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-350">推荐副标题 (重点写痛点加成词，最多30字)</span>
                <span className={`font-mono ${asoSubtitle.length > 30 ? "text-red-400 font-semibold" : "text-emerald-400"}`}>
                  {asoSubtitle.length} / 30 字
                </span>
              </div>
              <input
                id="input_aso_subtitle"
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                value={asoSubtitle}
                onChange={(e) => setAsoSubtitle(e.target.value)}
              />
            </div>

            {/* Keywords */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-350">关键词核心长链标签 (用英文半角逗号隔开，最多100字符)</span>
                <span className={`font-mono ${asoKeywords.length > 100 ? "text-red-400 font-semibold" : "text-emerald-400"}`}>
                  {asoKeywords.length} / 100 字符
                </span>
              </div>
              <textarea
                id="text_aso_keywords"
                className="w-full h-16 bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                value={asoKeywords}
                onChange={(e) => setAsoKeywords(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-350">应用商店展示第一自然段 (主导爽点与痛解，前3行黄金转化)</span>
                <span className="text-slate-400 text-xs">最多 4000 字</span>
              </div>
              <textarea
                id="text_aso_desc"
                className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                value={asoDesc}
                onChange={(e) => setAsoDesc(e.target.value)}
              />
            </div>
          </div>

          {/* audit report */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">实时 ASO 权重评分</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${asoResult.score >= 80 ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"}`}>
                  评估指数: {asoResult.score}%
                </span>
              </div>

              {/* Warnings List */}
              {asoResult.warnings.length > 0 ? (
                <div className="border border-red-950/40 bg-red-950/20 p-3 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    需修正的商店条规越界 ({asoResult.warnings.length} 处)：
                  </div>
                  <ul className="text-[11px] text-slate-350 space-y-1.5 list-disc pl-4 leading-relaxed">
                    {asoResult.warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="border border-emerald-950/40 bg-emerald-950/20 p-3 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  毫无字数雷同警告，大词权重极其饱满，完全合规！
                </div>
              )}

              {/* Suggestions List */}
              <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-150 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  独立开发者搜索优化建议：
                </div>
                <div className="text-[11px] text-slate-450 leading-relaxed space-y-2 pl-1">
                  {asoResult.suggestions.map((s, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start">
                      <span className="text-emerald-400">⚡</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-400 text-center">
              由于苹果机制极其排斥大词，ASO 对冷启动可以免费拉开数千新增下载权重流！
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
