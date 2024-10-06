import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function CreateChannelModal({
    workspace,
    show,
    onClose,
}: {
    workspace: App.Data.WorkspaceData;
    show: boolean;
    onClose: () => void;
}) {
    const { data, setData, post, processing, reset, errors } = useForm<{
        name: string;
        type: Exclude<App.Enums.ChannelType, "direct_message">;
    }>({
        name: "",
        type: "public_channel",
    });

    return (
        <Modal show={show} onClose={onClose}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(
                        route("channels.store", {
                            workspace: workspace.slug,
                            ...data,
                        }),
                        {
                            onSuccess: () => {
                                onClose();
                                reset();
                            },
                        }
                    );
                }}
                className="p-6"
            >
                <h2 className="text-lg font-medium text-gray-900">
                    Create a channel
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="e.g announcements"
                    />

                    <InputError message={errors.name} className="mt-2" />

                    <p className="mt-1 text-sm text-gray-600">
                        Channels are where conversations happen around a topic.
                        Use a name that is easy to find and understand.
                    </p>
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="name" value="Visibility" />

                    <RadioGroup
                        value={data.type}
                        onChange={(type) => setData("type", type)}
                        aria-label="channel type"
                    >
                        {Object.entries(channel_types).map(([type, label]) => (
                            <Field
                                key={type}
                                className="flex items-center gap-2"
                            >
                                <Radio
                                    value={type}
                                    className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                                >
                                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                                </Radio>
                                <Label>{label}</Label>
                            </Field>
                        ))}
                    </RadioGroup>

                    <InputError message={errors.type} className="mt-2" />

                    <p className="mt-1 text-sm text-gray-600">
                        Private channels can only be viewed or joined by
                        invitation
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

const channel_types: Record<
    Exclude<App.Enums.ChannelType, "direct_message">,
    string
> = {
    public_channel: "Public",
    private_channel: "Private",
};
