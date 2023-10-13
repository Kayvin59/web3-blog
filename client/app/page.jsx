"use client"

import { useState, useEffect, useCallback } from "react";
import { useContract, useContractWrite, useAddress, useMetamask } from "@thirdweb-dev/react";
import Navbar from "@/components/Navbar";
import Form from "@/components/Form";
import Post from "@/components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);

  const connect = useMetamask();
  const address = useAddress();
  const { contract } = useContract("0x89F8f1A473a473e6E12A0607FD3934709496Ce6c")
  const { mutateAsync: addPost, isLoading: addPostIsLoading } = useContractWrite(contract, "addPost")
  const { mutateAsync: deletePost, isLoading: deletePostIsLoading } = useContractWrite(contract, "deletePost")
  const getPosts = useCallback(async () => {
    try {
      const data = await contract.call("getPosts");
      const parsedPosts = data.map((post) => ({
        owner: post.owner,
        postContent: post.postContent,
        id: post.postId.toNumber()
      }))
      setPosts(parsedPosts);
    }
    catch (error) {
      console.error("contract call failure", error);
    }
  }, [contract])

  const publishPost = async () => {
    console.log("publishPostText", text);
    if(text.length > 0 && contract) {
      console.log("contract:", contract);
      try {
        setPublishLoading(true);
        const data = await addPost({ args: [text] });
        console.info("contract call successs:", data);
        await getPosts();
        setText("");
      } catch (error) {
        console.error("contract call failure", error);
      } finally {
        setPublishLoading(false);
      }
    }
  }

  const removePost = async (id) => {
    try {
      const data = await deletePost({ args: [id] });
      console.log("contract call successs", data);
      await getPosts();
    } catch (error) {
      console.error("contract call failure", error);
    }
  }

  useEffect(() => {
    if(contract) {
      getPosts();
    }
  }, [contract, address, getPosts]);

  return (
    <div className="bg-[#eff2f5] flex flex-col min-h-screen">
      <Navbar
        connect={connect}
        address={address}
      />
      <div className="pt-12 pb-6 flex flex-col items-center justify-center">
        <h1>Hello</h1>
        <h2>{address}</h2>
        <Form 
            address={address}
            text={text}
            setText={setText}
            publishPost={publishPost}
        />
        {addPostIsLoading && (
          <p>Post is Loading...</p>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            owner={post.owner}
            address={address}
            postContent={post.postContent}
            removePost={removePost}
          />
        ))}
      </div>
    </div>  
  )
}
