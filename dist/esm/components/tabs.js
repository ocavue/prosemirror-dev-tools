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
import PropTypes from "prop-types";
import theme from "../theme";
export var TabList = styled("div")({
  display: "flex",
  listStyle: "none",
  borderBottom: "1px solid ".concat(theme.main20)
});
TabList.displayName = "TabList";
export var TabsStled = styled("div")({
  height: "100%",
  width: "100%"
});
TabsStled.displayName = "TabsStyled";
export var TabStyled = styled("div")({
  color: theme.white,
  textTransform: "uppercase",
  fontSize: "13px",
  padding: "16px 24px 14px",
  boxSizing: "border-box",
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
    background: theme.white05
  },
  "&:focus": {
    outline: "none"
  }
}, function (props) {
  return {
    borderBottom: props.isSelected ? "2px solid ".concat(theme.main) : "none"
  };
});
TabStyled.displayName = "TabStyled";
export var Tab = /*#__PURE__*/function (_React$Component) {
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

      return /*#__PURE__*/React.createElement(TabStyled, {
        isSelected: this.props.index === this.context.tabs.selectedIndex,
        onClick: function onClick() {
          (_this.context.tabs.onSelect || function () {})(_this.props.index);
        }
      }, this.props.children);
    }
  }]);

  return Tab;
}(React.Component);
Tab.contextTypes = {
  tabs: PropTypes.object.isRequired
};
export var TabPanelStyled = styled("div")({
  width: "100%",
  height: "calc(100% - 48px)",
  boxSizing: "border-box"
});
TabPanelStyled.displayName = "TabPanelStyled";
export var TabPanel = /*#__PURE__*/function (_React$Component2) {
  _inherits(TabPanel, _React$Component2);

  var _super2 = _createSuper(TabPanel);

  function TabPanel() {
    _classCallCheck(this, TabPanel);

    return _super2.apply(this, arguments);
  }

  _createClass(TabPanel, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(TabPanelStyled, null, this.props.children({
        index: this.context.tabs.selectedIndex
      }));
    }
  }]);

  return TabPanel;
}(React.Component);
TabPanel.contextTypes = {
  tabs: PropTypes.object.isRequired
};
export var Tabs = /*#__PURE__*/function (_React$Component3) {
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
      return /*#__PURE__*/React.createElement(TabsStled, null, this.props.children);
    }
  }]);

  return Tabs;
}(React.Component);
Tabs.childContextTypes = {
  tabs: PropTypes.object
};