import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import { cn } from "@/utils";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";
import { BaseSyntheticEvent } from "react";

export default function SendMessageBar({
    channel,
    onSuccess,
    className,
}: {
    channel: App.Data.ChannelData;
    onSuccess?: () => void;
    className?: string;
}) {
    const {
        auth: { user },
    } = usePage().props;

    const { data, setData, post, reset, errors } = useForm({
        content: "",
    });

    function submit() {
        post(
            route("messages.store", {
                channel_id: channel.id,
                from_user_id: user.id,
                content: data.content,
            }),
            {
                onSuccess: () => {
                    onSuccess?.();
                    reset();
                },
            }
        );
    }

    return (
        <div className={className}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <div className="flex flex-row items-center gap-2 pr-2">
                    <div className="flex-grow flex flex-row relative rounded-md border border-gray-300 shadow-sm p-4">
                        <span
                            className="textarea outline-none block w-full empty:before:content-['abc'] empty:before:text-gray-500 min-h-14 max-h-32 overflow-y-scroll"
                            role="textbox"
                            contentEditable
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey &&
                                    !e.metaKey &&
                                    !e.ctrlKey
                                ) {
                                    e.preventDefault();
                                    if (data.content) {
                                        return submit();
                                    }
                                }
                            }}
                            onInput={(e: BaseSyntheticEvent) => {
                                setData("content", e.target.textContent);
                            }}
                        ></span>
                        <SecondaryButton
                            aria-label="Send message"
                            disabled={!data.content}
                            type="submit"
                            className={cn(
                                "absolute right-2 bottom-3 bg-transparent px-2",
                                data.content
                                    ? "text-blue-600"
                                    : "text-gray-300 border-none"
                            )}
                        >
                            <PaperAirplaneIcon className={"size-4"} />
                        </SecondaryButton>
                    </div>
                </div>
                <InputError message={errors.content} />
            </form>
        </div>
    );
}
