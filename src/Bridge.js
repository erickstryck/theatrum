import deathStar from './DeathStar';
export default class Bridge {
    constructor(key) {
      this.instance=deathStar.getInstance();
      this.key=this.instance.minf(key);
    }
    /*test*/
    getMyKey() {
      return this.key;
    }
    /*ok*/
    getElement() {
      return this.instance.getElement(this.key);
    }
    /*ok*/
    copy(newKey) {
      return this.instance.copy(this.key,newKey);
    }
    /*ok*/
    setAttribute(attributes) {
      this.instance.setAttribute(this.key,attributes);
      return this;
    }
    /*ok*/
    setProps(props) {
      this.instance.setProps(this.key,props);
      return this;
    }
    /*ok*/
    modifyAttribute(value) {
      this.instance.modifyAttribute(this.key,value);
      return this;
    }
    /*ok*/
    removeAttribute(atrName) {
      this.instance.removeAttribute(this.key,atrName);
      return this;
    }
    /*ok*/
    setChildren(children,index='',mergeIndex=false) {
      this.instance.setChildren(this.key,children,index,mergeIndex);
      return this;
    }
    /*ok*/
    removeChildren(index) {
      this.instance.removeChildren(this.key,index);
      return this;
    }
    /*test*/
    checkAttribute(atrName) {
      return this.instance.checkAttribute(this.key,atrName);
    }
    /*ok*/
    manipulateCopy(newKey) {
      return this.instance.manipulateCopy(this.key,newKey);
    }
    /*ok*/
    manipulate(key){
      this.key=this.instance.minf(key);
      return this;
    }
    /*ok*/
    destroy(keys) {
      this.instance.destroy(keys);
      return this;
    }
}
