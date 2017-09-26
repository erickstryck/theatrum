import deathStar from './DeathStar';
export default class Bridge {
  constructor(key) {
    this.instance = deathStar.getInstance();
    this.key = this.instance.minf(key);
  }
  /**
   * Retorna a chave relacionada a manipulação corrente
   * 
   * @return {string}
   */
  getMyKey() {
    return this.key;
  }

  /**
   * Recupera o elemento relacionado a chave deste manipulador para renderização
   * 
   * @return {object}
   */
  getElement() {
    return this.instance.getElement(this.key);
  }

  /**
   * Recupera o elemento relacionado a chave deste manipulador e realiza a cópia do mesmo por meio da nova chave
   * 
   * @param {string} newKey
   * @return {object | undefined}
   */
  copy(newKey) {
    return this.instance.copy(this.key, newKey);
  }

  /**
   * Insere novos atributos no objeto relacionado a chave deste manipulador.
   * Return manipulador
   * 
   * @param {object} attributes
   * @return {object}
   */
  setAttribute(attributes) {
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
  setProps(props) {
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
  modifyAttribute(value) {
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
  removeAttribute(atrName) {
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
  setChildren(children, index = '', mergeIndex = false) {
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
  removeChildren(index) {
    this.instance.removeChildren(this.key, index);
    return this;
  }

  /**
   * Verifica se o elemento relacionado a chave deste manipulador contém o atributo indicado.
   * 
   * @param {string} atrName
   * @return {boolean} 
   */
  checkAttribute(atrName) {
    return this.instance.checkAttribute(this.key, atrName);
  }

  /**
   * Recupera o elemento React relacionado a chave deste manipulador, cria uma cópia com a nova chave e o disponibiliza para manipulação.
   * 
   * @param {string} newKey
   * @return {object}
   */
  manipulateCopy(newKey) {
    return this.instance.manipulateCopy(this.key, newKey);
  }

  /**
   * Carrega este manipulador de elemento com a nova chave informada
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
