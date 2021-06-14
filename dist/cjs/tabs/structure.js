"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockNodeContent = BlockNodeContent;
exports.BlockNode = BlockNode;
exports.InlineNode = InlineNode;
exports["default"] = GraphTab;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _unstated = require("unstated");

var _theme = _interopRequireDefault(require("../theme"));

var _editor = _interopRequireDefault(require("../state/editor"));

var _structureTab = _interopRequireDefault(require("../state/structure-tab"));

var _splitView = require("../components/split-view");

var _jsonTree = _interopRequireDefault(require("../components/json-tree"));

var _heading = require("../components/heading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GraphWrapper = (0, _styled["default"])("div")({
  marginTop: "12px"
});
GraphWrapper.displayName = "GraphWrapper";
var BlockNodeWrapper = (0, _styled["default"])("div")({});
BlockNodeWrapper.displayName = "BlockNodeWrapper";
var BlockNodeContentView = (0, _styled["default"])("div")({
  padding: "0 12px",
  boxSizing: "border-box",
  borderLeft: "1px solid ".concat(_theme["default"].white20),
  borderRight: "1px solid ".concat(_theme["default"].white20)
});
BlockNodeContentView.displayName = "BlockNodeContentView";
var BlockNodeContentViewWithInline = (0, _styled["default"])("div")({
  padding: "0 12px",
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  borderLeft: "1px solid ".concat(_theme["default"].white20),
  borderRight: "1px solid ".concat(_theme["default"].white20),
  flexWrap: "wrap"
});
BlockNodeContentViewWithInline.displayName = "BlockNodeContentViewWithInline";
var BlockNodeView = (0, _styled["default"])("div")({
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
var Side = (0, _styled["default"])("div")({
  padding: "3px 6px",
  background: "rgba(255, 255, 255, 0.3)"
});
Side.displayName = "Side";
var Center = (0, _styled["default"])("div")({
  flexGrow: 1,
  padding: "3px 9px",
  whiteSpace: "pre"
});
Center.displayName = "Center";
var InlineNodeView = (0, _styled["default"])("div")({
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

function BlockNodeContent(props) {
  if (!props.content || !props.content.content || !props.content.content.length) return null;
  var content = props.content.content;

  if (content[0].isBlock) {
    var _startPos = props.startPos + 1;

    return /*#__PURE__*/_react["default"].createElement(BlockNodeContentView, null, content.map(function (childNode, index) {
      var pos = _startPos;
      _startPos += childNode.nodeSize;
      return /*#__PURE__*/_react["default"].createElement(BlockNode, {
        key: index,
        node: childNode,
        colors: props.colors,
        onNodeSelected: props.onNodeSelected,
        startPos: pos
      });
    }));
  }

  var startPos = props.startPos;
  return /*#__PURE__*/_react["default"].createElement(BlockNodeContentViewWithInline, null, content.map(function (childNode, index) {
    var pos = startPos;
    startPos += childNode.nodeSize;
    return /*#__PURE__*/_react["default"].createElement(InlineNode, {
      key: index,
      index: index,
      node: childNode,
      bg: props.colors[childNode.type.name],
      onNodeSelected: props.onNodeSelected,
      startPos: pos
    });
  }));
}

function BlockNode(props) {
  var colors = props.colors,
      node = props.node,
      startPos = props.startPos;
  var color = colors[node.type.name];
  return /*#__PURE__*/_react["default"].createElement(BlockNodeWrapper, null, /*#__PURE__*/_react["default"].createElement(BlockNodeView, {
    bg: color,
    onClick: function onClick() {
      return props.onNodeSelected({
        node: node
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(Side, null, startPos), /*#__PURE__*/_react["default"].createElement(Center, null, node.type.name), /*#__PURE__*/_react["default"].createElement(Side, null, startPos + node.nodeSize - 1)), /*#__PURE__*/_react["default"].createElement(BlockNodeContent, {
    content: node.content,
    colors: colors,
    onNodeSelected: props.onNodeSelected,
    startPos: startPos
  }));
}

function InlineNode(props) {
  var node = props.node,
      bg = props.bg,
      startPos = props.startPos,
      index = props.index;
  var marks = node.marks.length === 1 ? " - [".concat(node.marks[0].type.name, "]") : node.marks.length > 1 ? " - [".concat(node.marks.length, " marks]") : "";
  return /*#__PURE__*/_react["default"].createElement(InlineNodeView, {
    onClick: function onClick() {
      return props.onNodeSelected({
        node: node
      });
    },
    bg: bg
  }, index === 0 ? /*#__PURE__*/_react["default"].createElement(Side, null, startPos) : null, /*#__PURE__*/_react["default"].createElement(Center, null, node.type.name, " ", marks), /*#__PURE__*/_react["default"].createElement(Side, null, startPos + node.nodeSize));
}

function GraphTab() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"], _structureTab["default"]]
  }, function (editorState, structureTabState) {
    var _editorState$state = editorState.state,
        state = _editorState$state.state,
        nodeColors = _editorState$state.nodeColors;
    var selectedNode = structureTabState.state.selectedNode;
    var selected = selectedNode ? selectedNode : state.doc;
    return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      grow: true
    }, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Current Doc"), /*#__PURE__*/_react["default"].createElement(GraphWrapper, null, /*#__PURE__*/_react["default"].createElement(BlockNode, {
      colors: nodeColors,
      node: state.doc,
      startPos: 0,
      onNodeSelected: structureTabState.selectNode
    }))), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
      sep: true,
      minWidth: 200,
      maxWidth: 300
    }, /*#__PURE__*/_react["default"].createElement(_heading.HeadingWithButton, null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Node Info"), /*#__PURE__*/_react["default"].createElement(_heading.HeadingButton, {
      onClick: function onClick() {
        return console.log(selected);
      }
    }, "Log Node")), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
      data: selected.toJSON(),
      hideRoot: true,
      shouldExpandNode: function shouldExpandNode() {
        return selected.type.name !== "doc" ? true : false;
      }
    })));
  });
}