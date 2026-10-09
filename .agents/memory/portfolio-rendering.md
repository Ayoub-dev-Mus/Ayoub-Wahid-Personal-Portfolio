---
name: Portfolio rendering reliability
description: Why fonts and entrance effects must not block the initial portfolio render
---

Keep portfolio fonts self-hosted and primary content visible in server-rendered HTML before animation scripts load.

**Why:** On this project's preview environment, development compilation repeatedly exceeded workflow readiness timeouts even after a production build succeeded. Self-hosted fonts helped but did not remove the timing issue entirely. Initial hidden animation states also left the first captured viewport mostly empty before hydration.

**How to apply:** Preserve offline font loading and progressive enhancement when changing typography or entrance motion; animations may enhance content but must not be required to see it. Prefer the optimized production build for reliable preview startup.
