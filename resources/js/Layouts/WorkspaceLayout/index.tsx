import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import AuthLayout from "../AuthLayout";
import ChannelsList from "./ChannelsList";
import DirectMessagesList from "./DirectMessagesList";

export default function Workspace({ children }: PropsWithChildren) {
    const { workspace } = usePage().props;

    return (
        <AuthLayout>
            <div className="flex flex-row">
                <div className="min-w-80 flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-4.5rem)]">
                    <ChannelsList workspace={workspace} />
                    <DirectMessagesList workspace={workspace} />
                </div>
                <div className="flex-grow flex flex-col h-[calc(100vh-4.5rem)]">
                    {children}
                </div>
            </div>
        </AuthLayout>
    );
}
