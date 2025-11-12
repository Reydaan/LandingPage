import { initHero } from "./components/hero.js";
import { initHeader } from "./components/header.js";
import { initGallery } from "./components/gallery.js";
import { initCollections } from "./components/collections.js";
import { initContact } from "./components/contact.js";
import { initWhatssap } from "./components/whatssap.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHero();
  initGallery();
  initCollections();
  initContact();
  initWhatssap();
});
