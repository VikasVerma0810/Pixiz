// contrast.types.ts

import { Dispatch, SetStateAction } from "react";

export interface IContrast {
    value: number;
    image?: string;
    setImage: Dispatch<SetStateAction<string>>;
}
