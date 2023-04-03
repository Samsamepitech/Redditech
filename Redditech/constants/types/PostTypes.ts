import { CommentTypes } from "./CommentTypes";
import { RVotes } from "./RVotes";

export interface PostTypes {
    id: string;
    avatarIcon: any;
    community: string;
    author: string;
    publishDate: number;
    upvotes: number;
    myVote: RVotes;
    extras?: string;
    comments?: Array<CommentTypes>;
  }