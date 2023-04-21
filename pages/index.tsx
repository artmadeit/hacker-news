import { Tabs } from "@/components/Tabs";
import { Header } from "@/components/header";

const NextPageHacker = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #ececec -32%, #fff 124%)",
        height: "100vh",
      }}
    >
      <Header />
      <div className="py-16 flex justify-center">
        <Tabs />
      </div>
    </div>
  );
};

export default NextPageHacker;
