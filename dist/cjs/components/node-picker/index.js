"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodePickerTrigger = exports.NodePicker = void 0;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _theme = _interopRequireDefault(require("../../theme"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAQAAAACNCElAAAAxklEQVRIx+2Vuw3DMAxEXWUD9VrKvTYJRzAygWpPkSVcBlDtJS6Fg8AQqQ+lAEECXU08iid+pmnoTwWDKzbU6IEbLnkYQaMlD9uA6iqAUArQwDBgX4T1Z+uF4Q4PB/sZmH/1e1BCRZiLhqgWKsJsYjJLUPkDEJKjvmPWwnwCtcKoW4O5VnpTFmaVb8o3LXONOiZAcI3aYe5UIFXiUmv77doOc7oUpDoozLU5iiPFqYtcW4W01LJP3FEiwzXBLG9SUBNq6Ef0BJ8IApq+rItIAAAAAElFTkSuQmCC";
var NodePickerStyled = (0, _styled["default"])("div")({
  position: "absolute",
  pointerEvents: "none",
  top: 0,
  left: 0,
  background: "rgba(0, 0, 255, 0.3)",
  zIndex: 99999,
  cursor: "pointer"
}, function (_ref) {
  var nodePicker = _ref.nodePicker;
  return {
    transform: "translateX(".concat(nodePicker.left, "px) translateY(").concat(nodePicker.top, "px)"),
    display: nodePicker.top && nodePicker.left ? "block" : "none",
    width: "".concat(nodePicker.width, "px"),
    height: "".concat(nodePicker.height, "px")
  };
});
NodePickerStyled.displayName = "NodePickerStyled";

var NodePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(NodePicker, _React$Component);

  var _super = _createSuper(NodePicker);

  function NodePicker() {
    var _this;

    _classCallCheck(this, NodePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      if (!_this.props.nodePicker.active) return;

      _this.props.onMouseMove(e.target);
    });

    _defineProperty(_assertThisInitialized(_this), "handleNodeClick", function (e) {
      if (!_this.props.nodePicker.active) return;
      e.preventDefault();

      _this.props.onSelect(e.target);
    });

    _defineProperty(_assertThisInitialized(_this), "closePicker", function () {
      if (!_this.props.nodePicker.active) return;

      _this.props.onClose();
    });

    return _this;
  }

  _createClass(NodePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.nodePicker.active) {
        this.initEventHandlers();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.destroyEventHandlers();

      if (nextProps.nodePicker.active) {
        this.initEventHandlers();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyEventHandlers();
    }
  }, {
    key: "initEventHandlers",
    value: function initEventHandlers() {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("click", this.handleNodeClick);
      document.addEventListener("keydown", this.closePicker);
    }
  }, {
    key: "destroyEventHandlers",
    value: function destroyEventHandlers() {
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("click", this.handleNodeClick);
      document.removeEventListener("keydown", this.closePicker);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(NodePickerStyled, {
        nodePicker: this.props.nodePicker
      });
    }
  }]);

  return NodePicker;
}(_react["default"].Component);

exports.NodePicker = NodePicker;
var NodePickerTrigger = (0, _styled["default"])("div")({
  position: "absolute",
  right: "4px",
  top: "-28px",
  width: "24px",
  height: "24px",
  borderRadius: "3px",
  "&:hover": {
    backgroundColor: _theme["default"].main80,
    cursor: "pointer"
  }
}, function (_ref2) {
  var isActive = _ref2.isActive;
  return {
    background: "".concat(isActive ? _theme["default"].main : _theme["default"].main60, " url(\"").concat(icon, "\")"),
    backgroundSize: "20px 20px",
    backgroundRepeat: "none",
    backgroundPosition: "50% 50%"
  };
});
exports.NodePickerTrigger = NodePickerTrigger;
NodePickerTrigger.displayName = "NodePickerTrigger";