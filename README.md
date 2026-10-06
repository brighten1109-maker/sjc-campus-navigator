# SJC Campus Navigator — Multi-page Web Application

Pages:
- index.html — landing page
- navigator.html — interactive campus map and route planner
- places.html — searchable campus destination directory
- departments.html — searchable academic directory
- about.html — system architecture and roadmap

Core files:
- style.css — original SJC visual system plus responsive enhancements
- app.css — multi-page UI layer
- app.js — shared theme, mobile navigation and active navigation
- data.js — reusable locations, graph, departments and places
- navigator.js — existing interactive route/map engine
- places.js / departments.js — directory rendering

Open `index.html` to run locally. No backend is required for the core demo.

## Module 3 — Backend Engineering & Security

The project now includes `security.html` and `security.js`, an academic password-security demonstration. It uses the browser Web Crypto API with PBKDF2 + SHA-256, a unique random 16-byte salt, 310,000 iterations and a 256-bit derived key. The original password is never stored.

### Important production note

Because the current project is deployed as a static GitHub Pages application, the Module 3 credential record is stored in browser `localStorage` for demonstration purposes only. A real SJC administrative system must authenticate against a trusted server/database over HTTPS and should use server-side password hashing, secure sessions/tokens, rate limiting, audit logs and authorization controls.
