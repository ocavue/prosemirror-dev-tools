import React from "react";
import { Subscribe } from "unstated";
import EditorStateContainer from "../state/editor";
import PluginsTabStateContainer from "../state/plugins-tab";
import { InfoPanel } from "../components/info-panel";
import { Heading } from "../components/heading";
import JSONTree from "../components/json-tree";
import { List } from "../components/list";
import { SplitView, SplitViewCol } from "../components/split-view";
export function valueRenderer(raw) {
  if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === "function") {
    return "func";
  }

  return raw;
}
export function PluginState(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null, "Plugin State"), /*#__PURE__*/React.createElement(JSONTree, {
    data: props.pluginState,
    valueRenderer: valueRenderer
  }));
}
export default function PluginsTab() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer, PluginsTabStateContainer]
  }, function (editorState, pluginsTabState) {
    var state = editorState.state.state;
    var plugins = state.plugins;
    var selectedPlugin = plugins[pluginsTabState.state.selected];
    var selectedPluginState = selectedPlugin.getState(state);
    return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
      noPaddings: true
    }, /*#__PURE__*/React.createElement(List, {
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
    })), /*#__PURE__*/React.createElement(SplitViewCol, {
      grow: true,
      sep: true
    }, selectedPluginState ? /*#__PURE__*/React.createElement(PluginState, {
      pluginState: selectedPluginState
    }) : /*#__PURE__*/React.createElement(InfoPanel, null, "Plugin doesn't have any state")));
  });
}