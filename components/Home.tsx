import { Card, Post } from "@/components/Card";
import { Select } from "@/components/Select";
import { TabValues, Tabs } from "@/components/Tabs";
import { Header } from "@/components/header";
import Head from "next/head";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useLocalStorage } from "usehooks-ts";

type Page = {
  hits: Post[];
};

function hasRequiredProperties(x: Post): boolean {
  return [x.author, x.created_at, x.story_title, x.story_url].every((x) =>
    Boolean(x)
  );
}

const fetcher = (url: string) => fetch(url).then<Page>((res) => res.json());

export const Home = () => {
  const [activeTab, setActiveTab] = useLocalStorage<TabValues>(
    "activeTab",
    "all"
  );
  const [favoritePosts, setFavoritePosts] = useLocalStorage<Post[]>(
    "favoritePosts",
    []
  );

  const [query, setQuery] = useState("");

  const { data, size, setSize } = useSWRInfinite((pageIndex) => {
    return (
      "https://hn.algolia.com/api/v1/search_by_date?" +
      new URLSearchParams({ query, page: String(pageIndex) })
    );
  }, fetcher);
  const postPages = activeTab === "all" ? data : [{ hits: favoritePosts }];

  const toggleFavorite = (post: Post, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoritePosts((prev) =>
        prev.filter((x) => x.objectID !== post.objectID)
      );
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
        {activeTab === "all" && (
          <div className="pb-4">
            <Select
              placeholder="Select your news"
              value={query}
              onSelect={setQuery}
            />
          </div>
        )}

        <div className="posts py-4">
          {postPages?.map(
            (posts) =>
              posts &&
              posts.hits
                .filter(hasRequiredProperties)
                .map((post, index) => (
                  <Card
                    key={index}
                    post={post}
                    isFavorite={favoritePosts
                      .map((x) => x.objectID)
                      .includes(post.objectID)}
                    toggleFavorite={toggleFavorite}
                  />
                ))
          )}
        </div>
        <div>
          <button onClick={() => setSize(size + 1)}>Load More</button>
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
