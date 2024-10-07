import WorkspaceLayout from "@/Layouts/WorkspaceLayout/index";
import { useRef } from "react";
import SendMessageBar from "./SendMessageBar";
import Message from "./Message";

const Channel = ({ channel }: { channel: App.Data.ChannelData }) => {
    const messages = channel.messages || [];

    const messageListRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-4 h-full">
            <div
                ref={messageListRef}
                className="w-full flex flex-col-reverse overflow-y-scroll flex-grow gap-2"
            >
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <SendMessageBar
                className=""
                channel={channel}
                onSuccess={() =>
                    messageListRef.current?.scroll({
                        top: 0,
                        behavior: "instant",
                    })
                }
            />
        </div>
    );
};

Channel.layout = (page: any) => <WorkspaceLayout children={page} />;

export default Channel;
