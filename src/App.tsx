import React, { useState, useEffect } from "react";
import { STEP_CHRONOLOGY } from "./data";
import { EvaluatorsList } from "./components/EvaluatorsList";
import { CopilotSandbox } from "./components/CopilotSandbox";
import { ToolsExpenses } from "./components/ToolsExpenses";
import {
  BookOpen,
  TrendingUp,
  Sparkles,
  DollarSign,
  Award,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  CheckSquare,
  Square,
  Clock,
  ArrowRight,
  LifeBuoy,
  MessageCircle,
  Zap,
  CheckCircle,
  Briefcase
} from "lucide-react";

// Structure of checklists for Step Chronology
const INITIAL_TASKS: Record<number, { key: string; label: string }[]> = {
  1: [
    { key: "t1_1", label: "搜集小红书『求推荐/找了很久』等高抱吐槽话题并整理" },
    { key: "t1_2", label: "深入 App Store 免费榜 1-10 名，搜集 2-3 星差评反馈" },
    { key: "t1_3", label: "提炼用户抱怨用词，归入你的刚需痛点本" }
  ],
  2: [
    { key: "t2_1", label: "通过『痛点强烈度』黄金 5 问残酷测评，通不过指标立刻换题" },
    { key: "t2_2", label: "删除可能带来超重核心管理费、服务器维护的高耗功能" },
    { key: "t2_3", label: "限制本期核心 MVP 纯粹处于 3-5 个单页面功能闭环以内" }
  ],
  3: [
    { key: "t3_1", label: "确立产品一句话 Elevator Pitch，完成极轻 PRD 文档" },
    { key: "t3_2", label: "划定严格本期做（P0 核心）与 绝对不做（Out of Scope 蔓延）" },
    { key: "t3_3", label: "制定免费层限制规则及订阅/买断 Pro 版权益模型" }
  ],
  4: [
    { key: "t4_1", label: "在一张白纸或 Figma 极速手绘低保真界面与基本交互" },
    { key: "t4_2", label: "选择 Inter 或 Space Grotesk 护眼配色和高颜值字体" },
    { key: "t4_3", label: "撰写首屏大字报直击灵魂的核心痛点转化说辞文案" }
  ],
  5: [
    { key: "t5_1", label: "渐进式先写核心框架目录与一键路由" },
    { key: "t5_2", label: "配置本地 LocalStorage 接口作为无服务器存储单表 Schema" },
    { key: "t5_3", label: "优先编写主控按钮与解包渲染逻辑，暂缓编写第三方复杂登录" }
  ],
  7: [
    { key: "t7_1", label: "完成闭环后，作为最挑剔客户，独立不卡死运行测试并优化 10 遍" },
    { key: "t7_2", label: "将免登录第一版链接发给 10-30 个目标种子客户并静音默默观察" },
    { key: "t7_3", label: "通过 NPS 典型满意单算分，凡分数低于 7 分一律重调或简化细节" }
  ],
  8: [
    { key: "t8_1", label: "在小红书发表『历经千辛万苦、愤然自行研发神器』的用户抱怨逆袭笔记" },
    { key: "t8_2", label: "优化 ASO 应用商店 30字标题、副标题高权重引流词频" },
    { key: "t8_3", label: "整理 100 字符内用半角逗号隔开高点击检索词词包" }
  ],
  9: [
    { key: "t9_1", label: "安排在用户体验极顺畅、心软渴望时，自动弹出高颜值付费墙" },
    { key: "t9_2", label: "配置 Pro 定价梯度，突显年付或终生平衡比价的高性价比" },
    { key: "t9_3", label: "接入 RevenueCat，打通移动订阅退税及防刷收据验签" }
  ],
  10: [
    { key: "t10_1", label: "租用极速静态托管，部署备齐一个全公开、内容全的双语隐私 URL" },
    { key: "t10_2", label: "根据 App Store 4.2 重复雷同、2.1 数据欺诈规则逐条比对" },
    { key: "t10_3", label: "撰写语气真诚、指令详尽、内含免登录测试账号的一键提审英文 Review Notes" }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"workflow" | "evaluator" | "copilot" | "tools">("workflow");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState<string>("");

  // Initialize clock and checklist
  useEffect(() => {
    // Clock update
    const updateTime = () => {
      const now = new Date();
      // Format as YYYY-MM-DD HH:MM:SS UTC (or local)
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Load checked items
    try {
      const saved = localStorage.getItem("one_person_co_checklist");
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error state loading localStorage:", e);
    }

    return () => clearInterval(timer);
  }, []);

  // Checkbox toggle handler
  const toggleCheck = (key: string) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);
    try {
      localStorage.setItem("one_person_co_checklist", JSON.stringify(updated));
    } catch (e) {
      console.error("Error state saving in checklist:", e);
    }
  };

  // Calculate overall subtask completion percentage
  const totalSubtasks = Object.values(INITIAL_TASKS).flat().length;
  const completedCount = Object.keys(checkedItems).filter(
    (k) => checkedItems[k] === true
  ).length;
  const progressPercent = Math.round((completedCount / totalSubtasks) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* HEADER SECTION */}
      <header id="main_header" className="border-b border-slate-800 bg-[#0e1424] px-6 py-4 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30 tracking-wider">
                SOP Companion v2.0
              </span>
              <span className="text-xs text-slate-400 font-mono">
                一人公司 AI 开发实战导航站
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Zap className="w-5.5 h-5.5 text-emerald-400 animate-pulse fill-emerald-500/10" />
              一人公司 AI 创业与极速落地工作台
            </h1>
          </div>

          {/* Dynamic real-time info bar */}
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>实时时钟:</span>
            </div>
            <span className="text-emerald-300 font-semibold">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </header>

      {/* PERSISTENT OVERALL PROGRESS BAR FOR WORKFLOW */}
      <section id="global_progress_widget" className="bg-slate-950 border-b border-slate-800 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-950/60 rounded-lg border border-emerald-800/40 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                我的 MVP 落地总航线探索进度
              </span>
              <span className="text-[10px] text-slate-400">
                11步严控纪律子任务：已完成 {completedCount} / {totalSubtasks} 项关键动作
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-72">
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold font-mono text-emerald-400 w-10 text-right">
              {progressPercent}%
            </span>
          </div>
        </div>
      </section>

      {/* CORE WORKSPACE container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
        
        {/* TAB NAVIGATION PANEL */}
        <div id="tab_navigation" className="flex flex-wrap gap-2.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            id="tab_btn_workflow"
            className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "workflow"
                ? "bg-emerald-500 text-slate-950 shadow-[0_4px_12px_rgba(16,185,129,0.25)] font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab("workflow")}
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            📖 11步实战大纲 & 执行本
          </button>

          <button
            id="tab_btn_evaluator"
            className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "evaluator"
                ? "bg-emerald-500 text-slate-950 shadow-[0_4px_12px_rgba(16,185,129,0.25)] font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab("evaluator")}
          >
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            🧮 科学测算与痛点黄金包
          </button>

          <button
            id="tab_btn_copilot"
            className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "copilot"
                ? "bg-emerald-500 text-slate-950 shadow-[0_4px_12px_rgba(16,185,129,0.25)] font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab("copilot")}
          >
            <Sparkles className="w-4 h-4 flex-shrink-0 animate-bounce" />
            🤖 AI Copilot 黄金指令 Hub
          </button>

          <button
            id="tab_btn_tools"
            className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === "tools"
                ? "bg-emerald-500 text-slate-950 shadow-[0_4px_12px_rgba(16,185,129,0.25)] font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab("tools")}
          >
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            🛠️ 创业省钱算盘与工具表
          </button>
        </div>

        {/* TAB CONTENT 1: WORKFLOW VIEW */}
        {activeTab === "workflow" && (
          <div id="workflow_tab_view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Guide Introduction Header (Left column widget) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-[#0f1526] border border-slate-800/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase font-mono">
                  <Briefcase className="w-4 h-4" />
                  独立黑客指南
                </div>
                <h3 className="text-base font-bold text-white">
                  3大阶段，攻克一人开发变现生死关
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  《一人公司 AI 开发完整实战手册 v2.0》将完整的 0-1 阶段完美拆分为这 3 个阶段：
                </p>

                <div className="space-y-3.5 text-xs">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-emerald-400 font-sans">阶段一：极速验证期</strong>
                      <span className="text-[10px] text-slate-450 font-mono">第 1 - 7 天</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      死守 5 个精简功能，不写复杂鉴权。做出可运行的微量 H5 或 Web App 链接，立刻拉回至少 10 个首批试玩真实用户。
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-blue-400">阶段二：用户暴涨期</strong>
                      <span className="text-[10px] text-slate-450 font-mono">第 1 - 2 个月</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      优化商店 App Store ASO，撰写抓眼的小红书经历干货帖，积累获取 1000+ 活跃/付费用户，达到月利 1-5 万元基准。
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-purple-400">阶段三：良性规模期</strong>
                      <span className="text-[10px] text-slate-450 font-mono">第 3 - 6 个月</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      将月收入冲到 10 万+。如有重复机械发帖工作，安排外包，用自动化机制撬动更大营收。
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-center gap-2 text-[11px] text-emerald-300">
                  <Zap className="w-3.5 h-3.5 animate-bounce" />
                  秘诀：通不过五问过滤的构想立刻放弃！
                </div>
              </div>

              {/* Advice card */}
              <div className="bg-slate-900/60 border border-slate-800 p-4.5 rounded-xl text-xs space-y-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-450 font-bold block">
                  💡 Checklist 进度保存说明
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  在右侧 11 步实战节点展开卡片中，勾选当前已落地的步骤。您的进度比例将持久化存于本地，直至您手动将其完成。这为您的一人产品护航！
                </p>
              </div>
            </div>

            {/* Expansible List (Right column workflow timeline) */}
            <div id="workflow_accordion" className="lg:col-span-8 space-y-3.5">
              <h4 className="text-sm font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>11 步实战白皮书行动工作流大图景（可折叠查看细节）</span>
                <span className="text-xs text-slate-450 font-mono font-normal">点击折叠栏可拉开</span>
              </h4>

              {STEP_CHRONOLOGY.map((step) => {
                const isOpen = expandedStep === step.id;
                const tasks = INITIAL_TASKS[step.id] || [];
                const stepCompletedCount = tasks.filter((t) => checkedItems[t.key] === true).length;
                const isAllTasksChecked = tasks.length > 0 && stepCompletedCount === tasks.length;

                return (
                  <div
                    key={step.id}
                    id={`workflow_step_card_${step.id}`}
                    className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                      isAllTasksChecked
                        ? "bg-emerald-950/5 border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.02)]"
                        : isOpen
                        ? "bg-[#111728] border-slate-700 shadow-md"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-705"
                    }`}
                  >
                    {/* ACCORDION HEADER */}
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer select-none"
                      onClick={() => setExpandedStep(isOpen ? null : step.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-semibold ${
                          isAllTasksChecked
                            ? "bg-emerald-500 text-slate-950"
                            : isOpen
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-slate-800 text-slate-300"
                        }`}>
                          {isAllTasksChecked ? "✓" : step.id}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white tracking-tight">
                              {step.title}
                            </span>
                            <span className="text-[10px] text-slate-450 font-mono">
                              ({step.subTitle})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                            <span className="font-semibold text-emerald-400 font-mono">{step.duration}</span>
                            <span className="text-slate-500">|</span>
                            <span>完成进度: {stepCompletedCount}/{tasks.length || 3}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAllTasksChecked && (
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                            已打通此步
                          </span>
                        )}
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* ACCORDION CONTENT */}
                    {isOpen && (
                      <div className="px-4 pb-5 pt-1.5 border-t border-slate-800/80 bg-slate-950/60 block transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                          {/* Objectives and guidelines */}
                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] text-slate-450 font-semibold tracking-wide uppercase font-mono block mb-1">
                                本阶段核心里程碑目标：
                              </span>
                              <ul className="text-xs text-slate-350 space-y-1 pl-1">
                                {step.objectives.map((obj, i) => (
                                  <li key={i} className="flex gap-1.5 items-start">
                                    <span className="text-emerald-500">•</span>
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-450 font-semibold tracking-wide uppercase font-mono block mb-0.5">
                                第一阶段指标 (SOP KPI)：
                              </span>
                              <div className="text-xs text-emerald-300 font-medium pl-1 leading-normal">
                                {step.metrics}
                              </div>
                            </div>
                          </div>

                          {/* Detail note / advice */}
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 leading-none uppercase">
                                <Info className="w-3.5 h-3.5 text-blue-400" />
                                31页实操蓝图要义速读
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {step.description}
                              </p>
                            </div>

                            {step.sopText && (
                              <div className="bg-slate-950/60 p-2 rounded text-[10px] text-slate-450 mt-3 border border-slate-800/40 font-mono">
                                <strong className="text-emerald-400">避坑指引: </strong>
                                {step.sopText}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* INTERACTIVE COMPANION CHECKLIST */}
                        {tasks.length > 0 && (
                          <div className="border border-slate-800 bg-slate-900 p-3.5 rounded-xl space-y-3 pt-3">
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                              执行手册任务清单 (勾选完成来推进主流程)：
                            </span>

                            <div className="space-y-2">
                              {tasks.map((task) => {
                                const isChecked = checkedItems[task.key] === true;
                                return (
                                  <div
                                    key={task.key}
                                    id={`task_line_${task.key}`}
                                    onClick={() => toggleCheck(task.key)}
                                    className={`py-2 px-3 rounded-lg flex items-center gap-3 cursor-pointer select-none transition-all duration-200 border ${
                                      isChecked
                                        ? "bg-emerald-950/10 border-emerald-900/40 text-emerald-300/90"
                                        : "bg-slate-950 border-slate-850 text-slate-350 hover:bg-slate-900/90 hover:border-slate-700"
                                    }`}
                                  >
                                    <div className="flex-shrink-0">
                                      {isChecked ? (
                                        <CheckCircle className="w-4.5 h-4.5 text-emerald-400 fill-emerald-500/10" />
                                      ) : (
                                        <div className="w-4.5 h-4.5 rounded-full border border-slate-600 bg-slate-950" />
                                      )}
                                    </div>
                                    <span className="text-xs leading-relaxed font-sans">{task.label}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: CALCULATORS & ASSESS */}
        {activeTab === "evaluator" && (
          <div id="evaluator_tab_view" className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                一人公司科学创业计算器组合
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                遵循手册第二章（第6页需求打磨）和第三章（第17页商业设计）的精髓，对您的点子进行定性和定量的测算，科学评估冷启动所需流量与词包字数合规。
              </p>
            </div>
            
            {/* Render subcomponents */}
            <EvaluatorsList />
          </div>
        )}

        {/* TAB CONTENT 3: AI COPILOT HUB */}
        {activeTab === "copilot" && (
          <div id="copilot_tab_view" className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1 max-w-2xl">
                <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                  基于真实手册 11 个 Prompt 蓝图编译沙盒
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  本模块由服务器端的 <strong className="text-emerald-400">Gemini 3.5 AI 开发导师</strong> 提供底层引擎支持。您可以直接在左边输入框定制您自己的微型应用参数，一键在线生成完整的蓝图、PRD与上架政策！也可直接复制到外部大模型对话中使用。
                </p>
              </div>
              <div className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-emerald-500/10" />
                已安全开启 Server Gemini API 端
              </div>
            </div>

            {/* Render modular Sandbox */}
            <CopilotSandbox />
          </div>
        )}

        {/* TAB CONTENT 4: TOOLS & EXPENSES BUDGETEER */}
        {activeTab === "tools" && (
          <div id="tools_tab_view" className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                一人独立黑客最薄账单支出审计器
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                分析独立开发在小红书、微信小程序、ASO 及 Apple Developer 后台一整年的软性硬性支出，并手把手提供零成本运行的自研最省套路，避开高昂的服务器运维与百万计费灾难。
              </p>
            </div>

            {/* Render Tools component */}
            <ToolsExpenses />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer id="main_footer" className="border-t border-slate-800 bg-[#0e1424] px-6 py-5 text-center text-xs text-slate-450 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <LifeBuoy className="w-4 h-4 text-emerald-400" />
            <span>一人公司 AI 开发实战指南 ● 独立黑客梦想发生平台</span>
          </div>
          <div className="text-slate-400">
            Powered by <strong className="text-emerald-400">Google Gemini 3.5 & AI Studio Server API</strong>
          </div>
          <div className="text-slate-500">
            所有数据完全本地离线持久化机制保护。倡导一人极速研发高变现实践。
          </div>
        </div>
      </footer>
    </div>
  );
}
