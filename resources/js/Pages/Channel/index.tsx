import WorkspaceLayout from "@/Layouts/WorkspaceLayout";
import { useRef } from "react";

const Channel = ({ channel }: { channel: App.Data.ChannelData }) => {
    const messages = channel.messages || [];
    const messageInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <div>{message.from.name}</div>
                    <div>{message.content}</div>
                    <div>{message.created_at}</div>
                </div>
            ))}
            <div>
                <input type="text" name="message" ref={messageInputRef} />
                <button
                    className="btn"
                    onClick={() => {
                        const message = messageInputRef.current?.value;

                        if (!message) {
                            return;
                        }
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

Channel.layout = (page: any) => <WorkspaceLayout children={page} />;

export default Channel;
