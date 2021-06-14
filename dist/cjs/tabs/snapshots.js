"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotsList = SnapshotsList;
exports["default"] = SnapshotsTabContainer;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _unstated = require("unstated");

var _editor = _interopRequireDefault(require("../state/editor"));

var _splitView = require("../components/split-view");

var _list = require("../components/list");

var _infoPanel = require("../components/info-panel");

var _theme = _interopRequireDefault(require("../theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var ActionButton = (0, _styled["default"])("button")({
  padding: "6px 10px",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "11px",
  color: _theme["default"].white80,
  background: _theme["default"].white10,
  textTransform: "uppercase",
  transition: "background 0.3s, color 0.3s",
  borderRadius: "2px",
  border: "none",
  "& + &": {
    marginLeft: "4px"
  },
  "&:hover": {
    background: _theme["default"].main40,
    color: _theme["default"].white,
    cursor: "pointer"
  },
  "&:focus": {
    outline: "none"
  },
  "&:active": {
    background: _theme["default"].main60
  }
});
ActionButton.displayName = "ActionButton";
var ListItem = (0, _styled["default"])("div")({
  height: "24px",
  lineHeight: "24px",
  display: "flex",
  width: "100%"
});
ListItem.displayName = "ListItem";
var ListItemTitle = (0, _styled["default"])("div")({
  flexGrow: 1
});
ListItemTitle.displayName = "ListItemTitle";

function SnapshotsList(_ref) {
  var snapshots = _ref.snapshots,
      deleteSnapshot = _ref.deleteSnapshot,
      loadSnapshot = _ref.loadSnapshot;
  return /*#__PURE__*/_react["default"].createElement(_list.List, {
    getKey: function getKey(item) {
      return item.name + item.timestamp;
    },
    items: snapshots,
    title: function title(item) {
      return /*#__PURE__*/_react["default"].createElement(ListItem, null, /*#__PURE__*/_react["default"].createElement(ListItemTitle, null, item.name), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(ActionButton, {
        onClick: function onClick() {
          return deleteSnapshot(item);
        }
      }, "delete"), /*#__PURE__*/_react["default"].createElement(ActionButton, {
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
      return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
        noPaddings: true,
        grow: true
      }, snapshots && snapshots.length ? /*#__PURE__*/_react["default"].createElement(SnapshotsList, {
        snapshots: snapshots,
        loadSnapshot: loadSnapshot,
        deleteSnapshot: deleteSnapshot
      }) : /*#__PURE__*/_react["default"].createElement(_infoPanel.InfoPanel, null, "No saved snapshots yet. Press \"Save Snapshot\" button to add one.")));
    }
  }]);

  return SnapshotTab;
}(_react["default"].Component);

function SnapshotsTabContainer() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"]]
  }, function (_ref2) {
    var snapshots = _ref2.state.snapshots,
        loadSnapshot = _ref2.loadSnapshot,
        deleteSnapshot = _ref2.deleteSnapshot;
    return /*#__PURE__*/_react["default"].createElement(SnapshotTab, {
      snapshots: snapshots,
      loadSnapshot: loadSnapshot,
      deleteSnapshot: deleteSnapshot
    });
  });
}