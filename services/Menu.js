import API from "./API.JS";

export async function loadData() {
  app.store.menu = await API.fetchMenu();
}
