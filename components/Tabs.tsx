export const Tabs = () => {
  return (
    <div>
      <button className="rectangle isActive">All</button>
      <button className="rectangle">My faves</button>
      <style jsx>{`
        .rectangle {
          width: 6.125rem;
          height: 1.938rem;
          border-radius: 2px;
          border: solid 1px #d6d6d6;
          color: #606060;
        }

        .isActive {
          color: var(--azure);
          border: solid 1px var(--azure);
        }
      `}</style>
    </div>
  );
};
