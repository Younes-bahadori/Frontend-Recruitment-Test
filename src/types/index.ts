interface IUser {
    name: string;
    avatar?: string;
}

export interface IComment {
    id: number;
    date: number;
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
}

export interface IProps {
    comments: IComment[];
}

export interface IDiscussion extends IComment {
    replies: IComment[];
}

export interface IShowReply {
    [key: number]: {
        display: boolean
    }
}
