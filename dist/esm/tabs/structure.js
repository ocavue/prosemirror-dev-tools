import React from "react";
import styled from "@emotion/styled";
import { Subscribe } from "unstated";
import theme from "../theme";
import EditorStateContainer from "../state/editor";
import StructureTabStateContainer from "../state/structure-tab";
import { SplitView, SplitViewCol } from "../components/split-view";
import JSONTree from "../components/json-tree";
import { Heading, HeadingWithButton, HeadingButton } from "../components/heading";
var GraphWrapper = styled("div")({
  marginTop: "12px"
});
GraphWrapper.displayName = "GraphWrapper";
var BlockNodeWrapper = styled("div")({});
BlockNodeWrapper.displayName = "BlockNodeWrapper";
var BlockNodeContentView = styled("div")({
  padding: "0 12px",
  boxSizing: "border-box",
  borderLeft: "1px solid ".concat(theme.white20),
  borderRight: "1px solid ".concat(theme.white20)
});
BlockNodeContentView.displayName = "BlockNodeContentView";
var BlockNodeContentViewWithInline = styled("div")({
  padding: "0 12px",
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  borderLeft: "1px solid ".concat(theme.white20),
  borderRight: "1px solid ".concat(theme.white20),
  flexWrap: "wrap"
});
BlockNodeContentViewWithInline.displayName = "BlockNodeContentViewWithInline";
var BlockNodeView = styled("div")({
  width: "100%",
  marginBottom: "3px",
  boxSizing: "border-box",
  display: "flex",
  "&:hover": {
    cursor: "pointer"
  }
}, function (_ref) {
  var bg = _ref.bg;
  return {
    background: bg
  };
});
BlockNodeView.displayName = "BlockNodeView";
var Side = styled("div")({
  padding: "3px 6px",
  background: "rgba(255, 255, 255, 0.3)"
});
Side.displayName = "Side";
var Center = styled("div")({
  flexGrow: 1,
  padding: "3px 9px",
  whiteSpace: "pre"
});
Center.displayName = "Center";
var InlineNodeView = styled("div")({
  flexGrow: 1,
  marginBottom: "3px",
  display: "flex",
  boxSizing: "border-box",
  "&:hover": {
    cursor: "pointer"
  }
}, function (_ref2) {
  var bg = _ref2.bg;
  return {
    background: bg
  };
});
InlineNodeView.displayName = "InlineNodeView";
export function BlockNodeContent(props) {
  if (!props.content || !props.content.content || !props.content.content.length) return null;
  var content = props.content.content;

  if (content[0].isBlock) {
    var _startPos = props.startPos + 1;

    return /*#__PURE__*/React.createElement(BlockNodeContentView, null, content.map(function (childNode, index) {
      var pos = _startPos;
      _startPos += childNode.nodeSize;
      return /*#__PURE__*/React.createElement(BlockNode, {
        key: index,
        node: childNode,
        colors: props.colors,
        onNodeSelected: props.onNodeSelected,
        startPos: pos
      });
    }));
  }

  var startPos = props.startPos;
  return /*#__PURE__*/React.createElement(BlockNodeContentViewWithInline, null, content.map(function (childNode, index) {
    var pos = startPos;
    startPos += childNode.nodeSize;
    return /*#__PURE__*/React.createElement(InlineNode, {
      key: index,
      index: index,
      node: childNode,
      bg: props.colors[childNode.type.name],
      onNodeSelected: props.onNodeSelected,
      startPos: pos
    });
  }));
}
export function BlockNode(props) {
  var colors = props.colors,
      node = props.node,
      startPos = props.startPos;
  var color = colors[node.type.name];
  return /*#__PURE__*/React.createElement(BlockNodeWrapper, null, /*#__PURE__*/React.createElement(BlockNodeView, {
    bg: color,
    onClick: function onClick() {
      return props.onNodeSelected({
        node: node
      });
    }
  }, /*#__PURE__*/React.createElement(Side, null, startPos), /*#__PURE__*/React.createElement(Center, null, node.type.name), /*#__PURE__*/React.createElement(Side, null, startPos + node.nodeSize - 1)), /*#__PURE__*/React.createElement(BlockNodeContent, {
    content: node.content,
    colors: colors,
    onNodeSelected: props.onNodeSelected,
    startPos: startPos
  }));
}
export function InlineNode(props) {
  var node = props.node,
      bg = props.bg,
      startPos = props.startPos,
      index = props.index;
  var marks = node.marks.length === 1 ? " - [".concat(node.marks[0].type.name, "]") : node.marks.length > 1 ? " - [".concat(node.marks.length, " marks]") : "";
  return /*#__PURE__*/React.createElement(InlineNodeView, {
    onClick: function onClick() {
      return props.onNodeSelected({
        node: node
      });
    },
    bg: bg
  }, index === 0 ? /*#__PURE__*/React.createElement(Side, null, startPos) : null, /*#__PURE__*/React.createElement(Center, null, node.type.name, " ", marks), /*#__PURE__*/React.createElement(Side, null, startPos + node.nodeSize));
}
export default function GraphTab() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer, StructureTabStateContainer]
  }, function (editorState, structureTabState) {
    var _editorState$state = editorState.state,
        state = _editorState$state.state,
        nodeColors = _editorState$state.nodeColors;
    var selectedNode = structureTabState.state.selectedNode;
    var selected = selectedNode ? selectedNode : state.doc;
    return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
      grow: true
    }, /*#__PURE__*/React.createElement(Heading, null, "Current Doc"), /*#__PURE__*/React.createElement(GraphWrapper, null, /*#__PURE__*/React.createElement(BlockNode, {
      colors: nodeColors,
      node: state.doc,
      startPos: 0,
      onNodeSelected: structureTabState.selectNode
    }))), /*#__PURE__*/React.createElement(SplitViewCol, {
      sep: true,
      minWidth: 200,
      maxWidth: 300
    }, /*#__PURE__*/React.createElement(HeadingWithButton, null, /*#__PURE__*/React.createElement(Heading, null, "Node Info"), /*#__PURE__*/React.createElement(HeadingButton, {
      onClick: function onClick() {
        return console.log(selected);
      }
    }, "Log Node")), /*#__PURE__*/React.createElement(JSONTree, {
      data: selected.toJSON(),
      hideRoot: true,
      shouldExpandNode: function shouldExpandNode() {
        return selected.type.name !== "doc" ? true : false;
      }
    })));
  });
}