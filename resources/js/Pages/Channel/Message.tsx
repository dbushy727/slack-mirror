export default function Message({
    message,
}: {
    message: App.Data.MessageData;
}) {
    return (
        <div className="flex flex-col">
            <div>
                <span className="font-bold">{message.from.name}</span>
                <span className="text-xs">
                    {new Date(message.created_at).toLocaleTimeString(
                        undefined,
                        {
                            timeStyle: "short",
                        }
                    )}
                </span>
            </div>

            <div>{message.content}</div>
        </div>
    );
}
