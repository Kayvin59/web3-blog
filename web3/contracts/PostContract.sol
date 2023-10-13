// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PostContract {
    struct Post {
        uint postId;
        address owner;
        string postContent;
        bool isDeleted;
    }

    event AddPost(address owner, uint postId);
    event DeletePost(uint postId, bool isDeleted);

    mapping(uint => address) blogOwners;
    Post[] private posts;

    function addPost(string memory postContent) external {
        uint postId = posts.length;
        address owner = msg.sender;
        posts.push(Post(postId, owner, postContent, false));
        blogOwners[postId] = owner;
        emit AddPost(owner, postId);
    }

    function deletePost(uint postId) external {
        require(blogOwners[postId] == msg.sender, "Only owner can delete post");
        posts[postId].isDeleted = true;
        emit DeletePost(postId, true);
    }

    function getPosts() external view returns (Post[] memory){
        Post[] memory temporary = new Post[](posts.length);
        uint counter = 0;
        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].isDeleted == false) {
                temporary[counter] = posts[i];
                counter++;
            }
        }
        Post[] memory result = new Post[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
}