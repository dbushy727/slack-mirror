export default function DirectMessagesList({
    workspace,
}: {
    workspace: App.Data.WorkspaceData;
}) {
    return (
        <div>
            <h2 className="text-xl">Direct Messages</h2>
            {workspace.users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
}
