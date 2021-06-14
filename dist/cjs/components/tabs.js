"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.TabPanel = exports.TabPanelStyled = exports.Tab = exports.TabStyled = exports.TabsStled = exports.TabList = void 0;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var TabList = (0, _styled["default"])("div")({
  display: "flex",
  listStyle: "none",
  borderBottom: "1px solid ".concat(_theme["default"].main20)
});
exports.TabList = TabList;
TabList.displayName = "TabList";
var TabsStled = (0, _styled["default"])("div")({
  height: "100%",
  width: "100%"
});
exports.TabsStled = TabsStled;
TabsStled.displayName = "TabsStyled";
var TabStyled = (0, _styled["default"])("div")({
  color: _theme["default"].white,
  textTransform: "uppercase",
  fontSize: "13px",
  padding: "16px 24px 14px",
  boxSizing: "border-box",
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
    background: _theme["default"].white05
  },
  "&:focus": {
    outline: "none"
  }
}, function (props) {
  return {
    borderBottom: props.isSelected ? "2px solid ".concat(_theme["default"].main) : "none"
  };
});
exports.TabStyled = TabStyled;
TabStyled.displayName = "TabStyled";

var Tab = /*#__PURE__*/function (_React$Component) {
  _inherits(Tab, _React$Component);

  var _super = _createSuper(Tab);

  function Tab() {
    _classCallCheck(this, Tab);

    return _super.apply(this, arguments);
  }

  _createClass(Tab, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement(TabStyled, {
        isSelected: this.props.index === this.context.tabs.selectedIndex,
        onClick: function onClick() {
          (_this.context.tabs.onSelect || function () {})(_this.props.index);
        }
      }, this.props.children);
    }
  }]);

  return Tab;
}(_react["default"].Component);

exports.Tab = Tab;
Tab.contextTypes = {
  tabs: _propTypes["default"].object.isRequired
};
var TabPanelStyled = (0, _styled["default"])("div")({
  width: "100%",
  height: "calc(100% - 48px)",
  boxSizing: "border-box"
});
exports.TabPanelStyled = TabPanelStyled;
TabPanelStyled.displayName = "TabPanelStyled";

var TabPanel = /*#__PURE__*/function (_React$Component2) {
  _inherits(TabPanel, _React$Component2);

  var _super2 = _createSuper(TabPanel);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _super2.apply(this, arguments);
  }

  _createClass(TabPanel, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(TabPanelStyled, null, this.props.children({
        index: this.context.tabs.selectedIndex
      }));
    }
  }]);

  return TabPanel;
}(_react["default"].Component);

exports.TabPanel = TabPanel;
TabPanel.contextTypes = {
  tabs: _propTypes["default"].object.isRequired
};

var Tabs = /*#__PURE__*/function (_React$Component3) {
  _inherits(Tabs, _React$Component3);

  var _super3 = _createSuper(Tabs);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _super3.apply(this, arguments);
  }

  _createClass(Tabs, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        tabs: {
          onSelect: this.props.onSelect,
          selectedIndex: this.props.selectedIndex
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(TabsStled, null, this.props.children);
    }
  }]);

  return Tabs;
}(_react["default"].Component);

exports.Tabs = Tabs;
Tabs.childContextTypes = {
  tabs: _propTypes["default"].object
};