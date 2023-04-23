import { Card, Post } from "@/components/Card";
import { Select } from "@/components/Select";
import { Tabs } from "@/components/Tabs";
import { Header } from "@/components/header";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

type Page = {
  hits: Post[];
};

const fetcher = async (url: string) => {
  const data = await fetch(url).then<Page>((res) => res.json());
  return data.hits.filter(hasRequiredProperties);
};

function hasRequiredProperties(x: Post): boolean {
  return [x.author, x.created_at, x.story_title, x.story_url].every((x) =>
    Boolean(x)
  );
}

const NextPageHacker = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);

  const [query, setQuery] = useState("");

  const page = 0;
  const { data: posts } = useSWR<Post[]>(
    `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`,
    fetcher
  );

  const toggleFavorite = (post: Post, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoritePosts((prev) => prev.filter((x) => x !== post));
    } else {
      setFavoritePosts((prev) => [...prev, post]);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #ececec -32%, #fff 124%)",
        height: "100vh",
      }}
    >
      <Head>
        <title>Hacker news</title>
      </Head>
      <Header />
      <div className="py-16 flex justify-center">
        <Tabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
      <div className="container mx-auto px-36">
        <div className="pb-4">
          <Select
            placeholder="Select your news"
            value={query}
            onSelect={setQuery}
          />
        </div>

        <div className="posts py-4">
          {posts &&
            posts.map((post, index) => (
              <Card
                key={index}
                post={post}
                isFavorite={favoritePosts.includes(post)}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </div>
      <style jsx>{`
        .posts {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 2rem;
        }
      `}</style>
    </div>
  );
};

export default NextPageHacker;
