declare namespace App.Data {
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
    };
}
