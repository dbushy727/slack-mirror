import WorkspaceLayout from "@/Layouts/WorkspaceLayout/index";
import { useEffect, useRef } from "react";
import SendMessageBar from "./SendMessageBar";
import Message from "./Message";
import { router } from "@inertiajs/react";

const Channel = ({ channel }: { channel: App.Data.ChannelData }) => {
    const messages = channel.messages || [];

    useEffect(() => {
        window.Echo.private(`channels.${channel.id}`).listen(
            "MessageSent",
            (e: any) => {
                router.reload();
            }
        );

        return () => {
            window.Echo.private(`channels.${channel.id}`).stopListening(
                "MessageSent"
            );
        };
    }, []);

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
