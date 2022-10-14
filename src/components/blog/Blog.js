import "./Blog.css";

import { HeroButton } from "../../components";
import { serverUrl, baseUrl } from "../../config";

function Blog({
  blogTitle,
  blogDetails,
  blogDescription,
  blogImage,
  postId,
  button,
  handleDelete,
  LoggedIn,
}) {
  function imageExists(image_url) {
    const http = new XMLHttpRequest();

    http.open("GET", image_url, false);
    http.send();

    return http.status !== 404;
  }

  return (
    <div className={LoggedIn ? `Blog` : `Blog not__logged-in`}>
      <h3>{blogTitle}</h3>
      <p className="Blog__upload-details">{blogDetails}</p>
      <div className="Blog__image-and_buttons">
        <div className="Blog__image">
          <img
            src={
              imageExists(`${serverUrl}images/${blogImage}`)
                ? `/images/${blogImage}`
                : `/images/default.jpeg`
            }
            alt="Flexibility"
            img-className={`${serverUrl}images/${blogImage}`}
          />
        </div>
        {button === "false" || LoggedIn === false ? null : (
          <div className="buttons">
            <HeroButton
              redirectTo={`/blogs/edit/${postId}`}
              buttonValue="Edit"
              iconClass="fas fa-pencil"
            />
            <HeroButton
              redirectTo={`#`}
              buttonValue="Delete"
              iconClass="fas fa-trash"
              handleClick={() => {
                handleDelete(postId);
              }}
            />
          </div>
        )}
      </div>

      <p
        className="Blog__description"
        dangerouslySetInnerHTML={{
          __html: blogDescription.replaceAll("\n", "<br>"),
        }}
      ></p>
      {button === "false" ? null : (
        <HeroButton
          redirectTo={"/blogs/individual/" + postId}
          buttonValue="Read More"
          iconClass="fa-solid fa-angles-right"
        />
      )}
    </div>
  );
}

export default Blog;
