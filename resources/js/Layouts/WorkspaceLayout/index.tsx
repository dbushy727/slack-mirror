import SecondaryButton from "@/Components/SecondaryButton";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { PropsWithChildren, useState } from "react";
import AuthLayout from "../AuthLayout";
import CreateChannelModal from "./CreateChannelModal";

export default function Workspace({ children }: PropsWithChildren) {
    const { workspace } = usePage().props;

    const [showingCreateChannelModal, setShowingCreateChannelModal] =
        useState(false);

    return (
        <AuthLayout>
            <CreateChannelModal
                workspace={workspace}
                show={showingCreateChannelModal}
                onClose={() => setShowingCreateChannelModal(false)}
            />

            <div className="flex flex-row">
                <div className="min-w-80 flex flex-col gap-4">
                    <div>
                        <h2 className="text-xl">
                            Channels{" "}
                            <SecondaryButton
                                onClick={() =>
                                    setShowingCreateChannelModal(true)
                                }
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
                    <div>
                        <h2 className="text-xl">Direct Messages</h2>
                        {workspace.users.map((user) => (
                            <div key={user.id}>{user.name}</div>
                        ))}
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </AuthLayout>
    );
}
