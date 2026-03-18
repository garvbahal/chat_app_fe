type JoinRoomProps = {
    username: string;
    roomCode: string;
    onUsernameChange: (value: string) => void;
    onRoomCodeChange: (value: string) => void;
    onCreateRoom: () => void;
    onJoinRoom: () => void;
};

function JoinRoom({
    username,
    roomCode,
    onUsernameChange,
    onRoomCodeChange,
    onCreateRoom,
    onJoinRoom,
}: JoinRoomProps) {
    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
            <div className="mb-8 text-center">
                <h1 className="font-display text-2xl font-semibold text-slate-100 md:text-3xl">
                    Pulse Chat
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Create or join a room in seconds
                </p>
            </div>

            <div className="space-y-6">
                <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">
                        Enter Username
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) =>
                            onUsernameChange(event.target.value)
                        }
                        placeholder="e.g. Alya"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                    />
                </label>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-300">
                        Create Room
                    </p>
                    <button
                        type="button"
                        onClick={onCreateRoom}
                        className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                    >
                        + Create Room
                    </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-300">
                        Join Room
                    </p>
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(event) =>
                                onRoomCodeChange(event.target.value)
                            }
                            placeholder="Enter Room Code"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                        />
                        <button
                            type="button"
                            onClick={onJoinRoom}
                            className="w-full rounded-xl bg-slate-800 px-4 py-3 font-medium text-slate-100 transition hover:bg-slate-700"
                        >
                            Join Room →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;
