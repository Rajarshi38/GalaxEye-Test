import { createContext, useState } from "react";

export const IntersectContext = createContext();

const IntersectContextProvider = ({ children }) => {
  const [intersections, setIntersections] = useState(null);

  const value = {
    intersections,
    setIntersections,
  };

  return (
    <IntersectContext.Provider value={value}>
      {children}
    </IntersectContext.Provider>
  );
};

export default IntersectContextProvider;
