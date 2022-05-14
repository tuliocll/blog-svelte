import { writable } from "svelte/store";

export const blogInfoStore = writable({
  blogName: "",
  aboutMe: "",
  profilePicture: "",
  pages: [],
  socialLinks: [],
  blogSubtitle: "",
  newsletterText: "",
});
