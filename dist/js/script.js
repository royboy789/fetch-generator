/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/codeGenerator.ts":
/*!************************************!*\
  !*** ./assets/js/codeGenerator.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "codeGenerator": function() { return /* binding */ codeGenerator; }
/* harmony export */ });
/**
 * Code Generator
 *
 * @returns {*} generator helper
 */
const codeGenerator = () => {
  let url = '';
  let method = '';
  let data = [];
  let headers = [];
  const codeElement = document.getElementById('code'); // ace editor

  const editor = ace.edit(codeElement, {
    mode: 'ace/mode/javascript',
    selectionStyle: 'text'
  }); // update code

  function update() {
    let fetchCode = ''; // set url

    if (data.length && method === 'GET') {
      const queryString = Object.keys(data) // eslint-disable-next-line no-loop-func
      .map(key => `${data[key].key}=${data[key].value}`).join('&');
      url += `?${queryString}`;
    }

    fetchCode = `const data = await fetch('${url}', {\n`;

    if (method && method !== '-1') {
      fetchCode += `  method: '${method}',\n`;
    } // headers


    if (headers.length) {
      fetchCode += `  headers: {\n`;
      headers.forEach(header => {
        fetchCode += `    '${header.key}': '${header.value}',\n`;
      });
      fetchCode += `  },\n`;
    } // data - NOT GET


    if (data.length && method !== 'GET') {
      const toStringify = {};
      data.forEach(dat => {
        toStringify[dat.key] = dat.value;
      });
      fetchCode += `  body: '${JSON.stringify(toStringify)}',\n`;
    } // END


    fetchCode += '});\n';
    fetchCode += 'console.log(data.json());';
    editor.setValue(fetchCode);
  } // headers


  return {
    updateUrl: newUrl => {
      url = newUrl;
      update();
    },
    updateMethod: newMethod => {
      method = newMethod;
      update();
    },
    updateData: newData => {
      data = newData;
      update();
    },
    updateHeaders: newHeaders => {
      headers = newHeaders;
      update();
    }
  };
};

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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************!*\
  !*** ./assets/js/script.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./codeGenerator */ "./assets/js/codeGenerator.ts");

/**
 * Form Init
 *
 * @param form form element
 */

const formLoader = form => {
  const generator = (0,_codeGenerator__WEBPACK_IMPORTED_MODULE_0__.codeGenerator)(); // on change

  function formChange(e) {
    // change url
    if (e.target.matches('input.url')) {
      generator.updateUrl(e.target.value);
      return true;
    } // change method


    if (e.target.matches('select.method')) {
      generator.updateMethod(e.target.value);
      return true;
    } // change data


    if (e.target.matches('input.data-key') || e.target.matches('input.data-value')) {
      const dataKeys = document.getElementsByName('data_keys[]');
      const dataValues = document.getElementsByName('data_values[]');
      const newData = [];
      dataKeys.forEach((dataKey, i) => {
        if (!dataKey.value) {
          return;
        }

        newData.push({
          key: dataKey.value,
          value: dataValues[i].value ? dataValues[i].value : 'N/A'
        });
      });
      generator.updateData(newData);
      return true;
    } // change headers


    if (e.target.matches('input.header-key') || e.target.matches('input.header-value')) {
      const headerKeys = document.getElementsByName('header_keys[]');
      const headerValues = document.getElementsByName('header_values[]');
      const newData = [];
      headerKeys.forEach((headerKey, i) => {
        if (!headerKey.value) {
          return;
        }

        newData.push({
          key: headerKey.value,
          value: headerValues[i].value ? headerValues[i].value : 'N/A'
        });
      });
      generator.updateHeaders(newData);
      return true;
    }

    return false;
  } // add change event listener


  form.addEventListener('change', formChange);
  form.addEventListener('submit', e => {
    e.preventDefault();
  });
}; // window load


const load = () => {
  return formLoader(document.getElementById('fetch-generator-form'));
};

window.onload = load;
}();
/******/ })()
;
//# sourceMappingURL=script.js.map