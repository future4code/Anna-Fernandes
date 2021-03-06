import React, { useState } from "react";
import "./App.css";
import { Post } from "./components/Post";

const App = () => {
  const [postsList, setPostsList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const addPost = () => {
    // Adiciona um post à lista
    if ( inputValue !== "") {
      const newPost = {
        id: Date.now(),
        text: inputValue,
        liked: false
      };
  
      const newPostsList = [newPost, ...postsList];
  
      setPostsList(newPostsList);
      setInputValue("");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  const deletePost = postId => {
    // Apaga um post da lista
    const newPostsList = postsList.filter(post => {
      return postId !== post.id;
    });

    setPostsList(newPostsList);
  };

  const toggleLike = postId => {
    // Altera o status de curtida de um post da lista
    const newPostsList = postsList.map(post => {
      if (postId === post.id) {
        const novoPost = {
          ...post,
          liked: !post.liked
        };
        return novoPost;
      } else {
        return post;
      }
    });

    setPostsList(newPostsList);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          onChange={onChangeInput}
          value={inputValue}
          placeholder={"Novo post"}
        />
        <button onClick={addPost}>Adicionar</button>
      </div>
      <br />
      {errorMessage && <p>O texto não pode estar em branco.</p>}
      {postsList.length !== 0 && <>
      <p>Quantidade de posts: {postsList.length}</p>
        {postsList.map(post => {
        return (
          <Post
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            deletePost={deletePost}
          />
        );
      })}
      </>
      }
      {postsList.length === 0 && <p>Não há posts.</p>}
    </div>
  );
};

export default App;
