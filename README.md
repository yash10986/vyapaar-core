# Vyapaar Core

Vyapaar Core is a PHP-driven ERP-style dashboard with an embedded AI decision layer for finance, inventory, collections, and operations.

## What is new
- AI Decision Center with autonomous recommendations for cash, stock, and collections
- Forecast & Guardrails panel that projects revenue/cash and risks from the current ledger and inventory state
- Chetan AI chat and floating assistant powered by local heuristics and optional Gemini API key
- OCR-style invoice ingestion workflow that parses sample invoice text into structured operational insights

## Usage
1. Start a local PHP server from this workspace.
2. Open the dashboard in a browser.
3. Optional: add a Gemini API key in the AI panel to enable live LLM-backed responses.

## Files updated
- [index.php](index.php)
- [src/modules/chetan-ai/ai.controller.js](src/modules/chetan-ai/ai.controller.js)
- [src/modules/chetan-ai/forecaster.js](src/modules/chetan-ai/forecaster.js)
- [src/modules/chetan-ai/doc_ingester.js](src/modules/chetan-ai/doc_ingester.js)
