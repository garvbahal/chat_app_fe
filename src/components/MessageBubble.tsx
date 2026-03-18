export type ChatMessage = {
    id: number;
    username: string;
    text: string;
    timestamp: string;
};

type MessageBubbleProps = {
    message: ChatMessage;
    currentUser: string;
};

function MessageBubble({ message, currentUser }: MessageBubbleProps) {
    const isCurrentUser = message.username === currentUser;

    return (
        <div
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
        >
            <article
                className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-lg sm:max-w-[70%] ${
                    isCurrentUser
                        ? "rounded-br-md bg-cyan-500/90 text-slate-950"
                        : "rounded-bl-md border border-slate-800 bg-slate-900/85 text-slate-100"
                }`}
            >
                <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-semibold">
                        {isCurrentUser ? "You" : message.username}
                    </span>
                    <span
                        className={`text-[11px] ${
                            isCurrentUser
                                ? "text-slate-900/80"
                                : "text-slate-400"
                        }`}
                    >
                        {message.timestamp}
                    </span>
                </div>
                <p className="text-sm leading-relaxed">{message.text}</p>
            </article>
        </div>
    );
}

export default MessageBubble;
