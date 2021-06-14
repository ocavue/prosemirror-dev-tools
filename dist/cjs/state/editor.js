"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSafeIndex = calculateSafeIndex;
exports.buildColors = buildColors;
exports.findPMNode = findPMNode;
exports.getActiveMarks = getActiveMarks;
exports.buildSelection = buildSelection;
exports.createHistoryEntry = createHistoryEntry;
exports.shrinkEditorHistory = shrinkEditorHistory;
exports.updateEditorHistory = updateEditorHistory;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _prosemirrorModel = require("prosemirror-model");

var _unstated = require("unstated");

var _html = require("html");

var _nanoid = _interopRequireDefault(require("nanoid"));

var _subscribeOnUpdates = _interopRequireDefault(require("../utils/subscribe-on-updates"));

var _findNode = _interopRequireWildcard(require("../utils/find-node"));

var _getEditorState = _interopRequireDefault(require("./get-editor-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NODE_PICKER_DEFAULT = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  active: false
};
var HISTORY_SIZE = 200;
var SNAPSHOTS_KEY = "prosemirror-dev-tools-snapshots";
var nodesColors = ["#EA7C7F", // red
"#67B0C6", // cyan 400
"#94BB7F", // green
"#CA9EDB", // deep purple
"#DCDC5D", // lime
"#B9CC7C", // light green
"#DD97D8", // purple
"#FFB761", // orange
"#4D8FD1", // light blue
"#F36E98", // pink
"#E45F44", // deep orange
"#A6A4AE", // blue grey
"#FCC047", // yellow
"#FFC129", // amber
"#D3929C", // can can
"#4CBCD4", // cyan
"#8D7BC0" // indigo
];

function calculateSafeIndex(index, total) {
  var quotient = index / total;
  return Math.round(total * (quotient - Math.floor(quotient)));
}

function buildColors(schema) {
  return Object.keys(schema.nodes).reduce(function (acc, node, index) {
    var safeIndex = index >= nodesColors.length ? calculateSafeIndex(index, nodesColors.length) : index;
    acc[node] = nodesColors[safeIndex];
    return acc;
  }, {});
}

function findPMNode(domNode) {
  var node;
  var target = domNode;

  while (!node && target) {
    if (target.pmViewDesc) {
      node = target;
    }

    target = target.parentNode;
  }

  return node;
}

function getActiveMarks(editorState) {
  var selection = editorState.selection;
  var marks = [];

  if (selection.empty) {
    marks = selection.storedMarks || selection.$from.marks();
  } else {
    editorState.doc.nodesBetween(selection.from, selection.to, function (node) {
      marks = marks.concat(node.marks);
    });
  }

  marks = marks.reduce(function (acc, mark) {
    if (acc.indexOf(mark) === -1) {
      acc.push(mark);
    }

    return acc;
  }, []).map(function (m) {
    return m.toJSON();
  });
  return marks;
}

function buildSelection(selection) {
  return {
    type: selection.type,
    empty: selection.empty,
    anchor: selection.anchor,
    head: selection.head,
    from: selection.from,
    to: selection.to
  };
}

function createHistoryEntry(editorState) {
  var serializer = _prosemirrorModel.DOMSerializer.fromSchema(editorState.schema);

  var selection = editorState.selection;
  var domFragment = serializer.serializeFragment(selection.content().content);
  var selectionContent = [];

  if (domFragment) {
    var child = domFragment.firstChild;

    while (child) {
      selectionContent.push(child.outerHTML);
      child = child.nextSibling;
    }
  }

  return {
    id: (0, _nanoid["default"])(),
    state: editorState,
    timestamp: Date.now(),
    diffPending: true,
    diff: undefined,
    selection: undefined,
    selectionContent: (0, _html.prettyPrint)(selectionContent.join("\n"), {
      max_char: 60,
      indent_size: 2
    })
  };
}

function shrinkEditorHistory(history, historyRolledBackTo) {
  var startIndex = historyRolledBackTo !== false ? historyRolledBackTo : 0;
  return history.slice(startIndex, HISTORY_SIZE);
}

function updateEditorHistory(history, historyRolledBackTo, tr, newState) {
  var skipHistory = tr.getMeta("_skip-dev-tools-history_");
  if (skipHistory) return;
  var newHistory = shrinkEditorHistory(history, historyRolledBackTo);
  newHistory.unshift(createHistoryEntry(newState));
  return newHistory;
}

var EditorStateContainer = /*#__PURE__*/function (_Container) {
  _inherits(EditorStateContainer, _Container);

  var _super = _createSuper(EditorStateContainer);

  function EditorStateContainer(_editorView, props) {
    var _this;

    _classCallCheck(this, EditorStateContainer);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "state", {
      EditorState: function EditorState() {},
      view: null,
      state: {},
      schema: {},
      nodeColors: {},
      activeMarks: [],
      history: [],
      expandPath: [],
      historyRolledBackTo: false,
      selectedHistoryItem: 0,
      snapshots: JSON.parse(window.localStorage.getItem(SNAPSHOTS_KEY)) || [],
      nodePicker: NODE_PICKER_DEFAULT
    });

    _defineProperty(_assertThisInitialized(_this), "activatePicker", function () {
      _this.setState({
        nodePicker: Object.assign({}, NODE_PICKER_DEFAULT, {
          active: true
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deactivatePicker", function () {
      var picker = _this.state.nodePicker;

      if (picker.onMouseOver) {
        document.removeEventListener("mouseover", picker.onMouseOver);
      }

      if (picker.onMouseOver) {
        document.removeEventListener("click", picker.onClick);
      }

      _this.setState({
        nodePicker: NODE_PICKER_DEFAULT
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateNodePickerPossition", function (target) {
      var node = findPMNode(target);

      if (node && (node.pmViewDesc.node && node.pmViewDesc.node.type.name !== "doc" || node.pmViewDesc.mark)) {
        var _node$getBoundingClie = node.getBoundingClientRect(),
            top = _node$getBoundingClie.top,
            left = _node$getBoundingClie.left,
            width = _node$getBoundingClie.width,
            height = _node$getBoundingClie.height;

        _this.setState({
          nodePicker: {
            top: top + window.scrollY,
            left: left,
            width: width,
            height: height,
            active: true
          }
        });
      } else {
        _this.setState({
          nodePicker: Object.assign({}, NODE_PICKER_DEFAULT, {
            active: true
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "nodePickerSelect", function (target) {
      var node = findPMNode(target);

      if (node) {
        var editorState = _this.state.state;
        var path = (0, _findNode["default"])(editorState.doc, editorState.doc.nodeAt(node.pmViewDesc.posAtStart));

        _this.setState({
          expandPath: path
        });
      }

      _this.setState({
        nodePicker: NODE_PICKER_DEFAULT
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveSnapshot", function () {
      var snapshotName = prompt("Enter snapshot name", Date.now());
      if (!snapshotName) return;
      var snapshots = [{
        name: snapshotName,
        timestamp: Date.now(),
        snapshot: _this.state.state.doc.toJSON()
      }].concat(_this.state.snapshots);

      _this.setState({
        snapshots: snapshots
      });

      window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
    });

    _defineProperty(_assertThisInitialized(_this), "loadSnapshot", function (snapshot) {
      var EditorState = _this.state.EditorState;
      var editorView = _this.state.view;
      var editorState = editorView.state;
      var newState = EditorState.create({
        schema: editorState.schema,
        plugins: editorState.plugins,
        doc: editorState.schema.nodeFromJSON(snapshot.snapshot)
      });

      _this.setState({
        history: [createHistoryEntry(newState)],
        state: newState
      });

      editorView.updateState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSnapshot", function (snapshot) {
      var snapshots = _this.state.snapshots;
      var snapshotIndex = snapshots.indexOf(snapshot);
      snapshots.splice(snapshotIndex, 1);

      _this.setState({
        snapshots: [].concat(snapshots)
      });

      window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
    });

    _defineProperty(_assertThisInitialized(_this), "logNodeFromJSON", function (_ref) {
      var doc = _ref.doc,
          node = _ref.node;
      var fullDoc = _this.state.state.doc;
      var path = (0, _findNode.findNodeInJSON)(doc, node);

      if (path) {
        console.log(path.reduce(function (node, pathItem) {
          return node[pathItem];
        }, fullDoc));
      } else {
        console.log(node);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectHistoryItem", function (index) {
      return _this.setState({
        selectedHistoryItem: index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "rollbackHistory", function (index) {
      var EditorState = _this.state.EditorState;
      var editorState = _this.state.history[index].state;
      var editorView = _this.state.view;
      var newState = EditorState.create({
        schema: editorState.schema,
        plugins: editorState.plugins,
        doc: editorState.schema.nodeFromJSON(editorState.doc.toJSON())
      });
      editorView.updateState(newState);
      editorView.dom.focus();
      var tr = editorView.state.tr.setSelection(editorState.selection).setMeta("addToHistory", false).setMeta("_skip-dev-tools-history_", true);
      editorView.dispatch(tr);

      _this.setState({
        state: newState,
        historyRolledBackTo: index
      });
    });

    _this.diffWorker = props && props.diffWorker ? Promise.resolve().then(function () {
      return _interopRequireWildcard(require("./json-diff-worker"));
    }).then(function (_ref2) {
      var JsonDiffWorker = _ref2.JsonDiffWorker;
      return new JsonDiffWorker(props.diffWorker);
    }) : Promise.resolve().then(function () {
      return _interopRequireWildcard(require("./json-diff-main"));
    }).then(function (_ref3) {
      var JsonDiffMain = _ref3.JsonDiffMain;
      return new JsonDiffMain();
    });
    _this.state = Object.assign({}, _this.state, {
      EditorState: (0, _getEditorState["default"])(props),
      view: _editorView,
      state: _editorView.state,
      nodeColors: buildColors(_editorView.state.schema),
      history: [{
        state: _editorView.state,
        timestamp: Date.now()
      }]
    });
    (0, _subscribeOnUpdates["default"])(_editorView, function (tr, oldState, newState) {
      var updatedHistory = updateEditorHistory(_this.state.history, _this.state.historyRolledBackTo, tr, newState);

      if (oldState && updatedHistory) {
        var _updatedHistory = _slicedToArray(updatedHistory, 1),
            id = _updatedHistory[0].id;

        var self = _assertThisInitialized(_this);

        _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var diffWorker, _yield$Promise$all, _yield$Promise$all2, diff, selection, history;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.diffWorker;

                case 2:
                  diffWorker = _context.sent;
                  _context.next = 5;
                  return Promise.all([diffWorker.diff({
                    a: oldState.doc.toJSON(),
                    b: newState.doc.toJSON(),
                    id: id
                  }), diffWorker.diff({
                    a: buildSelection(oldState.selection),
                    b: buildSelection(newState.selection),
                    id: id
                  })]);

                case 5:
                  _yield$Promise$all = _context.sent;
                  _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                  diff = _yield$Promise$all2[0].delta;
                  selection = _yield$Promise$all2[1].delta;
                  history = updatedHistory.map(function (item) {
                    return item.id === id ? Object.assign({}, item, {
                      diff: diff,
                      diffPending: false,
                      selection: selection
                    }) : item;
                  });
                  self.setState({
                    history: history
                  });

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }

      _this.setState({
        state: newState,
        nodeColors: buildColors(newState.schema),
        activeMarks: getActiveMarks(newState),
        history: updatedHistory || _this.state.history,
        selectedHistoryItem: updatedHistory ? 0 : _this.state.selectedHistoryItem,
        historyRolledBackTo: updatedHistory ? false : _this.state.historyRolledBackTo
      });
    });
    return _this;
  }

  return EditorStateContainer;
}(_unstated.Container);

exports["default"] = EditorStateContainer;