import { createContext } from "react";

export const userContext = createContext(
  { email: "", setEmail: () => {} },
  { name: "", setName: () => {} }
  // { profilPicture: "", setProfilPicture: () => {} }
);
