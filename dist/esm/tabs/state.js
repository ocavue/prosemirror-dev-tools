import React from "react";
import styled from "@emotion/styled";
import { Subscribe } from "unstated";
import EditorStateContainer from "../state/editor";
import StateTabStateContainer from "../state/state-tab";
import { expandedStateFormatSelection, collapsedStateFormatSelection } from "../utils/format-selection-object";
import { SplitView, SplitViewCol } from "../components/split-view";
import JSONTree from "../components/json-tree";
import { Heading, HeadingWithButton, HeadingButton } from "../components/heading";
import theme from "../theme";
var JSONTreeWrapper = styled("div")({
  padding: "0 0 9px 0",
  overflow: "hidden"
});
JSONTreeWrapper.displayName = "JSONTreeWrapper";
var Section = styled("div")({
  minWidth: "180px",
  boxSizing: "border-box",
  "& + &": {
    paddingTop: "9px"
  }
});
Section.displayName = "Section";
var Group = styled("div")({
  margin: "0.5em 0px 0.5em 1em"
});
Group.displayName = "Group";
var GroupRow = styled("div")({
  paddingTop: "0.25em"
});
GroupRow.displayName = "GroupRow";
var Key = styled("span")({
  display: "inline-block",
  color: theme.syntax.base0D,
  margin: "0px 0.5em 0px 0px"
});
Key.displayName = "Key";
var ValueNum = styled("span")({
  color: theme.syntax.base09
});
ValueNum.displayName = "ValueNum";
var LogNodeButton = styled("button")({
  color: theme.white60,
  background: "none",
  border: "none",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "3px",
  "&:hover": {
    cursor: "pointer",
    background: theme.main40,
    color: theme.white
  },
  "&:focus": {
    outline: "none"
  }
});
LogNodeButton.displayName = "LogNodeButton";
export function getItemString(doc, action) {
  return function getItemStringWithBindedDoc(type, value, defaultView, keysCount) {
    var logButton = /*#__PURE__*/React.createElement(LogNodeButton, {
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
      return /*#__PURE__*/React.createElement("span", null, "{} ", value.type, " ", logButton);
    }

    return /*#__PURE__*/React.createElement("span", null, defaultView, " ", keysCount, " ", logButton);
  };
}

function getItemStringForMark(type, value, defaultView, keysCount) {
  if (type === "Object" && value.type) {
    return /*#__PURE__*/React.createElement("span", null, "{} ", value.type);
  }

  return /*#__PURE__*/React.createElement("span", null, defaultView, " ", keysCount);
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

export { _shouldExpandNode as shouldExpandNode };
export default function StateTab() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer, StateTabStateContainer]
  }, function (editorState, stateTab) {
    var logNodeFromJSON = editorState.logNodeFromJSON;
    var _editorState$state = editorState.state,
        state = _editorState$state.state,
        activeMarks = _editorState$state.activeMarks,
        expandPath = _editorState$state.expandPath;
    var toggleSelection = stateTab.toggleSelection;
    var selectionExpanded = stateTab.state.selectionExpanded;
    var doc = state.doc.toJSON();
    return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
      grow: true
    }, /*#__PURE__*/React.createElement(HeadingWithButton, null, /*#__PURE__*/React.createElement(Heading, null, "Current Doc"), /*#__PURE__*/React.createElement(HeadingButton, {
      onClick: function onClick() {
        return console.log(state);
      }
    }, "Log State")), /*#__PURE__*/React.createElement(JSONTree, {
      data: doc,
      hideRoot: true,
      getItemString: getItemString(doc, logNodeFromJSON),
      shouldExpandNode: function shouldExpandNode(nodePath) {
        return _shouldExpandNode(expandPath, nodePath);
      }
    })), /*#__PURE__*/React.createElement(SplitViewCol, {
      sep: true,
      minWidth: 220
    }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(HeadingWithButton, null, /*#__PURE__*/React.createElement(Heading, null, "Selection"), /*#__PURE__*/React.createElement(HeadingButton, {
      onClick: function onClick() {
        return toggleSelection();
      }
    }, selectionExpanded ? "▼" : "▶")), /*#__PURE__*/React.createElement(JSONTreeWrapper, null, /*#__PURE__*/React.createElement(JSONTree, {
      data: selectionExpanded ? expandedStateFormatSelection(state.selection) : collapsedStateFormatSelection(state.selection),
      hideRoot: true
    }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Heading, null, "Active Marks"), /*#__PURE__*/React.createElement(JSONTreeWrapper, null, activeMarks.length ? /*#__PURE__*/React.createElement(JSONTree, {
      data: activeMarks,
      hideRoot: true,
      getItemString: getItemStringForMark
    }) : /*#__PURE__*/React.createElement(Group, null, /*#__PURE__*/React.createElement(GroupRow, null, /*#__PURE__*/React.createElement(Key, null, "no active marks"))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Heading, null, "Document Stats"), /*#__PURE__*/React.createElement(Group, null, /*#__PURE__*/React.createElement(GroupRow, null, /*#__PURE__*/React.createElement(Key, null, "nodeSize:"), /*#__PURE__*/React.createElement(ValueNum, null, state.doc.nodeSize)), /*#__PURE__*/React.createElement(GroupRow, null, /*#__PURE__*/React.createElement(Key, null, "childCount:"), /*#__PURE__*/React.createElement(ValueNum, null, state.doc.childCount))))));
  });
}