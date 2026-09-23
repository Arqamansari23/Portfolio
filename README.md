# Arqam Ahmed Ansari — Portfolio

Personal portfolio site of **Arqam Ahmed Ansari**, AI Engineer — agentic systems, retrieval-augmented
generation, voice agents and MCP-driven automation.

Static site: plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no framework.

## Live site

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000     # then visit http://localhost:8000
```

## Structure

```
.
├── index.html                    # single-page portfolio: overview, works, skills, experience, contact
├── projects/                     # one deep-dive case study per project
│   ├── agentic-chatbot.html      # ReAct agent on LangGraph, 18 tools, guardrails, tracing
│   ├── fingpt.html               # multimodal financial RAG: HyDE, BM25 + vectors, RRF, rerankers
│   ├── knowledge-hub.html        # multi-agent RAG with per-category judge loops, self-hosted on one GPU
│   ├── harness-eng.html          # multi-subagent equity research harness on Deep Agents
│   └── medbook.html              # voice-first clinic booking, realtime calendar sync
├── assets/
│   ├── css/case.css              # shared stylesheet for every case study page
│   ├── js/case.js                # shared behaviour: syntax highlighting, copy buttons, TOC, progress bar
│   └── img/                      # images used by the site (compressed for the web)
└── source/                       # original high-resolution artwork and notes (not tracked in git)
```

`index.html` carries its own styles inline so the landing page renders without a second request.
The case studies share `assets/css/case.css` and `assets/js/case.js`, so a change to the design or
behaviour applies to all five at once.

## Case studies

Each project page follows the same shape: the problem, the architecture decisions and why the
alternatives were rejected, hand-drawn inline SVG diagrams, real code, and an honest note on limits
and what comes next. All diagrams are inline SVG rather than images — they stay sharp at any zoom,
adapt to the page's colour palette, and remain selectable text.

## Editing

- **Content and layout of the landing page** — `index.html` (styles are in the `<style>` block at the top).
- **Case study design** — `assets/css/case.css` (shared by all five project pages).
- **Case study behaviour** — `assets/js/case.js` (code highlighting, copy buttons, scroll spy).
- **Images** — put web-sized files in `assets/img/`; keep originals in `source/`.

## Contact

- Email: Ibneshakeel34@gmail.com
- LinkedIn: https://www.linkedin.com/in/arqamansari-26ba8a269/
- GitHub: https://github.com/Arqamansari23
