
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

const PostPage = ({ setPosts, posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [edit, setEdit] = useState(false);

  const handleEdit = (id) => {
    const editPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title,
          body,
          editDatetime: format(new Date(), "MMMM dd, yyyy pp"),
        };
      } else {
        return post;
      }
    });
    setPosts(editPosts);
    setEdit(false);
  };

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
            {post.editDatetime && (
              <p className="editDate">Edited on: {post.editDatetime}</p>
            )}
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
