import WorkspaceLayout from "@/Layouts/WorkspaceLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import clsx from "clsx";
import Content from "./Content";
export default function Workspace({
    workspace,
}: {
    workspace: App.Data.WorkspaceData;
}) {
    const [activeChannelId, setActiveChannelId] = useState<number>();

    return (
        <WorkspaceLayout workspace={workspace}>
            <Head title={workspace.name} />

            <div className="flex flex-row">
                <div className="min-w-80 flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl">Channels</h2>
                        {workspace.channels.map((channel) => (
                            <div
                                key={channel.id}
                                className={clsx(
                                    activeChannelId === channel.id && [
                                        "bg-emerald-800",
                                        "text-white",
                                    ]
                                )}
                                onClick={() => setActiveChannelId(channel.id)}
                            >
                                {channel.type === "private_channel" && (
                                    <span>[private]</span>
                                )}{" "}
                                {channel.name}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl">Direct Messages</h2>
                        {workspace.users.map((user) => (
                            <div key={user.id}>{user.name}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <Content channelId={activeChannelId} />
                </div>
            </div>
        </WorkspaceLayout>
    );
}
