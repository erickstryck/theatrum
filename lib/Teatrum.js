'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theatrum = exports.Actor = exports.Scene = exports.Stage = exports.Staff = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Responsável por importar o arquivo de configuração da minificação
 */
var minify = '';
try {
  minify = require('../../../death-star-minify.conf');
} catch (e) {
  console.error('You need to create a configuration file for the library, please read the documentation at https://github.com/erickstryck/react-deathStar/blob/master/README.md');
  minify = { minify: false };
}

minify = minify.minify;
var instance = '';

var Storage = function () {
  /**
   * Classe responsável por prover as funções da biblioteca.
   * @constructor
   *
   */
  function Storage() {
    _classCallCheck(this, Storage);

    this.storage = {};
    this.htmlDict = [];
  }

  /**
   * Inicia o storage
   *
   * @return {object}
   */


  _createClass(Storage, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (instance) {
        return instance;
      } else {
        instance = new Storage();
        return instance;
      }
    }

    /**
     * Apaga todos os dados do storage de elementos
     */

  }, {
    key: 'clearStorage',
    value: function clearStorage() {
      Storage.getInstance().storage = {};
    }

    /**
     * Adiciona um item avulso no storage
     */

  }, {
    key: 'setItemStorage',
    value: function setItemStorage(key, value) {
      Storage.getInstance().storage[key] = value;
    }

    /**
     * Recupera o dicionario html para o minify
     */

  }, {
    key: 'getHtmlDict',
    value: function getHtmlDict() {
      return Storage.getInstance().htmlDict;
    }

    /**
     * Seta um novo valor no dicionario html minify
     */

  }, {
    key: 'setHtmlDict',
    value: function setHtmlDict(value) {
      Storage.getInstance().htmlDict.push(value);
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
            theatrumUpdater: value.theatrumUpdater ? true : false
          });
        };
        var temp = {};
        var values = Object.keys(value);
        for (var x = 0; x < values.length; x++) {
          var current = values[x];
          if (typeof value[current] === 'function') {
            temp[current] = value[current];
          }
        }
        temp['state'] = value.state;
        Storage.getInstance().storage[key] = temp;
      } else {
        Storage.getInstance().storage[key] = value;
      }

      return value;
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
      var element = '';
      try {
        element = Storage.getInstance().storage[key];
      } catch (e) {
        console.error('The key \'' + key + '\' does not exist');
      }

      return element;
    }

    /**
     * Remove o objeto do repositório por meio da 'Key' informada.
     *
     * @param {string} key
     */

  }, {
    key: 'deleteStore',
    value: function deleteStore(key) {
      delete Storage.getInstance().storage[key];
    }

    /**
     * Recupera todas as chaves realcionadas aos objetos persistidos no repositório.
     * @return {array}
     */

  }, {
    key: 'getKeys',
    value: function getKeys() {
      return Object.keys(Storage.getInstance().storage);
    }
  }]);

  return Storage;
}();

var factory = function factory(key) {
  return function (_Component) {
    _inherits(Factory, _Component);

    function Factory(props) {
      _classCallCheck(this, Factory);

      var _this = _possibleConstructorReturn(this, (Factory.__proto__ || Object.getPrototypeOf(Factory)).call(this, props));

      _this.state = {
        staff: engine,
        key: key
      };
      return _this;
    }

    _createClass(Factory, [{
      key: 'render',
      value: function render() {
        var element = engine.getElement(this.state.key, true);

        if (!element) {
          element = engine.processElement(_react2.default.createElement('div', this.props), this.state.key, false, this);
        }
        return element;
      }
    }]);

    return Factory;
  }(_react.Component);
};

var stage = function stage(props) {
  if (!props.name || !props.path) {
    console.error({
      error: "You need to enter the props 'name' and 'path' for the component."
    });
    return null;
  }

  var objectClass = new (factory('stage_' + props.name))(props);
  Storage.putStore('class_' + props.name, objectClass);
  Storage.putStore('path_' + props.path, props.name);
  return Storage.getStore('class_' + props.name);
};

