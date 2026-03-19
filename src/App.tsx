import { useEffect, useMemo, useState } from "react";
import ChatPage from "./components/ChatPage";
import type { ChatMessage } from "./components/MessageBubble";
import JoinRoom from "./components/JoinRoom";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [activeRoomCode, setActiveRoomCode] = useState("");
    const [isInRoom, setIsInRoom] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [ws, setWs] = useState<WebSocket>();

    async function fetchMessages(value: string) {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/messages/${value}`,
            );

            setMessages(response.data.messages);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        const webSocket = new WebSocket("ws://localhost:3000");
        setWs(webSocket);

        webSocket.onopen = () => {
            console.log("Connected to the websocket server");
        };

        webSocket.onmessage = (message) => {
            const messageData = JSON.parse(message.data);
            if (messageData.type === "chat") {
                setMessages((prevMesssages) => [
                    ...prevMesssages,
                    {
                        id: 123, //see thiss
                        username: messageData.payload.username,
                        message: messageData.payload.message,
                        createdAt: messageData.payload.createdAt,
                    },
                ]);
            }
        };

        webSocket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        //cleanup on unmount
        return () => webSocket.close();
    }, []);

    const onlineUsers = useMemo(() => {
        return Math.max(2, Math.min(12, username.trim().length + 3));
    }, [username]);

    const ensureUsername = () => {
        const normalized = username.trim();
        if (!normalized) {
            setUsername("Guest");
            return "Guest";
        }
        return normalized;
    };

    const handleCreateRoom = () => {
        ensureUsername();
        const newRoomCode = String(Math.floor(100 + Math.random() * 900));
        setActiveRoomCode(newRoomCode);
        const obj = {
            type: "join",
            payload: {
                roomId: newRoomCode,
                username: username,
            },
        };
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
        setMessages([]);
        setIsInRoom(true);
    };

    const handleJoinRoom = async () => {
        ensureUsername();
        const normalizedRoomCode = roomCode.trim() || "123";
        const toastId = toast.loading("Joining the room...");
        try {
            setActiveRoomCode(normalizedRoomCode);
            const obj = {
                type: "join",
                payload: {
                    roomId: normalizedRoomCode,
                    username: username,
                },
            };
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(obj));
            }
            await fetchMessages(normalizedRoomCode);
            toast.success("Joined successfully", { id: toastId });
            setIsInRoom(true);
        } catch (error) {
            toast.error("Failed to join room", { id: toastId });
        }
    };

    const handleLeaveRoom = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const obj = {
                type: "leave",
                payload: {
                    roomId: activeRoomCode,
                    username: username,
                },
            };
            ws.send(JSON.stringify(obj));
        }
        setMessages([]);
        setIsInRoom(false);
        setRoomCode("");
    };

    const handleSendMessage = (value: string) => {
        const obj = {
            type: "chat",
            payload: {
                roomId: activeRoomCode,
                message: value,
            },
        };
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj));
        }
    };

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-28 top-[-7rem] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-24 right-[-4rem] h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
            </div>

            <section
                className={`absolute inset-0 mx-auto flex w-full items-center justify-center p-4 transition-all duration-500 sm:p-6 ${
                    isInRoom
                        ? "pointer-events-none translate-y-6 opacity-0"
                        : "translate-y-0 opacity-100"
                }`}
            >
                <JoinRoom
                    username={username}
                    roomCode={roomCode}
                    onUsernameChange={setUsername}
                    onRoomCodeChange={setRoomCode}
                    onCreateRoom={handleCreateRoom}
                    onJoinRoom={handleJoinRoom}
                />
            </section>

            <section
                className={`absolute inset-0 mx-auto flex h-full w-full items-center justify-center p-4 transition-all duration-500 sm:p-6 ${
                    isInRoom
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-6 opacity-0"
                }`}
            >
                <div className="h-[calc(100vh-2rem)] w-full max-w-4xl md:h-[calc(100vh-3rem)]">
                    <ChatPage
                        roomName={`Room #${activeRoomCode || "123"}`}
                        onlineUsers={onlineUsers}
                        currentUser={username.trim() || "Guest"}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onLeaveRoom={handleLeaveRoom}
                    />
                </div>
            </section>
        </main>
    );
}

export default App;
