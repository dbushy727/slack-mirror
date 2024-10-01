import WorkspaceLayout from "@/Layouts/WorkspaceLayout";
import { Head } from "@inertiajs/react";

export default function Workspace({
    workspace,
}: {
    workspace: App.Data.WorkspaceData;
}) {
    return (
        <WorkspaceLayout workspace={workspace}>
            <Head title={workspace.name} />

            <div className="flex flex-row">
                <div className="min-w-80 flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl">Channels</h2>
                        {workspace.channels.map((channel) => (
                            <div key={channel.id}>
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
                <div>content</div>
            </div>
        </WorkspaceLayout>
    );
}
