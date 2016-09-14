import { createComponent, run } from "meiosis";
import { renderer } from "meiosis-vue";
import meiosisTracer from "meiosis-tracer";
import createTodoMainComponent from "./todoMain/component-vue";
import Vue from "vue";

export default function() {
  const model = createTodoMainComponent();
  const renderRoot = run(renderer(model, "store"));
  meiosisTracer(createComponent, renderRoot, "#tracer");

  return new Vue({
    el: "#app",
    data: model,
    template: "<div><div is='todo-main' :store='store'></div></div>"
  });
}
