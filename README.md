# VoteGuide 🗳️

AI-powered election companion app built for Challenge 2.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **AI:** Anthropic Claude 3.5 Haiku
- **Database:** Supabase (Ready for migration)
- **State:** Zustand + Persist
- **Maps:** D3.js (TopoJSON)

## Getting Started

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add your `ANTHROPIC_API_KEY`
4. Run locally: `npm run dev`

## Features
- **F1 My Election Journey:** Personalised progress tracker
- **F2 Ask Anything:** AI chatbot with Claude Haiku
- **F3 Myth Buster:** Accordion debunking common myths
- **F4 Civic Quiz:** Interactive knowledge test
- **F5 Country Personaliser:** Auto-detects location
- **F6 Countdown:** Live ticker to polling day
- **F7 Sharing:** One-tap WhatsApp/SMS share
- **F8 Election Map:** Phase-coded interactive map
