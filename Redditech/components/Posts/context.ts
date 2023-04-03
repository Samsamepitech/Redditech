import React, {useContext} from 'react';
import { PostTypes } from '../../constants/types/PostTypes';

interface ContextState {
  postData: PostTypes;
  setPostData: React.Dispatch<React.SetStateAction<PostTypes>> | (() => void);
}

export const PostContext = React.createContext<ContextState>({
  postData: {} as PostTypes,
  setPostData: () => {},
});

export const usePostContext = () => useContext(PostContext);