import { Dispatch, SetStateAction } from "react";

export interface IBlur {
    radius: number;
    image?: string;
    setImage: Dispatch<SetStateAction<string>>;
}