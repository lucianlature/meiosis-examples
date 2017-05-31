import m from "mithril";

import { home } from "./home";
import { coffee } from "./coffee";
import { books } from "./books";
import { bookSummary } from "./bookSummary";
import { bookDetails } from "./bookDetails";

export const app = {
  model: () => ({
    page: home.page,
    params: {},
    coffees: [
      { id: "c1", description: "Coffee 1" },
      { id: "c2", description: "Coffee 2" }
    ],
    books: [
      { id: "b1", title: "Book 1" },
      { id: "b2", title: "Book 2" }
    ]
  }),

  create: update => {
    const pageMap = [home, coffee, books, bookSummary, bookDetails].reduce(
      (acc, next) => {
        acc[next.page.id] = next.create(update);
        return acc;
      }, {}
    );

    return model => {
      const currentPageId = pageMap[model.page.id] ? model.page.id : home.page.id;
      const currentTab = model.page.tab;
      const page = pageMap[currentPageId];
      const isActive = tab => tab === currentTab ? ".active" : "";

      return m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            m("li" + isActive(home.page.id),
              m("a[href='#/']", "Home")
            ),
            m("li" + isActive(coffee.page.id),
              m("a[href='#/coffee']", "Coffee")
            ),
            m("li" + isActive(books.page.id),
              m("a[href='#/books']", "Books")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: () => home.display(update) }, "Home")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: () => coffee.display(update, {}) }, "Coffee")
            ),
            m("li.btn",
              m("button.btn.btn-default",
                { onclick: () => books.display(update, {}) }, "Books")
            )
          )
        ),
        page(model)
      );
    };
  }
};
