import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";
import AuthLayout from "../AuthLayout";
import ChannelsList from "./ChannelsList";
import DirectMessagesList from "./DirectMessagesList";

export default function Workspace({ children }: PropsWithChildren) {
    const { workspace } = usePage().props;

    return (
        <AuthLayout>
            <div className="flex flex-row">
                <div className="min-w-80 flex flex-col gap-4">
                    <ChannelsList workspace={workspace} />
                    <DirectMessagesList workspace={workspace} />
                </div>
                <div>{children}</div>
            </div>
        </AuthLayout>
    );
}
