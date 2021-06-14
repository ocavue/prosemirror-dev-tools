"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueRenderer = valueRenderer;
exports.PluginState = PluginState;
exports["default"] = PluginsTab;

var _react = _interopRequireDefault(require("react"));

var _unstated = require("unstated");

var _editor = _interopRequireDefault(require("../state/editor"));

var _pluginsTab = _interopRequireDefault(require("../state/plugins-tab"));

var _infoPanel = require("../components/info-panel");

var _heading = require("../components/heading");

var _jsonTree = _interopRequireDefault(require("../components/json-tree"));

var _list = require("../components/list");

var _splitView = require("../components/split-view");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function valueRenderer(raw) {
  if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === "function") {
    return "func";
  }

  return raw;
}

function PluginState(props) {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Plugin State"), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
    data: props.pluginState,
    valueRenderer: valueRenderer
  }));
}

function PluginsTab() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"], _pluginsTab["default"]]
  }, function (editorState, pluginsTabState) {
    var state = editorState.state.state;
    var plugins = state.plugins;
    var selectedPlugin = plugins[pluginsTabState.state.selected];
    var selectedPluginState = selectedPlugin.getState(state);
    return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      noPaddings: true
    }, /*#__PURE__*/_react["default"].createElement(_list.List, {
      items: plugins,
      getKey: function getKey(plugin) {
        return plugin.key;
      },
      title: function title(plugin) {
        return plugin.key;
      },
      isSelected: function isSelected(plugin, index) {
        return pluginsTabState.state.selected === index;
      },
      isDimmed: function isDimmed(plugin) {
        return !plugin.getState(state);
      },
      onListItemClick: function onListItemClick(plugin, index) {
        return pluginsTabState.selectPlugin(index);
      }
    })), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      grow: true,
      sep: true
    }, selectedPluginState ? /*#__PURE__*/_react["default"].createElement(PluginState, {
      pluginState: selectedPluginState
    }) : /*#__PURE__*/_react["default"].createElement(_infoPanel.InfoPanel, null, "Plugin doesn't have any state")));
  });
}