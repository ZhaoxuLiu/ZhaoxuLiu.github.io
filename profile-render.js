// Page layouts share one source of truth: profile.js. No HTML is accepted in data.
(() => {
  const p = window.ACADEMIC_PROFILE;
  const error = document.querySelector("[data-load-error]");
  if (!p || typeof p.name !== "string") {
    if (error) error.hidden = false;
    return;
  }
  const list = (value) => Array.isArray(value) ? value : [];
  const join = (values, separator = " · ") => values.filter(Boolean).join(separator);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  const set = (selector, nodes) => document.querySelector(selector)?.replaceChildren(...nodes);
  const safeURL = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value, document.baseURI);
      // Also permit relative assets in a locally opened file:// preview.
      if (["https:", "http:", "mailto:"].includes(url.protocol) ||
          (url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(value))) return value;
    } catch { /* An invalid URL is treated as an unfilled field. */ }
    return "";
  };
  const link = (label, url) => {
    const node = el("a", label);
    node.href = safeURL(url) || "#";
    if (node.getAttribute("href") === "#") node.dataset.placeholderLink = "";
    return node;
  };
  // Details accept [label](https://...) links, never raw HTML.
  const detailNode = (tag, value) => {
    const node = el(tag);
    const text = String(value ?? "");
    const pattern = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
      node.append(text.slice(cursor, match.index));
      node.append(safeURL(match[2]) ? link(match[1], match[2]) : match[0]);
      cursor = match.index + match[0].length;
    }
    node.append(text.slice(cursor));
    return node;
  };
  const research = list(p.researchInterests);
  const papers = list(p.publications);
  const education = list(p.education);
  const experience = list(p.researchExperience);
  const awards = list(p.awards);
  const social = [
    ["email", "Email", p.email ? "mailto:" + p.email : ""],
    ["scholar", "Google Scholar", p.links?.scholar],
    ["github", "GitHub", p.links?.github],
    ["orcid", "ORCID", p.links?.orcid],
    ["linkedin", "LinkedIn", p.links?.linkedin],
    ["x", "X", p.links?.x],
  ];
  function authors(paper, selectedIndexes) {
    const fragment = document.createDocumentFragment();
    const allAuthors = list(paper.authors);
    const indexes = selectedIndexes || allAuthors.map((_, index) => index);
    indexes.forEach((index, position) => {
      if (position) fragment.append(index > indexes[position - 1] + 1 ? ", …, " : ", ");
      const author = allAuthors[index];
      const name = el(author.me ? "strong" : "span", author.name);
      if (author.me && selectedIndexes) name.title = "Author " + (index + 1) + " of " + allAuthors.length;
      fragment.append(name);
    });
    return fragment;
  }
  function publicationAuthors(paper) {
    const allAuthors = list(paper.authors);
    const previewIndexes = allAuthors.map((_, index) => index)
      .filter((index) => index < 3 || allAuthors[index].me || index === allAuthors.length - 1);
    const fullLine = () => {
      const line = el("p", null, "authors");
      line.append(authors(paper));
      return line;
    };
    if (allAuthors.length <= 6 || previewIndexes.length === allAuthors.length) return fullLine();

    const container = el("div", null, "publication-authors");
    const details = el("details", null, "author-disclosure");
    const summary = el("summary");
    const preview = el("span", null, "authors author-preview");
    preview.append(authors(paper, previewIndexes));
    const toggle = el("span", null, "author-toggle");
    toggle.append(el("span", "Show all " + allAuthors.length + " authors", "author-show"),
      el("span", "Show fewer authors", "author-hide"));
    summary.append(preview, toggle);
    details.append(summary, fullLine());
    const printLine = el("p", null, "authors author-print");
    printLine.append(authors(paper, previewIndexes));
    container.append(details, printLine);
    return container;
  }
  const venue = (paper) => join([paper.venue, paper.year], ", ");
  const citation = (paper) => join([
    list(paper.authors).map((a) => a.name).join(", "),
    paper.title,
    venue(paper),
  ], ". ") + ".";
  function paperLinks(paper, copyButton = false) {
    const container = el("div", null, "publication-links");
    [["Paper", paper.paperUrl], ["Project", paper.projectUrl]].forEach(([label, url]) => {
      if (safeURL(url) || p.templatePreview) container.append(link(label + " ↗", url));
    });
    if (copyButton) {
      const button = el("button", "Copy citation", "text-button");
      button.type = "button";
      button.dataset.citation = citation(paper);
      container.append(button);
    }
    return container;
  }
  function publicationEntry(paper) {
    const entry = el("article", null, "publication-card");
    if (safeURL(paper.image)) {
      const figure = el("div", null, "publication-visual");
      const img = el("img");
      img.src = safeURL(paper.image);
      img.alt = "Overview figure: " + paper.title;
      img.loading = "lazy";
      figure.append(img);
      entry.append(figure);
    } else {
      entry.classList.add("publication-card-text");
    }
    const copy = el("div", null, "publication-copy");
    copy.append(el("h3", paper.title), publicationAuthors(paper), el("p", venue(paper), "venue"));
    copy.append(paperLinks(paper, true));
    entry.append(copy);
    return entry;
  }
  function hideSection(selector, empty) {
    const section = document.querySelector(selector)?.closest("section");
    if (!section) return;
    section.hidden = empty;
    if (section.id) document.querySelectorAll('.site-nav a[href="#' + section.id + '"]')
      .forEach((anchor) => { anchor.hidden = empty; });
  }

  document.title = p.name + (document.querySelector("[data-cv]") ? " · CV" : " · Academic Homepage");
  document.querySelector('meta[name="description"]')?.setAttribute("content",
    join([p.name, p.role, p.institution, research.join(", ")]) + (p.templatePreview && !document.querySelector("[data-cv]") ? " — Template preview." : ""));
  document.querySelectorAll("[data-profile]").forEach((node) => {
    node.textContent = p[node.dataset.profile] || "";
  });
  document.querySelectorAll(".preview-note").forEach((node) => { node.hidden = !p.templatePreview; });
  document.querySelectorAll("[data-social]").forEach((node) => {
    const key = node.dataset.social;
    const url = key === "cv" ? "cv.html" : social.find((entry) => entry[0] === key)?.[2];
    node.href = safeURL(url) || "#";
    node.hidden = !safeURL(url) && !p.templatePreview;
    if (!safeURL(url)) node.dataset.placeholderLink = "";
  });
  const portrait = document.querySelector(".portrait-placeholder");
  if (portrait && safeURL(p.photo)) {
    const img = el("img");
    img.src = safeURL(p.photo);
    img.alt = "Portrait of " + p.name;
    portrait.classList.add("has-photo");
    portrait.removeAttribute("role");
    portrait.removeAttribute("aria-label");
    portrait.replaceChildren(img);
  }
  // A single multiline string owns the entire About Me section.
  // Keep old profile objects readable while their data is being migrated.
  let aboutParagraphs;
  if (typeof p.about === "string") {
    aboutParagraphs = p.about.replace(/\r\n?/g, "\n").split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim().replace(/\s*\n\s*/g, " ")).filter(Boolean);
  } else {
    const interests = research.length ? "My research interests include " + research.join(", ") + "." : "";
    aboutParagraphs = [
      "I am currently a " + p.role + (p.department ? " in " + p.department : "") + (p.institution ? " at " + p.institution : "") + ".",
      join([interests, p.about?.focus], " "),
      p.about?.background,
      p.email ? "I am always glad to exchange ideas about research and potential collaboration. Contact me at " + p.email + "." : "",
    ].filter(Boolean);
  }
  set("[data-about]", aboutParagraphs.map((text) => {
    const paragraph = el("p");
    // Plain text stays plain text; only written email addresses become links.
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
    let cursor = 0;
    for (const match of text.matchAll(emailPattern)) {
      paragraph.append(text.slice(cursor, match.index), link(match[0], "mailto:" + match[0]));
      cursor = match.index + match[0].length;
    }
    paragraph.append(text.slice(cursor));
    return paragraph;
  }));
  hideSection("[data-about]", !aboutParagraphs.length);
  set("[data-research]", research.map((item) => el("li", item)));
  hideSection("[data-research]", !research.length);
  set("[data-news]", list(p.news).map((item) => {
    const row = el("li");
    const date = el("time", item.date);
    if (/^\d{4}-\d{2}$/.test(item.date)) {
      const value = new Date(item.date + "-01T12:00:00Z");
      if (!Number.isNaN(value.getTime())) {
        date.dateTime = item.date;
        date.textContent = value.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
      }
    }
    row.append(date, el("p", item.text));
    return row;
  }));
  hideSection("[data-news]", !list(p.news).length);
  set("[data-publications]", papers.map(publicationEntry));
  hideSection("[data-publications]", !papers.length);
  const publicationHeading = document.querySelector("#publications h2");
  if (publicationHeading) publicationHeading.textContent = papers.length === 1 ? "Publication" : "Publications";
  function timelineEntry(item) {
    const row = el("article", null, "timeline-item");
    const copy = el("div");
    copy.append(el("h3", item.title), el("p", join([item.organization, item.location]), "timeline-org"));
    list(item.details).forEach((detail) => copy.append(detailNode("p", detail)));
    row.append(el("div", item.period, "timeline-date"), copy);
    return row;
  }
  function educationEntry(item) {
    const row = el("article", null, "education-item");
    if (safeURL(item.logo)) {
      const logo = el("img", null, "education-logo");
      logo.alt = (item.organization || "University") + " logo";
      logo.width = 64;
      logo.height = 64;
      logo.loading = "lazy";
      logo.decoding = "async";
      logo.addEventListener("error", () => {
        logo.remove();
        row.classList.remove("has-logo");
      }, { once: true });
      logo.src = safeURL(item.logo);
      row.classList.add("has-logo");
      row.append(logo);
    }
    const copy = el("div", null, "education-copy");
    const heading = el("div", null, "education-heading");
    heading.append(el("h3", item.organization));
    if (item.period) heading.append(el("span", item.period, "education-period"));
    copy.append(heading);
    if (item.title) copy.append(el("p", item.title, "education-degree"));
    if (item.location) copy.append(el("p", item.location, "education-location"));
    list(item.details).forEach((detail) => copy.append(detailNode("p", detail)));
    row.append(copy);
    return row;
  }
  set("[data-education]", education.map(educationEntry));
  hideSection("[data-education]", !education.length);
  const homepageExperience = experience.filter((item) => item.showOnHomepage);
  set("[data-experience]", homepageExperience.map(timelineEntry));
  hideSection("[data-experience]", !homepageExperience.length);
  const homepageAwards = awards.length
    ? awards.map((award) => el("li", award))
    : (p.templatePreview ? [el("li", "Add verified awards in profile.js when you have relevant entries.", "awards-placeholder")] : []);
  set("[data-awards]", homepageAwards);
  hideSection("[data-awards]", !homepageAwards.length);
  const cv = document.querySelector("[data-cv]");
  if (cv) {
    const contents = [];
    const cvText = (value) => String(value ?? "")
      .replace(/[\u2010-\u2015\u2212]/g, "-")
      .replace(/,\s*/g, ", ")
      .replace(/\s*\(expected\)/gi, " (Expected)");
    const header = el("header", null, "cv-header");
    header.append(el("h1", p.name));
    const contacts = el("p", null, "cv-contacts");
    const contactLinks = [];
    if (p.email) contactLinks.push(link(p.email, "mailto:" + p.email));
    if (safeURL(p.homepage)) contactLinks.push(link("Homepage", p.homepage));
    social.forEach(([key, label, url]) => {
      if (key !== "email" && safeURL(url)) contactLinks.push(link(label, url));
    });
    contactLinks.forEach((anchor, index) => {
      const item = el("span", null, "cv-contact-item");
      if (index) {
        const separator = el("span", "|", "cv-contact-separator");
        separator.setAttribute("aria-hidden", "true");
        item.append(separator);
      }
      item.append(anchor);
      contacts.append(item);
    });
    if (contactLinks.length) header.append(contacts);
    contents.push(header);
    function section(title, nodes) {
      if (!nodes.length) return;
      const block = el("section", null, "cv-section");
      block.append(el("h2", title), ...nodes);
      contents.push(block);
    }
    function cvExperience(item) {
      const entry = el("div", null, "cv-entry");
      const heading = el("div", null, "cv-entry-heading");
      heading.append(el("strong", cvText(item.title)));
      if (item.period) heading.append(el("span", cvText(item.period), "cv-entry-period"));
      entry.append(heading);
      const affiliation = join([cvText(item.organization), cvText(item.location)]);
      if (affiliation) entry.append(el("p", affiliation, "cv-entry-affiliation"));
      list(item.details).forEach((detail) => entry.append(detailNode("p", detail)));
      return entry;
    }
    section("Education", education.map((item) => educationEntry({
      ...item,
      organization: cvText(item.organization),
      title: cvText(item.title),
      location: cvText(item.location),
      period: cvText(item.period),
    })));
    section("Research interests", research.length ? [el("p", research.join(", "))] : []);
    const cvPublications = el("div", null, "publication-list");
    cvPublications.append(...papers.map(publicationEntry));
    section(papers.length === 1 ? "Publication" : "Publications", papers.length ? [cvPublications] : []);
    section("Experience", experience.map(cvExperience));
    section("Skills", list(p.skills).map((skill) => {
      const line = el("p");
      line.append(el("strong", skill.label + ": "), list(skill.items).join(", "));
      return line;
    }));
    section("Awards", awards.map((award) => el("p", award)));
    cv.replaceChildren(...contents);
  }
})();
