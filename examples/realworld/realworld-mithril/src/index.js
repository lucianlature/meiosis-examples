import m from "mithril";
import stream from "mithril/stream";
import { assoc, assocPath, merge } from "ramda";

import { articleDetail } from "./articleDetail";
import { articleEdit } from "./articleEdit";
import { page } from "./page";
import { layout } from "./layout";
import { login } from "./login";
import { profile } from "./profile";
import { register } from "./register";
import { settings } from "./settings";
import { initServices } from "./services";
import { credentialsApi } from "realworld-common/src/services";
import { nestComponent, viewModel } from "./util";

// Only for development, to use the Meiosis Tracer as a Chrome extension.
import { trace } from "meiosis";

initServices();

credentialsApi.getUser().then(user => {
  const applyUpdate = (model, modelUpdate) => modelUpdate(model);

  const initialModel = {
    article: {},
    articles: [],
    articlesFilter: {
      limit: 10,
      offset: 0,
      tagFilter: ""
    },
    login: {},
    page: "Home",
    profile: {},
    register: {},
    user,
    tags: []
  };

  const update = stream();
  const models = stream.scan(applyUpdate, initialModel, update);
  const viewModels = models.map(viewModel);

  const Layout = layout.create(viewModels, update);
  const Profile = profile.create(update);
  const ArticleDetail = articleDetail.create(update);
  const ArticleEdit = nestComponent(articleEdit.create, update, ["article"]);

  const pageActions = page.createActions(update);

  m.route.prefix("#");

  const stub = document.createElement("div");
  const noRender = { render: () => null };

  m.route(stub, "/", {
    "/": merge({
      onmatch: pageActions.homePage
    }, noRender),
    "/article/:slug": merge({
      onmatch: params => pageActions.articleDetailPage(params.slug)
    }, noRender),
    "/editor": merge({
      onmatch: pageActions.articleEditPage
    }, noRender),
    "/editor/:slug": {
      onmatch: params => ArticleDetail.init(params.slug).then(() => update(
        model => assocPath(["article", "tags"], model.article.tagList.join(" "), model)
      )),
      render: () => m(Layout, { component: ArticleEdit, page: "articleEdit" })
    },
    "/login": merge({
      onmatch: pageActions.loginPage
    }, noRender),
    "/profile/:username": {
      onmatch: params => Profile.init(params.username, false),
      render: () => m(Layout, { component: Profile, favorites: false })
    },
    "/profile/:username/favorites": {
      onmatch: params => Profile.init(params.username, true),
      render: () => m(Layout, { component: Profile, favorites: true })
    },
    "/register": merge({
      onmatch: pageActions.registerPage
    }, noRender),
    "/settings": merge({
      onmatch: pageActions.settingsPage
    }, noRender)
  });

  const element = document.getElementById("app");
  const view = page.create(update);
  viewModels.map(model => m.render(element, view(model)));

  // Only for development, to use the Meiosis Tracer as a Chrome extension.
  trace({ update, dataStreams: [ models, viewModels ] });
});
