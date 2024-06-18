import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, newsUrl, urlImage, author, publishedAt, source } =
      this.props;

    return (
      <div>
        <div className="card my-2" style={{ height: "25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>

          <img
            src={
              !urlImage
                ? "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/e0779c3eaae434d885e6570eb49d6dcc.png"
                : urlImage
            }
            style={{ height: "50%", width: "100%" }}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text" style={{ color: "purple" }}>
              By {author ? author : "unknown"} on{" "}
              {new Date(publishedAt).toGMTString()}
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
