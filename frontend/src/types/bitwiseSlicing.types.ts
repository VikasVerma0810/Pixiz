// bitwiseSlicing.types.ts

import { Dispatch, SetStateAction } from "react";

export interface IBitwiseSlicing {
  threshold: number;
  image?: string;
  setImage: Dispatch<SetStateAction<string>>;
}