var theatrum = function theatrum(props) {
  if (!props.name || !props.init) {
    console.error("You need to enter the props 'name' and 'init' for the component.");
    return null;
  }

  if (props.browser) {
    if (window.location.pathname != '/') {
      props = engine.swapPropsAttr({ props: props }, { init: window.location.pathname }).props;
    }
  }

  var Theatrum = function (_Component2) {
    _inherits(Theatrum, _Component2);

    function Theatrum(props) {
      _classCallCheck(this, Theatrum);

      var _this2 = _possibleConstructorReturn(this, (Theatrum.__proto__ || Object.getPrototypeOf(Theatrum)).call(this, props));

      _this2.getAllPaths = _this2.getAllPaths.bind(_this2);
      _this2.handleBrowserHistory = _this2.handleBrowserHistory.bind(_this2);
      _this2.push = _this2.push.bind(_this2);
      _this2.back = _this2.back.bind(_this2);
      _this2.reset = _this2.reset.bind(_this2);
      _this2.currentPath = _this2.currentPath.bind(_this2);
      _this2.injectOwner = _this2.injectOwner.bind(_this2);

      Storage.putStore('state_path_' + _this2.props.name, {
        push: _this2.push,
        back: _this2.back,
        forward: _this2.forward,
        reset: _this2.reset,
        currentPath: _this2.currentPath
      });

      var paths = _this2.getAllPaths(_this2.props.children);
      _this2.state = {
        storage: Storage,
        currentClass: '',
        path: paths,
        idx: [paths.indexOf(_this2.props.init)]
      };
      return _this2;
    }

    _createClass(Theatrum, [{
      key: 'getAllPaths',
      value: function getAllPaths(children) {
        var paths = [];
        if (children instanceof Array) {
          for (var x = 0; x < children.length; x++) {
            if (children[x].props.path) paths.push(children[x].props.path);
          }
        } else {
          if (children.props.path) paths.push(children.props.path);
        }

        return paths;
      }
    }, {
      key: 'handleBrowserHistory',
      value: function handleBrowserHistory() {
        if (this.props.browser) {
          var historyPaths = JSON.parse(window.localStorage.getItem('theatrumPaths'));

          if (historyPaths) {
            if (!historyPaths.history && this.state.path.indexOf(window.location.pathname) > 0) {
              if (historyPaths.idx.slice(-1)[0] != this.state.path.indexOf(window.location.pathname)) {
                historyPaths.idx.push(this.state.path.indexOf(window.location.pathname));
              }
            } else if (this.state.path.indexOf(window.location.pathname) < 0) {
              historyPaths.idx.push(this.state.path.indexOf(this.props.redirect));
            }

            this.state.path = historyPaths.path;
            this.state.idx = historyPaths.idx;

            historyPaths.history = false;
            window.localStorage.setItem('theatrumPaths', JSON.stringify(historyPaths));
          }
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var objClass = Storage.getStore('class_' + Storage.getStore('path_' + this.state.path[this.state.idx.slice(-1)[0]]));

        if (this.props.browser && !this.props.ignorePersistence) {
          var historyProps = window.localStorage.getItem('theatrumProps_' + this.state.path[this.state.idx.slice(-1)[0]]);

          if (historyProps) {
            objClass.props = Object.assign({}, objClass.props, JSON.parse(historyProps));

            Storage.setItemStorage('class_' + Storage.getStore('path_' + this.state.path[this.state.idx.slice(-1)[0]]), objClass);
          }
        }

        engine.setContext('theatrum_' + this.props.name, this);

        this.setState({
          currentClass: objClass
        });
      }
    }, {
      key: 'push',
      value: function push(path, props) {
        var idx = this.state.path.indexOf(path);
        if (this.state.idx.slice(-1)[0] != idx) this.state.idx.push(idx);

        if (idx < 0) idx = this.state.path.indexOf(this.props.redirect);
        path = this.state.path[idx];

        var currentClass = Storage.getStore('class_' + Storage.getStore('path_' + path));

        currentClass = engine.swapPropsAttr(currentClass, props);

        Storage.setItemStorage('class_' + Storage.getStore('path_' + path), currentClass);

        if (this.props.browser) {
          window.history.replaceState('', '', path);
          if (props) window.localStorage.setItem('theatrumProps_' + path, JSON.stringify(props));

          window.localStorage.setItem('theatrumPaths', JSON.stringify({
            idx: this.state.idx,
            path: this.state.path,
            history: true
          }));
        }

        this.setState({
          currentClass: currentClass
        });
      }
    }, {
      key: 'back',
      value: function back(props) {
        this.state.idx.pop();
        var idx = this.state.idx.slice(-1)[0];
        if (idx >= 0) {
          var currentClass = Storage.getStore('class_' + Storage.getStore('path_' + this.state.path[idx]));

          currentClass = engine.swapPropsAttr(currentClass, props);

          Storage.setItemStorage('class_' + Storage.getStore('path_' + this.state.path[idx]), currentClass);

          if (this.props.browser) {
            window.history.replaceState('', '', this.state.path[idx]);
            if (props) window.localStorage.setItem('theatrumProps_' + this.state.path[idx], JSON.stringify(props));

            window.localStorage.setItem('theatrumPaths', JSON.stringify({
              idx: this.state.idx,
              path: this.state.path,
              history: true
            }));
          }

          this.setState({
            currentClass: currentClass
          });
        }
      }
    }, {
      key: 'reset',
      value: function reset(props) {
        this.state.idx = [this.props.init];
        var idx = this.state.idx.slice(-1)[0];
        var currentClass = Storage.getStore('class_' + Storage.getStore('path_' + this.state.path[idx]));

        currentClass = engine.swapPropsAttr(currentClass, props);

        Storage.setItemStorage('class_' + Storage.getStore('path_' + this.state.path[idx]), currentClass);

        if (this.props.browser) {
          window.history.replaceState('', '', this.state.path[idx]);
          if (props) window.localStorage.setItem('theatrumProps_' + this.state.path[idx], JSON.stringify(props));

          window.localStorage.setItem('theatrumPaths', JSON.stringify({
            idx: this.state.idx,
            path: this.state.path,
            history: true
          }));
        }

        this.setState({
          currentClass: currentClass
        });
      }
    }, {
      key: 'currentPath',
      value: function currentPath() {
        return this.state.path[this.state.idx.slice(-1)[0]];
      }
    }, {
      key: 'injectOwner',
      value: function injectOwner(props) {
        var children = props.children;
        if (children instanceof Array) {
          var childrens = [];
          for (var x = 0; x < children.length; x++) {
            childrens.push(engine.swapPropsAttr(children[x], {
              owner: this.props.name
            }));
          }
          children = childrens;
        } else {
          children = engine.swapPropsAttr(children, { owner: this.props.name });
        }

        return engine.swapPropsAttr({ props: props }, { children: children }).props;
      }
    }, {
      key: 'render',
      value: function render() {
        this.handleBrowserHistory();

        return this.state.currentClass ? this.state.currentClass.update ? this.state.currentClass.render() : this.state.currentClass : this.injectOwner(this.props).children;
      }
    }]);

    return Theatrum;
  }(_react.Component);

  return new Theatrum(props);
};

var scene = function scene(props) {
  if (!props.name) {
    console.error("You need to enter the props 'name' for the component.");
    return null;
  }

  return new (factory('scene_' + props.name))(props);
};

var actor = function actor(props) {
  if (!props.name) {
    console.error("You need to enter the props 'name' for the component.");
    return null;
  }

  return new (factory('actor_' + props.name))(props);
};

var engine = {
  /**
   * Recria o componente informado com seu devido mapeamento para manipulação.
   *
   * @param {string | object} type
   * @param {object} props
   * @param {object} children
   * @return {object}
   */
  builder: function builder(type, props, children) {
    if (children && children.length === 0) children = null;
    props = props.children ? Object.assign({}, props, { children: null }) : props;
    props = Object.assign({}, props, { key: this.getId() });
    return _react2.default.createElement(type ? type : 'div', props, children);
  },


  /**
   * Limpa o repositório local de informações
   */
  clearBus: function clearBus() {
    Storage.clearStorage();
  },


  /**
   * Injeta uma instancia do react e inicia o storage
   *
   * @param {*} react
   */
  injectReact: function injectReact(react) {
    Store.getInstance(react);
  },


  /**
   * Insere o contexto do elemento para manipulação remota por outro componente.
   *
   * @param {string} key
   * @param {object} value
   */
  setContext: function setContext(key, value) {
    Storage.putStore(key + '_context', value, true);
  },


  /**
   * Recupera o contexto do elemento para manipulação remota por outro componente.
   *
   * @param {string} key
   */
  getContext: function getContext(key) {
    return Storage.getStore(key + '_context');
  },


  /**
   * Persiste os dados informados no repositório local.
   * Poderá persistir o contexto do componente e recuperar o mesmo posteriormente.
   *
   * @param {string} key
   * @param {object} value
   * @param {boolean} context
   * @return {object | undefined}
   */
  putStore: function putStore(key, value, context) {
    return Storage.putStore(key, value, context);
  },


  /**
   * Recupera o dado do repositório por meio da 'Key' informada.
   *
   * @param {string} key
   * @return {object}
   */
  getStore: function getStore(key) {
    return Storage.getStore(key);
  },


  /**
   * Remove o objeto do repositório por meio da 'Key' informada.
   *
   * @param {string} key
   */
  deleteStore: function deleteStore(key) {
    Storage.deleteStore(key);
  },


  /**
   * Recupera todas as chaves realcionadas aos objetos persistidos no repositório.
   * @return {array}
   */
  keys: function keys() {
    return Storage.getKeys();
  },


  /**
   * Destrói os elementos React do repositório por meio da lista de Arrays informados.
   *
   * @param {array | string} keys
   */
  destroy: function destroy(keys) {
    var store = engine.keys();
    if (keys instanceof Array) {
      for (var x = 0; x < keys.length; x++) {
        for (y = 0; y < store.length; y++) {
          var currentItem = keys[x];
          var currentStore = store[y];

          if (currentStore.split('-')[0] === currentItem) {
            Storage.deleteStore(currentItem);
          }
        }
      }
    } else {
      for (y = 0; y < store.length; y++) {
        var _currentStore = store[y];
        if (_currentStore.split('-')[0] === keys) {
          Storage.deleteStore(_currentStore);
        }
      }
    }
  },


  /**
   * Realiza a minificação dos tipos de objetos React fazendo a compressão de nomes dos componentes.
   *
   * @param {string} key
   * @return {string}
   */
  minf: function minf(key) {
    if (minify) {
      var arrMatch = key.match(/(-\w[a-zA-Z]+)/g);
      arrMatch ? key.match(/(-\w[a-zA-Z]+)/g).map(function (current) {
        if (Storage.getHtmlDict().indexOf(current.substring(1, key.length)) === -1) {
          key = key.replace(current.substring(1, key.length), 't');
        }
      }) : '';
    }
    return key;
  },


  /**
   * Prepara um container de informações para serem criadas e indexadas.
   *
   * @param {object} data
   * @param {boolean} copy
   * @return {object}
   */
  container: function container(data) {
    var copy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var newProps = data.props;
    if (Object.keys(data).indexOf('key') !== -1 && data['key'] && !copy) newProps = Object.assign({}, newProps, { key: data.key });
    if (Object.keys(data).indexOf('ref') !== -1 && data['ref']) newProps = Object.assign({}, newProps, { ref: data.ref });
    return engine.builder(data.type, newProps ? newProps : null, Object.keys(data.props).indexOf('children') !== -1 ? engine.processChildren(data.props.children, copy) : []);
  },


  /**
   * Processa os filhos de um elemento React para que possam ser mapeados para manipulação.
   *
   * @param {object | array} children
   * @param {boolean} copy
   * @return {object}
   */
  processChildren: function processChildren(children, copy) {
    return children ? children instanceof Array ? children.length > 0 ? children.map(function (arrChild) {
      if (arrChild) return arrChild.type ? engine.container(arrChild, copy) : arrChild;
    }) : null : children.type ? engine.container(children, copy) : children : null;
  },


  /**
   * Processa um elemento React para que possam ser mapeado para manipulação.
   *
   * @param {object} data
   * @param {string} key
   * @param {boolean} copy
   * @return {object}
   */
  processElement: function processElement(data, key) {
    var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var context = arguments[3];

    var obj = engine.setStore(key, data, copy);
    engine.mapChildrens(obj.props.children, key);
    if (context) {
      engine.setContext(key, context);
    }

    return data;
  },


  /**
   * Dispara o update quando uma ação é feita nos componentes
   */
  propagateUpdates: function propagateUpdates(key) {
    var context = engine.getContext(key.split('-')[0]);
    context.update();
  },


  /**
   * Mapeia os filhos processados de um elemento para indexação no repositório.
   *
   * @param {object} data
   * @param {string} key
   */
  mapChildrens: function mapChildrens(data, key) {
    if (data) {
      if (data instanceof Array) {
        for (var index = 0; index < data.length; index++) {
          var current = data[index];
          if (current) {
            if (current.props) engine.mapChildrens(current.props.children, key + '-' + engine.haveTypeName(current.type) + '/' + index);
            if (current.props) engine.putStore(key + '-' + engine.haveTypeName(current.type) + '/' + index, current.key);
          }
        }
      } else {
        if (data.props) engine.mapChildrens(data.props.children, key + '-' + engine.haveTypeName(data.type) + '1');
        if (data.props) engine.putStore(key + '-' + engine.haveTypeName(data.type) + '1', data.key);
      }
    }
  },


  /**
   * Verifica se o tipo do componente já foi inserido no dicionário de tipos, caso não exista ele o insere.
   *
   * @param {string} type
   * @return {string}
   */
  haveTypeName: function haveTypeName(type) {
    if (minify && typeof type === 'string') {
      if (Storage.getHtmlDict().indexOf(type) === -1) Storage.setHtmlDict(type);
    }
    return type.displayName ? type.displayName : type.name ? type.name : type;
  },


  /**
   * Recupera um ID único para uso no mapeamento de elementos.
   * @return {string}
   */
  getId: function getId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '_' + s4() + '_' + s4() + '_' + s4() + '_' + s4() + s4() + s4();
  },


  /**
   * Insere no repositório um elemento react novo
   *
   * @param {string} key
   * @param {object} jsxData
   * @param {boolean} copy
   * @return {object}
   */
  setStore: function setStore(key, jsxData) {
    var copy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return engine.putStore(key, engine.container(jsxData, copy));
  },


  /**
   * Recupera um elemento do repositório para renderização.
   *
   * @param {string} key
   * @return {object}
   */
  getElement: function getElement(key) {
    var supress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    key = engine.minf(key);
    if (engine.checkKey(key, supress)) {
      var temp = engine.getStore(key);
      var keyMaster = temp.props ? temp.key : temp;
      var keyArr = key.split('-');
      if (engine.checkKey(keyArr[0])) {
        var obj = engine.getStore(keyArr[0]);
        return obj.key === keyMaster ? obj : engine.walkChildren(obj.props.children, keyMaster);
      }
    }
  },


  /**
   * Insere o novo objeto de propriedades ao elemento substituindo as antigas propriedades, o elemento será encontrado pela chave informada.
   *
   * @param {string} key
   * @param {object} props
   */
  setProps: function setProps(key, props) {
    if (!key && !(props instanceof Object)) {
      console.log('metodo: setProps - Você precisa especificar uma key em string e um props no formato objeto!');
      return;
    }
    if (engine.checkKey(key)) {
      var tempJsx = engine.getElement(key);
      if (Object.keys(props).indexOf('ref') !== -1) {
        tempJsx = Object.assign({}, tempJsx, { ref: props.ref });
        delete props.ref;
      }
      tempJsx = engine.swapPropsAttr(tempJsx, props);
      engine.updateAllReferences(tempJsx);
    }
  },


  /**
   * Retorna todos os filhos de um elemento recursivamente.
   *
   * @param {object} data
   * @param {string} key
   * @return {array}
   */
  walkChildren: function walkChildren(data, key) {
    var walk = '';
    if (data) {
      if (data instanceof Array) {
        for (var x = 0; x < data.length; x++) {
          if (data[x]) {
            if (data[x].key === key) return data[x];else if (data[x].props) walk = engine.walkChildren(data[x].props.children, key);
            if (walk && walk.key === key) return walk;
          }
        }
      } else {
        if (data.key === key) return data;else if (data.props) walk = engine.walkChildren(data.props.children, key);
        if (walk && walk.key === key) return walk;
      }
    }
    return;
  },


  /**
   * Recupera o elemento por meio de sua chave e realiza uma cópia aplicando a ela uma nova chave.
   *
   * @param {string} key
   * @param {string} newKey
   * @return {object | undefined}
   */
  copy: function copy(key, newKey) {
    engine.checkKey(key) ? engine.processElement(engine.getElement(key), newKey, true) : '';

    return engine.getElement(newKey);
  },


  /**
   * Insere um novo atributo no objeto relacionado a chave informada.
   *
   * @param {string} key
   * @param {object} attributes
   */
  setAttribute: function setAttribute(key, attributes) {
    if (!key && !attributes || !(attributes instanceof Object)) {
      console.log('metodo: setAttributes - Você precisa especificar uma key em string e um atributo no formato objeto!');
      return;
    }
    if (engine.checkKey(key)) {
      var tempJsx = '';
      var updated = '';
      if (attributes.ref) {
        tempJsx = engine.getElement(key);
        updated = Object.assign({}, tempJsx, attributes);
        engine.updateAllReferences(updated);
      } else {
        if (engine.checkProps(key)) {
          tempJsx = engine.getElement(key);
          updated = engine.swapPropsAttr(tempJsx, attributes);
          engine.updateAllReferences(updated);
        }
      }
    }
  },


  /**
   * Reaplica um novo valor ao atributo passado ao objeto por meio da chave informada.
   *
   * @param {string} key
   * @param {object} attValues
   */
  modifyAttribute: function modifyAttribute(key, attValues) {
    var arrObjects = Object.keys(attValues);
    for (var x = 0; x < arrObjects.length; x++) {
      var current = arrObjects[x];
      engine.processModify(key, current, attValues[current]);
    }
  },


  /**
   * Aplica as mudanças nos atributos de acordo com os valores informados.
   *
   * @param {string} key
   * @param {string} atrName
   * @param {object} value
   */
  processModify: function processModify(key, atrName, value) {
    if (!key && !atrName && !value) {
      console.log('metodo: modifyAttribute - Você precisa especificar a key, o nome do atributo e seu valor por parâmetro!');
      return;
    }
    if (engine.checkKey(key)) {
      if (engine.checkProps(key)) {
        if (engine.checkAttribute(key, atrName) || atrName === 'ref') {
          var tempJsx = engine.getElement(key);
          if (atrName === 'ref') {
            var updated = Object.assign({}, tempJsx, { ref: value });
            engine.updateAllReferences(updated);
          } else {
            var tempVar = {};
            tempVar[atrName] = value;
            var _updated = engine.swapPropsAttr(tempJsx, tempVar);
            engine.updateAllReferences(_updated);
          }
        }
      }
    }
  },


  /**
   * Recupera o elemento do repositório e realiza a remoção dos atributos informados.
   *
   * @param {string} key
   * @param {array | string} attValues
   */
  removeAttribute: function removeAttribute(key, attValues) {
    if (attValues instanceof Array) {
      for (var x = 0; x < attValues.length; x++) {
        var current = attValues[x];
        engine.processRemove(key, current);
      }
    } else {
      engine.processRemove(key, attValues);
    }
  },


  /**
   * Aplica a remoção dos atributos de acordo com os valores informados.
   *
   * @param {string} key
   * @param {string} atrName
   */
  processRemove: function processRemove(key, atrName) {
    if (!key && !atrName) {
      console.log('metodo: removeAttribute - Você precisa especificar uma key em string e o nome do atributo a ser removido!');
      return;
    }
    if (engine.checkKey(key)) {
      if (engine.checkProps(key)) {
        var tempJsx = engine.getElement(key);
        if (atrName === 'ref') {
          var updated = Object.assign({}, tempJsx, { ref: null });
          engine.updateAllReferences(updated);
        }
        if (engine.checkAttribute(key, atrName)) {
          var index = Object.keys(tempJsx.props);
          index.splice(index.indexOf(atrName), 1);
          var tempObj = {};
          for (var x = 0; x < index.length; x++) {
            var current = index[x];
            tempObj[current] = tempJsx.props[current];
          }
          var result = Object.assign({}, tempJsx, { props: tempObj });
          engine.updateAllReferences(result);
        }
      }
    }
  },


  /**
   * Realiza a inserção de um elemento filho em um outro elemento especificado pela chave,
   * poderá ser informado o índice onde será inserido o objeto, caso a flag "mergeIndex" for informada o conteúdo será mergeado na fila sem nenhuma
   * remoção dos itens existentes. A fila de elementos será empurrada para acomodar o novo elemento no indice informado.
   *
   * @param {string} key
   * @param {object} childrenVal
   * @param {Number} index
   * @param {boolean} mergeIndex
   */
  setChildren: function setChildren(key, childrenVal) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var mergeIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!key && !childrenVal) {
      console.log('metodo: setChildren - Você precisa especificar a key e um elemento a ser inserido!');
      return;
    }
    if (engine.checkKey(key)) {
      var tempJsx = engine.getElement(key);
      if (engine.checkProps(key)) {
        if (tempJsx.props.children) {
          var arrChild = '';
          if (childrenVal instanceof Array) {
            arrChild = tempJsx.props.children;
            if (!(arrChild instanceof Array)) arrChild = new Array(arrChild);
            var updated = {};
            if (index) {
              var _arrChild, _arrChild2;

              index--;
              if (mergeIndex) (_arrChild = arrChild).splice.apply(_arrChild, [index, 0].concat(_toConsumableArray(childrenVal)));else (_arrChild2 = arrChild).splice.apply(_arrChild2, [index, 1].concat(_toConsumableArray(childrenVal)));
              updated = engine.swapPropsAttr(tempJsx, { children: arrChild });
            } else updated = engine.swapPropsAttr(tempJsx, {
              children: arrChild.concat(childrenVal)
            });
            engine.updateAllReferences(updated);
          } else {
            arrChild = tempJsx.props.children instanceof Array ? tempJsx.props.children : new Array(tempJsx.props.children);
            if (index) {
              index--;
              if (mergeIndex) arrChild.splice(index, 0, childrenVal);else arrChild[index] = childrenVal;
            } else {
              arrChild.push(childrenVal);
            }
            var _updated2 = engine.swapPropsAttr(tempJsx, { children: arrChild });
            engine.updateAllReferences(_updated2);
          }
        } else {
          var _updated3 = engine.swapPropsAttr(tempJsx, { children: childrenVal });
          engine.updateAllReferences(_updated3);
        }
      }
    }
  },


  /**
   * Recupera um elemento pela chave e realiza a remoção do filho especificado pelo índice informado
   * o índice obedece a regra da ordem dos filhos do elemento pai.
   *
   * @param {string} key
   * @param {intger} index
   */
  removeChildren: function removeChildren(key, index) {
    if (index instanceof Array && index !== -1) {
      for (var x = 0; x < index.length; x++) {
        var current = index[x];
        engine.processRemoveChildren(key, current);
      }
    } else if (index === -1) {
      engine.processResetChildren(key);
    } else engine.processRemoveChildren(key, index);
  },


  /**
   * Aplica a remoção do filho de acordo com os valores informados.
   *
   * @param {string} key
   * @param {Number} index
   */
  processRemoveChildren: function processRemoveChildren(key, index) {
    index--;
    if (!key && index) {
      console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada a children e o índice que corresponde a children a ser removida!');
      return;
    }
    if (engine.checkKey(key)) {
      var jsxMaster = engine.getElement(key);
      if (jsxMaster.props.children instanceof Array) {
        var newArr = jsxMaster.props.children.filter(function (current, idx) {
          return index !== idx;
        });
        var updated = engine.swapPropsAttr(jsxMaster, { children: newArr });
        engine.updateAllReferences(updated);
      } else {
        var _updated4 = engine.swapPropsAttr(jsxMaster, { children: null });
        engine.updateAllReferences(_updated4);
      }
    } else console.log('Chave não encontrada!');
  },


  /**
   * Remove todos os filhos de um elemento recuperado pela chave.
   *
   * @param {string} key
   */
  processResetChildren: function processResetChildren(key) {
    if (!key) {
      console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada os childrens !');
      return;
    }
    if (engine.checkKey(key)) {
      var jsxMaster = engine.getElement(key);
      var updated = engine.swapPropsAttr(jsxMaster, { children: null });
      engine.updateAllReferences(updated);
    } else console.log('Chave não encontrada!');
  },


  /**
   * Realiza a atualização das mudanças em todo os elementos do repositório.
   *
   * @param {object} obj
   */
  updateAllReferences: function updateAllReferences(obj) {
    var keys = engine.keys();
    for (var x = 0; x < keys.length; x++) {
      var current = keys[x];
      var tempElement = engine.getStore(current);
      if (tempElement.props) {
        if (tempElement.key !== obj.key) {
          var childrenUpdated = engine.checkChildrensInArray(obj, tempElement);
          engine.processElement(engine.swapPropsAttr(tempElement, {
            children: childrenUpdated
          }), current);
        } else {
          engine.processElement(obj, current);
        }
      }
    }
  },


  /**
   * Verifica e aplica as mudanças nos filhos de um elemento pai.
   *
   * @param {object} mainElement
   * @param {object} currentElement
   * @return {object}
   */
  checkChildrensInArray: function checkChildrensInArray(mainElement, currentElement) {
    if (currentElement && currentElement.props) {
      var childrens = currentElement.props.children;
      var childrenUpdated = [];
      if (childrens && childrens instanceof Array) {
        for (var x = 0; x < childrens.length; x++) {
          var current = childrens[x];
          var nextChildrens = engine.checkChildrensInArray(mainElement, current);
          childrenUpdated = engine.compareChildrens(mainElement, current, childrenUpdated, nextChildrens);
        }
        return childrenUpdated;
      } else if (childrens && childrens.props) {
        var _nextChildrens = engine.checkChildrensInArray(mainElement, childrens);
        childrenUpdated = engine.compareChildrens(mainElement, childrens, childrenUpdated, _nextChildrens);
        return childrenUpdated;
      } else return childrens;
    } else return currentElement;
  },


  /**
   * Verifica se houve alteração no filho encontrado e recupera o filho atualizado.
   *
   * @param {object} mainElement
   * @param {object} current
   * @param {object} childrenUpdated
   * @param {object} nextChildrens
   * @return {object}
   */
  compareChildrens: function compareChildrens(mainElement, current, childrenUpdated, nextChildrens) {
    if (current && current.key && current.key === mainElement.key) {
      childrenUpdated.push(mainElement);
    } else {
      if (current && current.props) childrenUpdated.push(engine.swapPropsAttr(current, { children: nextChildrens }));else childrenUpdated.push(current);
    }
    return childrenUpdated;
  },


  /**
   * Realiza a inserção de novos atributos a um elemento informado.
   *
   * @param {object} obj
   * @param {object} newAttr
   * @return {object}
   */
  swapPropsAttr: function swapPropsAttr(obj, newAttr) {
    var tempProps = Object.assign({}, obj.props, newAttr);
    var assigned = Object.assign({}, obj, { props: tempProps });
    assigned['__proto__'] = obj['__proto__'];
    return assigned;
  },


  /**
   * Verifica se existe algum item no repositório relacionado a chave informada.
   *
   * @param {string} key
   * @return {boolean}
   */
  checkKey: function checkKey(key) {
    var supress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var hasKey = engine.keys().indexOf(key) === -1 ? false : true;

    if (!hasKey && !supress) {
      console.error('this key "' + key + '" was not found, see the available keys: ' + engine.keys());
    }
    return hasKey;
  },


  /**
   * Verifica se o elemento relacionado a chave informada contém propriedades.
   *
   * @param {string} key
   * @return {boolean}
   */
  checkProps: function checkProps(key) {
    return engine.checkKey(key) ? Object.keys(engine.getElement(key)).indexOf('props') === -1 ? false : true : false;
  },


  /**
   * Verifica se o elemento relacionado a chave informada contém o atributo indicado.
   *
   * @param {string} key
   * @param {string} atrName
   * @return {boolean}
   */
  checkAttribute: function checkAttribute(key, atrName) {
    return engine.checkKey(key) ? engine.checkProps(key) ? Object.keys(engine.getElement(key).props).indexOf(atrName) === -1 ? false : true : false : false;
  }
};

