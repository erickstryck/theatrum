'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bridge = require('./Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _minify = require('../minify.conf');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = '';

var DeathStar = function () {
  function DeathStar(react) {
    _classCallCheck(this, DeathStar);

    this.createElement = react.createElement;
    this.storage = {};
    this.setStore.bind(this);
    this.checkKey.bind(this);
    this.htmlDict = [];
    this.minify = _minify2.default.minify;
    this.minf.bind(this);
    this.builder.bind(this);
    this.putStore.bind(this);
    this.getStore.bind(this);
    this.deleteStore.bind(this);
    this.keys.bind(this);
  }
  /*done*/


  _createClass(DeathStar, [{
    key: 'builder',


    /*done*/
    value: function builder(type, props, children) {
      if (children && children.length === 0) children = null;
      props = props.children ? Object.assign({}, props, { children: null }) : props;
      props = Object.keys(props).indexOf('key') !== -1 ? Object.assign({}, props, { key: props.key }) : Object.assign({}, props, { key: this.getId() });
      return this.createElement(type, props, children);
    }

    /*done*/

  }, {
    key: 'clearBus',
    value: function clearBus() {
      this.storage = {};
    }

    /*done*/

  }, {
    key: 'putStore',
    value: function putStore(key, value, context) {
      var _this = this;

      if (context) {
        (function () {
          value['deathStartUpdater'] = function () {
            value.forceUpdate();
          };
          var temp = {};
          Object.keys(value).map(function (current) {
            if (typeof value[current] === 'function') {
              temp[current] = value[current];
            }
          });
          temp['state'] = value.state;
          _this.storage[key] = temp;
        })();
      } else {
        this.storage[key] = value;
        return value;
      }
    }
    /*done*/

  }, {
    key: 'getStore',
    value: function getStore(key) {
      return this.storage[key];
    }
    /*done*/

  }, {
    key: 'deleteStore',
    value: function deleteStore(key) {
      delete this.storage[key];
    }
    /*done*/

  }, {
    key: 'keys',
    value: function keys() {
      return Object.keys(this.storage);
    }
    /*done*/

  }, {
    key: 'destroy',
    value: function destroy(keys) {
      var _this2 = this;

      if (keys instanceof Array) {
        (function () {
          var store = _this2.keys();
          keys.map(function (currentItem) {
            store.map(function (currentStore) {
              if (currentStore.split('-')[0] === currentItem) {
                _this2.deleteStore(currentItem);
              }
            }, _this2);
          }, _this2);
        })();
      } else {
        var _store = this.keys();
        _store.map(function (currentStore) {
          if (currentStore.split('-')[0] === keys) {
            _this2.deleteStore(currentStore);
          }
        }, this);
      }
    }

    /*TESTE*/

  }, {
    key: 'minf',
    value: function minf(key) {
      var _this3 = this;

      if (this.minify) {
        key.match(/(-\w[a-zA-Z]+)/g) ? key.match(/(-\w[a-zA-Z]+)/g).map(function (current) {
          if (_this3.htmlDict.indexOf(current.substring(1, key.length)) === -1) {
            key = key.replace(current.substring(1, key.length), "t");
          }
        }) : "";
      }
      return key;
    }

    /*done*/

  }, {
    key: 'container',
    value: function container(data) {
      var copy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var newProps = data.props;
      if (Object.keys(data).indexOf('key') !== -1 && data['key'] && !copy) newProps = Object.assign({}, newProps, { key: data.key });
      if (Object.keys(data).indexOf('ref') !== -1 && data['ref']) newProps = Object.assign({}, newProps, { ref: data.ref });
      return this.builder(data.type, newProps ? newProps : null, Object.keys(data.props).indexOf('children') !== -1 ? this.processChildren(data.props.children, copy) : []);
    }

    /*done*/

  }, {
    key: 'processChildren',
    value: function processChildren(children, copy) {
      return children ? children instanceof Array ? children.length > 0 ? children.map(function (arrChild) {
        if (arrChild) return arrChild.type ? this.container(arrChild, copy) : arrChild;
      }, this) : null : children.type ? this.container(children, copy) : children : null;
    }

    /*done*/

  }, {
    key: 'processElement',
    value: function processElement(data, key) {
      var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var obj = this.setStore(key, data, copy);
      this.mapChildrens(obj.props.children, key);
      return this.manipulate(key);
    }

    /*done*/

  }, {
    key: 'mapChildrens',
    value: function mapChildrens(data, key) {
      if (data) {
        if (data instanceof Array) {
          data.map(function (current, index) {
            if (current) {
              ++index;
              if (current.props) this.mapChildrens(current.props.children, key + '-' + this.haveTypeName(current.type) + index);
              if (current.props) this.putStore(key + '-' + this.haveTypeName(current.type) + index, current.key);
            }
          }, this);
        } else {
          if (data.props) this.mapChildrens(data.props.children, key + '-' + this.haveTypeName(data.type) + '1');
          if (data.props) this.putStore(key + '-' + this.haveTypeName(data.type) + '1', data.key);
        }
      }
    }
    /*done*/

  }, {
    key: 'haveTypeName',
    value: function haveTypeName(type) {
      if (this.minify && typeof type === 'string') {
        if (this.htmlDict.indexOf(type) === -1) this.htmlDict.push(type);
      }
      return type.displayName ? type.displayName : type.name ? type.name : type;
    }

    /*done*/

  }, {
    key: 'getId',
    value: function getId() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '_' + s4() + '_' + s4() + '_' + s4() + '_' + s4() + s4() + s4();
    }

    /*done*/

  }, {
    key: 'setStore',
    value: function setStore(key, jsxData) {
      var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.putStore(key, this.container(jsxData, copy));
    }

    /*ok*/

  }, {
    key: 'manipulate',
    value: function manipulate(key) {
      key = this.minf(key);
      return this.checkKey(key) ? new _Bridge2.default(key) : '';
    }

    /*ok*/

  }, {
    key: 'manipulateCopy',
    value: function manipulateCopy(key, newKey) {
      key = this.minf(key);
      return this.manipulate(key).copy(newKey);
    }

    /*done*/

  }, {
    key: 'getElement',
    value: function getElement(key) {
      key = this.minf(key);
      if (this.checkKey(key)) {
        var temp = this.getStore(key);
        var keyMaster = temp.props ? temp.key : temp;
        var keyArr = key.split('-');
        if (this.checkKey(keyArr[0])) {
          var obj = this.getStore(keyArr[0]);
          return obj.key === keyMaster ? obj : this.walkChildren(obj.props.children, keyMaster);
        }
      }
    }

    /*done*/

  }, {
    key: 'setProps',
    value: function setProps(key, props) {

      if (!key && !(props instanceof Object)) {
        console.log('metodo: setProps - Você precisa especificar uma key em string e um props no formato objeto!');
        return;
      }
      if (this.checkKey(key)) {
        var tempJsx = this.getElement(key);
        if (Object.keys(props).indexOf('ref') !== -1) {
          tempJsx = Object.assign({}, tempJsx, { ref: props.ref });
          delete props.ref;
        }
        tempJsx = this.swapPropsAttr(tempJsx, props);
        this.updateAllReferences(tempJsx);
      }
    }

    /*done*/

  }, {
    key: 'walkChildren',
    value: function walkChildren(data, key) {
      var walk = '';
      if (data) {
        if (data instanceof Array) {
          for (var x = 0; x < data.length; x++) {
            if (data[x]) {
              if (data[x].key === key) return data[x];else if (data[x].props) walk = this.walkChildren(data[x].props.children, key);
              if (walk && walk.key === key) return walk;
            }
          }
        } else {
          if (data.key === key) return data;else if (data.props) walk = this.walkChildren(data.props.children, key);
          if (walk && walk.key === key) return walk;
        }
      }return;
    }

    /*done*/

  }, {
    key: 'copy',
    value: function copy(key, keyNew) {
      return this.checkKey(key) ? this.processElement(this.getElement(key), keyNew, true) : '';
    }

    /*done*/

  }, {
    key: 'setAttribute',
    value: function setAttribute(key, attributes) {
      if (!key && !attributes || !(attributes instanceof Object)) {
        console.log('metodo: setAttributes - Você precisa especificar uma key em string e um atributo no formato objeto!');
        return;
      }
      if (this.checkKey(key)) {
        if (attributes.ref) {
          var tempJsx = this.getElement(key);
          var updated = Object.assign({}, tempJsx, attributes);
          this.updateAllReferences(updated);
        } else {
          if (this.checkProps(key)) {
            var _tempJsx = this.getElement(key);
            var _updated = this.swapPropsAttr(_tempJsx, attributes);
            this.updateAllReferences(_updated);
          }
        }
      }
    }

    /*done*/

  }, {
    key: 'modifyAttribute',
    value: function modifyAttribute(key, attValues) {
      var _this4 = this;

      Object.keys(attValues).map(function (current) {
        _this4.processModify(key, current, attValues[current]);
      }, this);
    }

    /*done*/

  }, {
    key: 'processModify',
    value: function processModify(key, atrName, value) {
      if (!key && !atrName && !value) {
        console.log('metodo: modifyAttribute - Você precisa especificar a key, o nome do atributo e seu valor por parâmetro!');
        return;
      }
      if (this.checkKey(key)) {
        if (this.checkProps(key)) {
          if (this.checkAttribute(key, atrName) || atrName === 'ref') {
            var tempJsx = this.getElement(key);
            if (atrName === 'ref') {
              var updated = Object.assign({}, tempJsx, { ref: value });
              this.updateAllReferences(updated);
            } else {
              var tempVar = {};
              tempVar[atrName] = value;
              var _updated2 = this.swapPropsAttr(tempJsx, tempVar);
              this.updateAllReferences(_updated2);
            }
          }
        }
      }
    }

    /*done*/

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(key, attValues) {
      var _this5 = this;

      if (attValues instanceof Array) {
        attValues.map(function (current) {
          _this5.processRemove(key, current);
        }, this);
      } else {
        this.processRemove(key, attValues);
      }
    }

    /*done*/

  }, {
    key: 'processRemove',
    value: function processRemove(key, atrName) {
      var _this6 = this;

      if (!key && !atrName) {
        console.log('metodo: removeAttribute - Você precisa especificar uma key em string e o nome do atributo a ser removido!');
        return;
      }
      if (this.checkKey(key)) {
        if (this.checkProps(key)) {
          (function () {
            var tempJsx = _this6.getElement(key);
            if (atrName === 'ref') {
              var updated = Object.assign({}, tempJsx, { ref: null });
              _this6.updateAllReferences(updated);
            }
            if (_this6.checkAttribute(key, atrName)) {
              (function () {
                var index = Object.keys(tempJsx.props);
                index.splice(index.indexOf(atrName), 1);
                var tempObj = {};
                index.map(function (current) {
                  tempObj[current] = tempJsx.props[current];
                });
                var result = Object.assign({}, tempJsx, { props: tempObj });
                _this6.updateAllReferences(result);
              })();
            }
          })();
        }
      }
    }

    /*done*/

  }, {
    key: 'setChildren',
    value: function setChildren(key, childrenVal) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var mergeIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!key && !childrenVal) {
        console.log('metodo: setChildren - Você precisa especificar a key e um elemento a ser inserido!');
        return;
      }
      if (this.checkKey(key)) {
        var tempJsx = this.getElement(key);
        if (this.checkProps(key)) {
          if (tempJsx.props.children) {
            if (childrenVal instanceof Array) {
              var arrChild = tempJsx.props.children;
              if (!(arrChild instanceof Array)) arrChild = new Array(arrChild);
              var updated = {};
              if (index) {
                var _arrChild, _arrChild2;

                index--;
                if (mergeIndex) (_arrChild = arrChild).splice.apply(_arrChild, [index, 0].concat(_toConsumableArray(childrenVal)));else (_arrChild2 = arrChild).splice.apply(_arrChild2, [index, 1].concat(_toConsumableArray(childrenVal)));
                updated = this.swapPropsAttr(tempJsx, { children: arrChild });
              } else updated = this.swapPropsAttr(tempJsx, { children: arrChild.concat(childrenVal) });
              this.updateAllReferences(updated);
            } else {
              var _arrChild3 = tempJsx.props.children instanceof Array ? tempJsx.props.children : new Array(tempJsx.props.children);
              if (index) {
                index--;
                if (mergeIndex) _arrChild3.splice(index, 0, childrenVal);else _arrChild3[index] = childrenVal;
              } else {
                _arrChild3.push(childrenVal);
              }
              var _updated3 = this.swapPropsAttr(tempJsx, { children: _arrChild3 });
              this.updateAllReferences(_updated3);
            }
          } else {
            var _updated4 = this.swapPropsAttr(tempJsx, { children: childrenVal });
            this.updateAllReferences(_updated4);
          }
        }
      }
    }

    /*done*/

  }, {
    key: 'removeChildren',
    value: function removeChildren(key, index) {
      var _this7 = this;

      if (index instanceof Array && index !== -1) {
        index.map(function (current) {
          _this7.processRemoveChildren(key, current);
        }, this);
      } else if (index === -1) {
        this.processResetChildren(key);
      } else this.processRemoveChildren(key, index);
    }

    /*done*/

  }, {
    key: 'processRemoveChildren',
    value: function processRemoveChildren(key, index) {
      index--;
      if (!key && index) {
        console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada a children e o índice que corresponde a children a ser removida!');
        return;
      }
      if (this.checkKey(key)) {
        var jsxMaster = this.getElement(key);
        if (jsxMaster.props.children instanceof Array) {
          var newArr = jsxMaster.props.children.filter(function (current, idx) {
            return index !== idx;
          });
          var updated = this.swapPropsAttr(jsxMaster, { children: newArr });
          this.updateAllReferences(updated);
        } else {
          var _updated5 = this.swapPropsAttr(jsxMaster, { children: null });
          this.updateAllReferences(_updated5);
        }
      } else console.log('Chave não encontrada!');
    }

    /*done*/

  }, {
    key: 'processResetChildren',
    value: function processResetChildren(key) {
      if (!key) {
        console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada os childrens !');
        return;
      }
      if (this.checkKey(key)) {
        var jsxMaster = this.getElement(key);
        var updated = this.swapPropsAttr(jsxMaster, { children: null });
        this.updateAllReferences(updated);
      } else console.log('Chave não encontrada!');
    }

    /*done*/

  }, {
    key: 'updateAllReferences',
    value: function updateAllReferences(obj) {

      var keys = this.keys();
      keys.map(function (current) {
        var tempElement = this.getStore(current);
        if (tempElement.props) {
          if (tempElement.key !== obj.key) {
            var childrenUpdated = this.checkChildrensInArray(obj, tempElement);
            this.putStore(current, this.processElement(this.swapPropsAttr(tempElement, { children: childrenUpdated }), current).getElement());
          } else this.putStore(current, this.processElement(obj, current).getElement());
        }
      }, this);
    }

    /*done*/

  }, {
    key: 'checkChildrensInArray',
    value: function checkChildrensInArray(mainElement, currentElement) {
      var _this8 = this;

      if (currentElement && currentElement.props) {
        var _ret5 = function () {
          var childrens = currentElement.props.children;
          var childrenUpdated = [];
          if (childrens && childrens instanceof Array) {
            childrens.map(function (current) {
              var nextChildrens = this.checkChildrensInArray(mainElement, current);
              childrenUpdated = this.compareChildrens(mainElement, current, childrenUpdated, nextChildrens);
            }, _this8);
            return {
              v: childrenUpdated
            };
          } else if (childrens && childrens.props) {
            var nextChildrens = _this8.checkChildrensInArray(mainElement, childrens);
            childrenUpdated = _this8.compareChildrens(mainElement, childrens, childrenUpdated, nextChildrens);
            return {
              v: childrenUpdated
            };
          } else return {
              v: childrens
            };
        }();

        if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
      } else return currentElement;
    }

    /*done*/

  }, {
    key: 'compareChildrens',
    value: function compareChildrens(mainElement, current, childrenUpdated, nextChildrens) {
      if (current && current.key && current.key === mainElement.key) {
        childrenUpdated.push(mainElement);
      } else {
        if (current && current.props) childrenUpdated.push(this.swapPropsAttr(current, { children: nextChildrens }));else childrenUpdated.push(current);
      }
      return childrenUpdated;
    }

    /*done*/

  }, {
    key: 'swapPropsAttr',
    value: function swapPropsAttr(obj, newAttr) {
      var tempProps = Object.assign({}, obj.props, newAttr);
      return Object.assign({}, obj, { props: tempProps });
    }

    /*done*/

  }, {
    key: 'checkKey',
    value: function checkKey(key) {
      return this.keys().indexOf(key) === -1 ? false : true;
    }

    /*done*/

  }, {
    key: 'checkProps',
    value: function checkProps(key) {
      return this.checkKey(key) ? Object.keys(this.getElement(key)).indexOf('props') === -1 ? false : true : false;
    }

    /*done*/

  }, {
    key: 'checkAttribute',
    value: function checkAttribute(key, atrName) {
      return this.checkKey(key) ? this.checkProps(key) ? Object.keys(this.getElement(key).props).indexOf(atrName) === -1 ? false : true : false : false;
    }
  }], [{
    key: 'getInstance',
    value: function getInstance(react) {
      if (instance) {
        return instance;
      } else {
        instance = new DeathStar(react);
        return instance;
      }
    }
  }]);

  return DeathStar;
}();

exports.default = DeathStar;