'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DeathStar = require('./DeathStar');

var _DeathStar2 = _interopRequireDefault(_DeathStar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bridge = function () {
  function Bridge(key) {
    _classCallCheck(this, Bridge);

    this.instance = _DeathStar2.default.getInstance();
    this.key = this.instance.minf(key);
  }
  /**
   * Retorna a chave relacionada a manipulação corrente
   * 
   * @return {string}
   */


  _createClass(Bridge, [{
    key: 'getMyKey',
    value: function getMyKey() {
      return this.key;
    }

    /**
     * Recupera o elemento relacionado a chave deste manipulador para renderização
     * 
     * @return {object}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.instance.getElement(this.key);
    }

    /**
     * Recupera o elemento relacionado a chave deste manipulador e realiza a cópia do mesmo por meio da nova chave
     * 
     * @param {string} newKey
     * @return {object | undefined}
     */

  }, {
    key: 'copy',
    value: function copy(newKey) {
      return this.instance.copy(this.key, newKey);
    }

    /**
     * Insere novos atributos no objeto relacionado a chave deste manipulador.
     * Return manipulador
     * 
     * @param {object} attributes
     * @return {object}
     */

  }, {
    key: 'setAttribute',
    value: function setAttribute(attributes) {
      this.instance.setAttribute(this.key, attributes);
      return this;
    }

    /**
     * Recupera do repositório e insere um novo Props no elemento relacionado a chave deste manipulador.
     * Return manipulador
     * 
     * @param {object} props
     * @return {object}
     */

  }, {
    key: 'setProps',
    value: function setProps(props) {
      this.instance.setProps(this.key, props);
      return this;
    }

    /**
     * Reaplica um novo valor ao atributo passado ao objeto relacionado a chave deste manipulador.
     * Return manipulador
     * 
     * @param {object} value
     * @return {object}
     */

  }, {
    key: 'modifyAttribute',
    value: function modifyAttribute(value) {
      this.instance.modifyAttribute(this.key, value);
      return this;
    }

    /**
     * Recupera o elemento do repositório relacionado a chave deste manipulador e realiza a remoção dos atributos informados
     * Return manipulador
     * 
     * @param {string} atrName
     * @return {object}
     */

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(atrName) {
      this.instance.removeAttribute(this.key, atrName);
      return this;
    }

    /**
     * Realiza a inserção de um elemento filho em um outro elemento especificado relacionado a chave deste manipulador.
     * Return manipulador
     * 
     * @param {object} children 
     * @param {integer} index 
     * @param {boolean} mergeIndex
     * @return {object}
     */

  }, {
    key: 'setChildren',
    value: function setChildren(children) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var mergeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.instance.setChildren(this.key, children, index, mergeIndex);
      return this;
    }

    /**
     * Recupera um elemento relacionado a chave deste manipulador e realiza a remoção do filho especificado pela índice informado.
     * o índice obedece a regra da ordem dos filhos do elemento pai.
     * Return manipulador
     * 
     * @param {integer} index
     * @return {object}
     */

  }, {
    key: 'removeChildren',
    value: function removeChildren(index) {
      this.instance.removeChildren(this.key, index);
      return this;
    }

    /**
     * Verifica se o elemento relacionado a chave deste manipulador contém o atributo indicado.
     * 
     * @param {string} atrName
     * @return {boolean} 
     */

  }, {
    key: 'checkAttribute',
    value: function checkAttribute(atrName) {
      return this.instance.checkAttribute(this.key, atrName);
    }

    /**
     * Recupera o elemento React relacionado a chave deste manipulador, cria uma cópia com a nova chave e o disponibiliza para manipulação.
     * 
     * @param {string} newKey
     * @return {object}
     */

  }, {
    key: 'manipulateCopy',
    value: function manipulateCopy(newKey) {
      return this.instance.manipulateCopy(this.key, newKey);
    }

    /**
     * Carrega este manipulador de elemento com a nova chave informada
     * Return manipulador
     * 
     * @param {string} key 
     * @return {object}
     */

  }, {
    key: 'manipulate',
    value: function manipulate(key) {
      this.key = this.instance.minf(key);
      return this;
    }

    /**
     * Destrói os elementos React do repositório por meio da lista de Arrays informados.
     * Return manipulador
     * 
     * @param {array | string} keys
     * @return {object}
     */

  }, {
    key: 'destroy',
    value: function destroy(keys) {
      this.instance.destroy(keys);
      return this;
    }
  }]);

  return Bridge;
}();

exports.default = Bridge;