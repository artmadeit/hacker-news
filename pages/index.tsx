import { Card, Post } from "@/components/Card";
import { Search } from "@/components/Search";
import { Tabs } from "@/components/Tabs";
import { Header } from "@/components/header";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  return data.hits;
};

const NextPageHacker = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);

  const query = "angular";
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
      <div>
        <Search/>
      </div>
      <div>
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
  );
};

export default NextPageHacker;
