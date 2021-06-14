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
import { Subscribe } from "unstated";
import EditorStateContainer from "../state/editor";
import { SplitView, SplitViewCol } from "../components/split-view";
import JSONTree from "../components/json-tree";
import { Heading } from "../components/heading";
var ignoreFields = ["schema", "contentExpr", "schema", "parseDOM", "toDOM"];
export function postprocessValue(ignore, data) {
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
export var SchemaTab = /*#__PURE__*/function (_React$Component) {
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
      return /*#__PURE__*/React.createElement(SplitView, null, /*#__PURE__*/React.createElement(SplitViewCol, {
        grow: true
      }, /*#__PURE__*/React.createElement(Heading, null, "Nodes"), /*#__PURE__*/React.createElement(JSONTree, {
        data: schema.nodes,
        postprocessValue: postprocessValue.bind(null, ignoreFields)
      })), /*#__PURE__*/React.createElement(SplitViewCol, {
        grow: true,
        sep: true
      }, /*#__PURE__*/React.createElement(Heading, null, "Marks"), /*#__PURE__*/React.createElement(JSONTree, {
        data: schema.marks,
        postprocessValue: postprocessValue.bind(null, ignoreFields)
      })));
    }
  }]);

  return SchemaTab;
}(React.Component);
export default function SchemaTabContainer() {
  return /*#__PURE__*/React.createElement(Subscribe, {
    to: [EditorStateContainer]
  }, function (_ref) {
    var schema = _ref.state.state.schema;
    return /*#__PURE__*/React.createElement(SchemaTab, {
      schema: schema
    });
  });
}