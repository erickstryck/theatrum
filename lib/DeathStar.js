'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  /**
   * Classe responsável por prover as funções da biblioteca.
   * @constructor
   * 
   * @param {object} react 
   */
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
    this.setContext.bind(this);
    this.getContext.bind(this);
    this.getStore.bind(this);
    this.deleteStore.bind(this);
    this.keys.bind(this);
  }

  /**
   * Recupera a instância corrente do React pelo componente que o utilizará.
   * 
   * @param {object} react
   * @return {object}
   */


  _createClass(DeathStar, [{
    key: 'builder',


    /**
     * Recria o componente informado com seu devido mapeamento para manipulação.
     * 
     * @param {string | object} type 
     * @param {object} props 
     * @param {object} children
     * @return {object}
     */
    value: function builder(type, props, children) {
      if (children && children.length === 0) children = null;
      props = props.children ? Object.assign({}, props, { children: null }) : props;
      props = Object.keys(props).indexOf('key') !== -1 ? Object.assign({}, props, { key: props.key }) : Object.assign({}, props, { key: this.getId() });
      return this.createElement(type, props, children);
    }

    /**
     * Limpa o repositório local de informações
     */

  }, {
    key: 'clearBus',
    value: function clearBus() {
      this.storage = {};
    }

    /**
     * Insere o contexto do elemento para manipulação remota por outro componente.
     * 
     * @param {string} key 
     * @param {object} value 
     */

  }, {
    key: 'setContext',
    value: function setContext(key, value) {
      this.putStore(key, value, true);
    }

    /**
     * Recupera o contexto do elemento para manipulação remota por outro componente.
     * 
     * @param {string} key
     */

  }, {
    key: 'getContext',
    value: function getContext(key) {
      return this.getStore(key);
    }

    /**
     * Persiste os dados informados no repositório local. 
     * Poderá persistir o contexto do componente e recuperar o mesmo posteriormente.
     * 
     * @param {string} key 
     * @param {object} value 
     * @param {boolean} context
     * @return {object | undefined}
     */

  }, {
    key: 'putStore',
    value: function putStore(key, value, context) {
      if (context) {
        value['update'] = function () {
          value.setState({
            deathStartUpdater: value.deathStartUpdater ? true : false
          });
        };
        var temp = {};
        Object.keys(value).map(function (current) {
          if (typeof value[current] === 'function') {
            temp[current] = value[current];
          }
        });
        temp['state'] = value.state;
        this.storage[key] = temp;
      } else {
        this.storage[key] = value;
        return value;
      }
    }

    /**
     * Recupera o dado do repositório por meio da 'Key' informada.
     * 
     * @param {string} key
     * @return {object}
     */

  }, {
    key: 'getStore',
    value: function getStore(key) {
      return this.storage[key];
    }

    /**
     * Remove o objeto do repositório por meio da 'Key' informada.
     * 
     * @param {string} key 
     */

  }, {
    key: 'deleteStore',
    value: function deleteStore(key) {
      delete this.storage[key];
    }

    /**
     * Recupera todas as chaves realcionadas aos objetos persistidos no repositório.
     * @return {array}
     */

  }, {
    key: 'keys',
    value: function keys() {
      return Object.keys(this.storage);
    }

    /**
     * Destrói os elementos React do repositório por meio da lista de Arrays informados.
     * 
     * @param {array | string} keys 
     */

  }, {
    key: 'destroy',
    value: function destroy(keys) {
      var _this = this;

      if (keys instanceof Array) {
        var store = this.keys();
        keys.map(function (currentItem) {
          store.map(function (currentStore) {
            if (currentStore.split('-')[0] === currentItem) {
              _this.deleteStore(currentItem);
            }
          }, _this);
        }, this);
      } else {
        var _store = this.keys();
        _store.map(function (currentStore) {
          if (currentStore.split('-')[0] === keys) {
            _this.deleteStore(currentStore);
          }
        }, this);
      }
    }

    /**
     * Realiza a minificação dos tipos de objetos React fazendo a compressão de nomes dos componentes.
     * 
     * @param {string} key
     * @return {string}
     */

  }, {
    key: 'minf',
    value: function minf(key) {
      var _this2 = this;

      if (this.minify) {
        key.match(/(-\w[a-zA-Z]+)/g) ? key.match(/(-\w[a-zA-Z]+)/g).map(function (current) {
          if (_this2.htmlDict.indexOf(current.substring(1, key.length)) === -1) {
            key = key.replace(current.substring(1, key.length), "t");
          }
        }) : "";
      }
      return key;
    }

    /**
     * Prepara um container de informações para serem criadas e indexadas.
     * 
     * @param {object} data 
     * @param {boolean} copy
     * @return {object}
     */

  }, {
    key: 'container',
    value: function container(data) {
      var copy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var newProps = data.props;
      if (Object.keys(data).indexOf('key') !== -1 && data['key'] && !copy) newProps = Object.assign({}, newProps, { key: data.key });
      if (Object.keys(data).indexOf('ref') !== -1 && data['ref']) newProps = Object.assign({}, newProps, { ref: data.ref });
      return this.builder(data.type, newProps ? newProps : null, Object.keys(data.props).indexOf('children') !== -1 ? this.processChildren(data.props.children, copy) : []);
    }

    /**
     * Processa os filhos de um elemento React para que possam ser mapeados para manipulação.
     * 
     * @param {object | array} children 
     * @param {boolean} copy
     * @return {object}
     */

  }, {
    key: 'processChildren',
    value: function processChildren(children, copy) {
      return children ? children instanceof Array ? children.length > 0 ? children.map(function (arrChild) {
        if (arrChild) return arrChild.type ? this.container(arrChild, copy) : arrChild;
      }, this) : null : children.type ? this.container(children, copy) : children : null;
    }

    /**
     * Processa um elemento React para que possam ser mapeado para manipulação.
     * 
     * @param {object} data 
     * @param {string} key 
     * @param {boolean} copy
     * @return {object}
     */

  }, {
    key: 'processElement',
    value: function processElement(data, key) {
      var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var obj = this.setStore(key, data, copy);
      this.mapChildrens(obj.props.children, key);
      return this.manipulate(key);
    }

    /**
     * Mapeia os filhos processados de um elemento para indexação no repositório.
     * 
     * @param {object} data 
     * @param {string} key 
     */

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

    /**
     * Verifica se o tipo do componente já foi inserido no dicionário de tipos, caso não exista ele o insere.
     * 
     * @param {string} type
     * @return {string}
     */

  }, {
    key: 'haveTypeName',
    value: function haveTypeName(type) {
      if (this.minify && typeof type === 'string') {
        if (this.htmlDict.indexOf(type) === -1) this.htmlDict.push(type);
      }
      return type.displayName ? type.displayName : type.name ? type.name : type;
    }

    /**
     * Recupera um ID único para uso no mapeamento de elementos.
     * @return {string}
     */

  }, {
    key: 'getId',
    value: function getId() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '_' + s4() + '_' + s4() + '_' + s4() + '_' + s4() + s4() + s4();
    }

    /**
     * Insere no repositório um elemento react novo
     * 
     * @param {string} key 
     * @param {object} jsxData 
     * @param {boolean} copy
     * @return {object}
     */

  }, {
    key: 'setStore',
    value: function setStore(key, jsxData) {
      var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.putStore(key, this.container(jsxData, copy));
    }

    /**
     * Recupera um elemento React do repositório e o disponibiliza para manipulação.
     * 
     * @param {string} key
     * @return {object}
     */

  }, {
    key: 'manipulate',
    value: function manipulate(key) {
      key = this.minf(key);
      return this.checkKey(key) ? new _Bridge2.default(key) : '';
    }

    /**
     * Recupera um elemento React do repositório cria uma cópia com a nova chave e o disponibiliza para manipulação.
     * 
     * @param {string} key 
     * @param {string} newKey
     * @return {object}
     */

  }, {
    key: 'manipulateCopy',
    value: function manipulateCopy(key, newKey) {
      key = this.minf(key);
      return this.manipulate(key).copy(newKey);
    }

    /**
     * Recupera um elemento do repositório para renderização.
     * 
     * @param {string} key
     * @return {object}
     */

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

    /**
     * Insere o novo objeto de propriedades ao elemento substituindo as antigas propriedades, o elemento será encontrado pela chave informada.
     * 
     * @param {string} key 
     * @param {object} props 
     */

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

    /**
     * Retorna todos os filhos de um elemento recursivamente.
     * 
     * @param {object} data 
     * @param {string} key
     * @return {array}
     */

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

    /**
     * Recupera o elemento por meio de sua chave e realiza uma cópia aplicando a ela uma nova chave.
     * 
     * @param {string} key 
     * @param {string} keyNew
     * @return {object | undefined} 
     */

  }, {
    key: 'copy',
    value: function copy(key, keyNew) {
      return this.checkKey(key) ? this.processElement(this.getElement(key), keyNew, true) : '';
    }

    /**
     * Insere um novo atributo no objeto relacionado a chave informada.
     * 
     * @param {string} key 
     * @param {object} attributes 
     */

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

    /**
     * Reaplica um novo valor ao atributo passado ao objeto por meio da chave informada.
     * 
     * @param {string} key 
     * @param {object} attValues 
     */

  }, {
    key: 'modifyAttribute',
    value: function modifyAttribute(key, attValues) {
      var _this3 = this;

      Object.keys(attValues).map(function (current) {
        _this3.processModify(key, current, attValues[current]);
      }, this);
    }

    /**
     * Aplica as mudanças nos atributos de acordo com os valores informados.
     * 
     * @param {string} key 
     * @param {string} atrName 
     * @param {*} value 
     */

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

    /**
     * Recupera o elemento do repositório e realiza a remoção dos atributos informados.
     * 
     * @param {string} key 
     * @param {array | string} attValues 
     */

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(key, attValues) {
      var _this4 = this;

      if (attValues instanceof Array) {
        attValues.map(function (current) {
          _this4.processRemove(key, current);
        }, this);
      } else {
        this.processRemove(key, attValues);
      }
    }

    /**
     * Aplica a remoção dos atributos de acordo com os valores informados.
     * 
     * @param {string} key 
     * @param {string} atrName 
     */

  }, {
    key: 'processRemove',
    value: function processRemove(key, atrName) {
      if (!key && !atrName) {
        console.log('metodo: removeAttribute - Você precisa especificar uma key em string e o nome do atributo a ser removido!');
        return;
      }
      if (this.checkKey(key)) {
        if (this.checkProps(key)) {
          var tempJsx = this.getElement(key);
          if (atrName === 'ref') {
            var updated = Object.assign({}, tempJsx, { ref: null });
            this.updateAllReferences(updated);
          }
          if (this.checkAttribute(key, atrName)) {
            var index = Object.keys(tempJsx.props);
            index.splice(index.indexOf(atrName), 1);
            var tempObj = {};
            index.map(function (current) {
              tempObj[current] = tempJsx.props[current];
            });
            var result = Object.assign({}, tempJsx, { props: tempObj });
            this.updateAllReferences(result);
          }
        }
      }
    }

    /**
     * Realiza a inserção de um elemento filho em um outro elemento especificado pela chave, 
     * poderá ser informado o índice onde será inserido o objeto, caso a flag "mergeIndex" for informada o conteúdo do índice antigo será substituído 
     * caso contrario o índice será acrescentado a partir da posição informada.
     * 
     * @param {string} key 
     * @param {object} childrenVal 
     * @param {integer} index 
     * @param {boolean} mergeIndex 
     */

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

    /**
     * Recupera um elemento pela chave e realiza a remoção do filho especificado pelo índice informado
     * o índice obedece a regra da ordem dos filhos do elemento pai.
     * 
     * @param {string} key 
     * @param {intger} index 
     */

  }, {
    key: 'removeChildren',
    value: function removeChildren(key, index) {
      var _this5 = this;

      if (index instanceof Array && index !== -1) {
        index.map(function (current) {
          _this5.processRemoveChildren(key, current);
        }, this);
      } else if (index === -1) {
        this.processResetChildren(key);
      } else this.processRemoveChildren(key, index);
    }

    /**
     * Aplica a remoção do filho de acordo com os valores informados.
     * 
     * @param {string} key 
     * @param {integer} index 
     */

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

    /**
     * Remove todos os filhos de um elemento recuperado pela chave.
     * 
     * @param {string} key 
     */

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

    /**
     * Realiza a atualização das mudanças em todo os elementos do repositório.
     * 
     * @param {object} obj 
     */

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

    /**
     * Verifica e aplica as mudanças nos filhos de um elemento pai.
     * 
     * @param {object} mainElement 
     * @param {object} currentElement
     * @return {object} 
     */

  }, {
    key: 'checkChildrensInArray',
    value: function checkChildrensInArray(mainElement, currentElement) {

      if (currentElement && currentElement.props) {
        var childrens = currentElement.props.children;
        var childrenUpdated = [];
        if (childrens && childrens instanceof Array) {
          childrens.map(function (current) {
            var nextChildrens = this.checkChildrensInArray(mainElement, current);
            childrenUpdated = this.compareChildrens(mainElement, current, childrenUpdated, nextChildrens);
          }, this);
          return childrenUpdated;
        } else if (childrens && childrens.props) {
          var nextChildrens = this.checkChildrensInArray(mainElement, childrens);
          childrenUpdated = this.compareChildrens(mainElement, childrens, childrenUpdated, nextChildrens);
          return childrenUpdated;
        } else return childrens;
      } else return currentElement;
    }

    /**
     * Verifica se houve alteração no filho encontrado e recupera o filho atualizado.
     * 
     * @param {object} mainElement 
     * @param {object} current 
     * @param {object} childrenUpdated 
     * @param {object} nextChildrens
     * @return {object}
     */

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

    /**
     * Realiza a inserção de novos atributos a um elemento informado.
     * 
     * @param {object} obj 
     * @param {object} newAttr
     * @return {object} 
     */

  }, {
    key: 'swapPropsAttr',
    value: function swapPropsAttr(obj, newAttr) {
      var tempProps = Object.assign({}, obj.props, newAttr);
      return Object.assign({}, obj, { props: tempProps });
    }

    /**
     * Verifica se existe algum item no repositório relacionado a chave informada.
     * 
     * @param {string} key
     * @return {boolean} 
     */

  }, {
    key: 'checkKey',
    value: function checkKey(key) {
      return this.keys().indexOf(key) === -1 ? false : true;
    }

    /**
     * Verifica se o elemento relacionado a chave informada contém propriedades.
     * 
     * @param {string} key
     * @return {boolean} 
     */

  }, {
    key: 'checkProps',
    value: function checkProps(key) {
      return this.checkKey(key) ? Object.keys(this.getElement(key)).indexOf('props') === -1 ? false : true : false;
    }

    /**
     * Verifica se o elemento relacionado a chave informada contém o atributo indicado.
     * 
     * @param {string} key 
     * @param {string} atrName
     * @return {boolean} 
     */

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