"use strict";



define('ember-render-test/app', ['exports', 'ember', 'ember-render-test/resolver', 'ember-load-initializers', 'ember-render-test/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-render-test/components/ember-collection', ['exports', 'ember-collection/components/ember-collection'], function (exports, _emberCollection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberCollection.default;
    }
  });
});
define('ember-render-test/components/ember-native-scrollable', ['exports', 'ember-collection/components/ember-native-scrollable'], function (exports, _emberNativeScrollable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberNativeScrollable.default;
    }
  });
});
define('ember-render-test/components/fork-me', ['exports', 'ember-fork-me/components/fork-me'], function (exports, _forkMe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _forkMe.default;
    }
  });
});
define('ember-render-test/helpers/app-version', ['exports', 'ember', 'ember-render-test/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('ember-render-test/helpers/array', ['exports', 'ember-helper'], function (exports, _emberHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = (0, _emberHelper.helper)(function (a) {
    return a;
  });
});
define('ember-render-test/helpers/fixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/grid'], function (exports, _ember, _grid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Helper.helper(function (params, hash) {
    return new _grid.default(params[0], params[1]);
  });
});
define('ember-render-test/helpers/mixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/mixed-grid'], function (exports, _ember, _mixedGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Helper.helper(function (params, hash) {
    return new _mixedGrid.default(params[0]);
  });
});
define('ember-render-test/helpers/percentage-columns-layout', ['exports', 'ember', 'ember-collection/layouts/percentage-columns'], function (exports, _ember, _percentageColumns) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Helper.helper(function (params, hash) {
    return new _percentageColumns.default(params[0], params[1], params[2]);
  });
});
define('ember-render-test/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-render-test/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-render-test/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-render-test/initializers/export-application-global', ['exports', 'ember', 'ember-render-test/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-render-test/pods/application/route', ['exports', 'ember-route', 'ember-string'], function (exports, _emberRoute, _emberString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({

    queryParams: {
      count: { refreshModel: true }
    },

    model: function model(_ref) {
      var count = _ref.count;

      count = this._parseCount(count);

      if (!count) return;

      var items = this._produceItems(count);

      return {
        count: count,
        items: items,
        html: this._produceHtml({ items: items, callback: this._produceHtmlItem }),
        styledHtml: this._produceHtml({ items: items, callback: this._produceStyledHtmlItem })
      };
    },
    _parseCount: function _parseCount(count) {
      count = parseInt(count, 10);

      if (typeof count !== 'number' || isNaN(count) || count < 1) {
        this.transitionTo('index', { queryParams: { count: 10000 } });
        return;
      }

      return count;
    },
    _produceItems: function _produceItems() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;

      return Array(count).fill(null).map(function (_, index) {
        return {
          index: index,
          name: Math.random().toString(36).substr(2)
        };
      });
    },
    _produceHtml: function _produceHtml(_ref2) {
      var items = _ref2.items,
          callback = _ref2.callback;

      var unsafeHtml = items.map(callback).join('');

      return (0, _emberString.htmlSafe)(unsafeHtml);
    },
    _produceHtmlItem: function _produceHtmlItem(_ref3) {
      var index = _ref3.index,
          name = _ref3.name;

      return '<li>' + index + ': ' + name + '</li>';
    },
    _produceStyledHtmlItem: function _produceStyledHtmlItem(_ref4) {
      var index = _ref4.index,
          name = _ref4.name;

      return '\n      <li>\n        <section class="todoapp">\n          <header class="header">\n            <h1>' + index + ': ' + name + '</h1>\n            <input class="new-todo" placeholder="What needs to be done?" autofocus>\n          </header>\n          <!-- This section should be hidden by default and shown when there are todos -->\n          <section class="main">\n            <input class="toggle-all" type="checkbox">\n            <label for="toggle-all">Mark all as complete</label>\n            <ul class="todo-list">\n              <!-- These are here just to show the structure of the list items -->\n              <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->\n              <li class="completed">\n                <div class="view">\n                  <input class="toggle" type="checkbox" checked>\n                  <label>Taste JavaScript</label>\n                  <button class="destroy"></button>\n                </div>\n                <input class="edit" value="Create a TodoMVC template">\n              </li>\n              <li>\n                <div class="view">\n                  <input class="toggle" type="checkbox">\n                  <label>Buy a unicorn</label>\n                  <button class="destroy"></button>\n                </div>\n                <input class="edit" value="Rule the web">\n              </li>\n            </ul>\n          </section>\n          <!-- This footer should hidden by default and shown when there are todos -->\n          <footer class="footer">\n            <!-- This should be `0 items left` by default -->\n            <span class="todo-count"><strong>0</strong> items left</span>\n            <!-- Remove this if you don\'t implement routing -->\n            <ul class="filters">\n              <li>\n                <a class="selected" href="#/">All</a>\n              </li>\n              <li>\n                <a href="#/active">Active</a>\n              </li>\n              <li>\n                <a href="#/completed">Completed</a>\n              </li>\n            </ul>\n            <!-- Hidden if no completed items are left \u2193 -->\n            <button class="clear-completed">Clear completed</button>\n          </footer>\n        </section>\n      </li>\n    ';
    }
  });
});
define("ember-render-test/pods/application/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FTm0KHze", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  \"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Index\"]],\"locals\":[]},null],[0,\",\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Simple:\\n  \"],[6,[\"link-to\"],[\"multiple\"],null,{\"statements\":[[0,\"Multiple components\"]],\"locals\":[]},null],[0,\",\\n  \"],[6,[\"link-to\"],[\"template\"],null,{\"statements\":[[0,\"Single template\"]],\"locals\":[]},null],[0,\",\\n  \"],[6,[\"link-to\"],[\"html\"],null,{\"statements\":[[0,\"HTML string\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Styled:\\n  \"],[6,[\"link-to\"],[\"multiple-styled\"],null,{\"statements\":[[0,\"Multiple components\"]],\"locals\":[]},null],[0,\",\\n  \"],[6,[\"link-to\"],[\"template-styled\"],null,{\"statements\":[[0,\"Single template\"]],\"locals\":[]},null],[0,\",\\n  \"],[6,[\"link-to\"],[\"html-styled\"],null,{\"statements\":[[0,\"HTML string\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Incremental:\\n  \"],[6,[\"link-to\"],[\"incremental\"],null,{\"statements\":[[0,\"Unstyled\"]],\"locals\":[]},null],[0,\",\\n  \"],[6,[\"link-to\"],[\"incremental-styled\"],null,{\"statements\":[[0,\"Styled\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[1,[33,[\"fork-me\"],[\"https://github.com/Deveo/ember-render-test\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/application/template.hbs" } });
});
define("ember-render-test/pods/components/x-item-styled/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4R6rlJRn", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"todoapp\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[1,[26,[\"index\"]],false],[0,\": \"],[1,[26,[\"name\"]],false],[14],[0,\"\\n    \"],[11,\"input\",[]],[15,\"class\",\"new-todo\"],[15,\"placeholder\",\"What needs to be done?\"],[15,\"autofocus\",\"\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[4,\" This section should be hidden by default and shown when there are todos \"],[0,\"\\n  \"],[11,\"section\",[]],[15,\"class\",\"main\"],[13],[0,\"\\n    \"],[11,\"input\",[]],[15,\"class\",\"toggle-all\"],[15,\"type\",\"checkbox\"],[13],[14],[0,\"\\n    \"],[11,\"label\",[]],[15,\"for\",\"toggle-all\"],[13],[0,\"Mark all as complete\"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"todo-list\"],[13],[0,\"\\n      \"],[4,\" These are here just to show the structure of the list items \"],[0,\"\\n      \"],[4,\" List items should get the class `editing` when editing and `completed` when marked as completed \"],[0,\"\\n      \"],[11,\"li\",[]],[15,\"class\",\"completed\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"view\"],[13],[0,\"\\n          \"],[11,\"input\",[]],[15,\"class\",\"toggle\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"Taste JavaScript\"],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"destroy\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"class\",\"edit\"],[15,\"value\",\"Create a TodoMVC template\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"view\"],[13],[0,\"\\n          \"],[11,\"input\",[]],[15,\"class\",\"toggle\"],[15,\"type\",\"checkbox\"],[13],[14],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"Buy a unicorn\"],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"destroy\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"class\",\"edit\"],[15,\"value\",\"Rule the web\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[4,\" This footer should hidden by default and shown when there are todos \"],[0,\"\\n  \"],[11,\"footer\",[]],[15,\"class\",\"footer\"],[13],[0,\"\\n    \"],[4,\" This should be `0 items left` by default \"],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"todo-count\"],[13],[11,\"strong\",[]],[13],[0,\"0\"],[14],[0,\" items left\"],[14],[0,\"\\n    \"],[4,\" Remove this if you don't implement routing \"],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"selected\"],[15,\"href\",\"#/\"],[13],[0,\"All\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"#/active\"],[13],[0,\"Active\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"#/completed\"],[13],[0,\"Completed\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[4,\" Hidden if no completed items are left ↓ \"],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"clear-completed\"],[13],[0,\"Clear completed\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/components/x-item-styled/template.hbs" } });
});
define("ember-render-test/pods/components/x-item/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3SO9r8Bd", "block": "{\"statements\":[[1,[26,[\"index\"]],false],[0,\": \"],[1,[26,[\"name\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/components/x-item/template.hbs" } });
});
define("ember-render-test/pods/html-styled/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SAAKeLqC", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"HTML string\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[1,[28,[\"model\",\"styledHtml\"]],true],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/html-styled/template.hbs" } });
});
define("ember-render-test/pods/html/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "c+V/txjH", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"HTML string\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[1,[28,[\"model\",\"html\"]],true],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/html/template.hbs" } });
});
define("ember-render-test/pods/incremental-styled/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uzTti8K+", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Incremental Styled\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"incremental\"],[13],[0,\"\\n\"],[6,[\"ember-collection\"],null,[[\"items\",\"cell-layout\"],[[28,[\"model\",\"items\"]],[33,[\"percentage-columns-layout\"],[[28,[\"model\",\"items\",\"length\"]],[33,[\"array\"],[100],null],394],null]]],{\"statements\":[[0,\"    \"],[1,[33,[\"x-item-styled\"],null,[[\"index\",\"name\"],[[28,[\"item\",\"index\"]],[28,[\"item\",\"name\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/incremental-styled/template.hbs" } });
});
define("ember-render-test/pods/incremental/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "W4uVQXaX", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Incremental Unstyled\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"incremental\"],[13],[0,\"\\n\"],[6,[\"ember-collection\"],null,[[\"items\",\"cell-layout\"],[[28,[\"model\",\"items\"]],[33,[\"percentage-columns-layout\"],[[28,[\"model\",\"items\",\"length\"]],[33,[\"array\"],[100],null],18],null]]],{\"statements\":[[0,\"    \"],[1,[33,[\"x-item\"],null,[[\"index\",\"name\"],[[28,[\"item\",\"index\"]],[28,[\"item\",\"name\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/incremental/template.hbs" } });
});
define('ember-render-test/pods/index/controller', ['exports', 'ember-controller', 'ember-computed'], function (exports, _emberController, _emberComputed) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberController.default.extend({

    countUserInput: (0, _emberComputed.reads)('model.count'),

    actions: {
      updateCount: function updateCount() {
        var count = this.get('countUserInput');
        this.transitionToRoute('index', { queryParams: { count: count } });
      }
    }
  });
});
define("ember-render-test/pods/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WPhkz8hM", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"\\n  Count:\\n\\n  \"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"number\",[28,[\"countUserInput\"]]]]],false],[0,\"\\n\\n  \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"updateCount\"]],[13],[0,\"\\n    Update\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/index/template.hbs" } });
});
define("ember-render-test/pods/multiple-styled/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "s9j/B0Ix", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Multiple components\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"items\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"x-item-styled\"],null,[[\"index\",\"name\",\"tagName\"],[[28,[\"item\",\"index\"]],[28,[\"item\",\"name\"]],\"li\"]]],false],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\\n\"],[1,[33,[\"log\"],[[28,[\"model\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/multiple-styled/template.hbs" } });
});
define("ember-render-test/pods/multiple/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NDpnggZO", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Multiple components\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"items\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"x-item\"],null,[[\"index\",\"name\",\"tagName\"],[[28,[\"item\",\"index\"]],[28,[\"item\",\"name\"]],\"li\"]]],false],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/multiple/template.hbs" } });
});
define("ember-render-test/pods/template-styled/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8NCzsKC9", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Single template with {{#each}}\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"items\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[0,\"\\n      \"],[11,\"section\",[]],[15,\"class\",\"todoapp\"],[13],[0,\"\\n        \"],[11,\"header\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[13],[1,[28,[\"item\",\"index\"]],false],[0,\": \"],[1,[28,[\"item\",\"name\"]],false],[14],[0,\"\\n          \"],[11,\"input\",[]],[15,\"class\",\"new-todo\"],[15,\"placeholder\",\"What needs to be done?\"],[15,\"autofocus\",\"\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[4,\" This section should be hidden by default and shown when there are todos \"],[0,\"\\n        \"],[11,\"section\",[]],[15,\"class\",\"main\"],[13],[0,\"\\n          \"],[11,\"input\",[]],[15,\"class\",\"toggle-all\"],[15,\"type\",\"checkbox\"],[13],[14],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"toggle-all\"],[13],[0,\"Mark all as complete\"],[14],[0,\"\\n          \"],[11,\"ul\",[]],[15,\"class\",\"todo-list\"],[13],[0,\"\\n            \"],[4,\" These are here just to show the structure of the list items \"],[0,\"\\n            \"],[4,\" List items should get the class `editing` when editing and `completed` when marked as completed \"],[0,\"\\n            \"],[11,\"li\",[]],[15,\"class\",\"completed\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"view\"],[13],[0,\"\\n                \"],[11,\"input\",[]],[15,\"class\",\"toggle\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Taste JavaScript\"],[14],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"destroy\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"input\",[]],[15,\"class\",\"edit\"],[15,\"value\",\"Create a TodoMVC template\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"view\"],[13],[0,\"\\n                \"],[11,\"input\",[]],[15,\"class\",\"toggle\"],[15,\"type\",\"checkbox\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Buy a unicorn\"],[14],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"destroy\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"input\",[]],[15,\"class\",\"edit\"],[15,\"value\",\"Rule the web\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[4,\" This footer should hidden by default and shown when there are todos \"],[0,\"\\n        \"],[11,\"footer\",[]],[15,\"class\",\"footer\"],[13],[0,\"\\n          \"],[4,\" This should be `0 items left` by default \"],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"todo-count\"],[13],[11,\"strong\",[]],[13],[0,\"0\"],[14],[0,\" items left\"],[14],[0,\"\\n          \"],[4,\" Remove this if you don't implement routing \"],[0,\"\\n          \"],[11,\"ul\",[]],[15,\"class\",\"filters\"],[13],[0,\"\\n            \"],[11,\"li\",[]],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"class\",\"selected\"],[15,\"href\",\"#/\"],[13],[0,\"All\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"href\",\"#/active\"],[13],[0,\"Active\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"href\",\"#/completed\"],[13],[0,\"Completed\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[4,\" Hidden if no completed items are left ↓ \"],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"clear-completed\"],[13],[0,\"Clear completed\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/template-styled/template.hbs" } });
});
define("ember-render-test/pods/template/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mlSvhlm6", "block": "{\"statements\":[[11,\"h2\",[]],[13],[0,\"Single template with {{#each}}\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"items\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[1,[28,[\"item\",\"index\"]],false],[0,\": \"],[1,[28,[\"item\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-render-test/pods/template/template.hbs" } });
});
define('ember-render-test/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-render-test/router', ['exports', 'ember', 'ember-render-test/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('multiple');
    this.route('template');
    this.route('html');

    this.route('multiple-styled');
    this.route('template-styled');
    this.route('html-styled');

    this.route('incremental');
    this.route('incremental-styled');
  });

  exports.default = Router;
});
define('ember-render-test/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});


define('ember-render-test/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-render-test';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-render-test/app")["default"].create({"name":"ember-render-test","version":"0.0.0+797d4cbe"});
}
//# sourceMappingURL=ember-render-test.map
