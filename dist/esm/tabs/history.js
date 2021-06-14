import React from "react";
import styled from "@emotion/styled";
import { Subscribe } from "unstated";
import EditorStateContainer from "../state/editor";
import { InfoPanel } from "../components/info-panel";
import { Heading } from "../components/heading";
import { List } from "../components/list";
import JSONDiff from "../components/json-diff";
import { SplitView, SplitViewCol } from "../components/split-view";
import { Highlighter } from "../components/highlighter";
import theme from "../theme";
var Section = styled("div")({
  minWidth: "180px",
  boxSizing: "border-box",
  "& + &": {
    paddingTop: "9px"
  }
});
Section.displayName = "Section";

function pad(num) {
  return ("00" + num).slice(-2);
}

function pad3(num) {
  return ("000" + num).slice(-3);
}

var formatTimestamp = function formatTimestamp(timestamp) {
  var date = new Date(timestamp);
  return [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds()), pad3(date.getMilliseconds())].join(":");
};

export function SelectionContentSection(props) {
  if (!props.selectionContent) return null;
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Heading, null, "Selection Content"), /*#__PURE__*/React.createElement(Highlighter, null, props.selectionContent));
}
export function DocDiffSection(props) {
  if (!props.diff) return null;
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Heading, null, "Doc diff"), /*#__PURE__*/React.createElement(JSONDiff, {
    delta: props.diff
  }));
}
export function SelectionSection(props) {
  if (!props.selection) return null;
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Heading, null, "Selection diff"), /*#__PURE__*/React.createElement(JSONDiff, {
    delta: props.selection
  }));
}
export default function HistoryView() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer]
  }, function (editorState) {
    var selectHistoryItem = editorState.selectHistoryItem,
        rollbackHistory = editorState.rollbackHistory;
    var _editorState$state = editorState.state,
        history = _editorState$state.history,
        selectedHistoryItem = _editorState$state.selectedHistoryItem,
        historyRolledBackTo = _editorState$state.historyRolledBackTo;
    var prevItem = history[selectedHistoryItem + 1];
    var selectedItem = history[selectedHistoryItem];
    var historyRolledBackToItem = history[historyRolledBackTo];
    var historyList = history.reduce(function (h, item, index) {
      var prev = h[h.length - 1];
      item.index = index;

      if (!item.diff) {
        if (!prev || !Array.isArray(prev)) {
          h.push([item]);
        } else {
          prev.push(item);
        }
      } else {
        h.push(item);
      }

      return h;
    }, []).reduce(function (h, item) {
      if (Array.isArray(item) && item.length === 1) {
        h.push(item[0]);
      } else {
        h.push(item);
      }

      return h;
    }, []);

    var isSelected = function isSelected(item) {
      return item.timestamp === selectedItem.timestamp;
    };

    var isPrevious = function isPrevious(item) {
      return prevItem && item.timestamp === prevItem.timestamp;
    };

    var isDimmed = function isDimmed(item) {
      return historyRolledBackToItem && item.timestamp > historyRolledBackToItem.timestamp;
    };

    return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
      noPaddings: true,
      minWidth: 190
    }, /*#__PURE__*/React.createElement(List, {
      items: historyList,
      getKey: function getKey(item) {
        return item.timestamp;
      },
      title: function title(item) {
        return formatTimestamp(item.timestamp);
      },
      groupTitle: function groupTitle(item) {
        return formatTimestamp(item[0].timestamp) + " [".concat(item.length, "]");
      },
      isSelected: isSelected,
      isPrevious: isPrevious,
      isDimmed: isDimmed,
      customItemBackground: function customItemBackground(props) {
        return props.isSelected ? theme.main40 : props.isPrevious ? theme.main20 : "transparent";
      },
      onListItemClick: function onListItemClick(item) {
        return selectHistoryItem(item.index);
      },
      onListItemDoubleClick: function onListItemDoubleClick(item) {
        return rollbackHistory(item.index);
      }
    })), /*#__PURE__*/React.createElement(SplitViewCol, {
      grow: true,
      sep: true
    }, /*#__PURE__*/React.createElement(DocDiffSection, {
      diff: selectedItem.diff
    }), /*#__PURE__*/React.createElement(SelectionSection, {
      selection: selectedItem.selection
    }), /*#__PURE__*/React.createElement(SelectionContentSection, {
      selectionContent: selectedItem.selectionContent
    }), !selectedItem.diff && !selectedItem.selectionContent && !selectedItem.diffPending && /*#__PURE__*/React.createElement(InfoPanel, null, "Docs are equal.")));
  });
}