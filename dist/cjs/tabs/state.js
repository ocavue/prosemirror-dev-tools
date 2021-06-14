"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemString = getItemString;
exports.shouldExpandNode = _shouldExpandNode;
exports["default"] = StateTab;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _unstated = require("unstated");

var _editor = _interopRequireDefault(require("../state/editor"));

var _stateTab = _interopRequireDefault(require("../state/state-tab"));

var _formatSelectionObject = require("../utils/format-selection-object");

var _splitView = require("../components/split-view");

var _jsonTree = _interopRequireDefault(require("../components/json-tree"));

var _heading = require("../components/heading");

var _theme = _interopRequireDefault(require("../theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JSONTreeWrapper = (0, _styled["default"])("div")({
  padding: "0 0 9px 0",
  overflow: "hidden"
});
JSONTreeWrapper.displayName = "JSONTreeWrapper";
var Section = (0, _styled["default"])("div")({
  minWidth: "180px",
  boxSizing: "border-box",
  "& + &": {
    paddingTop: "9px"
  }
});
Section.displayName = "Section";
var Group = (0, _styled["default"])("div")({
  margin: "0.5em 0px 0.5em 1em"
});
Group.displayName = "Group";
var GroupRow = (0, _styled["default"])("div")({
  paddingTop: "0.25em"
});
GroupRow.displayName = "GroupRow";
var Key = (0, _styled["default"])("span")({
  display: "inline-block",
  color: _theme["default"].syntax.base0D,
  margin: "0px 0.5em 0px 0px"
});
Key.displayName = "Key";
var ValueNum = (0, _styled["default"])("span")({
  color: _theme["default"].syntax.base09
});
ValueNum.displayName = "ValueNum";
var LogNodeButton = (0, _styled["default"])("button")({
  color: _theme["default"].white60,
  background: "none",
  border: "none",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "3px",
  "&:hover": {
    cursor: "pointer",
    background: _theme["default"].main40,
    color: _theme["default"].white
  },
  "&:focus": {
    outline: "none"
  }
});
LogNodeButton.displayName = "LogNodeButton";

function getItemString(doc, action) {
  return function getItemStringWithBindedDoc(type, value, defaultView, keysCount) {
    var logButton = /*#__PURE__*/_react["default"].createElement(LogNodeButton, {
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        action({
          doc: doc,
          node: value
        });
      }
    }, "log");

    if (type === "Object" && value.type) {
      return /*#__PURE__*/_react["default"].createElement("span", null, "{} ", value.type, " ", logButton);
    }

    return /*#__PURE__*/_react["default"].createElement("span", null, defaultView, " ", keysCount, " ", logButton);
  };
}

function getItemStringForMark(type, value, defaultView, keysCount) {
  if (type === "Object" && value.type) {
    return /*#__PURE__*/_react["default"].createElement("span", null, "{} ", value.type);
  }

  return /*#__PURE__*/_react["default"].createElement("span", null, defaultView, " ", keysCount);
}

function _shouldExpandNode(expandPath, nodePath) {
  var path = [].concat(nodePath).reverse();
  if (!expandPath) return false; // Expand attrs if node has them.

  expandPath.push("attrs");
  if (path.length > expandPath.length) return false;
  if (path.join(".") === expandPath.join(".")) return true;
  if (path.every(function (el, idx) {
    return el === expandPath[idx];
  })) return true;
  return false;
}

function StateTab() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"], _stateTab["default"]]
  }, function (editorState, stateTab) {
    var logNodeFromJSON = editorState.logNodeFromJSON;
    var _editorState$state = editorState.state,
        state = _editorState$state.state,
        activeMarks = _editorState$state.activeMarks,
        expandPath = _editorState$state.expandPath;
    var toggleSelection = stateTab.toggleSelection;
    var selectionExpanded = stateTab.state.selectionExpanded;
    var doc = state.doc.toJSON();
    return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      grow: true
    }, /*#__PURE__*/_react["default"].createElement(_heading.HeadingWithButton, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Current Doc"), /*#__PURE__*/_react["default"].createElement(_heading.HeadingButton, {
      onClick: function onClick() {
        return console.log(state);
      }
    }, "Log State")), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
      data: doc,
      hideRoot: true,
      getItemString: getItemString(doc, logNodeFromJSON),
      shouldExpandNode: function shouldExpandNode(nodePath) {
        return _shouldExpandNode(expandPath, nodePath);
      }
    })), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      sep: true,
      minWidth: 220
    }, /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.HeadingWithButton, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Selection"), /*#__PURE__*/_react["default"].createElement(_heading.HeadingButton, {
      onClick: function onClick() {
        return toggleSelection();
      }
    }, selectionExpanded ? "▼" : "▶")), /*#__PURE__*/_react["default"].createElement(JSONTreeWrapper, null, /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
      data: selectionExpanded ? (0, _formatSelectionObject.expandedStateFormatSelection)(state.selection) : (0, _formatSelectionObject.collapsedStateFormatSelection)(state.selection),
      hideRoot: true
    }))), /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Active Marks"), /*#__PURE__*/_react["default"].createElement(JSONTreeWrapper, null, activeMarks.length ? /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
      data: activeMarks,
      hideRoot: true,
      getItemString: getItemStringForMark
    }) : /*#__PURE__*/_react["default"].createElement(Group, null, /*#__PURE__*/_react["default"].createElement(GroupRow, null, /*#__PURE__*/_react["default"].createElement(Key, null, "no active marks"))))), /*#__PURE__*/_react["default"].createElement(Section, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Document Stats"), /*#__PURE__*/_react["default"].createElement(Group, null, /*#__PURE__*/_react["default"].createElement(GroupRow, null, /*#__PURE__*/_react["default"].createElement(Key, null, "nodeSize:"), /*#__PURE__*/_react["default"].createElement(ValueNum, null, state.doc.nodeSize)), /*#__PURE__*/_react["default"].createElement(GroupRow, null, /*#__PURE__*/_react["default"].createElement(Key, null, "childCount:"), /*#__PURE__*/_react["default"].createElement(ValueNum, null, state.doc.childCount))))));
  });
}