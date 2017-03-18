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
  /*test*/


  _createClass(Bridge, [{
    key: 'getMyKey',
    value: function getMyKey() {
      return this.key;
    }
    /*ok*/

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.instance.getElement(this.key);
    }
    /*ok*/

  }, {
    key: 'copy',
    value: function copy(newKey) {
      return this.instance.copy(this.key, newKey);
    }
    /*ok*/

  }, {
    key: 'setAttribute',
    value: function setAttribute(attributes) {
      this.instance.setAttribute(this.key, attributes);
      return this;
    }
    /*ok*/

  }, {
    key: 'setProps',
    value: function setProps(props) {
      this.instance.setProps(this.key, props);
      return this;
    }
    /*ok*/

  }, {
    key: 'modifyAttribute',
    value: function modifyAttribute(value) {
      this.instance.modifyAttribute(this.key, value);
      return this;
    }
    /*ok*/

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(atrName) {
      this.instance.removeAttribute(this.key, atrName);
      return this;
    }
    /*ok*/

  }, {
    key: 'setChildren',
    value: function setChildren(children) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var mergeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.instance.setChildren(this.key, children, index, mergeIndex);
      return this;
    }
    /*ok*/

  }, {
    key: 'removeChildren',
    value: function removeChildren(index) {
      this.instance.removeChildren(this.key, index);
      return this;
    }
    /*test*/

  }, {
    key: 'checkAttribute',
    value: function checkAttribute(atrName) {
      return this.instance.checkAttribute(this.key, atrName);
    }
    /*ok*/

  }, {
    key: 'manipulateCopy',
    value: function manipulateCopy(newKey) {
      return this.instance.manipulateCopy(this.key, newKey);
    }
    /*ok*/

  }, {
    key: 'manipulate',
    value: function manipulate(key) {
      this.key = this.instance.minf(key);
      return this;
    }
    /*ok*/

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