// hue.types.ts

import { Dispatch, SetStateAction } from "react";

export interface IHue {
  angle: number;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}
