import { useContext } from "react";
import { IntersectContext } from "../IntersectContext";
export const useIntersections = () => useContext(IntersectContext);