var bridge = {
  getElement: function getElement(key) {
    return engine.getElement(key);
  },
  copy: function copy(key, newKey) {
    if (!key || !newKey) {
      console.error('For cloning you must enter:an existing key and a new key');
      return;
    }

    return engine.copy(key, newKey);
  },
  keys: function keys() {
    return engine.keys();
  },
  setAttribute: function setAttribute(key, attributes) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    engine.setAttribute(key, attributes);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  setProps: function setProps(key, props) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    engine.setProps(key, props);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  modifyAttribute: function modifyAttribute(key, value) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    engine.modifyAttribute(key, value);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  removeAttribute: function removeAttribute(key, atrName) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    engine.removeAttribute(key, atrName);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  setChildren: function setChildren(key, children) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var mergeIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var preventUpdate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    engine.setChildren(key, children, index, mergeIndex);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  removeChildren: function removeChildren(key, index) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    engine.removeChildren(key, index);
    if (!preventUpdate) engine.propagateUpdates(key);
  },
  checkAttribute: function checkAttribute(key, atrName) {
    var preventUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return engine.checkAttribute(key, atrName);
  },
  stagePush: function stagePush(key, path, props) {
    var actions = Storage.getStore('state_path_' + key);
    actions.push(path, props);
  },
  stageBack: function stageBack(key, props) {
    var actions = Storage.getStore('state_path_' + key);
    actions.back(props);
  },
  stageForward: function stageForward(key, props) {
    var actions = Storage.getStore('state_path_' + key);
    actions.forward(props);
  },
  stageReset: function stageReset(key, props) {
    var actions = Storage.getStore('state_path_' + key);
    actions.reset(props);
  },
  destroy: function destroy(keys) {
    engine.destroy(keys);
  }
};

var Staff = exports.Staff = bridge;
var Stage = exports.Stage = stage;
var Scene = exports.Scene = scene;
var Actor = exports.Actor = actor;
var Theatrum = exports.Theatrum = theatrum;