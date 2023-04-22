export const Search = () => {
  return (
    <div style={{ margin: "20px 0px 20px 122px" }}>
      <select className="text-gray-400 search" placeholder="Select your news">
        <option value="">Select your news</option>
        <option value="all">Angular</option>
        <option value="2020">Reacts</option>
        <option value="2019">Vuejs</option>
      </select>
      <style jsx>{`
        .search {
          width: 30%;
          padding: 8px;
          appearance: none;
          outline: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
