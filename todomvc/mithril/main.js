/*global meiosis, meiosisMithril, meiosisTracer, window*/
(function(ref) {
  var Meiosis = meiosis(meiosisMithril.intoId("app"));

  var createComponent = Meiosis.createComponent;

  var Main = createComponent({
    initialModel: ref.initialModel,
    view: ref.view,
    actions: ref.actions,
    receiveUpdate: ref.receiveUpdate,
    ready: ref.ready
  });

  ref.viewModel(createComponent);

  var renderRoot = Meiosis.run(Main);

  meiosisTracer(createComponent, renderRoot, "#tracer");
})(window);