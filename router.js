import { renderRequests } from "./views/requests.js";
import { renderRequestDetail } from "./views/requestDetail.js";

const routes = {
  "/requests": renderRequests,
};

export function router() {
  const path = location.pathname;

  if (path.startsWith("/requests/")) {
    const id = path.split("/")[2];
    renderRequestDetail(id);
    return;
  }

  const view = routes[path] || renderRequests;
  view();
}

export function navigate(url) {
  history.pushState(null, "", url);
  router();
}

window.addEventListener("popstate", router);
