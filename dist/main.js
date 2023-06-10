/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dataFunction.js":
/*!*************************************!*\
  !*** ./src/modules/dataFunction.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   deleteTask: () => (/* binding */ deleteTask),
/* harmony export */   loadData: () => (/* binding */ loadData),
/* harmony export */   saveData: () => (/* binding */ saveData),
/* harmony export */   updateTask: () => (/* binding */ updateTask)
/* harmony export */ });
const saveData = tasks => {
  localStorage.setItem('tasks_data', JSON.stringify(tasks));
};
const loadData = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks_data')) || [];
  return tasks;
};
const addTask = task => {
  const dataTask = loadData();
  dataTask.push(task);
  saveData(dataTask);
};
const deleteTask = idTask => {
  const dataTask = loadData();
  const newDataTask = dataTask.filter(task => task.element.id !== idTask);
  saveData(newDataTask);
};
const updateTask = (idTask, newContent) => {
  const dataTask = loadData();
  const task = dataTask.find(task => task.element.id === idTask);
  task.description = newContent.description;
  saveData(dataTask);
};


/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _dataFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataFunction.js */ "./src/modules/dataFunction.js");

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    // kee some data in key element
    this.element = {};
    this.element.id = `task_${Math.floor(Math.random() * 100000)}`;
    this.element.root = Task.createRoot();
    // get nodeElement from the root
    this.element.taskItemText = this.element.root.querySelector('.task_item_text');
    this.element.taskItemCheck = this.element.root.querySelector('.task_item_check');
    this.element.taskItemBtn = this.element.root.querySelector('.task_item_btn');
    this.element.taskItemBtnTrash = this.element.root.querySelector('.task_item_btn_trash');
    // set nodeElement value
    this.element.taskItemText.textContent = this.description;
    this.element.taskItemCheck.value = this.completed;
    // 3 dots menu EventListener
    this.element.taskItemBtn.addEventListener('click', () => {
      this.element.taskItemBtnTrash.classList.remove('hidden');
      this.element.taskItemBtn.classList.add('hidden');
    });
    // remove EventListener
    this.element.taskItemBtnTrash.addEventListener('click', () => {
      this.element.taskItemBtnTrash.classList.add('hidden');
      this.element.taskItemBtn.classList.remove('hidden');
      (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(this.element.id);
      this.element.root.parentElement.removeChild(this.element.root);
    });
    // Update EventListener
    this.element.taskItemText.addEventListener('blur', () => {
      const newDescription = this.element.taskItemText.textContent.trim();
      this.description = newDescription;
      (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(this.element.id, {
        description: this.description
      });
    });
  }
  static createRoot = () => {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
            <div class="task_item" draggable='true'>
                <input class="form-check-input task_item_check" type="checkbox" value="" id="flexCheckChecked">
                <p class="task_item_text" contenteditable>Task 1</p>
                <button class="btn  task_item_btn"><i class="bi bi-three-dots-vertical"></i></button>
                <button class="btn hidden task_item_btn_trash trash"><i class="bi bi-trash3-fill trash"></i></button>
            </div>
          `).children[0];
  };
}

/***/ }),

/***/ "./src/modules/viewFunction.js":
/*!*************************************!*\
  !*** ./src/modules/viewFunction.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkTextContent: () => (/* binding */ checkTextContent),
/* harmony export */   populateTask: () => (/* binding */ populateTask),
/* harmony export */   renderTask: () => (/* binding */ renderTask)
/* harmony export */ });
/* harmony import */ var _dataFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataFunction.js */ "./src/modules/dataFunction.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.js */ "./src/modules/task.js");


const addTaskView = (task, parent) => {
  const checkValue = task.completed;
  if (checkValue) {
    task.element.taskItemCheck.setAttribute('checked', true);
  }
  parent.appendChild(task.element.root);
};
const renderTask = parent => {
  // 1st empty the container
  parent.innerHTML = '';
  const arrTask = (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.loadData)();
  const newArrTask = [];
  let i = 1;
  arrTask.forEach(task => {
    task.index = i;
    const newTask = new _task_js__WEBPACK_IMPORTED_MODULE_1__["default"](task.description, task.completed, i);
    i += 1;
    newArrTask.push(newTask);
    addTaskView(newTask, parent);
  });
  // task id changes when we renderTask()
  // to save the right id we restore localStorage
  (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.saveData)(newArrTask);
};
const populateTask = (description, parent) => {
  const arrTask = (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.loadData)();
  const index = arrTask.length + 1;
  const newTask = new _task_js__WEBPACK_IMPORTED_MODULE_1__["default"](description, false, index);
  (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(newTask);
  addTaskView(newTask, parent);
};
const checkTextContent = content => {
  if (content === '') {
    return 'Task Description';
  }
  return content;
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --skyBeige: #c4c0bcf3;
  --grey_dark: rgba(0, 0, 0, 0.25);
  --skyGreen: #087474f3;
  --skyBeigeV2: #90918cf3;
  --white: #fff;
}

* {
  box-sizing: border-box;
}

main[class="main_container"] {
  width: 50%;
  margin: auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.input-group_add_task {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.input_insert_task {
  padding: 0.6rem 0;
  width: 91%;
  border-style: solid none solid none;
  border: 0.1rem var(--grey_dark);
  box-sizing: content-box;
  background-color: var(--skyBeige);
}

.btn_add_task {
  padding: 0.6rem 0;
  box-sizing: content-box;
  flex-grow: 1;
  border-style: solid none solid none;
  border: 0.1rem var(--grey_dark);
  background-color: var(--skyBeige);
  cursor: pointer;
}

.btn_add_task:active {
  color: var(--skyGreen);
}

.btn_add_task:hover {
  opacity: 0.5;
}

.hidden {
  display: none;
}

/* task_item */

.task_item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  background-color: var(--skyBeigeV2);
}

.task_item_btn {
  border: none;
  background-color: var(--skyBeigeV2);
  opacity: 0.3;
  cursor: pointer;
}

.task_item_btn:hover {
  opacity: 0.7;
}

.btn_clear_all_completed_tasks {
  width: 99%;
  box-sizing: content-box;
  padding: 0.6rem 0;
  margin: 0;
  cursor: pointer;
}

.btn_clear_all_completed_tasks:hover {
  opacity: 0.5;
}

.btn_clear_all_completed_tasks:active {
  color: var(--white);
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,gCAAgC;EAChC,qBAAqB;EACrB,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,mCAAmC;EACnC,+BAA+B;EAC/B,uBAAuB;EACvB,iCAAiC;AACnC;;AAEA;EACE,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,mCAAmC;EACnC,+BAA+B;EAC/B,iCAAiC;EACjC,eAAe;AACjB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA,cAAc;;AAEd;EACE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;EACrB,WAAW;EACX,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,mCAAmC;EACnC,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,uBAAuB;EACvB,iBAAiB;EACjB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":[":root {\r\n  --skyBeige: #c4c0bcf3;\r\n  --grey_dark: rgba(0, 0, 0, 0.25);\r\n  --skyGreen: #087474f3;\r\n  --skyBeigeV2: #90918cf3;\r\n  --white: #fff;\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nmain[class=\"main_container\"] {\r\n  width: 50%;\r\n  margin: auto;\r\n}\r\n\r\nheader {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.input-group_add_task {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-around;\r\n}\r\n\r\n.input_insert_task {\r\n  padding: 0.6rem 0;\r\n  width: 91%;\r\n  border-style: solid none solid none;\r\n  border: 0.1rem var(--grey_dark);\r\n  box-sizing: content-box;\r\n  background-color: var(--skyBeige);\r\n}\r\n\r\n.btn_add_task {\r\n  padding: 0.6rem 0;\r\n  box-sizing: content-box;\r\n  flex-grow: 1;\r\n  border-style: solid none solid none;\r\n  border: 0.1rem var(--grey_dark);\r\n  background-color: var(--skyBeige);\r\n  cursor: pointer;\r\n}\r\n\r\n.btn_add_task:active {\r\n  color: var(--skyGreen);\r\n}\r\n\r\n.btn_add_task:hover {\r\n  opacity: 0.5;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n/* task_item */\r\n\r\n.task_item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n  width: 100%;\r\n  background-color: var(--skyBeigeV2);\r\n}\r\n\r\n.task_item_btn {\r\n  border: none;\r\n  background-color: var(--skyBeigeV2);\r\n  opacity: 0.3;\r\n  cursor: pointer;\r\n}\r\n\r\n.task_item_btn:hover {\r\n  opacity: 0.7;\r\n}\r\n\r\n.btn_clear_all_completed_tasks {\r\n  width: 99%;\r\n  box-sizing: content-box;\r\n  padding: 0.6rem 0;\r\n  margin: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.btn_clear_all_completed_tasks:hover {\r\n  opacity: 0.5;\r\n}\r\n\r\n.btn_clear_all_completed_tasks:active {\r\n  color: var(--white);\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/viewFunction.js */ "./src/modules/viewFunction.js");


const taskList = document.querySelector('.tasks_list');
window.onload = () => {
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.renderTask)(taskList);
};

// Add a task listener
const inputInsertTask = document.querySelector('.input_insert_task');
const btnAddTask = document.querySelector('.btn_add_task');
btnAddTask.addEventListener('click', () => {
  const description = (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.checkTextContent)(inputInsertTask.value.trim());
  if (description) {
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.populateTask)(description, taskList);
    inputInsertTask.value = '';
  }
});

// Remove a Task listener
taskList.addEventListener('click', e => {
  if (e.target.classList.contains('trash') || e.target.parentElement.classList.contains('trash')) {
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.renderTask)(taskList);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxRQUFRLEdBQUlDLEtBQUssSUFBSztFQUMxQkMsWUFBWSxDQUFDQyxPQUFPLENBQUMsWUFBWSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ0osS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELE1BQU1LLFFBQVEsR0FBR0EsQ0FBQSxLQUFNO0VBQ3JCLE1BQU1MLEtBQUssR0FBR0csSUFBSSxDQUFDRyxLQUFLLENBQUNMLFlBQVksQ0FBQ00sT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRTtFQUNsRSxPQUFPUCxLQUFLO0FBQ2QsQ0FBQztBQUVELE1BQU1RLE9BQU8sR0FBSUMsSUFBSSxJQUFLO0VBQ3hCLE1BQU1DLFFBQVEsR0FBR0wsUUFBUSxDQUFDLENBQUM7RUFDM0JLLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDRixJQUFJLENBQUM7RUFDbkJWLFFBQVEsQ0FBQ1csUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNRSxVQUFVLEdBQUlDLE1BQU0sSUFBSztFQUM3QixNQUFNSCxRQUFRLEdBQUdMLFFBQVEsQ0FBQyxDQUFDO0VBQzNCLE1BQU1TLFdBQVcsR0FBR0osUUFBUSxDQUFDSyxNQUFNLENBQUVOLElBQUksSUFBS0EsSUFBSSxDQUFDTyxPQUFPLENBQUNDLEVBQUUsS0FBS0osTUFBTSxDQUFDO0VBQ3pFZCxRQUFRLENBQUNlLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQsTUFBTUksVUFBVSxHQUFHQSxDQUFDTCxNQUFNLEVBQUVNLFVBQVUsS0FBSztFQUN6QyxNQUFNVCxRQUFRLEdBQUdMLFFBQVEsQ0FBQyxDQUFDO0VBQzNCLE1BQU1JLElBQUksR0FBR0MsUUFBUSxDQUFDVSxJQUFJLENBQUVYLElBQUksSUFBTUEsSUFBSSxDQUFDTyxPQUFPLENBQUNDLEVBQUUsS0FBS0osTUFBTyxDQUFDO0VBQ2xFSixJQUFJLENBQUNZLFdBQVcsR0FBR0YsVUFBVSxDQUFDRSxXQUFXO0VBQ3pDdEIsUUFBUSxDQUFDVyxRQUFRLENBQUM7QUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMEQ7QUFFNUMsTUFBTVksSUFBSSxDQUFDO0VBQ3hCQyxXQUFXQSxDQUFDRixXQUFXLEVBQUVHLFNBQVMsRUFBRUMsS0FBSyxFQUFFO0lBQ3pDLElBQUksQ0FBQ0osV0FBVyxHQUFHQSxXQUFXO0lBQzlCLElBQUksQ0FBQ0csU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCO0lBQ0EsSUFBSSxDQUFDVCxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLElBQUksQ0FBQ0EsT0FBTyxDQUFDQyxFQUFFLEdBQUksUUFBT1MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUUsRUFBQztJQUM5RCxJQUFJLENBQUNaLE9BQU8sQ0FBQ2EsSUFBSSxHQUFHUCxJQUFJLENBQUNRLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDO0lBQ0EsSUFBSSxDQUFDZCxPQUFPLENBQUNlLFlBQVksR0FBRyxJQUFJLENBQUNmLE9BQU8sQ0FBQ2EsSUFBSSxDQUFDRyxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDOUUsSUFBSSxDQUFDaEIsT0FBTyxDQUFDaUIsYUFBYSxHQUFHLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ2EsSUFBSSxDQUFDRyxhQUFhLENBQUMsa0JBQWtCLENBQUM7SUFDaEYsSUFBSSxDQUFDaEIsT0FBTyxDQUFDa0IsV0FBVyxHQUFHLElBQUksQ0FBQ2xCLE9BQU8sQ0FBQ2EsSUFBSSxDQUFDRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDNUUsSUFBSSxDQUFDaEIsT0FBTyxDQUFDbUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDbkIsT0FBTyxDQUFDYSxJQUFJLENBQUNHLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztJQUN2RjtJQUNBLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQ2UsWUFBWSxDQUFDSyxXQUFXLEdBQUcsSUFBSSxDQUFDZixXQUFXO0lBQ3hELElBQUksQ0FBQ0wsT0FBTyxDQUFDaUIsYUFBYSxDQUFDSSxLQUFLLEdBQUcsSUFBSSxDQUFDYixTQUFTO0lBQ2pEO0lBQ0EsSUFBSSxDQUFDUixPQUFPLENBQUNrQixXQUFXLENBQUNJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQ3ZELElBQUksQ0FBQ3RCLE9BQU8sQ0FBQ21CLGdCQUFnQixDQUFDSSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDeEQsSUFBSSxDQUFDeEIsT0FBTyxDQUFDa0IsV0FBVyxDQUFDSyxTQUFTLENBQUNFLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0lBQ0Y7SUFDQSxJQUFJLENBQUN6QixPQUFPLENBQUNtQixnQkFBZ0IsQ0FBQ0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07TUFDNUQsSUFBSSxDQUFDdEIsT0FBTyxDQUFDbUIsZ0JBQWdCLENBQUNJLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUNyRCxJQUFJLENBQUN6QixPQUFPLENBQUNrQixXQUFXLENBQUNLLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUNuRDVCLDREQUFVLENBQUMsSUFBSSxDQUFDSSxPQUFPLENBQUNDLEVBQUUsQ0FBQztNQUMzQixJQUFJLENBQUNELE9BQU8sQ0FBQ2EsSUFBSSxDQUFDYSxhQUFhLENBQUNDLFdBQVcsQ0FBQyxJQUFJLENBQUMzQixPQUFPLENBQUNhLElBQUksQ0FBQztJQUNoRSxDQUFDLENBQUM7SUFDRjtJQUNBLElBQUksQ0FBQ2IsT0FBTyxDQUFDZSxZQUFZLENBQUNPLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO01BQ3ZELE1BQU1NLGNBQWMsR0FBRyxJQUFJLENBQUM1QixPQUFPLENBQUNlLFlBQVksQ0FBQ0ssV0FBVyxDQUFDUyxJQUFJLENBQUMsQ0FBQztNQUNuRSxJQUFJLENBQUN4QixXQUFXLEdBQUd1QixjQUFjO01BQ2pDMUIsNERBQVUsQ0FBQyxJQUFJLENBQUNGLE9BQU8sQ0FBQ0MsRUFBRSxFQUFFO1FBQUVJLFdBQVcsRUFBRSxJQUFJLENBQUNBO01BQVksQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQztFQUNKO0VBRUUsT0FBT1MsVUFBVSxHQUFHQSxDQUFBLEtBQU07SUFDeEIsTUFBTWdCLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUNwQ0YsS0FBSyxDQUFDRyxVQUFVLENBQUNGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO0lBQy9CLE9BQU9KLEtBQUssQ0FBQ0ssd0JBQXdCLENBQUU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDcEIsQ0FBQztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRDJCO0FBQ0U7QUFFN0IsTUFBTUMsV0FBVyxHQUFHQSxDQUFDNUMsSUFBSSxFQUFFNkMsTUFBTSxLQUFLO0VBQ3BDLE1BQU1DLFVBQVUsR0FBRzlDLElBQUksQ0FBQ2UsU0FBUztFQUNqQyxJQUFJK0IsVUFBVSxFQUFFO0lBQ2Q5QyxJQUFJLENBQUNPLE9BQU8sQ0FBQ2lCLGFBQWEsQ0FBQ3VCLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0VBQzFEO0VBQ0FGLE1BQU0sQ0FBQ0csV0FBVyxDQUFDaEQsSUFBSSxDQUFDTyxPQUFPLENBQUNhLElBQUksQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTTZCLFVBQVUsR0FBSUosTUFBTSxJQUFLO0VBQzdCO0VBQ0FBLE1BQU0sQ0FBQ0ssU0FBUyxHQUFHLEVBQUU7RUFDckIsTUFBTUMsT0FBTyxHQUFHdkQsMERBQVEsQ0FBQyxDQUFDO0VBQzFCLE1BQU13RCxVQUFVLEdBQUcsRUFBRTtFQUNyQixJQUFJQyxDQUFDLEdBQUcsQ0FBQztFQUNURixPQUFPLENBQUNHLE9BQU8sQ0FBRXRELElBQUksSUFBSztJQUN4QkEsSUFBSSxDQUFDZ0IsS0FBSyxHQUFHcUMsQ0FBQztJQUNkLE1BQU1FLE9BQU8sR0FBRyxJQUFJMUMsZ0RBQUksQ0FBQ2IsSUFBSSxDQUFDWSxXQUFXLEVBQUVaLElBQUksQ0FBQ2UsU0FBUyxFQUFFc0MsQ0FBQyxDQUFDO0lBQzdEQSxDQUFDLElBQUksQ0FBQztJQUNORCxVQUFVLENBQUNsRCxJQUFJLENBQUNxRCxPQUFPLENBQUM7SUFDeEJYLFdBQVcsQ0FBQ1csT0FBTyxFQUFFVixNQUFNLENBQUM7RUFDOUIsQ0FBQyxDQUFDO0VBQ0Y7RUFDQTtFQUNBdkQsMERBQVEsQ0FBQzhELFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTUksWUFBWSxHQUFHQSxDQUFDNUMsV0FBVyxFQUFFaUMsTUFBTSxLQUFLO0VBQzVDLE1BQU1NLE9BQU8sR0FBR3ZELDBEQUFRLENBQUMsQ0FBQztFQUMxQixNQUFNb0IsS0FBSyxHQUFJbUMsT0FBTyxDQUFDTSxNQUFNLEdBQUksQ0FBQztFQUNsQyxNQUFNRixPQUFPLEdBQUcsSUFBSTFDLGdEQUFJLENBQUNELFdBQVcsRUFBRSxLQUFLLEVBQUVJLEtBQUssQ0FBQztFQUNuRGpCLHlEQUFPLENBQUN3RCxPQUFPLENBQUM7RUFDaEJYLFdBQVcsQ0FBQ1csT0FBTyxFQUFFVixNQUFNLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU1hLGdCQUFnQixHQUFJQyxPQUFPLElBQUs7RUFDcEMsSUFBSUEsT0FBTyxLQUFLLEVBQUUsRUFBRTtJQUNsQixPQUFPLGtCQUFrQjtFQUMzQjtFQUNBLE9BQU9BLE9BQU87QUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDRDtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxXQUFXLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksaUNBQWlDLDRCQUE0Qix1Q0FBdUMsNEJBQTRCLDhCQUE4QixvQkFBb0IsS0FBSyxXQUFXLDZCQUE2QixLQUFLLHdDQUF3QyxpQkFBaUIsbUJBQW1CLEtBQUssZ0JBQWdCLG9CQUFvQixxQ0FBcUMsNEJBQTRCLEtBQUssK0JBQStCLGtCQUFrQixvQkFBb0Isb0NBQW9DLEtBQUssNEJBQTRCLHdCQUF3QixpQkFBaUIsMENBQTBDLHNDQUFzQyw4QkFBOEIsd0NBQXdDLEtBQUssdUJBQXVCLHdCQUF3Qiw4QkFBOEIsbUJBQW1CLDBDQUEwQyxzQ0FBc0Msd0NBQXdDLHNCQUFzQixLQUFLLDhCQUE4Qiw2QkFBNkIsS0FBSyw2QkFBNkIsbUJBQW1CLEtBQUssaUJBQWlCLG9CQUFvQixLQUFLLDJDQUEyQyxvQkFBb0IscUNBQXFDLDRCQUE0QixrQkFBa0IsMENBQTBDLEtBQUssd0JBQXdCLG1CQUFtQiwwQ0FBMEMsbUJBQW1CLHNCQUFzQixLQUFLLDhCQUE4QixtQkFBbUIsS0FBSyx3Q0FBd0MsaUJBQWlCLDhCQUE4Qix3QkFBd0IsZ0JBQWdCLHNCQUFzQixLQUFLLDhDQUE4QyxtQkFBbUIsS0FBSywrQ0FBK0MsMEJBQTBCLEtBQUssdUJBQXVCO0FBQzNtRjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ3ZHMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ2tFO0FBRXZGLE1BQU1DLFFBQVEsR0FBR3RCLFFBQVEsQ0FBQ2YsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUV0RHNDLE1BQU0sQ0FBQ0MsTUFBTSxHQUFHLE1BQU07RUFDcEJiLG9FQUFVLENBQUNXLFFBQVEsQ0FBQztBQUN0QixDQUFDOztBQUVEO0FBQ0EsTUFBTUcsZUFBZSxHQUFHekIsUUFBUSxDQUFDZixhQUFhLENBQUMsb0JBQW9CLENBQUM7QUFDcEUsTUFBTXlDLFVBQVUsR0FBRzFCLFFBQVEsQ0FBQ2YsYUFBYSxDQUFDLGVBQWUsQ0FBQztBQUMxRHlDLFVBQVUsQ0FBQ25DLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3pDLE1BQU1qQixXQUFXLEdBQUc4QywwRUFBZ0IsQ0FBQ0ssZUFBZSxDQUFDbkMsS0FBSyxDQUFDUSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLElBQUl4QixXQUFXLEVBQUU7SUFDZjRDLHNFQUFZLENBQUM1QyxXQUFXLEVBQUVnRCxRQUFRLENBQUM7SUFDbkNHLGVBQWUsQ0FBQ25DLEtBQUssR0FBRyxFQUFFO0VBQzVCO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0FnQyxRQUFRLENBQUMvQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdvQyxDQUFDLElBQUs7RUFDeEMsSUFBSUEsQ0FBQyxDQUFDQyxNQUFNLENBQUNwQyxTQUFTLENBQUNxQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUlGLENBQUMsQ0FBQ0MsTUFBTSxDQUFDakMsYUFBYSxDQUFDSCxTQUFTLENBQUNxQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDOUZsQixvRUFBVSxDQUFDVyxRQUFRLENBQUM7RUFDdEI7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL21vZHVsZXMvZGF0YUZ1bmN0aW9uLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL3NyYy9tb2R1bGVzL3ZpZXdGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzYXZlRGF0YSA9ICh0YXNrcykgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3NfZGF0YScsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG59O1xuXG5jb25zdCBsb2FkRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrc19kYXRhJykpIHx8IFtdO1xuICByZXR1cm4gdGFza3M7XG59O1xuXG5jb25zdCBhZGRUYXNrID0gKHRhc2spID0+IHtcbiAgY29uc3QgZGF0YVRhc2sgPSBsb2FkRGF0YSgpO1xuICBkYXRhVGFzay5wdXNoKHRhc2spO1xuICBzYXZlRGF0YShkYXRhVGFzayk7XG59O1xuXG5jb25zdCBkZWxldGVUYXNrID0gKGlkVGFzaykgPT4ge1xuICBjb25zdCBkYXRhVGFzayA9IGxvYWREYXRhKCk7XG4gIGNvbnN0IG5ld0RhdGFUYXNrID0gZGF0YVRhc2suZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmVsZW1lbnQuaWQgIT09IGlkVGFzayk7XG4gIHNhdmVEYXRhKG5ld0RhdGFUYXNrKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVRhc2sgPSAoaWRUYXNrLCBuZXdDb250ZW50KSA9PiB7XG4gIGNvbnN0IGRhdGFUYXNrID0gbG9hZERhdGEoKTtcbiAgY29uc3QgdGFzayA9IGRhdGFUYXNrLmZpbmQoKHRhc2spID0+ICh0YXNrLmVsZW1lbnQuaWQgPT09IGlkVGFzaykpO1xuICB0YXNrLmRlc2NyaXB0aW9uID0gbmV3Q29udGVudC5kZXNjcmlwdGlvbjtcbiAgc2F2ZURhdGEoZGF0YVRhc2spO1xufTtcblxuZXhwb3J0IHtcbiAgYWRkVGFzaywgZGVsZXRlVGFzaywgdXBkYXRlVGFzaywgc2F2ZURhdGEsIGxvYWREYXRhLFxufTsiLCJpbXBvcnQgeyBkZWxldGVUYXNrLCB1cGRhdGVUYXNrIH0gZnJvbSAnLi9kYXRhRnVuY3Rpb24uanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIC8vIGtlZSBzb21lIGRhdGEgaW4ga2V5IGVsZW1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSB7fTtcbiAgICB0aGlzLmVsZW1lbnQuaWQgPSBgdGFza18ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCl9YDtcbiAgICB0aGlzLmVsZW1lbnQucm9vdCA9IFRhc2suY3JlYXRlUm9vdCgpO1xuICAgIC8vIGdldCBub2RlRWxlbWVudCBmcm9tIHRoZSByb290XG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtVGV4dCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2l0ZW1fdGV4dCcpO1xuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUNoZWNrID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV9jaGVjaycpO1xuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0biA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2l0ZW1fYnRuJyk7XG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuVHJhc2ggPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcudGFza19pdGVtX2J0bl90cmFzaCcpO1xuICAgIC8vIHNldCBub2RlRWxlbWVudCB2YWx1ZVxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbVRleHQudGV4dENvbnRlbnQgPSB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUNoZWNrLnZhbHVlID0gdGhpcy5jb21wbGV0ZWQ7XG4gICAgLy8gMyBkb3RzIG1lbnUgRXZlbnRMaXN0ZW5lclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0blRyYXNoLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH0pO1xuICAgIC8vIHJlbW92ZSBFdmVudExpc3RlbmVyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuVHJhc2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG5UcmFzaC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIGRlbGV0ZVRhc2sodGhpcy5lbGVtZW50LmlkKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yb290LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50LnJvb3QpO1xuICAgIH0pO1xuICAgIC8vIFVwZGF0ZSBFdmVudExpc3RlbmVyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtVGV4dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgIHVwZGF0ZVRhc2sodGhpcy5lbGVtZW50LmlkLCB7IGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlUm9vdCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuYm9keSk7XG4gICAgICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrX2l0ZW1cIiBkcmFnZ2FibGU9J3RydWUnPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgdGFza19pdGVtX2NoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0NoZWNrZWRcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRhc2tfaXRlbV90ZXh0XCIgY29udGVudGVkaXRhYmxlPlRhc2sgMTwvcD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICB0YXNrX2l0ZW1fYnRuXCI+PGkgY2xhc3M9XCJiaSBiaS10aHJlZS1kb3RzLXZlcnRpY2FsXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gaGlkZGVuIHRhc2tfaXRlbV9idG5fdHJhc2ggdHJhc2hcIj48aSBjbGFzcz1cImJpIGJpLXRyYXNoMy1maWxsIHRyYXNoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYCkuY2hpbGRyZW5bMF07XG4gICAgfVxufSIsImltcG9ydCB7XG4gIGFkZFRhc2ssIGxvYWREYXRhLCBzYXZlRGF0YSxcbn0gZnJvbSAnLi9kYXRhRnVuY3Rpb24uanMnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgYWRkVGFza1ZpZXcgPSAodGFzaywgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGNoZWNrVmFsdWUgPSB0YXNrLmNvbXBsZXRlZDtcbiAgaWYgKGNoZWNrVmFsdWUpIHtcbiAgICB0YXNrLmVsZW1lbnQudGFza0l0ZW1DaGVjay5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodGFzay5lbGVtZW50LnJvb3QpO1xufTtcblxuY29uc3QgcmVuZGVyVGFzayA9IChwYXJlbnQpID0+IHtcbiAgLy8gMXN0IGVtcHR5IHRoZSBjb250YWluZXJcbiAgcGFyZW50LmlubmVySFRNTCA9ICcnO1xuICBjb25zdCBhcnJUYXNrID0gbG9hZERhdGEoKTtcbiAgY29uc3QgbmV3QXJyVGFzayA9IFtdO1xuICBsZXQgaSA9IDE7XG4gIGFyclRhc2suZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIHRhc2suaW5kZXggPSBpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCwgaSk7XG4gICAgaSArPSAxO1xuICAgIG5ld0FyclRhc2sucHVzaChuZXdUYXNrKTtcbiAgICBhZGRUYXNrVmlldyhuZXdUYXNrLCBwYXJlbnQpO1xuICB9KTtcbiAgLy8gdGFzayBpZCBjaGFuZ2VzIHdoZW4gd2UgcmVuZGVyVGFzaygpXG4gIC8vIHRvIHNhdmUgdGhlIHJpZ2h0IGlkIHdlIHJlc3RvcmUgbG9jYWxTdG9yYWdlXG4gIHNhdmVEYXRhKG5ld0FyclRhc2spO1xufTtcblxuY29uc3QgcG9wdWxhdGVUYXNrID0gKGRlc2NyaXB0aW9uLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgYXJyVGFzayA9IGxvYWREYXRhKCk7XG4gIGNvbnN0IGluZGV4ID0gKGFyclRhc2subGVuZ3RoKSArIDE7XG4gIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhkZXNjcmlwdGlvbiwgZmFsc2UsIGluZGV4KTtcbiAgYWRkVGFzayhuZXdUYXNrKTtcbiAgYWRkVGFza1ZpZXcobmV3VGFzaywgcGFyZW50KTtcbn07XG5cbmNvbnN0IGNoZWNrVGV4dENvbnRlbnQgPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudCA9PT0gJycpIHtcbiAgICByZXR1cm4gJ1Rhc2sgRGVzY3JpcHRpb24nO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0IHsgcG9wdWxhdGVUYXNrLCByZW5kZXJUYXNrLCBjaGVja1RleHRDb250ZW50IH07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcclxuICAtLXNreUJlaWdlOiAjYzRjMGJjZjM7XHJcbiAgLS1ncmV5X2Rhcms6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbiAgLS1za3lHcmVlbjogIzA4NzQ3NGYzO1xyXG4gIC0tc2t5QmVpZ2VWMjogIzkwOTE4Y2YzO1xyXG4gIC0td2hpdGU6ICNmZmY7XHJcbn1cclxuXHJcbioge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbm1haW5bY2xhc3M9XCJtYWluX2NvbnRhaW5lclwiXSB7XHJcbiAgd2lkdGg6IDUwJTtcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbmhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xyXG59XHJcblxyXG4uaW5wdXQtZ3JvdXBfYWRkX3Rhc2sge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbn1cclxuXHJcbi5pbnB1dF9pbnNlcnRfdGFzayB7XHJcbiAgcGFkZGluZzogMC42cmVtIDA7XHJcbiAgd2lkdGg6IDkxJTtcclxuICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgc29saWQgbm9uZTtcclxuICBib3JkZXI6IDAuMXJlbSB2YXIoLS1ncmV5X2RhcmspO1xyXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlKTtcclxufVxyXG5cclxuLmJ0bl9hZGRfdGFzayB7XHJcbiAgcGFkZGluZzogMC42cmVtIDA7XHJcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgZmxleC1ncm93OiAxO1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBzb2xpZCBub25lO1xyXG4gIGJvcmRlcjogMC4xcmVtIHZhcigtLWdyZXlfZGFyayk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2UpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJ0bl9hZGRfdGFzazphY3RpdmUge1xyXG4gIGNvbG9yOiB2YXIoLS1za3lHcmVlbik7XHJcbn1cclxuXHJcbi5idG5fYWRkX3Rhc2s6aG92ZXIge1xyXG4gIG9wYWNpdHk6IDAuNTtcclxufVxyXG5cclxuLmhpZGRlbiB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLyogdGFza19pdGVtICovXHJcblxyXG4udGFza19pdGVtIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2VWMik7XHJcbn1cclxuXHJcbi50YXNrX2l0ZW1fYnRuIHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2VWMik7XHJcbiAgb3BhY2l0eTogMC4zO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnRhc2tfaXRlbV9idG46aG92ZXIge1xyXG4gIG9wYWNpdHk6IDAuNztcclxufVxyXG5cclxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzIHtcclxuICB3aWR0aDogOTklO1xyXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gIHBhZGRpbmc6IDAuNnJlbSAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczpob3ZlciB7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3M6YWN0aXZlIHtcclxuICBjb2xvcjogdmFyKC0td2hpdGUpO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixnQ0FBZ0M7RUFDaEMscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUN2QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixVQUFVO0VBQ1YsbUNBQW1DO0VBQ25DLCtCQUErQjtFQUMvQix1QkFBdUI7RUFDdkIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLCtCQUErQjtFQUMvQixpQ0FBaUM7RUFDakMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQSxjQUFjOztBQUVkO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixxQkFBcUI7RUFDckIsV0FBVztFQUNYLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxyXFxuICAtLXNreUJlaWdlOiAjYzRjMGJjZjM7XFxyXFxuICAtLWdyZXlfZGFyazogcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gIC0tc2t5R3JlZW46ICMwODc0NzRmMztcXHJcXG4gIC0tc2t5QmVpZ2VWMjogIzkwOTE4Y2YzO1xcclxcbiAgLS13aGl0ZTogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5tYWluW2NsYXNzPVxcXCJtYWluX2NvbnRhaW5lclxcXCJdIHtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXBfYWRkX3Rhc2sge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dF9pbnNlcnRfdGFzayB7XFxyXFxuICBwYWRkaW5nOiAwLjZyZW0gMDtcXHJcXG4gIHdpZHRoOiA5MSU7XFxyXFxuICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgc29saWQgbm9uZTtcXHJcXG4gIGJvcmRlcjogMC4xcmVtIHZhcigtLWdyZXlfZGFyayk7XFxyXFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bl9hZGRfdGFzayB7XFxyXFxuICBwYWRkaW5nOiAwLjZyZW0gMDtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgZmxleC1ncm93OiAxO1xcclxcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZCBub25lIHNvbGlkIG5vbmU7XFxyXFxuICBib3JkZXI6IDAuMXJlbSB2YXIoLS1ncmV5X2RhcmspO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2UpO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2FkZF90YXNrOmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tc2t5R3JlZW4pO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2FkZF90YXNrOmhvdmVyIHtcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0YXNrX2l0ZW0gKi9cXHJcXG5cXHJcXG4udGFza19pdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlVjIpO1xcclxcbn1cXHJcXG5cXHJcXG4udGFza19pdGVtX2J0biB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZVYyKTtcXHJcXG4gIG9wYWNpdHk6IDAuMztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRhc2tfaXRlbV9idG46aG92ZXIge1xcclxcbiAgb3BhY2l0eTogMC43O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3Mge1xcclxcbiAgd2lkdGg6IDk5JTtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgcGFkZGluZzogMC42cmVtIDA7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczpob3ZlciB7XFxyXFxuICBvcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczphY3RpdmUge1xcclxcbiAgY29sb3I6IHZhcigtLXdoaXRlKTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgcG9wdWxhdGVUYXNrLCByZW5kZXJUYXNrLCBjaGVja1RleHRDb250ZW50IH0gZnJvbSAnLi9tb2R1bGVzL3ZpZXdGdW5jdGlvbi5qcyc7XG5cbmNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzX2xpc3QnKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgcmVuZGVyVGFzayh0YXNrTGlzdCk7XG59O1xuXG4vLyBBZGQgYSB0YXNrIGxpc3RlbmVyXG5jb25zdCBpbnB1dEluc2VydFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfaW5zZXJ0X3Rhc2snKTtcbmNvbnN0IGJ0bkFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2FkZF90YXNrJyk7XG5idG5BZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGNoZWNrVGV4dENvbnRlbnQoaW5wdXRJbnNlcnRUYXNrLnZhbHVlLnRyaW0oKSk7XG4gIGlmIChkZXNjcmlwdGlvbikge1xuICAgIHBvcHVsYXRlVGFzayhkZXNjcmlwdGlvbiwgdGFza0xpc3QpO1xuICAgIGlucHV0SW5zZXJ0VGFzay52YWx1ZSA9ICcnO1xuICB9XG59KTtcblxuLy8gUmVtb3ZlIGEgVGFzayBsaXN0ZW5lclxudGFza0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmFzaCcpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmFzaCcpKSB7XG4gICAgcmVuZGVyVGFzayh0YXNrTGlzdCk7XG4gIH1cbn0pOyJdLCJuYW1lcyI6WyJzYXZlRGF0YSIsInRhc2tzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2FkRGF0YSIsInBhcnNlIiwiZ2V0SXRlbSIsImFkZFRhc2siLCJ0YXNrIiwiZGF0YVRhc2siLCJwdXNoIiwiZGVsZXRlVGFzayIsImlkVGFzayIsIm5ld0RhdGFUYXNrIiwiZmlsdGVyIiwiZWxlbWVudCIsImlkIiwidXBkYXRlVGFzayIsIm5ld0NvbnRlbnQiLCJmaW5kIiwiZGVzY3JpcHRpb24iLCJUYXNrIiwiY29uc3RydWN0b3IiLCJjb21wbGV0ZWQiLCJpbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJvb3QiLCJjcmVhdGVSb290IiwidGFza0l0ZW1UZXh0IiwicXVlcnlTZWxlY3RvciIsInRhc2tJdGVtQ2hlY2siLCJ0YXNrSXRlbUJ0biIsInRhc2tJdGVtQnRuVHJhc2giLCJ0ZXh0Q29udGVudCIsInZhbHVlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsIm5ld0Rlc2NyaXB0aW9uIiwidHJpbSIsInJhbmdlIiwiZG9jdW1lbnQiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJhZGRUYXNrVmlldyIsInBhcmVudCIsImNoZWNrVmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlclRhc2siLCJpbm5lckhUTUwiLCJhcnJUYXNrIiwibmV3QXJyVGFzayIsImkiLCJmb3JFYWNoIiwibmV3VGFzayIsInBvcHVsYXRlVGFzayIsImxlbmd0aCIsImNoZWNrVGV4dENvbnRlbnQiLCJjb250ZW50IiwidGFza0xpc3QiLCJ3aW5kb3ciLCJvbmxvYWQiLCJpbnB1dEluc2VydFRhc2siLCJidG5BZGRUYXNrIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==