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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNaUQsVUFBVSxHQUFHaEMsUUFBUSxDQUFDakIsYUFBYSxDQUFDLGVBQWUsQ0FBQztBQUMxRGlELFVBQVUsQ0FBQzNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3pDLE1BQU1qQixXQUFXLEdBQUdnRCwwRUFBZ0IsQ0FBQ1csZUFBZSxDQUFDM0MsS0FBSyxDQUFDUSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLElBQUl4QixXQUFXLEVBQUU7SUFDZjhDLHNFQUFZLENBQUM5QyxXQUFXLEVBQUV1RCxRQUFRLENBQUM7SUFDbkNJLGVBQWUsQ0FBQzNDLEtBQUssR0FBRyxFQUFFO0lBQzFCbUMsNEVBQWtCLENBQUNLLGtCQUFrQixDQUFDO0VBQ3hDO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0FELFFBQVEsQ0FBQ3RDLGdCQUFnQixDQUFDLE9BQU8sRUFBRzRDLENBQUMsSUFBSztFQUN4QyxJQUFJQSxDQUFDLENBQUNDLE1BQU0sQ0FBQzVDLFNBQVMsQ0FBQzZDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSUYsQ0FBQyxDQUFDQyxNQUFNLENBQUN6QyxhQUFhLENBQUNILFNBQVMsQ0FBQzZDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUM5RnhCLG9FQUFVLENBQUNnQixRQUFRLENBQUM7SUFDcEJKLDRFQUFrQixDQUFDSyxrQkFBa0IsQ0FBQztFQUN4QztBQUNGLENBQUMsQ0FBQzs7QUFFRjtBQUNBQSxrQkFBa0IsQ0FBQ3ZDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ2pEaUMsNkVBQW1CLENBQUMsQ0FBQztFQUNyQlgsb0VBQVUsQ0FBQ2dCLFFBQVEsQ0FBQztFQUNwQkosNEVBQWtCLENBQUNLLGtCQUFrQixDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9zcmMvbW9kdWxlcy9kYXRhRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL21vZHVsZXMvdmlld0Z1bmN0aW9uLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b19kb19saXN0X3JlcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9fZG9fbGlzdF9yZXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvX2RvX2xpc3RfcmVwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNhdmVEYXRhID0gKHRhc2tzKSA9PiB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzX2RhdGEnLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZERhdGEgPSAoKSA9PiB7XHJcbiAgY29uc3QgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrc19kYXRhJykpIHx8IFtdO1xyXG4gIHJldHVybiB0YXNrcztcclxufTtcclxuXHJcbmNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xyXG4gIGNvbnN0IGRhdGFUYXNrID0gbG9hZERhdGEoKTtcclxuICBkYXRhVGFzay5wdXNoKHRhc2spO1xyXG4gIHNhdmVEYXRhKGRhdGFUYXNrKTtcclxufTtcclxuXHJcbmNvbnN0IGRlbGV0ZVRhc2sgPSAoaWRUYXNrKSA9PiB7XHJcbiAgY29uc3QgZGF0YVRhc2sgPSBsb2FkRGF0YSgpO1xyXG4gIGNvbnN0IG5ld0RhdGFUYXNrID0gZGF0YVRhc2suZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmVsZW1lbnQuaWQgIT09IGlkVGFzayk7XHJcbiAgc2F2ZURhdGEobmV3RGF0YVRhc2spO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlVGFzayA9IChpZFRhc2ssIG5ld0NvbnRlbnQpID0+IHtcclxuICBjb25zdCBkYXRhVGFzayA9IGxvYWREYXRhKCk7XHJcbiAgY29uc3QgdGFzayA9IGRhdGFUYXNrLmZpbmQoKHRhc2spID0+ICh0YXNrLmVsZW1lbnQuaWQgPT09IGlkVGFzaykpO1xyXG4gIGlmIChuZXdDb250ZW50LmRlc2NyaXB0aW9uKSB7XHJcbiAgICB0YXNrLmRlc2NyaXB0aW9uID0gbmV3Q29udGVudC5kZXNjcmlwdGlvbjtcclxuICB9IGVsc2UgaWYgKG5ld0NvbnRlbnQuY29tcGxldGVkIHx8ICFuZXdDb250ZW50LmNvbXBsZXRlZCkge1xyXG4gICAgdGFzay5jb21wbGV0ZWQgPSBuZXdDb250ZW50LmNvbXBsZXRlZDtcclxuICB9XHJcbiAgc2F2ZURhdGEoZGF0YVRhc2spO1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBhZGRUYXNrLCBkZWxldGVUYXNrLCB1cGRhdGVUYXNrLCBzYXZlRGF0YSwgbG9hZERhdGEsXHJcbn07IiwiaW1wb3J0IHsgZGVsZXRlVGFzaywgdXBkYXRlVGFzayB9IGZyb20gJy4vZGF0YUZ1bmN0aW9uLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGluZGV4KSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIC8vIGtlZSBzb21lIGRhdGEgaW4ga2V5IGVsZW1lbnRcclxuICAgIHRoaXMuZWxlbWVudCA9IHt9O1xyXG4gICAgdGhpcy5lbGVtZW50LmlkID0gYHRhc2tfJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApfWA7XHJcbiAgICB0aGlzLmVsZW1lbnQucm9vdCA9IFRhc2suY3JlYXRlUm9vdCgpO1xyXG4gICAgLy8gZ2V0IG5vZGVFbGVtZW50IGZyb20gdGhlIHJvb3RcclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbVRleHQgPSB0aGlzLmVsZW1lbnQucm9vdC5xdWVyeVNlbGVjdG9yKCcudGFza19pdGVtX3RleHQnKTtcclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUNoZWNrID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV9jaGVjaycpO1xyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV9idG4nKTtcclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0blRyYXNoID0gdGhpcy5lbGVtZW50LnJvb3QucXVlcnlTZWxlY3RvcignLnRhc2tfaXRlbV9idG5fdHJhc2gnKTtcclxuICAgIC8vIHNldCBub2RlRWxlbWVudCB2YWx1ZVxyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtVGV4dC50ZXh0Q29udGVudCA9IHRoaXMuZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1DaGVjay52YWx1ZSA9IHRoaXMuY29tcGxldGVkO1xyXG4gICAgLy8gMyBkb3RzIG1lbnUgRXZlbnRMaXN0ZW5lclxyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG5UcmFzaC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgfSk7XHJcbiAgICAvLyByZW1vdmUgRXZlbnRMaXN0ZW5lclxyXG4gICAgdGhpcy5lbGVtZW50LnRhc2tJdGVtQnRuVHJhc2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUJ0blRyYXNoLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1CdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRlbGV0ZVRhc2sodGhpcy5lbGVtZW50LmlkKTtcclxuICAgICAgdGhpcy5lbGVtZW50LnJvb3QucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQucm9vdCk7XHJcbiAgICB9KTtcclxuICAgIC8vIFVwZGF0ZSBFdmVudExpc3RlbmVyXHJcbiAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gdGhpcy5lbGVtZW50LnRhc2tJdGVtVGV4dC50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgICAgdXBkYXRlVGFzayh0aGlzLmVsZW1lbnQuaWQsIHsgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24gfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIENoZWNrYm94IEV2ZW50TGlzdGVuZXJcclxuICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZWxlbWVudC5yb290LmNoaWxkTm9kZXNbMV0uY2hlY2tlZCkge1xyXG4gICAgICAgIHVwZGF0ZVRhc2sodGhpcy5lbGVtZW50LmlkLCB7IGNvbXBsZXRlZDogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQudGFza0l0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1cGRhdGVUYXNrKHRoaXMuZWxlbWVudC5pZCwgeyBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC50YXNrSXRlbVRleHQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZVJvb3QgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5ib2R5KTtcclxuICAgICAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrX2l0ZW1cIiBkcmFnZ2FibGU9J3RydWUnPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dCB0YXNrX2l0ZW1fY2hlY2tcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIGlkPVwiZmxleENoZWNrQ2hlY2tlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0YXNrX2l0ZW1fdGV4dFwiIGNvbnRlbnRlZGl0YWJsZT5UYXNrIDE8L3A+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuICB0YXNrX2l0ZW1fYnRuXCI+PGkgY2xhc3M9XCJiaSBiaS10aHJlZS1kb3RzLXZlcnRpY2FsXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBoaWRkZW4gdGFza19pdGVtX2J0bl90cmFzaCB0cmFzaFwiPjxpIGNsYXNzPVwiYmkgYmktdHJhc2gzLWZpbGwgdHJhc2hcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYCkuY2hpbGRyZW5bMF07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gIGFkZFRhc2ssIGxvYWREYXRhLCBzYXZlRGF0YSxcclxufSBmcm9tICcuL2RhdGFGdW5jdGlvbi5qcyc7XHJcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFzay5qcyc7XHJcblxyXG5jb25zdCBhZGRUYXNrVmlldyA9ICh0YXNrLCBwYXJlbnQpID0+IHtcclxuICBjb25zdCBjaGVja1ZhbHVlID0gdGFzay5jb21wbGV0ZWQ7XHJcbiAgaWYgKGNoZWNrVmFsdWUpIHtcclxuICAgIHRhc2suZWxlbWVudC50YXNrSXRlbUNoZWNrLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xyXG4gIH1cclxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodGFzay5lbGVtZW50LnJvb3QpO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyVGFzayA9IChwYXJlbnQpID0+IHtcclxuICAvLyAxc3QgZW1wdHkgdGhlIGNvbnRhaW5lclxyXG4gIHBhcmVudC5pbm5lckhUTUwgPSAnJztcclxuICBjb25zdCBhcnJUYXNrID0gbG9hZERhdGEoKTtcclxuICBjb25zdCBuZXdBcnJUYXNrID0gW107XHJcbiAgbGV0IGkgPSAxO1xyXG4gIGFyclRhc2suZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgdGFzay5pbmRleCA9IGk7XHJcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGFzay5kZXNjcmlwdGlvbiwgdGFzay5jb21wbGV0ZWQsIGkpO1xyXG4gICAgaSArPSAxO1xyXG4gICAgbmV3QXJyVGFzay5wdXNoKG5ld1Rhc2spO1xyXG4gICAgYWRkVGFza1ZpZXcobmV3VGFzaywgcGFyZW50KTtcclxuICB9KTtcclxuICAvLyB0YXNrIGlkIGNoYW5nZXMgd2hlbiB3ZSByZW5kZXJUYXNrKClcclxuICAvLyB0byBzYXZlIHRoZSByaWdodCBpZCB3ZSByZXN0b3JlIGxvY2FsU3RvcmFnZVxyXG4gIHNhdmVEYXRhKG5ld0FyclRhc2spO1xyXG59O1xyXG5cclxuY29uc3QgcG9wdWxhdGVUYXNrID0gKGRlc2NyaXB0aW9uLCBwYXJlbnQpID0+IHtcclxuICBjb25zdCBhcnJUYXNrID0gbG9hZERhdGEoKTtcclxuICBjb25zdCBpbmRleCA9IChhcnJUYXNrLmxlbmd0aCkgKyAxO1xyXG4gIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhkZXNjcmlwdGlvbiwgZmFsc2UsIGluZGV4KTtcclxuICBhZGRUYXNrKG5ld1Rhc2spO1xyXG4gIGFkZFRhc2tWaWV3KG5ld1Rhc2ssIHBhcmVudCk7XHJcbn07XHJcblxyXG5jb25zdCBjaGVja1RleHRDb250ZW50ID0gKGNvbnRlbnQpID0+IHtcclxuICBpZiAoY29udGVudCA9PT0gJycpIHtcclxuICAgIHJldHVybiAnVGFzayBEZXNjcmlwdGlvbic7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZW50O1xyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlQ29tcGxldGVkVGFzayA9ICgpID0+IHtcclxuICBjb25zdCBkYXRhVGFzayA9IGxvYWREYXRhKCk7XHJcbiAgY29uc3QgbmV3RGF0YVRhc2sgPSBkYXRhVGFzay5maWx0ZXIoKHRhc2spID0+IHRhc2suY29tcGxldGVkICE9PSB0cnVlKTtcclxuICBzYXZlRGF0YShuZXdEYXRhVGFzayk7XHJcbn07XHJcblxyXG5jb25zdCBkaXNhYmxlQnRuQWxsQ2xlYXIgPSAoYnRuKSA9PiB7XHJcbiAgY29uc3QgdGFza0RhdGEgPSBsb2FkRGF0YSgpO1xyXG4gIGlmICh0YXNrRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICBidG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgcG9wdWxhdGVUYXNrLCByZW5kZXJUYXNrLCBjaGVja1RleHRDb250ZW50LCByZW1vdmVDb21wbGV0ZWRUYXNrLCBkaXNhYmxlQnRuQWxsQ2xlYXIsXHJcbn07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcclxuICAtLXNreUJlaWdlOiAjYzRjMGJjZjM7XHJcbiAgLS1ncmV5X2Rhcms6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbiAgLS1za3lHcmVlbjogIzA4NzQ3NGYzO1xyXG4gIC0tc2t5QmVpZ2VWMjogIzkwOTE4Y2YzO1xyXG4gIC0td2hpdGU6ICNmZmY7XHJcbiAgLS1jb2xvckRpc2FibGU6ICM0MTQyNDBmMztcclxufVxyXG5cclxuKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxubWFpbltjbGFzcz1cIm1haW5fY29udGFpbmVyXCJdIHtcclxuICB3aWR0aDogNTAlO1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuaGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XHJcbn1cclxuXHJcbi5pbnB1dC1ncm91cF9hZGRfdGFzayB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxufVxyXG5cclxuLmlucHV0X2luc2VydF90YXNrIHtcclxuICBwYWRkaW5nOiAwLjZyZW0gMDtcclxuICB3aWR0aDogOTElO1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBzb2xpZCBub25lO1xyXG4gIGJvcmRlcjogMC4xcmVtIHZhcigtLWdyZXlfZGFyayk7XHJcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2UpO1xyXG59XHJcblxyXG4uYnRuX2FkZF90YXNrIHtcclxuICBwYWRkaW5nOiAwLjZyZW0gMDtcclxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcclxuICBmbGV4LWdyb3c6IDE7XHJcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZCBub25lIHNvbGlkIG5vbmU7XHJcbiAgYm9yZGVyOiAwLjFyZW0gdmFyKC0tZ3JleV9kYXJrKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZSk7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uYnRuX2FkZF90YXNrOmFjdGl2ZSB7XHJcbiAgY29sb3I6IHZhcigtLXNreUdyZWVuKTtcclxufVxyXG5cclxuLmJ0bl9hZGRfdGFzazpob3ZlciB7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4vKiB0YXNrX2l0ZW0gKi9cclxuXHJcbi50YXNrX2l0ZW0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZVYyKTtcclxufVxyXG5cclxuLnRhc2tfaXRlbV9idG4ge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZVYyKTtcclxuICBvcGFjaXR5OiAwLjM7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4udGFza19pdGVtX2J0bjpob3ZlciB7XHJcbiAgb3BhY2l0eTogMC43O1xyXG59XHJcblxyXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3Mge1xyXG4gIHdpZHRoOiA5OSU7XHJcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XHJcbiAgcGFkZGluZzogMC42cmVtIDA7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmhvdmVyIHtcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuXHJcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczphY3RpdmUge1xyXG4gIGNvbG9yOiB2YXIoLS13aGl0ZSk7XHJcbn1cclxuXHJcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczpkaXNhYmxlZCB7XHJcbiAgY29sb3I6IHZhcigtLWNvbG9yRGlzYWJsZSk7XHJcbiAgY3Vyc29yOiBub25lO1xyXG59XHJcblxyXG4uZGlzYWJsZSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2ggcmVkO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixnQ0FBZ0M7RUFDaEMscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsVUFBVTtFQUNWLG1DQUFtQztFQUNuQywrQkFBK0I7RUFDL0IsdUJBQXVCO0VBQ3ZCLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLG1DQUFtQztFQUNuQywrQkFBK0I7RUFDL0IsaUNBQWlDO0VBQ2pDLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUEsY0FBYzs7QUFFZDtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtFQUNWLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsU0FBUztFQUNULGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUNBQWlDO0FBQ25DXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gIC0tc2t5QmVpZ2U6ICNjNGMwYmNmMztcXHJcXG4gIC0tZ3JleV9kYXJrOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgLS1za3lHcmVlbjogIzA4NzQ3NGYzO1xcclxcbiAgLS1za3lCZWlnZVYyOiAjOTA5MThjZjM7XFxyXFxuICAtLXdoaXRlOiAjZmZmO1xcclxcbiAgLS1jb2xvckRpc2FibGU6ICM0MTQyNDBmMztcXHJcXG59XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5tYWluW2NsYXNzPVxcXCJtYWluX2NvbnRhaW5lclxcXCJdIHtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5wdXQtZ3JvdXBfYWRkX3Rhc2sge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxufVxcclxcblxcclxcbi5pbnB1dF9pbnNlcnRfdGFzayB7XFxyXFxuICBwYWRkaW5nOiAwLjZyZW0gMDtcXHJcXG4gIHdpZHRoOiA5MSU7XFxyXFxuICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgc29saWQgbm9uZTtcXHJcXG4gIGJvcmRlcjogMC4xcmVtIHZhcigtLWdyZXlfZGFyayk7XFxyXFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bl9hZGRfdGFzayB7XFxyXFxuICBwYWRkaW5nOiAwLjZyZW0gMDtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgZmxleC1ncm93OiAxO1xcclxcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZCBub25lIHNvbGlkIG5vbmU7XFxyXFxuICBib3JkZXI6IDAuMXJlbSB2YXIoLS1ncmV5X2RhcmspO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2t5QmVpZ2UpO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2FkZF90YXNrOmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogdmFyKC0tc2t5R3JlZW4pO1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2FkZF90YXNrOmhvdmVyIHtcXHJcXG4gIG9wYWNpdHk6IDAuNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0YXNrX2l0ZW0gKi9cXHJcXG5cXHJcXG4udGFza19pdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNreUJlaWdlVjIpO1xcclxcbn1cXHJcXG5cXHJcXG4udGFza19pdGVtX2J0biB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za3lCZWlnZVYyKTtcXHJcXG4gIG9wYWNpdHk6IDAuMztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRhc2tfaXRlbV9idG46aG92ZXIge1xcclxcbiAgb3BhY2l0eTogMC43O1xcclxcbn1cXHJcXG5cXHJcXG4uYnRuX2NsZWFyX2FsbF9jb21wbGV0ZWRfdGFza3Mge1xcclxcbiAgd2lkdGg6IDk5JTtcXHJcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcclxcbiAgcGFkZGluZzogMC42cmVtIDA7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczpob3ZlciB7XFxyXFxuICBvcGFjaXR5OiAwLjU7XFxyXFxufVxcclxcblxcclxcbi5idG5fY2xlYXJfYWxsX2NvbXBsZXRlZF90YXNrczphY3RpdmUge1xcclxcbiAgY29sb3I6IHZhcigtLXdoaXRlKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzOmRpc2FibGVkIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jb2xvckRpc2FibGUpO1xcclxcbiAgY3Vyc29yOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaCByZWQ7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IHtcclxuICBwb3B1bGF0ZVRhc2ssIHJlbmRlclRhc2ssIGNoZWNrVGV4dENvbnRlbnQsIHJlbW92ZUNvbXBsZXRlZFRhc2ssIGRpc2FibGVCdG5BbGxDbGVhcixcclxufSBmcm9tICcuL21vZHVsZXMvdmlld0Z1bmN0aW9uLmpzJztcclxuXHJcbmNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzX2xpc3QnKTtcclxuY29uc3QgYnRuQWxsQ2xlYXJDaGVja2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbGVhcl9hbGxfY29tcGxldGVkX3Rhc2tzJyk7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gIHJlbmRlclRhc2sodGFza0xpc3QpO1xyXG4gIGRpc2FibGVCdG5BbGxDbGVhcihidG5BbGxDbGVhckNoZWNrZWQpO1xyXG59O1xyXG5cclxuLy8gQWRkIGEgdGFzayBsaXN0ZW5lclxyXG5jb25zdCBpbnB1dEluc2VydFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXRfaW5zZXJ0X3Rhc2snKTtcclxuY29uc3QgYnRuQWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYWRkX3Rhc2snKTtcclxuYnRuQWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGNoZWNrVGV4dENvbnRlbnQoaW5wdXRJbnNlcnRUYXNrLnZhbHVlLnRyaW0oKSk7XHJcbiAgaWYgKGRlc2NyaXB0aW9uKSB7XHJcbiAgICBwb3B1bGF0ZVRhc2soZGVzY3JpcHRpb24sIHRhc2tMaXN0KTtcclxuICAgIGlucHV0SW5zZXJ0VGFzay52YWx1ZSA9ICcnO1xyXG4gICAgZGlzYWJsZUJ0bkFsbENsZWFyKGJ0bkFsbENsZWFyQ2hlY2tlZCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIFJlbW92ZSBhIFRhc2sgbGlzdGVuZXJcclxudGFza0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RyYXNoJykgfHwgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RyYXNoJykpIHtcclxuICAgIHJlbmRlclRhc2sodGFza0xpc3QpO1xyXG4gICAgZGlzYWJsZUJ0bkFsbENsZWFyKGJ0bkFsbENsZWFyQ2hlY2tlZCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIENsZWFyIGFsbCBjaGVja2VkIHRhc2tzXHJcbmJ0bkFsbENsZWFyQ2hlY2tlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICByZW1vdmVDb21wbGV0ZWRUYXNrKCk7XHJcbiAgcmVuZGVyVGFzayh0YXNrTGlzdCk7XHJcbiAgZGlzYWJsZUJ0bkFsbENsZWFyKGJ0bkFsbENsZWFyQ2hlY2tlZCk7XHJcbn0pOyJdLCJuYW1lcyI6WyJzYXZlRGF0YSIsInRhc2tzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2FkRGF0YSIsInBhcnNlIiwiZ2V0SXRlbSIsImFkZFRhc2siLCJ0YXNrIiwiZGF0YVRhc2siLCJwdXNoIiwiZGVsZXRlVGFzayIsImlkVGFzayIsIm5ld0RhdGFUYXNrIiwiZmlsdGVyIiwiZWxlbWVudCIsImlkIiwidXBkYXRlVGFzayIsIm5ld0NvbnRlbnQiLCJmaW5kIiwiZGVzY3JpcHRpb24iLCJjb21wbGV0ZWQiLCJUYXNrIiwiY29uc3RydWN0b3IiLCJpbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJvb3QiLCJjcmVhdGVSb290IiwidGFza0l0ZW1UZXh0IiwicXVlcnlTZWxlY3RvciIsInRhc2tJdGVtQ2hlY2siLCJ0YXNrSXRlbUJ0biIsInRhc2tJdGVtQnRuVHJhc2giLCJ0ZXh0Q29udGVudCIsInZhbHVlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsIm5ld0Rlc2NyaXB0aW9uIiwidHJpbSIsImNoaWxkTm9kZXMiLCJjaGVja2VkIiwicmFuZ2UiLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZSIsImJvZHkiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJjaGlsZHJlbiIsImFkZFRhc2tWaWV3IiwicGFyZW50IiwiY2hlY2tWYWx1ZSIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicmVuZGVyVGFzayIsImlubmVySFRNTCIsImFyclRhc2siLCJuZXdBcnJUYXNrIiwiaSIsImZvckVhY2giLCJuZXdUYXNrIiwicG9wdWxhdGVUYXNrIiwibGVuZ3RoIiwiY2hlY2tUZXh0Q29udGVudCIsImNvbnRlbnQiLCJyZW1vdmVDb21wbGV0ZWRUYXNrIiwiZGlzYWJsZUJ0bkFsbENsZWFyIiwiYnRuIiwidGFza0RhdGEiLCJyZW1vdmVBdHRyaWJ1dGUiLCJ0YXNrTGlzdCIsImJ0bkFsbENsZWFyQ2hlY2tlZCIsIndpbmRvdyIsIm9ubG9hZCIsImlucHV0SW5zZXJ0VGFzayIsImJ0bkFkZFRhc2siLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiXSwic291cmNlUm9vdCI6IiJ9