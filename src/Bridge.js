import deathStar from './DeathStar';
export default class Bridge {

  /**
   * Representa a classe de ponte para manipulação dos elementos.
   * @constructor
   * 
   * @param {string} key 
   */
  constructor(key) {
    this.instance = deathStar.getInstance();
    this.key = this.instance.minf(key);
  }
  /**
   * Função de ponte de Manipulação.
   * Retorna a chave relacionada a manipulação corrente.
   * 
   * @return {string}
   */
  getMyKey() {
    return this.key;
  }

  /**
   * Função de ponte de Manipulação.
   * Recupera o elemento relacionado a chave deste manipulador para renderização.
   * 
   * @return {object}
   */
  getElement() {
    return this.instance.getElement(this.key);
  }

  /**
   * Função de ponte de Manipulação.
   * Recupera o elemento por meio de sua chave e realiza uma cópia aplicando a ela uma nova chave.
   * 
   * @param {string} newKey
   * @return {object | undefined}
   */
  copy(newKey) {
    return this.instance.copy(this.key, newKey);
  }

  /**
   * Função de ponte de Manipulação.
   * Insere novos atributos no objeto relacionado a chave deste manipulador.
   * Return manipulador
   * 
   * @param {object} attributes
   * @param {boolean} update
   * @return {object}
   */
  setAttribute(attributes, update = false) {
    this.instance.setAttribute(this.key, attributes);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Insere o novo objeto de propriedades ao elemento substituindo as antigas propriedades, o elemento será encontrado pela chave deste manipulador.
   * Return manipulador
   * 
   * @param {object} props
   * @param {boolean} update
   * @return {object}
   */
  setProps(props, update = false) {
    this.instance.setProps(this.key, props);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Reaplica um novo valor ao atributo passado ao objeto relacionado a chave deste manipulador.
   * Return manipulador
   * 
   * @param {object} value
   * @param {boolean} update
   * @return {object}
   */
  modifyAttribute(value, update = false) {
    this.instance.modifyAttribute(this.key, value);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Recupera o elemento do repositório relacionado a chave deste manipulador e realiza a remoção dos atributos informados.
   * Return manipulador
   * 
   * @param {string} atrName
   * @param {boolean} update
   * @return {object}
   */
  removeAttribute(atrName, update = false) {
    this.instance.removeAttribute(this.key, atrName);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Realiza a inserção de um elemento filho em um outro elemento especificado pela chave, 
   * poderá ser informado o índice onde será inserido o objeto, caso a flag "mergeIndex" for informada o conteúdo será mergeado na fila sem nenhuma
   * remoção dos itens existentes. A fila de elementos será empurrada para acomodar o novo elemento no indice informado.
   * Return manipulador
   * 
   * @param {object} children
   * @param {Number} index 
   * @param {boolean} mergeIndex
   * @param {boolean} update
   * @return {object}
   */
  setChildren(children, index = '', mergeIndex = false, update = false) {
    this.instance.setChildren(this.key, children, index, mergeIndex);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Recupera um elemento relacionado a chave deste manipulador e realiza a remoção do filho especificado pela índice informado
   * o índice obedece a regra da ordem dos filhos do elemento pai.
   * Return manipulador
   * 
   * @param {Number} index
   * @param {boolean} update
   * @return {object}
   */
  removeChildren(index, update = false) {
    this.instance.removeChildren(this.key, index);
    if (update) {
      let context = this.instance.getContext(this.key);
      context.update();
    }
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Verifica se o elemento relacionado a chave deste manipulador contém o atributo indicado.
   * 
   * @param {string} atrName
   * @return {boolean} 
   */
  checkAttribute(atrName) {
    return this.instance.checkAttribute(this.key, atrName);
  }

  /**
   * Função de ponte de Manipulação.
   * Recupera o elemento React relacionado a chave deste manipulador, cria uma cópia com a nova chave e o disponibiliza para manipulação.
   * 
   * @param {string} newKey
   * @return {object}
   */
  manipulateCopy(newKey) {
    return this.instance.manipulateCopy(this.key, newKey);
  }

  /**
   * Função de ponte de Manipulação.
   * Carrega este manipulador de elemento com a nova chave informada.
   * Return manipulador
   * 
   * @param {string} key 
   * @return {object}
   */
  manipulate(key) {
    this.key = this.instance.minf(key);
    return this;
  }

  /**
   * Função de ponte de Manipulação.
   * Destrói os elementos React do repositório por meio da lista de Arrays informados.
   * Return manipulador
   * 
   * @param {array | string} keys
   * @return {object}
   */
  destroy(keys) {
    this.instance.destroy(keys);
    return this;
  }
}
