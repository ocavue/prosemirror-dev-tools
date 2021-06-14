function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import theme from "../theme";

var noop = function noop() {};

export var ListItem = styled("div")({
  minWidth: "190px",
  width: "100%",
  display: "flex",
  boxSizing: "border-box",
  fontWeight: 400,
  letterSpacing: "1px",
  fontSize: "11px",
  color: theme.white80,
  textTransform: "uppercase",
  transition: "background .3s",
  textAlign: "left",
  fontFamily: "monospace",
  border: "none",
  borderTop: "1px solid ".concat(theme.main20),
  margin: 0,
  "&:first-child": {
    borderTop: "none"
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
}, function (props) {
  return {
    opacity: props.isDimmed ? 0.3 : 1,
    padding: props.nested ? "6px 18px 6px 36px" : "6px 18px",
    background: props.background ? props.background(props) : props.isSelected ? theme.main40 : "transparent"
  };
});
ListItem.displayName = "ListItem";
var ListItemGroupContent = styled("div")({
  display: "block"
}, function (props) {
  return {
    display: props.collapsed ? "none" : "block"
  };
});
ListItemGroupContent.displayName = "ListItemGroupContent";

var ListItemGroup = /*#__PURE__*/function (_PureComponent) {
  _inherits(ListItemGroup, _PureComponent);

  var _super = _createSuper(ListItemGroup);

  function ListItemGroup(props) {
    var _this;

    _classCallCheck(this, ListItemGroup);

    _this = _super.call(this, props);
    _this.state = {
      collapsed: true
    };
    return _this;
  }

  _createClass(ListItemGroup, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          items = _this$props.items,
          groupTitle = _this$props.groupTitle,
          title = _this$props.title,
          _this$props$isSelecte = _this$props.isSelected,
          isSelected = _this$props$isSelecte === void 0 ? noop : _this$props$isSelecte,
          _this$props$isPreviou = _this$props.isPrevious,
          isPrevious = _this$props$isPreviou === void 0 ? noop : _this$props$isPreviou,
          _this$props$isDimmed = _this$props.isDimmed,
          isDimmed = _this$props$isDimmed === void 0 ? noop : _this$props$isDimmed,
          _this$props$getKey = _this$props.getKey,
          getKey = _this$props$getKey === void 0 ? noop : _this$props$getKey,
          _this$props$onListIte = _this$props.onListItemClick,
          onListItemClick = _this$props$onListIte === void 0 ? noop : _this$props$onListIte,
          _this$props$onListIte2 = _this$props.onListItemDoubleClick,
          onListItemDoubleClick = _this$props$onListIte2 === void 0 ? noop : _this$props$onListIte2,
          customItemBackground = _this$props.customItemBackground;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ListItem, {
        key: getKey(items[0]),
        onClick: function onClick() {
          return _this2.toggle();
        },
        isSelected: items.some(isSelected) && this.state.collapsed,
        isPrevious: isPrevious(items[0], 0) && this.state.collapsed,
        isDimmed: items.every(isDimmed),
        background: customItemBackground
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flexGrow: 1
        }
      }, groupTitle(items, 0)), /*#__PURE__*/React.createElement("div", null, this.state.collapsed ? "▶" : "▼")), /*#__PURE__*/React.createElement(ListItemGroupContent, {
        collapsed: this.state.collapsed
      }, (items || []).map(function (item, index) {
        return /*#__PURE__*/React.createElement(ListItem, {
          key: getKey(item),
          nested: true,
          isSelected: isSelected(item, index),
          isPrevious: isPrevious(item, index),
          isDimmed: isDimmed(item, index),
          background: customItemBackground,
          onClick: function onClick() {
            return onListItemClick(item, index);
          },
          onDoubleClick: function onDoubleClick() {
            return onListItemDoubleClick(item, index);
          }
        }, title(item, index));
      })));
    }
  }]);

  return ListItemGroup;
}(PureComponent);

export function List(props) {
  var _props$isSelected = props.isSelected,
      isSelected = _props$isSelected === void 0 ? noop : _props$isSelected,
      _props$isPrevious = props.isPrevious,
      isPrevious = _props$isPrevious === void 0 ? noop : _props$isPrevious,
      _props$isDimmed = props.isDimmed,
      isDimmed = _props$isDimmed === void 0 ? noop : _props$isDimmed,
      _props$getKey = props.getKey,
      getKey = _props$getKey === void 0 ? noop : _props$getKey,
      _props$onListItemClic = props.onListItemClick,
      onListItemClick = _props$onListItemClic === void 0 ? noop : _props$onListItemClic,
      _props$onListItemDoub = props.onListItemDoubleClick,
      onListItemDoubleClick = _props$onListItemDoub === void 0 ? noop : _props$onListItemDoub;
  return /*#__PURE__*/React.createElement("div", null, (props.items || []).map(function (item, index) {
    if (Array.isArray(item)) {
      return /*#__PURE__*/React.createElement(ListItemGroup, _extends({}, props, {
        items: item,
        key: item[0].timestamp
      }), props.groupTitle(item, index));
    }

    return /*#__PURE__*/React.createElement(ListItem, {
      key: getKey(item),
      isSelected: isSelected(item, index),
      isPrevious: isPrevious(item, index),
      isDimmed: isDimmed(item, index),
      background: props.customItemBackground,
      onClick: function onClick() {
        return onListItemClick(item, index);
      },
      onDoubleClick: function onDoubleClick() {
        return onListItemDoubleClick(item, index);
      }
    }, props.title(item, index));
  }));
}