// 唯一的个人资料入口：修改这里，主页与在线 CV 会一起更新。
// 只改引号内文字；多条记录用英文逗号分隔。详细说明见 README.md。
// 此文件会公开，请勿填写密码、身份证号、家庭住址等私密信息。
window.ACADEMIC_PROFILE = {
  // 所有占位内容换成真实资料后改为 false，隐藏模板提示。
  templatePreview: true,
  lastUpdated: "Sep 2026",

  name: "ZhaoxuLiu",
  role: "Graduate Student · Researcher",
  department: "Department / School",
  institution: "University Name",
  location: "City, Country",
  email: "your.name@university.edu",
  photo: "", // 先上传照片，例如 assets/portrait.jpg，再填这个路径。

  // 空字符串表示尚未填写；正式模式下会自动隐藏没有地址的链接。
  links: {
    scholar: "",
    github: "https://github.com/ZhaoxuLiu",
    orcid: "",
    linkedin: "",
    x: "",
  },

  // 简介首句自动使用上面的身份、院系、学校；这里补充研究问题和背景。
  about: {
    focus: "I am especially interested in questions around [one concrete research question].",
    background: "Before this, I [brief education, laboratory, or project background]. Outside research, I enjoy [one or two genuine interests].",
  },
  researchInterests: ["Trustworthy AI", "Language Models", "AI for Science"],

  // 新闻只在主页展示，不会加入 CV。没有新闻时填写 []。
  news: [
    { date: "2026-09", text: "Our survey on [research topic] is now available online." },
    { date: "2026-06", text: "Started working on [current project or research direction]." },
    { date: "2025-09", text: "Joined [laboratory / research group] at [university]." },
  ],

  // 论文顺序和作者顺序均按下面填写的顺序展示，不会自动调整。
  publications: [
    {
      title: "A Formal Title for Your Survey Paper Goes Here",
      // name 应与论文上的署名完全一致；me: true 只负责加粗本人署名。
      authors: [
        { name: "First Author" },
        { name: "Second Author" },
        { name: "Your Name", me: true },
        { name: "Senior Author" },
      ],
      type: "Survey",
      year: "2026",
      venue: "Journal / Conference / arXiv",
      status: "", // 如 Preprint / Accepted；不要把未发表的论文写成已发表。
      summary: "One concise sentence describing the scope, taxonomy, or primary contribution of the survey. Keep it factual and easy to scan.",
      image: "", // 可选：assets/paper-figure.png
      paperUrl: "",
      projectUrl: "",
    },
  ],

  // 教育经历同步到主页和 CV。请按最近的经历在前排序。
  education: [
    {
      period: "2024 — Present",
      title: "Degree Name, Major",
      organization: "University Name",
      location: "City, Country",
      details: ["Advisor: Prof. [Name] · Research group: [Laboratory]"],
    },
    {
      period: "2020 — 2024",
      title: "Previous Degree, Major",
      organization: "University Name",
      location: "City, Country",
      details: ["Selected coursework, thesis, distinction, or research experience."],
    },
  ],

  // CV 中的科研经历；showOnHomepage 改 true 也会出现在主页经历区。
  // 没有科研经历请填写 []，整个标题也会隐藏。
  researchExperience: [
    {
      period: "2025 — Present",
      title: "Research Assistant",
      organization: "Research Group / Laboratory",
      location: "",
      showOnHomepage: false,
      details: [
        "Describe a concrete research task, method, or contribution.",
        "Describe a technical result, dataset, system, or collaboration.",
      ],
    },
  ],

  // 以下仅用于 CV；没有内容时填写 []，不必为了填满页面编造经历。
  skills: [
    { label: "Programming", items: ["Python", "[other languages]"] },
    { label: "Research", items: ["PyTorch", "LaTeX", "Git", "[other tools]"] },
  ],
  awards: [], // 例如 ["2026 · 奖项名称 · 颁发机构"]
};
