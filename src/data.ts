import { StepInfo, PromptTemplate } from "./types";

export const STEP_CHRONOLOGY: StepInfo[] = [
  {
    id: 1,
    title: "1. 洞察需求",
    subTitle: "Insight & Discovery",
    duration: "1 - 2 天",
    objectives: [
      "搜集高价值痛点信号",
      "使用需求记录模版分析可行性",
      "提炼用户原生场景词汇"
    ],
    description: "通过小红书的『有没有App能...』、抖音高赞吐槽评论区、App Store 免费榜差评以及 ProductHunt 爆款快速找出刚性未满足痛点。",
    metrics: "输出 3 个有差异化的痛点切入方案，明确付费意愿等级（高/中/低）。",
    sopText: "黄金渠道：搜集小红书里『求推荐、找了很久、没有好用的』；App Store 付费榜/免费榜中 1-10 名应用的 2-3 星中差评反馈。"
  },
  {
    id: 2,
    title: "2. 黄金 5 问过滤",
    subTitle: "Ideation Filter",
    duration: "1 天",
    objectives: [
      "过滤伪需求与过度想象",
      "死守 5 个核心基础功能闭环",
      "验证冷启动 100 人的精准来源"
    ],
    description: "使用 5 个痛点评估标准对你的 App 设想进行残酷过滤。通不过测算的方案必须立刻换题，避免沉没成本。",
    metrics: "黄金 5 问全通（或至少 4 项明确确诊且痛点处于高等级）。",
    sopText: "5问核心：① 需求强烈且能找到10人说『我现在就想要』？ ② AI能快速实现核心逻辑或由熟知库支持？ ③ 竞品有明显短板？ ④ MVP核心功能包含在5个以内？ ⑤ 知道前 100 人从哪拉来？"
  },
  {
    id: 3,
    title: "3. 编译完整 PRD",
    subTitle: "Compile PRD Docs",
    duration: "0.5 - 1 天",
    objectives: [
      "定义产品一句话 Elevator Pitch",
      "划定 MVP 做什么与绝对不做（Out of Scope）",
      "设计核心付费墙触发点逻辑"
    ],
    description: "撰写一份简洁、完全客观的极轻量 PRD。这份 PRD 不是给庞大团队开会用的，而是作为与 AI 助手协作开发的终极指示手册。",
    metrics: "输出标准 PRD 文档。死守核心功能不超过 5 个（P0 级）。",
    sopText: "关键雷区：千万别沉迷于增加次要功能。MVP 的核心要义是单点击穿痛点，让用户顺畅跑通主流程，在爽过一次之后触发付费。"
  },
  {
    id: 4,
    title: "4. 极速产品原型",
    subTitle: "Visual Prototype",
    duration: "1 - 2 天",
    objectives: [
      "草纸物理手绘或使用 Figma 进行交互规划",
      "确认基础色调与高强可读性极不累眼字体",
      "提炼首屏视觉痛点说辞与文案"
    ],
    description: "不要画过于复杂的交互图。可以使用 Figma 的简易色块、纸质白板素写，或者 Uizard、Framer 这类 AI 快速生成网页原型作为参考。",
    metrics: "完成所有核心交互主页面（主页、转化墙、配置页、主功能页）的画面结构与文案定位。",
    sopText: "原则：速度最快、成本 0。只要明确知道按钮放哪、文案怎么写、痛点痛级高亮即可开始下一步。"
  },
  {
    id: 5,
    title: "5 & 6. 开发核心 MVP",
    subTitle: "Develop MVP & Logic",
    duration: "3 - 14 天",
    objectives: [
      "按渐进式步骤一次只写一个模块",
      "配置本地轻量持久化 LocalStorage 存储数据",
      "实现核心业务代码并保证零报错"
    ],
    description: "实战准则：千万不要把整份 PRD 一次性丢给 AI。正确做法是顺次搭建：① 框架目录和路由 -> ② 模型表存储 -> ③ 核心页面呈现 -> ④ 登录(如需) -> ⑤ 计费接入 -> ⑥ UI 美度动画调整。",
    metrics: "完成整体闭环、无 Syntax/Runtime 报错的端到端成品 Web/Native App。",
    sopText: "注意：微型应用推荐尽全力采用无后端（纯客户端+LocalStorage）或最简 Express + API 二次桥接模式。这可以节省数据库运维与百万吞吐读写计费带来的致命陷阱。"
  },
  {
    id: 7,
    title: "7. 深度内测验证",
    subTitle: "Beta Validation",
    duration: "1 - 3 天",
    objectives: [
      "作为自身重度用户完整跑通 10 遍主操作",
      "默默观察 10 - 30 个目标种子用户的真实体验录屏",
      "收集关键性满意度反馈并计算 NPS 分数"
    ],
    description: "自测通过后，送给 10 - 30 个典型用户使用。务必默默看着，不要去教他们怎么用。用户卡住、产生抱怨或不知道往哪按，就是最具含金量的黄金反馈点。",
    metrics: "收集超 10 份典型反馈单，计算 NPS 净推荐度（9-10分为推荐者，7-8分为中立，小于7分需立刻深度改进）。",
    sopText: "如果 NPS 核心分数低于 7 分，说明核心痛点满足度较弱、操作极度反直觉，必须立刻通过简短迭代解决这些卡顿点，而绝非继续堆砌新功能。"
  },
  {
    id: 8,
    title: "8. 1000 用户冷启动",
    subTitle: "Cold Start Growth",
    duration: "持续进行",
    objectives: [
      "运用红薯『痛点自传公式』包装推广笔记",
      "摄制抖音开头 3 秒扔出刚性痛点的高帧录屏",
      "优化 App Store ASO 权重字符、词频关键词"
    ],
    description: "不要发送『我做了一个新 App』这种广告。应该遵循：发现痛苦 -> 疯狂踩坑 -> 精疲力竭 -> 自行研发神器极速通关的极其抓眼真实故事线叙述。",
    metrics: "第一阶段获得 100+ 种子客户，小红书笔记收藏/点赞转化率超过 5%。",
    sopText: "红薯公式：【大多数人都不知道】原来 XX 还能这样做！手把手教你解决 XX 刚性困扰。ASO死守：标题方案控制在 30 字符内，放核心关联权重词。"
  },
  {
    id: 9,
    title: "9. 变现与付费墙转换",
    subTitle: "Monetization Walls",
    duration: "1 - 2 天",
    objectives: [
      "选择最佳收费策略（Freemium 还是买断订阅混合）",
      "设计体验感绝不残缺但具有心理高渴望的收费卡点",
      "在用户最爽的爽点后，弹出充满高含金量和优惠力度的付费墙"
    ],
    description: "免费版绝对不是『残废版』，必须让非付费者享受到极致顺畅的痛点解药，但在额度（如每日10次）、高级批量处理、精美自设备份等细节触发订阅卡点。",
    metrics: "设定完善的 Pro 定价梯度，打磨 3 个付费墙诱发点击时机的阻断式或沉浸式文案。",
    sopText: "心理学规律：终生年付 = 月付金额 × 12 × 0.6 进行折让让高级用户感到划算。同时提供三档价格，将最想卖的配置（通常为年付/终身）作为平衡推荐项居中突出显示。"
  },
  {
    id: 10,
    title: "10 & 11. 提审避坑与合规",
    subTitle: "Compliance & Publish",
    duration: "1 - 7 天 (依审核进度)",
    objectives: [
      "备妥完全公开可见的独立隐私政策 URL 网页",
      "按照 4.0 (高相似雷同)、2.1 (隐私违规)、3.1 (绕过内购) 等高拒重灾区逐一检测自辩",
      "撰写完美、附带指引与多测试链的英文 Review Notes 元数据"
    ],
    description: "合规上架是众多开发者夭折的第二道关闸。提前准备好隐私条款、服务许可明细，以及给苹果工程师的一步步详尽、包含测试账户密码和使用视频连接的 Review Notes。",
    metrics: "备妥上架一站式材料。完成向 Apple Store Connect / Google Play 的正式包提交审核。",
    sopText: "雷区核实：苹果严禁诱导或包含任何指向第三方网页付款购买账户的文案或连结，所有收费逻辑在提审时必须原生支持 Apple IAP，或者针对特定情况申办豁免。"
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "demand_discovery",
    name: "P-01 热门现象与蓝海痛点挖掘",
    category: "demand",
    description: "根据你日常观察的小红书爆款吐槽、抖音高热痛点话题或行业反馈，深入挖潜藏在底层的蓝海诉求，并获得 3 个最精准的产品定位方案。",
    inputs: [
      {
        key: "scenario",
        label: "我观察到的高吐槽现象 / 用户困扰话题",
        type: "textarea",
        placeholder: "例如：最近好多人在小红书发帖吐槽‘微信群收集图片太繁琐，大家发到群里一会就过期了，还得一个个手动保存归档’，底下有上百条求一个快捷免下载共享图库应用的求助评论。",
        defaultValue: "最近在小红书发现好多副业宝妈和手工作作者抱怨说，‘每次想在短视频平台找无版权、干净不累赘的传统中式非遗纹样做底图，找了很久全是粗制滥造图，要么就是要交好几百会费，而且搜中国传统色彩的配色也极为不准，好想要一个专门的中式配色和纹样搭配神器’。"
      }
    ]
  },
  {
    id: "competitor_analysis",
    name: "P-02 目标竞品价值极速解构",
    category: "demand",
    description: "把正在对标的竞品其商业模式、最关键的 5 条好评与 5 核心痛点/差评进行极速拆解归纳，帮你迅速找出适合微型应用的差异定位策略。",
    inputs: [
      {
        key: "appName",
        label: "对标竞品名称",
        type: "text",
        placeholder: "例如：某某中式传统配色大师/ColorHex",
        defaultValue: "中式轻配色Pro"
      },
      {
        key: "description",
        label: "该产品的主要功能与痛点简述",
        type: "textarea",
        placeholder: "例如：一款可以让设计师、插画师预览和拷贝各种传统颜色色值及简易配色方案的工具，但它广告极多，必须强制关注、且配色方案无法一键预览在具体包装/衣物模型上，用户颇多怨言。",
        defaultValue: "是一款主要提供100多种中国古风色彩值拷贝的工具。缺点是必须收费买断才能查看RGB/CMYK值，并且没有提供配色之间的和谐搭配规则，更没有一键应用在传统扇面、瓷器等手工微模型上，用户体验非常单一而且卡死变现太早。"
      }
    ]
  },
  {
    id: "prd_generation",
    name: "P-03 黄金极简 PRD 生成器",
    category: "demand",
    description: "将你的构想快速翻译成标准、克制、聚焦 MVP 极限边界的 PRD 文档。这份文档可以立刻分享，更特别适合作为给 AI 的直接代码生成总控输入。",
    inputs: [
      {
        key: "appName",
        label: "你的产品暂定名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "targetAudience",
        label: "细分目标用户画像",
        type: "text",
        defaultValue: "手工作作者、传统国风插画设计师、副业古风博主"
      },
      {
        key: "corePainPoints",
        label: "用户死活解决不了的痛点",
        type: "textarea",
        defaultValue: "在找古风花纹、中式颜色配色时找不到精准的古籍色调数据；无法直观预览这些配色搭配在纸扇、衣褶或发簪上的效果导致盲调出错；以及想要配色能够一键导出成Procreate色卡或者网页代码。"
      },
      {
        key: "differentiation",
        label: "一人公司能做到的最大差异点 / 特异功能",
        type: "textarea",
        defaultValue: "提供3D微缩传统器物（扇子、油纸伞、陶瓷碗）极速动态换色预览；包含15个唐宋经典传统色彩方案的一键合成；支持一键生成并直接导出为 iPad 绘画软件 Procreate .swatches 色卡文件的极高便利性。"
      }
    ]
  },
  {
    id: "code_framework",
    name: "P-04 MVP 项目目录与渐进职责分配",
    category: "develop",
    description: "为 AI 开发划定极致精细、低模块耦合的极简代码结构目录，指导后续开发，明确最少的依赖，解决开发蔓延导致的性能与卡顿灾难。",
    inputs: [
      {
        key: "appName",
        label: "应用名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "techStack",
        label: "推荐开发技术栈",
        type: "select",
        options: [
          "React + Tailwind CSS + Vite + LocalStorage (单页微应用)",
          "NodeJS + Express + React Fullstack App",
          "Flutter + Cursor + RevenueCat SDK (本地跨平台APP)",
          "Next.js + Tailwind + Supabase (全功能Web站)"
        ],
        defaultValue: "React + Tailwind CSS + Vite + LocalStorage (单页微应用)"
      },
      {
        key: "prdNotes",
        label: "PRD要点信息精炼摘要",
        type: "textarea",
        defaultValue: "1. 首页传统配色和谐方案轮播与搜索收藏 2. 交互式扇子与瓷器器物插图实时变色预览（SVG换色或Canvas绘制） 3. 一键导出 Procreate 色卡或 CSS 颜色变量值 4. 每日限制5次免费换色生成，升级 $2.99/年 解锁全部无损中式器物预览及特制专属配色功能。"
      }
    ]
  },
  {
    id: "db_design",
    name: "P-06 极简单集合数据库结构与安全规则",
    category: "develop",
    description: "设计完美、计费陷阱规避度高的轻量化数据库 Schema，以及能绝对隔离越权、防止刷写被拒的上架安全防护规则。",
    inputs: [
      {
        key: "prdNotes",
        label: "PRD关键要点与数据存取需求",
        type: "textarea",
        defaultValue: "本产品提供中式配色方案和用户的收藏夹同步。主要存：用户账号、自定配色（名称，3个HEX色值列表，创建时间，是否为核心收藏），以及用户的每日免费预览消耗频次次数计数器。"
      }
    ]
  },
  {
    id: "marketing_red",
    name: "P-07 痛点故事流——小红书种草高转化大字报",
    category: "marketing",
    description: "运用红薯特有的『痛点故事叙述体』和极其丰富的表情情绪词，帮你包装一个完全不像硬广的、看完了疯狂想去下载试用的真实故事推荐信！",
    inputs: [
      {
        key: "appName",
        label: "应用或工具名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "appFeatures",
        label: "应用核心功能 & 打动用户的极限点",
        type: "textarea",
        defaultValue: "一键导出iPad Procreate色卡、3D极速中式纸扇/衣服纹样动态上色效果图，以及包含数十个来自古画里的唐宋明色调典籍配色系统。"
      },
      {
        key: "styleOption",
        label: "文案语调与红薯风格",
        type: "select",
        options: [
          "真实用户抱怨逆袭流（狂找2小时底色，快崩溃了发现这宝藏神器！）",
          "专业纯手工博主超级推荐风（手作娘、发簪手艺人必须要懂的绝密审美配色提升方！）",
          "干货教程对比避坑法（求求你们做国风底色不要再盲涂了，这方法10秒配出大师味）"
        ],
        defaultValue: "真实用户抱怨逆袭流（狂找2小时底色，快崩溃了发现这宝藏神器！）"
      }
    ]
  },
  {
    id: "marketing_aso",
    name: "P-08 商店 ASO 元数据与截图文案包",
    category: "marketing",
    description: "生成最契合 App Store 对字数上限、权重词组与核心引导前三行直击灵魂的商店描述，更奉送 5 张吸引眼球的高转化截图字样。",
    inputs: [
      {
        key: "appName",
        label: "应用商店展示名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "coreFunction",
        label: "核心定位与痛点解决办法",
        type: "textarea",
        defaultValue: "提供古籍画作提取的精准中国色彩配色，并直接换色在3D微缩器物模型上试色，最后支持极速导出至Procreate作为数字绘画调色板。"
      },
      {
        key: "targetUsers",
        label: "目标下载群体",
        type: "text",
        defaultValue: "插画师，国潮服装设计师，古风非遗手工创作者"
      }
    ]
  },
  {
    id: "price_design",
    name: "P-09 付费阻断与诱惑付费墙诱导",
    category: "marketing",
    description: "设计兼并极其优质的免费可用性，但又能在高级功能、保存多出图频次、高感知需求上架设合理转换屏障，计算出精准的变现梯度。",
    inputs: [
      {
        key: "appName",
        label: "应用名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "coreFeatures",
        label: "MVP主要提供的核心服务内容",
        type: "textarea",
        defaultValue: "1. 经典传统配色集免费浏览 2. 交互式中式器物配色实时导出Procreate .swatches 3. 特殊精致唐宋元明宫廷专色彩系解锁 4. 导出高清 4K 配色自适应壁纸背景功能"
      },
      {
        key: "competitorsPrice",
        label: "竞品通常的定价范围与模式",
        type: "text",
        defaultValue: "通常竞品只提供网页代码，要么就是 30 元买断，但全无交互上色和格式导出，属于半残废。"
      }
    ]
  },
  {
    id: "privacy_policy",
    name: "P-10 App Store提审标配中英文双语隐私条例",
    category: "compliance",
    description: "生成高度正规、无遗漏地覆盖隐私条款收集声明的双语隐私模板。可以直接制作成网页，供你在 App Store 主页中提交提审时作为必须配置链接。",
    inputs: [
      {
        key: "appName",
        label: "你的产品名称",
        type: "text",
        defaultValue: "华彩中式配色坊"
      },
      {
        key: "collectedData",
        label: "实际收集的信息类型(尽量写最小化减少隐患)",
        type: "text",
        defaultValue: "不绑定任何个人身份，仅收集设备标识符用于防止多设备恶意刷滥用、邮箱（如果使用自选注册同步时）以及本地应用设置临时缓存。"
      },
      {
        key: "purpose",
        label: "收集这些信息的最终功能用途",
        type: "text",
        defaultValue: "仅用于确保每日换色限制计数准确，维护用户自己保存的传统色彩收藏夹，以及在设备异常退出时提供必要奔溃报告记录以便程序员优化更新。"
      }
    ]
  },
  {
    id: "review_notes",
    name: "P-11 给 iOS / Google 提审员的 Review Notes 与极速指引",
    category: "compliance",
    description: "撰写一份语气极其敬业、无挑剔、把测试流程、软硬件配合和合规亮点列得一览无余的英文致审查员备忘录，降低退回再议甚至延审几率。",
    inputs: [
      {
        key: "appName",
        label: "提审应用全名",
        type: "text",
        defaultValue: "Chinese Color Harmony - 华彩配色坊"
      },
      {
        key: "coreFunction",
        label: "简要的提审功能主旨(英文)",
        type: "textarea",
        defaultValue: "This application provides authentic traditional Chinese color palettes extracted from historical reference paintings, enabling digital artists to preview these combinations in real-time on interactive SVG mockups (hand fans, tea pots) and export as standard swatches format directly."
      },
      {
        key: "credentials",
        label: "演示测试人使用的登录账号密码与完整操作演示视频链接(如有)",
        type: "textarea",
        defaultValue: "No login is required to experience the full app. Simply tap the guest-mode button on the landing view. The test user can instantly search color codes and tap one mockup to swap its hue dynamically in under 2 clicks."
      }
    ]
  }
];
