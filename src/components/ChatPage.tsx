import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "./MessageBubble";
import MessageInput from "./MessageInput";

type ChatPageProps = {
    roomName: string;

    currentUser: string;
    messages: ChatMessage[];
    onSendMessage: (value: string) => void;
    onLeaveRoom: () => void;
};

function ChatPage({
    roomName,

    currentUser,
    messages,
    onSendMessage,
    onLeaveRoom,
}: ChatPageProps) {
    return (
        <div className="flex h-full min-h-0 w-full max-w-4xl flex-col rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-2xl shadow-black/30 backdrop-blur md:p-6">
            <header className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div>
                    <h2 className="font-display text-lg font-semibold text-slate-100 md:text-xl">
                        {roomName}
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onLeaveRoom}
                    className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-slate-500 hover:text-slate-100 md:text-sm"
                >
                    Leave
                </button>
            </header>

            <div className="mb-4 min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                {messages.length === 0 ? (
                    <div className="grid h-full min-h-56 place-items-center rounded-xl border border-dashed border-slate-700/70">
                        <p className="text-sm text-slate-400">
                            No messages yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((message, index) => (
                            <MessageBubble
                                key={index}
                                message={message}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                )}
            </div>

            <MessageInput onSend={onSendMessage} />
        </div>
    );
}

export default ChatPage;
