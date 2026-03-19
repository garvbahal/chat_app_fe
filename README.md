# Pulse Chat Frontend

Modern realtime chat frontend built with React, TypeScript, Vite, and Tailwind CSS.

## Live Deployment

- Frontend: https://pulse-chat.live
- Backend API: https://api.pulse-chat.live

## Features

- Create room and join room flow
- Realtime chat updates via WebSocket
- Room message history loading
- Responsive dark UI
- Toast notifications for room actions

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- react-hot-toast

## Project Structure

```text
src/
	App.tsx
	main.tsx
	index.css
	components/
		JoinRoom.tsx
		ChatPage.tsx
		MessageBubble.tsx
		MessageInput.tsx
```

## Prerequisites

- Node.js 18+
- npm

## Environment Variables

Create a `.env` file in the frontend root.

### Local Development

```env
VITE_BACKEND_URL=http://localhost:4000/api/v1
```

### Production

```env
VITE_BACKEND_URL=https://api.pulse-chat.live/api/v1
```

## Install Dependencies

```bash
npm install
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Run Locally

```bash
npm run dev
```

Open:

- http://localhost:5173

## Application Flow

1. Enter username.
2. Create a room (auto-generated code) or join with an existing room code.
3. Client sends a `join` event over WebSocket.
4. Existing room messages are fetched from backend.
5. New messages are sent via WebSocket and rendered in realtime.

## Backend Endpoints Used by Frontend

- `GET /api/v1/messages/:roomId`
- WebSocket events: `join`, `chat`, `leave`

## Deployment Notes

- Frontend production URL: https://pulse-chat.live
- Backend production URL: https://api.pulse-chat.live
- Ensure backend CORS `FRONTEND_URL` matches frontend domain.

## Troubleshooting

- If chat history does not load, verify `VITE_BACKEND_URL` and backend health endpoint.
- If realtime messaging fails, check browser console for WebSocket connection errors.
- If CORS errors appear, confirm backend `FRONTEND_URL` includes the exact frontend URL.

## Future Improvements

- Add separate env vars for API and WebSocket URLs
- Improve timestamp formatting in message bubbles
- Add reconnect strategy for WebSocket disconnections
- Add typing indicators and unread message badges
