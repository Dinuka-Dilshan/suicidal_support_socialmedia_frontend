import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext([]);
const CreatePostContext = createContext([]);


export const usePosts = ()=>{
    return useContext(PostContext);
}

export const useCreatePosts = ()=>{
    return useContext(CreatePostContext);
}

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const posts = JSON.parse(localStorage.getItem("posts"));
      if (posts) {
        setPosts(posts);
      }
    } catch (error) {}
  }, []);

  const addPost = (post) => {
    setPosts((prev) => {
      localStorage.setItem("posts", JSON.stringify([...prev, post]));
      return [...prev, post];
    });
  };

  return (
    <PostContext.Provider value={posts}>
      <CreatePostContext.Provider value={addPost}>
        {children}
      </CreatePostContext.Provider>
    </PostContext.Provider>
  );
};

export default PostProvider;
