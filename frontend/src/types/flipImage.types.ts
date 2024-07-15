// flipImage.types.ts

import { Dispatch, SetStateAction } from "react";

export interface IFlipImage {
  direction: "horizontal" | "vertical";
  image?: string;
  setImage: Dispatch<SetStateAction<string>>;
}
