import { useEffect, useRef, useState } from "react";

export default function Content({ channelId }: { channelId?: number }) {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ReturnType<typeof cannedMessages>>(
        []
    );

    useEffect(() => {
        if (!channelId) {
            return;
        }

        setMessages([]);
        setLoading(true);
        getMessagesForChannelId(channelId)
            .then((m) => setMessages(m))
            .finally(() => setLoading(false));
    }, [channelId]);

    const messageInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            {channelId ? (
                <div>
                    {loading ? <div>Loading...</div> : null}
                    {messages.map((message) => (
                        <div>
                            <div>{message.user.name}</div>
                            <div>{message.content}</div>
                            <div>{message.created_at}</div>
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            name="message"
                            ref={messageInputRef}
                        />
                        <button
                            className="btn"
                            onClick={() => {
                                const message = messageInputRef.current?.value;

                                if (!message) {
                                    return;
                                }

                                sendMessage(message).then((m) => {
                                    setMessages((prev) => [...prev, m]);
                                    messageInputRef.current!.value = "";
                                });
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <div>empty state</div>
            )}
        </div>
    );
}

const cannedMessages = (channelId: number) => [
    {
        id: 1,
        content: `Hello world from channel ${channelId}`,
        created_at: "2021-08-01T00:00:00",
        user: {
            id: 1,
            name: "John Doe",
        },
    },
];

async function getMessagesForChannelId(
    channelId: number
): Promise<ReturnType<typeof cannedMessages>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(cannedMessages(channelId));
        }, 1000);
    });
}

async function sendMessage(
    message: string
): Promise<ReturnType<typeof cannedMessages>[0]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 2,
                content: message,
                created_at: new Date().toISOString(),
                user: {
                    id: 1,
                    name: "John Doe",
                },
            });
        }, 100);
    });
}
