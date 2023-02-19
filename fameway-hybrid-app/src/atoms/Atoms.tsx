import { atom } from "jotai";

export const cartState = atom({
  key: "cartState",
  default: [{}],
});

export const userAtom = atom({});

export const currentUserState = atom({
  key: "currentUser",
  default: {
    id: "auth0|63e78162835490f0aed9f8ca",
    email: "",
    verifiedEmail: true,
    name: "John Doe",
    nickname: "johndoe",
    cartID: "",
  },
});
