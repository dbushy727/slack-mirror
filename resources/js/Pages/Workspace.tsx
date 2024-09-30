import WorkspaceLayout from "@/Layouts/WorkspaceLayout";
import { Head } from "@inertiajs/react";

export default function Workspace({ workspace }: { workspace: any }) {
    return (
        <WorkspaceLayout workspace={workspace}>
            <Head title={workspace.name} />

            <div>toolbar</div>
            <div>
                <div>sidebar</div>
                <div>content</div>
            </div>
        </WorkspaceLayout>
    );
}
