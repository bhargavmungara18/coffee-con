const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();

        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });
    //Event handler for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    //check the initial url
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        //remove this as we load contest from the template
        // pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        // pageElement.textContent = "Your Order";
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("h1");
          // pageElement.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement) {
      // document.querySelector("main").children[0].remove();
      const cache = document.querySelector("main");
      cache.textContent = "";
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
