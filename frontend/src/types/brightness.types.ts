import { Dispatch, SetStateAction } from "react";

export interface IBrightness {
    value: number;
    image?: string;
    setImage: Dispatch<SetStateAction<string>>;
}