export type Post = {
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
};

export const Card = ({ post }: { post: Post }) => {
  return (
    <div>
      <div className="title">3 hours ago by {post.author}</div>
      <p>{post.story_title}</p>
      <style jsx>{`
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
          height: 0.813rem;
          margin: 1rem 20.313rem 0.438rem 0.5rem;
          font-family: Roboto;
          font-size: 0.688rem;
          color: #767676;
        }
      `}</style>
    </div>
  );
};
