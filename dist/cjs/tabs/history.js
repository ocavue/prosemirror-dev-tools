"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionContentSection = SelectionContentSection;
exports.DocDiffSection = DocDiffSection;
exports.SelectionSection = SelectionSection;
exports["default"] = HistoryView;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _unstated = require("unstated");

var _editor = _interopRequireDefault(require("../state/editor"));

var _infoPanel = require("../components/info-panel");

var _heading = require("../components/heading");

var _list = require("../components/list");

var _jsonDiff = _interopRequireDefault(require("../components/json-diff"));

var _splitView = require("../components/split-view");

var _highlighter = require("../components/highlighter");

var _theme = _interopRequireDefault(require("../theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Section = (0, _styled["default"])("div")({
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

function SelectionContentSection(props) {
  if (!props.selectionContent) return null;
  return /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Selection Content"), /*#__PURE__*/_react["default"].createElement(_highlighter.Highlighter, null, props.selectionContent));
}

function DocDiffSection(props) {
  if (!props.diff) return null;
  return /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Doc diff"), /*#__PURE__*/_react["default"].createElement(_jsonDiff["default"], {
    delta: props.diff
  }));
}

function SelectionSection(props) {
  if (!props.selection) return null;
  return /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Selection diff"), /*#__PURE__*/_react["default"].createElement(_jsonDiff["default"], {
    delta: props.selection
  }));
}

function HistoryView() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"]]
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

    return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      noPaddings: true,
      minWidth: 190
    }, /*#__PURE__*/_react["default"].createElement(_list.List, {
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
        return props.isSelected ? _theme["default"].main40 : props.isPrevious ? _theme["default"].main20 : "transparent";
      },
      onListItemClick: function onListItemClick(item) {
        return selectHistoryItem(item.index);
      },
      onListItemDoubleClick: function onListItemDoubleClick(item) {
        return rollbackHistory(item.index);
      }
    })), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      grow: true,
      sep: true
    }, /*#__PURE__*/_react["default"].createElement(DocDiffSection, {
      diff: selectedItem.diff
    }), /*#__PURE__*/_react["default"].createElement(SelectionSection, {
      selection: selectedItem.selection
    }), /*#__PURE__*/_react["default"].createElement(SelectionContentSection, {
      selectionContent: selectedItem.selectionContent
    }), !selectedItem.diff && !selectedItem.selectionContent && !selectedItem.diffPending && /*#__PURE__*/_react["default"].createElement(_infoPanel.InfoPanel, null, "Docs are equal.")));
  });
}