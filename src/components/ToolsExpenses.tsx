import React, { useState } from "react";
import { Check, Info, Shield, HelpCircle, DollarSign, Calculator } from "lucide-react";

interface ToolItem {
  name: string;
  category: string;
  purpose: string;
  freeLimit: string;
  costEstimate: string;
  savingTip: string;
  defaultCostAmount: number; // monthly (or annual divided)
  period: "monthly" | "annual" | "once";
}

const TOOLS_DATABASE: ToolItem[] = [
  {
    name: "Apple Developer Account",
    category: "发布平台",
    purpose: "发布至 iOS / macOS App Store 必备",
    freeLimit: "无免费版，免注册只能本地测试运行",
    costEstimate: "$99/年 (约 710 元)",
    savingTip: "开发测试完毕且内测通过率良好、用户有强烈预定付费时再支付，不要在想法阶段买它。",
    defaultCostAmount: 99,
    period: "annual"
  },
  {
    name: "Google Play Console",
    category: "发布平台",
    purpose: "发布安卓应用至谷歌商店",
    freeLimit: "无免费版，但为一次性终身费用",
    costEstimate: "$25 一次性 (约 180 元)",
    savingTip: "一次性交齐，终身免费提审，对出海安卓极高性价比。",
    defaultCostAmount: 25,
    period: "once"
  },
  {
    name: "微信小程序账号 (企业版)",
    category: "发布平台",
    purpose: "微信小程序申请各种高阶能力、高级支付API",
    freeLimit: "个人免费版，功能受限、无法开通商户支付",
    costEstimate: "300 元/年",
    savingTip: "国内微信生态若有巨大支付需求首选，个人账号可以通过跳转外部H5付款进行低成本自研规避。",
    defaultCostAmount: 25, // 300 / 12
    period: "monthly"
  },
  {
    name: "Cursor AI 编辑器",
    category: "辅助开发",
    purpose: "智能AI辅助极速代码生成器",
    freeLimit: "自带 50 次智能首轮补齐；超额可自配API key",
    costEstimate: "$20/月 (约 140 元)",
    savingTip: "免费基础版额度绝对足够一人公司度过最初 2 周。可以用 Gemini API 配合免去此笔开销。",
    defaultCostAmount: 20,
    period: "monthly"
  },
  {
    name: "RevenueCat SDK",
    category: "支付与订阅",
    purpose: "处理复杂的苹果内购(IAP)/谷歌订阅/退税及收据验签",
    freeLimit: "免费直到月度营收达到 $2500 内完全免费",
    costEstimate: "完全免佣 (累积营收超2500刀后收0.8%)",
    savingTip: "一人公司的生命之神！不要花费两周自己写支付防刷验签逻辑，直接用 RevenueCat，10分钟接入安全稳固。",
    defaultCostAmount: 0,
    period: "monthly"
  },
  {
    name: "Supabase / Firebase 数据库",
    category: "后端云存储",
    purpose: "同步用户配置、管理账户、同步收藏夹",
    freeLimit: "额度极其慷慨 (5GB存储、无限认证，一般能撑到5000人以上)",
    costEstimate: "超额后 $25/月 起",
    savingTip: "第一版直接采用无后端纯 LocalStorage 或单集合无关联读写，能最大化将云数据库请求开销降至精确的 0 元！",
    defaultCostAmount: 0,
    period: "monthly"
  },
  {
    name: "Figma & Uizard 原型设计",
    category: "原型/设计",
    purpose: "UI设计稿件、切图与快速AI画板",
    freeLimit: "Figma 支持免费创建 3 个大型独立白板文件",
    costEstimate: "个人免费版足够 (专业版 $12/月)",
    savingTip: "一人公司不需要跟设计开会配合，所以绝对不用购买团队协作专业版！",
    defaultCostAmount: 0,
    period: "monthly"
  },
  {
    name: "Midjourney / DALL-E 3",
    category: "图形设计",
    purpose: "生成引人注目的精致 App Logo 启动栏素材",
    freeLimit: "无，必须开通月付",
    costEstimate: "$10/月 (约 70 元) 起",
    savingTip: "只开通一个月完成所有 App UI 配色及 icon 原材下载后，立刻从后台点击退订，不要产生年付订阅被扣。",
    defaultCostAmount: 10,
    period: "monthly"
  }
];

