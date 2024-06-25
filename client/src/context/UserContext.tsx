import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserData } from "../types";

export const UserContext = createContext<
  [UserData, Dispatch<SetStateAction<UserData>> | null]
>([
  {
    id: 0,
    name: "",
    email: "",
  },
  null,
]);
