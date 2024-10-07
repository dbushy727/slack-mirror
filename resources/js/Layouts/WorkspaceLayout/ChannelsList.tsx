import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import { Link } from "@inertiajs/react";
import { cn } from "@/utils";

export default function ChannelsList({
    workspace,
}: {
    workspace: App.Data.WorkspaceData;
}) {
    const [showingCreateChannelModal, setShowingCreateChannelModal] =
        useState(false);

    return (
        <div>
            <CreateChannelModal
                workspace={workspace}
                show={showingCreateChannelModal}
                onClose={() => setShowingCreateChannelModal(false)}
            />
            <h2 className="text-xl">
                Channels{" "}
                <SecondaryButton
                    onClick={() => setShowingCreateChannelModal(true)}
                >
                    +
                </SecondaryButton>
            </h2>
            {workspace.channels.map((channel) => (
                <Link
                    key={channel.id}
                    href={route("channels.show", {
                        workspace: workspace.slug,
                        channel: channel.id,
                    })}
                >
                    <div
                        key={channel.id}
                        className={cn(
                            route().current("channels.show", {
                                workspace: workspace.slug,
                                channel: channel.id,
                            }) && ["bg-emerald-800", "text-white"]
                        )}
                    >
                        {channel.type === "private_channel" && (
                            <span>[private]</span>
                        )}{" "}
                        {channel.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}
