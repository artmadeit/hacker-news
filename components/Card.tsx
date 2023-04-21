import Image from "next/image";
import favorite from "../public/images/favorite.svg";
import time from "../public/images/time.svg";

export type Post = {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
};

export const Card = ({ post }: { post: Post }) => {
  return (
    <div className="card">
      <div>
        <div className="flex align-items title">
          <Image src={time} alt="favorite" />
          <div className="pl-2">3 hours ago by {post.author}</div>
        </div>
        <p>{post.story_title}</p>
      </div>
      <div className="favorite-container">
        <Image src={favorite} alt="favorite" width={24} height={24} />
      </div>

      <style jsx>{`
        .favorite-container {
          width: 4.25rem;
          padding: 2.188rem 1.375rem 2.063rem;
          border-radius: 6px;
          border: solid 1px #f5f5f5;
          background-color: #f5f5f5;
        }

        .card {
          display: flex;
          padding-left: 1.625rem;
          margin: 1rem;
          width: 34.375rem;
          border-radius: 6px;
          border: solid 1px #979797;
          background-color: #fff;
        }

        p {
          width: 27.5rem;
          height: 2.5rem;
          margin: 0.375rem 1rem 0.875rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.43;
          letter-spacing: 0.25px;
          color: var(--brownish-grey);
        }

        .title {
          padding-top: 1rem;
          font-family: Roboto;
          font-size: 0.7rem;
          color: #767676;
        }
      `}</style>
    </div>
  );
};
