"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postprocessValue = postprocessValue;
exports["default"] = SchemaTabContainer;
exports.SchemaTab = void 0;

var _react = _interopRequireDefault(require("react"));

var _unstated = require("unstated");

var _editor = _interopRequireDefault(require("../state/editor"));

var _splitView = require("../components/split-view");

var _jsonTree = _interopRequireDefault(require("../components/json-tree"));

var _heading = require("../components/heading");

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

var ignoreFields = ["schema", "contentExpr", "schema", "parseDOM", "toDOM"];

function postprocessValue(ignore, data) {
  if (!data || Object.prototype.toString.call(data) !== "[object Object]") {
    return data;
  }

  return Object.keys(data).filter(function (key) {
    return ignore.indexOf(key) === -1;
  }).reduce(function (res, key) {
    res[key] = data[key];
    return res;
  }, {});
}

var SchemaTab = /*#__PURE__*/function (_React$Component) {
  _inherits(SchemaTab, _React$Component);

  var _super = _createSuper(SchemaTab);

  function SchemaTab() {
    _classCallCheck(this, SchemaTab);

    return _super.apply(this, arguments);
  }

  _createClass(SchemaTab, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.schema !== nextProps.schema;
    }
  }, {
    key: "render",
    value: function render() {
      var schema = this.props.schema;
      return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, null, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
        grow: true
      }, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Nodes"), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
        data: schema.nodes,
        postprocessValue: postprocessValue.bind(null, ignoreFields)
      })), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
        grow: true,
        sep: true
      }, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Marks"), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
        data: schema.marks,
        postprocessValue: postprocessValue.bind(null, ignoreFields)
      })));
    }
  }]);

  return SchemaTab;
}(_react["default"].Component);

exports.SchemaTab = SchemaTab;

function SchemaTabContainer() {
  return /*#__PURE__*/_react["default"].createElement(_unstated.Subscribe, {
    to: [_editor["default"]]
  }, function (_ref) {
    var schema = _ref.state.state.schema;
    return /*#__PURE__*/_react["default"].createElement(SchemaTab, {
      schema: schema
    });
  });
}