function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import styled from "@emotion/styled";
import { Subscribe } from "unstated";
import EditorStateContainer from "../state/editor";
import { SplitView, SplitViewCol } from "../components/split-view";
import { List } from "../components/list";
import { InfoPanel } from "../components/info-panel";
import theme from "../theme";
var ActionButton = styled("button")({
  padding: "6px 10px",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "11px",
  color: theme.white80,
  background: theme.white10,
  textTransform: "uppercase",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "2px",
  border: "none",
  "& + &": {
    marginLeft: "4px"
  },
  "&:hover": {
    background: theme.main40,
    color: theme.white,
    cursor: "pointer"
  },
  "&:focus": {
    outline: "none"
  },
  "&:active": {
    background: theme.main60
  }
});
ActionButton.displayName = "ActionButton";
var ListItem = styled("div")({
  height: "24px",
  lineHeight: "24px",
  display: "flex",
  width: "100%"
});
ListItem.displayName = "ListItem";
var ListItemTitle = styled("div")({
  flexGrow: 1
});
ListItemTitle.displayName = "ListItemTitle";
export function SnapshotsList(_ref) {
  var snapshots = _ref.snapshots,
      deleteSnapshot = _ref.deleteSnapshot,
      loadSnapshot = _ref.loadSnapshot;
  return /*#__PURE__*/React.createElement(List, {
    getKey: function getKey(item) {
      return item.name + item.timestamp;
    },
    items: snapshots,
    title: function title(item) {
      return /*#__PURE__*/React.createElement(ListItem, null, /*#__PURE__*/React.createElement(ListItemTitle, null, item.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ActionButton, {
        onClick: function onClick() {
          return deleteSnapshot(item);
        }
      }, "delete"), /*#__PURE__*/React.createElement(ActionButton, {
        onClick: function onClick() {
          return loadSnapshot(item);
        }
      }, "restore")));
    }
  });
}

var SnapshotTab = /*#__PURE__*/function (_React$Component) {
  _inherits(SnapshotTab, _React$Component);

  var _super = _createSuper(SnapshotTab);

  function SnapshotTab() {
    _classCallCheck(this, SnapshotTab);

    return _super.apply(this, arguments);
  }

  _createClass(SnapshotTab, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.snapshots !== nextProps.snapshots;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          snapshots = _this$props.snapshots,
          loadSnapshot = _this$props.loadSnapshot,
          deleteSnapshot = _this$props.deleteSnapshot;
      return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
        noPaddings: true,
        grow: true
      }, snapshots && snapshots.length ? /*#__PURE__*/React.createElement(SnapshotsList, {
        snapshots: snapshots,
        loadSnapshot: loadSnapshot,
        deleteSnapshot: deleteSnapshot
      }) : /*#__PURE__*/React.createElement(InfoPanel, null, "No saved snapshots yet. Press \"Save Snapshot\" button to add one.")));
    }
  }]);

  return SnapshotTab;
}(React.Component);

export default function SnapshotsTabContainer() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer]
  }, function (_ref2) {
    var snapshots = _ref2.state.snapshots,
        loadSnapshot = _ref2.loadSnapshot,
        deleteSnapshot = _ref2.deleteSnapshot;
    return /*#__PURE__*/React.createElement(SnapshotTab, {
      snapshots: snapshots,
      loadSnapshot: loadSnapshot,
      deleteSnapshot: deleteSnapshot
    });
  });
}