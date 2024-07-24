import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const PostPage = ({ setPosts, posts, handleDelete, handleEdit }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState();
  const [edit, setEdit] = useState();

  function handleEdit(id) {
    const editPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title,
          body,
        };
      } else {
        return post;
      }
    });
    setPosts(editPosts);
    setEdit(false);
  }

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            {edit ? (
              <input
                className="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h2>{post.title}</h2>
            )}

            <p className="postDate">{post.datetime}</p>
            {edit ? (
              <textarea
                className="title-input"
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            ) : (
              <p className="postBody">{post.body}</p>
            )}
            <div className="postButtons">
              <button onClick={() => handleDelete(post.id)}>Delete Post</button>
              <button
                style={{ backgroundColor: edit ? "green" : "blue" }}
                onClick={() => {
                  setEdit(!edit);
                  if (edit) {
                    handleEdit(post.id);
                  }
                }}
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
