import { useState } from "react";
import type { FormEvent } from "react";

type MessageInputProps = {
    onSend: (value: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalized = value.trim();

        if (!normalized) {
            return;
        }

        onSend(normalized);
        setValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 shadow-xl shadow-black/20 backdrop-blur"
        >
            <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Write a message"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
            <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
                Send →
            </button>
        </form>
    );
}

export default MessageInput;
