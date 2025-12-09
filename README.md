# Tabulas EU - Collaborative Document Platform

A collaborative document platform built with Next.js and Liveblocks, featuring real-time collaboration across multiple document types.

## Overview

Tabulas EU is a comprehensive collaborative platform that enables teams to work together in real-time on various document types including text documents, whiteboards, canvas drawings, notes, and Digital Product Passports (DPP).

## Features

### Document Types

- **Text Documents** - Rich text editor with collaborative editing powered by TipTap
- **Whiteboard** - Interactive whiteboard for brainstorming and visual collaboration
- **Canvas** - Advanced drawing canvas using tldraw
- **Notes** - Quick note-taking with BlockNote editor
- **DPP (Digital Product Passport)** - Layered document type with marketing layer and DPP data layer

### Core Features

- **Real-time Collaboration** - Live cursors, presence, and synchronized editing
- **Document Dashboard** - Pagination, drafts, groups, and auto-revalidation
- **Authentication** - Compatible with GitHub, Google, Auth0, and more via NextAuth.js
- **Permissions System** - Document access scoped to users, groups, and public
- **Share Menu** - Fully-featured sharing and collaboration controls
- **Notifications** - In-app notifications and email notifications
- **Comments** - Collaborative commenting system
- **Groups** - Organize documents by teams and groups

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **React**: 19.1.0
- **Real-time**: Liveblocks 3.7.1
- **Authentication**: NextAuth.js 5.0
- **Editors**:
  - TipTap (Text documents)
  - tldraw (Canvas)
  - BlockNote (Notes)
- **UI Components**: Radix UI, Mantine
- **Styling**: CSS Modules
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Liveblocks account (get your API keys from [liveblocks.io](https://liveblocks.io))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tabulasEu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# Liveblocks API Keys
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_public_key_here
LIVEBLOCKS_SECRET_KEY=your_secret_key_here

# Optional: Use authorization endpoint instead of public key
NEXT_PUBLIC_USE_LIVEBLOCKS_AUTH=true

# NextAuth Configuration
AUTH_SECRET=your_auth_secret_here
# Add your OAuth provider credentials as needed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tabulasEu/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   ├── whiteboard/        # Whiteboard document pages
│   ├── canvas/           # Canvas document pages
│   ├── text/             # Text document pages
│   ├── note/             # Note document pages
│   ├── dpp/              # DPP document pages
│   └── api/              # API routes
├── components/            # React components
│   ├── Whiteboard/       # Whiteboard components
│   ├── Canvas/           # Canvas components
│   ├── TextEditor/       # Text editor components
│   ├── NoteEditor/       # Note editor components
│   ├── DPP/              # DPP components
│   └── ...               # Other UI components
├── lib/                   # Utility functions and server actions
│   ├── actions/          # Server actions
│   ├── database/         # Database utilities
│   └── utils/            # Helper functions
├── types/                 # TypeScript type definitions
├── liveblocks.config.ts  # Liveblocks client configuration
└── liveblocks.server.config.ts  # Liveblocks server configuration
```

## Document Types

### Text Documents
Rich text editing with TipTap, supporting formatting, images, links, and collaborative editing.

### Whiteboard
Interactive whiteboard for visual collaboration with shapes, text, and drawing tools.

### Canvas
Advanced drawing canvas powered by tldraw with professional drawing tools.

### Notes
Quick note-taking with BlockNote editor, supporting rich formatting and blocks.

### DPP (Digital Product Passport)
Specialized document type with two layers:
- **Marketing Layer**: Background layer for marketing content (editable by marketing team)
- **DPP Layer**: Data layer for Digital Product Passport information

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` | Liveblocks public API key | Yes* |
| `LIVEBLOCKS_SECRET_KEY` | Liveblocks secret API key | Yes* |
| `NEXT_PUBLIC_USE_LIVEBLOCKS_AUTH` | Use authorization endpoint | No |
| `AUTH_SECRET` | NextAuth secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes (production) |

*Either `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` or `LIVEBLOCKS_SECRET_KEY` with `NEXT_PUBLIC_USE_LIVEBLOCKS_AUTH=true` is required.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with auto-fix
- `npm run typecheck` - Run TypeScript type checking

## Documentation

### Project Documentation

Detailed implementation documentation is available in the [`docs/`](./docs/) folder:

- [Documentation Index](./docs/README.md) - Overview of all documentation
- [Initial Setup](./docs/01-initial-setup.md) - Next.js and Liveblocks installation
- [API Key Management](./docs/02-api-key-management.md) - Public vs Secret keys, authorization
- [Project Restart](./docs/03-project-restart.md) - Complete reset process
- [DPP Implementation](./docs/04-dpp-implementation.md) - Digital Product Passport implementation
- [Error Handling & Fixes](./docs/05-error-handling.md) - Common errors and solutions
- [Whiteboard Homepage](./docs/06-whiteboard-homepage.md) - Homepage setup (pending)
- [Spam Protection](./docs/07-spam-protection.md) - Spam protection implementation (pending)

### External Documentation

- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Next.js Starter Kit Guide](https://liveblocks.io/docs/guides/nextjs-starter-kit)
- [Next.js Documentation](https://nextjs.org/docs)
- [TipTap Documentation](https://tiptap.dev)
- [tldraw Documentation](https://tldraw.dev)
- [BlockNote Documentation](https://www.blocknotejs.org)

## License

Apache-2.0
