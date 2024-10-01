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
                <div className="min-w-80 flex flex-col">
                    {workspace.users.map((user) => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>
                <div>content</div>
            </div>
        </WorkspaceLayout>
    );
}
