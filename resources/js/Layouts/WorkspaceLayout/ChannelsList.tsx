import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import { Link } from "@inertiajs/react";
import clsx from "clsx";

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
                        className={clsx(
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