export function ToolsExpenses() {
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "Apple Developer Account",
    "RevenueCat SDK"
  ]);

  const toggleTool = (name: string) => {
    if (selectedTools.includes(name)) {
      setSelectedTools(selectedTools.filter((t) => t !== name));
    } else {
      setSelectedTools([...selectedTools, name]);
    }
  };

  // Convert all to annualized CNY
  const getAnnualizedCNY = () => {
    let totalCNY = 0;
    TOOLS_DATABASE.forEach((tool) => {
      if (selectedTools.includes(tool.name)) {
        if (tool.period === "annual") {
          totalCNY += tool.defaultCostAmount * 7.15;
        } else if (tool.period === "monthly") {
          totalCNY += tool.defaultCostAmount * 7.15 * 12;
        } else if (tool.period === "once") {
          totalCNY += tool.defaultCostAmount * 7.15; // once counted in first year
        }
      }
    });
    return Math.round(totalCNY);
  };

  const annualExpense = getAnnualizedCNY();

  return (
    <div id="tools_expenses_container" className="space-y-6">
      {/* Overview stats header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-medium">一人公司第一年预计硬支出总运营费</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">¥{annualExpense}</span>
            <span className="text-xs text-slate-400">人民币 / 首年</span>
          </div>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
          <span className="text-xs text-slate-400 font-medium">已激活高保真付费工具箱数</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-150">
              {selectedTools.length}
            </span>
            <span className="text-xs text-slate-450">/ {TOOLS_DATABASE.length} 常用推荐</span>
          </div>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center">
          <div className="text-xs text-amber-500 font-semibold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            省钱黄金守则：不要为没有发生的需求提前买单
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Tool Selector */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200">勾选你计划引入的支撑工具：</h4>
            <span className="text-[10px] text-slate-400 font-mono">点击复选框即时重算年度总账单</span>
          </div>

          <div id="tools_selector_grid" className="space-y-3">
            {TOOLS_DATABASE.map((tool) => {
              const isActive = selectedTools.includes(tool.name);
              return (
                <div
                  key={tool.name}
                  id={`tool_item_${tool.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isActive
                      ? "bg-slate-950/40 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.03)]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                  onClick={() => toggleTool(tool.name)}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isActive ? "bg-emerald-500 border-emerald-500" : "border-slate-600 bg-slate-950"
                  }`}>
                    {isActive && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-semibold text-slate-150">{tool.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-sans">
                          {tool.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {tool.costEstimate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{tool.purpose}</p>

                    <div className="flex gap-2 text-[10px] leading-relaxed select-none">
                      <span className="text-emerald-500 font-medium">免费上限:</span>
                      <span className="text-slate-450">{tool.freeLimit}</span>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/40 text-[10px] text-slate-400 mt-2">
                      <strong className="text-teal-400">💡 省钱策略：</strong>
                      {tool.savingTip}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Financial & Operations Advice */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono tracking-wider border-b border-slate-800 pb-2">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              一人公司极速缩减硬皮支出指南
            </h4>

            <div className="space-y-3 text-xs leading-relaxed text-slate-350">
              <div className="space-y-1">
                <span className="font-semibold text-slate-200">💎 1. 终极无后端运行模式 (降维砍账)</span>
                <p className="text-slate-400 text-[11px]">
                  微型首发产品可以完全不用云端数据库！一切用户私藏、日常配比数据全部存于浏览器的 <strong className="font-mono text-emerald-400">localStorage</strong> 中。这省去了写API同步认证的繁琐时间、彻底防止了由于恶意注册造成的云端读写上千元扣费。
                </p>
              </div>

              <div className="space-y-1 border-t border-slate-800/60 pt-2.5">
                <span className="font-semibold text-slate-200">💎 2. 巧用内购不分成额度</span>
                <p className="text-slate-400 text-[11px]">
                  直接在开发中集成 RevenueCat。每月 2500 美元（折合近两万元）的提成抽免足够你一个人活得很好并验证出真实忠实铁粉。不需要提前两万自研付款。
                </p>
              </div>

              <div className="space-y-1 border-t border-slate-800/60 pt-2.5">
                <span className="font-semibold text-slate-200">💎 3. 自研 AI 代替 Cursor 额度</span>
                <p className="text-slate-400 text-[11px]">
                  由于本系统绑定了极其强悍、零公区费用的 **Gemini 3.5 Flash** 智能服务端！您可以直接在下一个选项卡中键入任意想法，一键获取最完善的 PRD、ASO 词包和配套代码模块框架，而不用着急开通 Cursor 付费服务。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              变现漏斗说明 (Page 17)
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              手册第17页特指：付费转化率核心原则是在用户‘爽到’（即刚刚解决痛苦最爽的瞬间）触发。如果是工具，免费版一定保留主干通道、但在批量导出或备份高级预告时提供弹窗墙。
            </p>
            <div className="border border-blue-950 bg-blue-950/20 px-3 py-2 rounded-lg text-[10px] text-blue-400">
              提示：设计了买断机制也务必保留年订阅。年订阅能产生绝佳持续性现金流储备。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
