declare namespace App.Data {
    export type ChannelData = {
        id: number;
        name: string;
        type: App.Enums.ChannelType;
        users: Array<App.Data.UserData>;
        messages?: Array<App.Data.MessageData>;
    };
    export type MessageData = {
        id: number;
        content: string;
        created_at: string;
        from: App.Data.UserData;
    };
    export type UserData = {
        id: number;
        name: string;
        email: string;
    };
    export type WorkspaceData = {
        id: number;
        name: string;
        slug: string;
        users: Array<App.Data.UserData>;
        channels: Array<App.Data.ChannelData>;
    };
}
declare namespace App.Enums {
    export type ChannelType =
        | "direct_message"
        | "public_channel"
        | "private_channel";
}
