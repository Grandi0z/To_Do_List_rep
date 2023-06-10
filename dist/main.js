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
  if (newContent.description) {
    task.description = newContent.description;
  } else if (newContent.completed || !newContent.completed) {
    task.completed = newContent.completed;
  }
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
    // Checkbox EventListener
    this.element.taskItemCheck.addEventListener('change', () => {
      if (this.element.root.childNodes[1].checked) {
        (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(this.element.id, {
          completed: true
        });
        this.element.taskItemText.classList.add('disable');
      } else {
        (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(this.element.id, {
          completed: false
        });
        this.element.taskItemText.classList.remove('disable');
      }
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
/* harmony export */   disableBtnAllClear: () => (/* binding */ disableBtnAllClear),
/* harmony export */   populateTask: () => (/* binding */ populateTask),
/* harmony export */   removeCompletedTask: () => (/* binding */ removeCompletedTask),
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
const removeCompletedTask = () => {
  const dataTask = (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.loadData)();
  const newDataTask = dataTask.filter(task => task.completed !== true);
  (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.saveData)(newDataTask);
};
const disableBtnAllClear = btn => {
  const taskData = (0,_dataFunction_js__WEBPACK_IMPORTED_MODULE_0__.loadData)();
  if (taskData.length > 0) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
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
  --colorDisable: #414240f3;
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

.btn_clear_all_completed_tasks:disabled {
  color: var(--colorDisable);
  cursor: none;
}

.disable {
  text-decoration: line-through red;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,gCAAgC;EAChC,qBAAqB;EACrB,uBAAuB;EACvB,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,iBAAiB;EACjB,UAAU;EACV,mCAAmC;EACnC,+BAA+B;EAC/B,uBAAuB;EACvB,iCAAiC;AACnC;;AAEA;EACE,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,mCAAmC;EACnC,+BAA+B;EAC/B,iCAAiC;EACjC,eAAe;AACjB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA,cAAc;;AAEd;EACE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;EACrB,WAAW;EACX,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,mCAAmC;EACnC,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,uBAAuB;EACvB,iBAAiB;EACjB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,YAAY;AACd;;AAEA;EACE,iCAAiC;AACnC","sourcesContent":[":root {\r\n  --skyBeige: #c4c0bcf3;\r\n  --grey_dark: rgba(0, 0, 0, 0.25);\r\n  --skyGreen: #087474f3;\r\n  --skyBeigeV2: #90918cf3;\r\n  --white: #fff;\r\n  --colorDisable: #414240f3;\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nmain[class=\"main_container\"] {\r\n  width: 50%;\r\n  margin: auto;\r\n}\r\n\r\nheader {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n}\r\n\r\n.input-group_add_task {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-around;\r\n}\r\n\r\n.input_insert_task {\r\n  padding: 0.6rem 0;\r\n  width: 91%;\r\n  border-style: solid none solid none;\r\n  border: 0.1rem var(--grey_dark);\r\n  box-sizing: content-box;\r\n  background-color: var(--skyBeige);\r\n}\r\n\r\n.btn_add_task {\r\n  padding: 0.6rem 0;\r\n  box-sizing: content-box;\r\n  flex-grow: 1;\r\n  border-style: solid none solid none;\r\n  border: 0.1rem var(--grey_dark);\r\n  background-color: var(--skyBeige);\r\n  cursor: pointer;\r\n}\r\n\r\n.btn_add_task:active {\r\n  color: var(--skyGreen);\r\n}\r\n\r\n.btn_add_task:hover {\r\n  opacity: 0.5;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n/* task_item */\r\n\r\n.task_item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: baseline;\r\n  width: 100%;\r\n  background-color: var(--skyBeigeV2);\r\n}\r\n\r\n.task_item_btn {\r\n  border: none;\r\n  background-color: var(--skyBeigeV2);\r\n  opacity: 0.3;\r\n  cursor: pointer;\r\n}\r\n\r\n.task_item_btn:hover {\r\n  opacity: 0.7;\r\n}\r\n\r\n.btn_clear_all_completed_tasks {\r\n  width: 99%;\r\n  box-sizing: content-box;\r\n  padding: 0.6rem 0;\r\n  margin: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.btn_clear_all_completed_tasks:hover {\r\n  opacity: 0.5;\r\n}\r\n\r\n.btn_clear_all_completed_tasks:active {\r\n  color: var(--white);\r\n}\r\n\r\n.btn_clear_all_completed_tasks:disabled {\r\n  color: var(--colorDisable);\r\n  cursor: none;\r\n}\r\n\r\n.disable {\r\n  text-decoration: line-through red;\r\n}\r\n"],"sourceRoot":""}]);
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
const btnAllClearChecked = document.querySelector('.btn_clear_all_completed_tasks');
window.onload = () => {
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.renderTask)(taskList);
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.disableBtnAllClear)(btnAllClearChecked);
};

// Add a task listener
const inputInsertTask = document.querySelector('.input_insert_task');
const btnAddTask = document.querySelector('.btn_add_task');
btnAddTask.addEventListener('click', () => {
  const description = (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.checkTextContent)(inputInsertTask.value.trim());
  if (description) {
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.populateTask)(description, taskList);
    inputInsertTask.value = '';
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.disableBtnAllClear)(btnAllClearChecked);
  }
});

// Remove a Task listener
taskList.addEventListener('click', e => {
  if (e.target.classList.contains('trash') || e.target.parentElement.classList.contains('trash')) {
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.renderTask)(taskList);
    (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.disableBtnAllClear)(btnAllClearChecked);
  }
});

// Clear all checked tasks
btnAllClearChecked.addEventListener('click', () => {
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.removeCompletedTask)();
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.renderTask)(taskList);
  (0,_modules_viewFunction_js__WEBPACK_IMPORTED_MODULE_1__.disableBtnAllClear)(btnAllClearChecked);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNaUQsVUFBVSxHQUFHaEMsUUFBUSxDQUFDakIsYUFBYSxDQUFDLGVBQWUsQ0FBQztBQUMxRGlELFVBQVUsQ0FBQzNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3pDLE1BQU1qQixXQUFXLEdBQUdnRCwwRUFBZ0IsQ0FBQ1csZUFBZSxDQUFDM0MsS0FBSyxDQUFDUSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLElBQUl4QixXQUFXLEVBQUU7SUFDZjhDLHNFQUFZLENBQUM5QyxXQUFXLEVBQUV1RCxRQUFRLENBQUM7SUFDbkNJLGVBQWUsQ0FBQzNDLEtBQUssR0FBRyxFQUFFO0lBQzFCbUMsNEVBQWtCLENBQUNLLGtCQUFrQixDQUFDO0VBQ3hDO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0FELFFBQVEsQ0FBQ3RDLGdCQUFnQixDQUFDLE9BQU8sRUFBRzRDLENBQUMsSUFBSztFQUN4QyxJQUFJQSxDQUFDLENBQUNDLE1BQU0sQ0FBQzVDLFNBQVMsQ0FBQzZDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSUYsQ0FBQyxDQUFDQyxNQUFNLENBQUN6QyxhQUFhLENBQUNILFNBQVMsQ0FBQzZDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUM5RnhCLG9FQUFVLENBQUNnQixRQUFRLENBQUM7SUFDcEJKLDRFQUFrQixDQUFDSyxrQkFBa0IsQ0FBQztFQUN4QztBQUNGLENBQUMsQ0FBQzs7QUFFRjtBQUNBQSxrQkFBa0IsQ0FBQ3ZDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ2pEaUMsNkVBQW1CLENBQUMsQ0FBQztFQUNyQlgsb0VBQVUsQ0FBQ2dCLFFBQVEsQ0FBQztFQUNwQkosNEVBQWtCLENBQUNLLGtCQUFrQixDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9zcmMvbW9kdWxlcy9kYXRhRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL21vZHVsZXMvdmlld0Z1bmN0aW9uLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNhdmVEYXRhID0gKHRhc2tzKSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrc19kYXRhJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcbn07XG5cbmNvbnN0IGxvYWREYXRhID0gKCkgPT4ge1xuICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzX2RhdGEnKSkgfHwgW107XG4gIHJldHVybiB0YXNrcztcbn07XG5cbmNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICBjb25zdCBkYXRhVGFzayA9IGxvYWREYXRhKCk7XG4gIGRhdGFUYXNrLnB1c2godGFzayk7XG4gIHNhdmVEYXRhKGRhdGFUYXNrKTtcbn07XG5cbmNvbnN0IGRlbGV0ZVRhc2sgPSAoaWRUYXNrKSA9PiB7XG4gIGNvbnN0IGRhdGFUYXNrID0gbG9hZERhdGEoKTtcbiAgY29uc3QgbmV3RGF0YVRhc2sgPSBkYXRhVGFzay5maWx0ZXIoKHRhc2spID0+IHRhc2suZWxlbWVudC5pZCAhPT0gaWRUYXNrKTtcbiAgc2F2ZURhdGEobmV3RGF0YVRhc2spO1xufTtcblxuY29uc3QgdXBkYXRlVGFzayA9IChpZFRhc2ssIG5ld0NvbnRlbnQpID0+IHtcbiAgY29uc3QgZGF0YVRhc2sgPSBsb2FkRGF0YSgpO1xuICBjb25zdCB0YXNrID0gZGF0YVRhc2suZmluZCgodGFzaykgPT4gKHRhc2suZWxlbWVudC5pZCA9PT0gaWRUYXNrKSk7XG4gIGlmIChuZXdDb250ZW50LmRlc2NyaXB0aW9uKSB7XG4gICAgdGFzay5kZXNjcmlwdGlvbiA9IG5ld0NvbnRlbnQuZGVzY3JpcHRpb247XG4gIH0gZWxzZSBpZiAobmV3Q29udGVudC5jb21wbGV0ZWQgfHwgIW5ld0NvbnRlbnQuY29tcGxldGVkKSB7XG4gICAgdGFzay5jb21wbGV0ZWQgPSBuZXdDb250ZW50LmNvbXBsZXRlZDtcbiAgfVxuICBzYXZlRGF0YShkYXRhVGFzayk7XG59O1xuXG5leHBvcnQge1xuICBhZGRUYXNrLCBkZWxldGVUYXNrLCB1cGRhdGVUYXNrLCBzYXZlRGF0YSwgbG9hZERhdGEsXG59OyIsImltcG9ydCB7IGRlbGV0ZVRhc2ssIHVwZGF0ZVRhc2sgfSBmcm9tICcuL2RhdGFGdW5jdGlvbi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgLy8ga2VlIHNvbWUgZGF0YSBpbiBrZXkgZWxlbWVudFxuICAgIHRoaXMuZWxlbWVudCA9IHt9O1xuICAgIHRoaXMuZWxlbWVudC5pZCA9IGB0YXNrXyR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwKX1gO1xuICAgIHRoaXMuZWxlbWVudC5yb290ID0gVGFzay5jcmVhdGVSb290KCk7XG4gICAgLy8gZ2V0IG5vZGVFbGVtZW50IGZyb20gdGhlIHJvb3RcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0ID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV90ZXh0Jyk7XG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQ2hlY2sgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcudGFza19pdGVtX2NoZWNrJyk7XG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV9idG4nKTtcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG5UcmFzaCA9IHRoaXMuZWxlbWVudC5yb290LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX2l0ZW1fYnRuX3RyYXNoJyk7XG4gICAgLy8gc2V0IG5vZGVFbGVtZW50IHZhbHVlXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQ2hlY2sudmFsdWUgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAvLyAzIGRvdHMgbWVudSBFdmVudExpc3RlbmVyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuVHJhc2guY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG4gICAgLy8gcmVtb3ZlIEV2ZW50TGlzdGVuZXJcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG5UcmFzaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0blRyYXNoLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgZGVsZXRlVGFzayh0aGlzLmVsZW1lbnQuaWQpO1xuICAgICAgdGhpcy5lbGVtZW50LnJvb3QucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQucm9vdCk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIEV2ZW50TGlzdGVuZXJcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXdEZXNjcmlwdGlvbiA9IHRoaXMuZWxlbWVudC50YXNrSXRlbVRleHQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgICAgdXBkYXRlVGFzayh0aGlzLmVsZW1lbnQuaWQsIHsgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24gfSk7XG4gICAgfSk7XG4gICAgLy8gQ2hlY2tib3ggRXZlbnRMaXN0ZW5lclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQucm9vdC5jaGlsZE5vZGVzWzFdLmNoZWNrZWQpIHtcbiAgICAgICAgdXBkYXRlVGFzayh0aGlzLmVsZW1lbnQuaWQsIHsgY29tcGxldGVkOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVRhc2sodGhpcy5lbGVtZW50LmlkLCB7IGNvbXBsZXRlZDogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlUm9vdCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuYm9keSk7XG4gICAgICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrX2l0ZW1cIiBkcmFnZ2FibGU9J3RydWUnPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgdGFza19pdGVtX2NoZWNrXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJcIiBpZD1cImZsZXhDaGVja0NoZWNrZWRcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRhc2tfaXRlbV90ZXh0XCIgY29udGVudGVkaXRhYmxlPlRhc2sgMTwvcD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICB0YXNrX2l0ZW1fYnRuXCI+PGkgY2xhc3M9XCJiaSBiaS10aHJlZS1kb3RzLXZlcnRpY2FsXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gaGlkZGVuIHRhc2tfaXRlbV9idG5fdHJhc2ggdHJhc2hcIj48aSBjbGFzcz1cImJpIGJpLXRyYXNoMy1maWxsIHRyYXNoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYCkuY2hpbGRyZW5bMF07XG4gICAgfVxufSIsImltcG9ydCB7XG4gIGFkZFRhc2ssIGxvYWREYXRhLCBzYXZlRGF0YSxcbn0gZnJvbSAnLi9kYXRhRnVuY3Rpb24uanMnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrLmpzJztcblxuY29uc3QgYWRkVGFza1ZpZXcgPSAodGFzaywgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGNoZWNrVmFsdWUgPSB0YXNrLmNvbXBsZXRlZDtcbiAgaWYgKGNoZWNrVmFsdWUpIHtcbiAgICB0YXNrLmVsZW1lbnQudGFza0l0ZW1DaGVjay5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodGFzay5lbGVtZW50LnJvb3QpO1xufTtcblxuY29uc3QgcmVuZGVyVGFzayA9IChwYXJlbnQpID0+IHtcbiAgLy8gMXN0IGVtcHR5IHRoZSBjb250YWluZXJcbiAgcGFyZW50LmlubmVySFRNTCA9ICcnO1xuICBjb25zdCBhcnJUYXNrID0gbG9hZERhdGEoKTtcbiAgY29uc3QgbmV3QXJyVGFzayA9IFtdO1xuICBsZXQgaSA9IDE7XG4gIGFyclRhc2suZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIHRhc2suaW5kZXggPSBpO1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCwgaSk7XG4gICAgaSArPSAxO1xuICAgIG5ld0FyclRhc2sucHVzaChuZXdUYXNrKTtcbiAgICBhZGRUYXNrVmlldyhuZXdUYXNrLCBwYXJlbnQpO1xuICB9KTtcbiAgLy8gdGFzayBpZCBjaGFuZ2VzIHdoZW4gd2UgcmVuZGVyVGFzaygpXG4gIC8vIHRvIHNhdmUgdGhlIHJpZ2h0IGlkIHdlIHJlc3RvcmUgbG9jYWxTdG9yYWdlXG4gIHNhdmVEYXRhKG5ld0FyclRhc2spO1xufTtcblxuY29uc3QgcG9wdWxhdGVUYXNrID0gKGRlc2NyaXB0aW9uLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgYXJyVGFzayA9IGxvYWREYXRhKCk7XG4gIGNvbnN0IGluZGV4ID0gKGFyclRhc2subGVuZ3RoKSArIDE7XG4gIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhkZXNjcmlwdGlvbiwgZmFsc2UsIGluZGV4KTtcbiAgYWRkVGFzayhuZXdUYXNrKTtcbiAgYWRkVGFza1ZpZXcobmV3VGFzaywgcGFyZW50KTtcbn07XG5cbmNvbnN0IGNoZWNrVGV4dENvbnRlbnQgPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudCA9PT0gJycpIHtcbiAgICByZXR1cm4gJ1Rhc2sgRGVzY3JpcHRpb24nO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuY29uc3QgcmVtb3ZlQ29tcGxldGVkVGFzayA9ICgpID0+IHtcbiAgY29uc3QgZGF0YVRhc2sgPSBsb2FkRGF0YSgpO1xuICBjb25zdCBuZXdEYXRhVGFzayA9IGRhdGFUYXNrLmZpbHRlcigodGFzaykgPT4gdGFzay5jb21wbGV0ZWQgIT09IHRydWUpO1xuICBzYXZlRGF0YShuZXdEYXRhVGFzayk7XG59O1xuXG5jb25zdCBkaXNhYmxlQnRuQWxsQ2xlYXIgPSAoYnRuKSA9PiB7XG4gIGNvbnN0IHRhc2tEYXRhID0gbG9hZERhdGEoKTtcbiAgaWYgKHRhc2tEYXRhLmxlbmd0aCA+IDApIHtcbiAgICBidG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9IGVsc2Uge1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIHBvcHVsYXRlVGFzaywgcmVuZGVyVGFzaywgY2hlY2tUZXh0Q29udGVudCwgcmVtb3ZlQ29tcGxldGVkVGFzaywgZGlzYWJsZUJ0bkFsbENsZWFyLFxufTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgOnJvb3Qge1xyXG4gIC0tc2t5QmVpZ2U6ICNjNGMwYmNmMztcclxuICAtLWdyZXlfZGFyazogcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxuICAtLXNreUdyZWVuOiAjMDg3NDc0ZjM7XHJcbiAgLS1za3lCZWlnZVYyOiAjOTA5MThjZjM7XHJcbiAgLS13aGl0ZTogI2ZmZjtcclxuICAtLWNvbG9yRGlzYWJsZTogIzQxNDI0MGYzO1xyXG59XHJcblxyXG4qIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG5tYWluW2NsYXNzPVwibWFpbl9jb250YWluZXJcIl0ge1xyXG4gIHdpZHRoOiA1MCU7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG5oZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxufVxyXG5cclxuLmlucHV0LWdyb3VwX2FkZF90YXNrIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG59XHJcblxyXG4uaW5wdXRfaW5zZXJ0X3Rhc2sge1xyXG4gIHBhZGRpbmc6IDAuNnJlbSAwO1xyXG4gIHdpZHRoOiA5MSU7XHJcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZCBub25lIHNvbGlkIG5vbmU7XHJcbiAgYm9yZGVyOiAwLjFyZW0gdmFyKC0tZ3JleV9kYXJrKTtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZSk7XHJcbn1cclxuXHJcbi5idG5fYWRkX3Rhc2sge1xyXG4gIHBhZGRpbmc6IDAuNnJlbSAwO1xyXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xyXG4gIGZsZXgtZ3JvdzogMTtcclxuICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgc29saWQgbm9uZTtcclxuICBib3JkZXI6IDAuMXJlbSB2YXIoLS1ncmV5X2RhcmspO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlKTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5idG5fYWRkX3Rhc2s6YWN0aXZlIHtcclxuICBjb2xvcjogdmFyKC0tc2t5R3JlZW4pO1xyXG59XHJcblxyXG4uYnRuX2FkZF90YXNrOmhvdmVyIHtcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuXHJcbi5oaWRkZW4ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi8qIHRhc2tfaXRlbSAqL1xyXG5cclxuLnRhc2tfaXRlbSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlVjIpO1xyXG59XHJcblxyXG4udGFza19pdGVtX2J0biB7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlVjIpO1xyXG4gIG9wYWNpdHk6IDAuMztcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi50YXNrX2l0ZW1fYnRuOmhvdmVyIHtcclxuICBvcGFjaXR5OiAwLjc7XHJcbn1cclxuXHJcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrcyB7XHJcbiAgd2lkdGg6IDk5JTtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICBwYWRkaW5nOiAwLjZyZW0gMDtcclxuICBtYXJnaW46IDA7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3M6aG92ZXIge1xyXG4gIG9wYWNpdHk6IDAuNTtcclxufVxyXG5cclxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmFjdGl2ZSB7XHJcbiAgY29sb3I6IHZhcigtLXdoaXRlKTtcclxufVxyXG5cclxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmRpc2FibGVkIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3JEaXNhYmxlKTtcclxuICBjdXJzb3I6IG5vbmU7XHJcbn1cclxuXHJcbi5kaXNhYmxlIHtcclxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCByZWQ7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGdDQUFnQztFQUNoQyxxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixVQUFVO0VBQ1YsbUNBQW1DO0VBQ25DLCtCQUErQjtFQUMvQix1QkFBdUI7RUFDdkIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLCtCQUErQjtFQUMvQixpQ0FBaUM7RUFDakMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQSxjQUFjOztBQUVkO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixxQkFBcUI7RUFDckIsV0FBVztFQUNYLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcclxcbiAgLS1za3lCZWlnZTogI2M0YzBiY2YzO1xcclxcbiAgLS1ncmV5X2Rhcms6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAtLXNreUdyZWVuOiAjMDg3NDc0ZjM7XFxyXFxuICAtLXNreUJlaWdlVjI6ICM5MDkxOGNmMztcXHJcXG4gIC0td2hpdGU6ICNmZmY7XFxyXFxuICAtLWNvbG9yRGlzYWJsZTogIzQxNDI0MGYzO1xcclxcbn1cXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbm1haW5bY2xhc3M9XFxcIm1haW5fY29udGFpbmVyXFxcIl0ge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dC1ncm91cF9hZGRfdGFzayB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0X2luc2VydF90YXNrIHtcXHJcXG4gIHBhZGRpbmc6IDAuNnJlbSAwO1xcclxcbiAgd2lkdGg6IDkxJTtcXHJcXG4gIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBzb2xpZCBub25lO1xcclxcbiAgYm9yZGVyOiAwLjFyZW0gdmFyKC0tZ3JleV9kYXJrKTtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2UpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2FkZF90YXNrIHtcXHJcXG4gIHBhZGRpbmc6IDAuNnJlbSAwO1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxyXFxuICBmbGV4LWdyb3c6IDE7XFxyXFxuICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgc29saWQgbm9uZTtcXHJcXG4gIGJvcmRlcjogMC4xcmVtIHZhcigtLWdyZXlfZGFyayk7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZSk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG5fYWRkX3Rhc2s6YWN0aXZlIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1za3lHcmVlbik7XFxyXFxufVxcclxcblxcclxcbi5idG5fYWRkX3Rhc2s6aG92ZXIge1xcclxcbiAgb3BhY2l0eTogMC41O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlkZGVuIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIHRhc2tfaXRlbSAqL1xcclxcblxcclxcbi50YXNrX2l0ZW0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2VWMik7XFxyXFxufVxcclxcblxcclxcbi50YXNrX2l0ZW1fYnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlVjIpO1xcclxcbiAgb3BhY2l0eTogMC4zO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udGFza19pdGVtX2J0bjpob3ZlciB7XFxyXFxuICBvcGFjaXR5OiAwLjc7XFxyXFxufVxcclxcblxcclxcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrcyB7XFxyXFxuICB3aWR0aDogOTklO1xcclxcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxyXFxuICBwYWRkaW5nOiAwLjZyZW0gMDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmhvdmVyIHtcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogdmFyKC0td2hpdGUpO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3M6ZGlzYWJsZWQge1xcclxcbiAgY29sb3I6IHZhcigtLWNvbG9yRGlzYWJsZSk7XFxyXFxuICBjdXJzb3I6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5kaXNhYmxlIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoIHJlZDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHtcbiAgcG9wdWxhdGVUYXNrLCByZW5kZXJUYXNrLCBjaGVja1RleHRDb250ZW50LCByZW1vdmVDb21wbGV0ZWRUYXNrLCBkaXNhYmxlQnRuQWxsQ2xlYXIsXG59IGZyb20gJy4vbW9kdWxlcy92aWV3RnVuY3Rpb24uanMnO1xuXG5jb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrc19saXN0Jyk7XG5jb25zdCBidG5BbGxDbGVhckNoZWNrZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3MnKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgcmVuZGVyVGFzayh0YXNrTGlzdCk7XG4gIGRpc2FibGVCdG5BbGxDbGVhcihidG5BbGxDbGVhckNoZWNrZWQpO1xufTtcblxuLy8gQWRkIGEgdGFzayBsaXN0ZW5lclxuY29uc3QgaW5wdXRJbnNlcnRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0X2luc2VydF90YXNrJyk7XG5jb25zdCBidG5BZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9hZGRfdGFzaycpO1xuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBjaGVja1RleHRDb250ZW50KGlucHV0SW5zZXJ0VGFzay52YWx1ZS50cmltKCkpO1xuICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICBwb3B1bGF0ZVRhc2soZGVzY3JpcHRpb24sIHRhc2tMaXN0KTtcbiAgICBpbnB1dEluc2VydFRhc2sudmFsdWUgPSAnJztcbiAgICBkaXNhYmxlQnRuQWxsQ2xlYXIoYnRuQWxsQ2xlYXJDaGVja2VkKTtcbiAgfVxufSk7XG5cbi8vIFJlbW92ZSBhIFRhc2sgbGlzdGVuZXJcbnRhc2tMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndHJhc2gnKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndHJhc2gnKSkge1xuICAgIHJlbmRlclRhc2sodGFza0xpc3QpO1xuICAgIGRpc2FibGVCdG5BbGxDbGVhcihidG5BbGxDbGVhckNoZWNrZWQpO1xuICB9XG59KTtcblxuLy8gQ2xlYXIgYWxsIGNoZWNrZWQgdGFza3NcbmJ0bkFsbENsZWFyQ2hlY2tlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcmVtb3ZlQ29tcGxldGVkVGFzaygpO1xuICByZW5kZXJUYXNrKHRhc2tMaXN0KTtcbiAgZGlzYWJsZUJ0bkFsbENsZWFyKGJ0bkFsbENsZWFyQ2hlY2tlZCk7XG59KTsiXSwibmFtZXMiOlsic2F2ZURhdGEiLCJ0YXNrcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZERhdGEiLCJwYXJzZSIsImdldEl0ZW0iLCJhZGRUYXNrIiwidGFzayIsImRhdGFUYXNrIiwicHVzaCIsImRlbGV0ZVRhc2siLCJpZFRhc2siLCJuZXdEYXRhVGFzayIsImZpbHRlciIsImVsZW1lbnQiLCJpZCIsInVwZGF0ZVRhc2siLCJuZXdDb250ZW50IiwiZmluZCIsImRlc2NyaXB0aW9uIiwiY29tcGxldGVkIiwiVGFzayIsImNvbnN0cnVjdG9yIiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyb290IiwiY3JlYXRlUm9vdCIsInRhc2tJdGVtVGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YXNrSXRlbUNoZWNrIiwidGFza0l0ZW1CdG4iLCJ0YXNrSXRlbUJ0blRyYXNoIiwidGV4dENvbnRlbnQiLCJ2YWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJuZXdEZXNjcmlwdGlvbiIsInRyaW0iLCJjaGlsZE5vZGVzIiwiY2hlY2tlZCIsInJhbmdlIiwiZG9jdW1lbnQiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJib2R5IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2hpbGRyZW4iLCJhZGRUYXNrVmlldyIsInBhcmVudCIsImNoZWNrVmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlclRhc2siLCJpbm5lckhUTUwiLCJhcnJUYXNrIiwibmV3QXJyVGFzayIsImkiLCJmb3JFYWNoIiwibmV3VGFzayIsInBvcHVsYXRlVGFzayIsImxlbmd0aCIsImNoZWNrVGV4dENvbnRlbnQiLCJjb250ZW50IiwicmVtb3ZlQ29tcGxldGVkVGFzayIsImRpc2FibGVCdG5BbGxDbGVhciIsImJ0biIsInRhc2tEYXRhIiwicmVtb3ZlQXR0cmlidXRlIiwidGFza0xpc3QiLCJidG5BbGxDbGVhckNoZWNrZWQiLCJ3aW5kb3ciLCJvbmxvYWQiLCJpbnB1dEluc2VydFRhc2siLCJidG5BZGRUYXNrIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==