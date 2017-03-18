import Bridge from './Bridge';
import ninf from '../minify.conf';

let instance='';

export default class DeathStar {
  constructor(react) {
    this.createElement=react.createElement;
    this.storage={};
    this.setStore.bind(this);
    this.checkKey.bind(this);
    this.htmlDict=[];
    this.minify=ninf.minify;
    this.minf.bind(this);
    this.builder.bind(this);
    this.putStore.bind(this);
    this.getStore.bind(this);
    this.deleteStore.bind(this);
    this.keys.bind(this);
  }
  /*done*/
  static getInstance(react) {
    if(instance) {
      return instance;
    } else {
      instance=new DeathStar(react);
      return instance;
    }
  }

  /*done*/
  builder(type, props, children) {
    if(children && children.length===0)children=null;
    props=props.children?Object.assign({},props,{children:null}):props;
    props=(Object.keys(props).indexOf('key')!== -1)?Object.assign({},props,{key:props.key}):Object.assign({},props,{key:this.getId()});
    return this.createElement(type, props, children);
  }

  /*done*/
  clearBus() {
    this.storage={};
  }

  /*done*/
  putStore(key,value,context){
    if(context){
      value['deathStartUpdater']=()=>{value.forceUpdate();};
      let temp={};
      Object.keys(value).map((current)=>{
        if(typeof(value[current])=== 'function'){
          temp[current]=value[current];
        }
      });
      temp['state']=value.state;
      this.storage[key]=temp;
    }else{
      this.storage[key]=value;
      return value;
    }
  }
  /*done*/
  getStore(key){
    return this.storage[key];
  }
  /*done*/
  deleteStore(key){
    delete this.storage[key];
  }
  /*done*/
  keys(){
    return Object.keys(this.storage);
  }
  /*done*/
  destroy(keys) {
    if(keys instanceof Array) {
      let store=this.keys();
      keys.map((currentItem)=>{
        store.map((currentStore)=>{
          if(currentStore.split('-')[0]===currentItem) {
            this.deleteStore(currentItem);
          }
        },this);
      },this);
    } else {
      let store=this.keys();
      store.map((currentStore)=>{
        if(currentStore.split('-')[0]===keys) {
          this.deleteStore(currentStore);
        }
      },this);
    }
  }

  /*TESTE*/
  minf(key){
    if(this.minify){
      key.match(/(-\w[a-zA-Z]+)/g)?key.match(/(-\w[a-zA-Z]+)/g).map((current)=>{
          if(this.htmlDict.indexOf(current.substring(1,key.length))===-1){
            key=key.replace(current.substring(1,key.length),"t");
          }
      }):"";
    }
    return key;
  }

  /*done*/
  container(data,copy=false) {
    let newProps=data.props;
    if(Object.keys(data).indexOf('key')!== -1 && data['key'] && !copy)newProps=Object.assign({},newProps,{key:data.key});
    if(Object.keys(data).indexOf('ref')!== -1 && data['ref'])newProps=Object.assign({},newProps,{ref:data.ref});
    return this.builder(data.type,newProps?newProps:null,Object.keys(data.props).indexOf('children')!== -1?this.processChildren(data.props.children,copy):[]);
  }

  /*done*/
  processChildren(children,copy) {
    return children?children instanceof Array?children.length>0?children.map(function(arrChild) {
      if(arrChild)return arrChild.type?this.container(arrChild,copy):arrChild;
    },this):null:children.type?this.container(children,copy):children:null;
  }

  /*done*/
  processElement(data,key,copy=false) {
    let obj=this.setStore(key,data,copy);
    this.mapChildrens(obj.props.children,key);
    return this.manipulate(key);
  }

  /*done*/
  mapChildrens(data,key) {
    if(data) {
      if(data instanceof Array) {
        data.map(function(current,index) {
          if(current) {
            ++index;
            if(current.props)this.mapChildrens(current.props.children,key+'-'+this.haveTypeName(current.type)+index);
            if(current.props)this.putStore(key+'-'+this.haveTypeName(current.type)+index,current.key);
          }
        },this);
      } else {
        if(data.props)this.mapChildrens(data.props.children,key+'-'+this.haveTypeName(data.type)+'1');
        if(data.props)this.putStore(key+'-'+this.haveTypeName(data.type)+'1',data.key);
      }
    }
  }
  /*done*/
  haveTypeName(type) {
    if(this.minify && typeof type === 'string'){
        if(this.htmlDict.indexOf(type)===-1)this.htmlDict.push(type);
    }
    return type.displayName?type.displayName:type.name?type.name:type;
  }

  /*done*/
  getId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '_' + s4() + '_' + s4() + '_' +
    s4() + '_' + s4() + s4() + s4();
  }

  /*done*/
  setStore(key,jsxData,copy=false) {
    return this.putStore(key,this.container(jsxData,copy));
  }

  /*ok*/
  manipulate(key) {
    key=this.minf(key);
    return this.checkKey(key)?new Bridge(key):'';
  }

  /*ok*/
  manipulateCopy(key,newKey) {
    key=this.minf(key);
    return this.manipulate(key).copy(newKey);
  }

  /*done*/
  getElement(key) {
    key=this.minf(key);
    if(this.checkKey(key)) {
      let temp=this.getStore(key);
      let keyMaster=temp.props?temp.key:temp;
      let keyArr=key.split('-');
      if(this.checkKey(keyArr[0])) {
        let obj=this.getStore(keyArr[0]);
        return obj.key===keyMaster?obj:this.walkChildren(obj.props.children,keyMaster);
      }
    }
  }

  /*done*/
  setProps(key,props) {

    if(!key && !(props instanceof Object)) {
      console.log('metodo: setProps - Você precisa especificar uma key em string e um props no formato objeto!');
      return;
    }
    if(this.checkKey(key)) {
      let tempJsx=this.getElement(key);
      if(Object.keys(props).indexOf('ref')!==-1) {
        tempJsx=Object.assign({},tempJsx,{ref:props.ref});
        delete props.ref;
      }
      tempJsx=this.swapPropsAttr(tempJsx,props);
      this.updateAllReferences(tempJsx);
    }
  }

  /*done*/
  walkChildren(data,key) {
    let walk='';
    if(data) {
      if(data instanceof Array) {
        for(let x = 0; x < data.length; x++) {
          if(data[x]) {
            if(data[x].key===key)return data[x];
            else if(data[x].props)walk=this.walkChildren(data[x].props.children,key);
            if(walk && walk.key===key)return walk;
          }
        }
      } else {
        if(data.key===key)return data;
        else if(data.props)walk=this.walkChildren(data.props.children,key);
        if(walk && walk.key===key)return walk;
      }
    }return;
  }

  /*done*/
  copy(key,keyNew) {
    return this.checkKey(key)?this.processElement(this.getElement(key),keyNew,true):'';
  }

  /*done*/
  setAttribute(key,attributes) {
    if(!key && !attributes || !(attributes instanceof Object)) {
      console.log('metodo: setAttributes - Você precisa especificar uma key em string e um atributo no formato objeto!');
      return;
    }
    if(this.checkKey(key)) {
      if(attributes.ref) {
        let tempJsx=this.getElement(key);
        let updated=Object.assign({},tempJsx,attributes);
        this.updateAllReferences(updated);
      } else {
        if(this.checkProps(key)) {
          let tempJsx=this.getElement(key);
          let updated=this.swapPropsAttr(tempJsx,attributes);
          this.updateAllReferences(updated);
        }
      }
    }
  }

  /*done*/
  modifyAttribute(key,attValues) {
    Object.keys(attValues).map((current)=>{
      this.processModify(key,current,attValues[current]);
    },this);
  }

  /*done*/
  processModify(key,atrName,value) {
    if(!key && !atrName && !value) {
      console.log('metodo: modifyAttribute - Você precisa especificar a key, o nome do atributo e seu valor por parâmetro!');
      return;
    }
    if(this.checkKey(key)) {
      if(this.checkProps(key)) {
        if(this.checkAttribute(key,atrName) || atrName==='ref') {
          let tempJsx=this.getElement(key);
          if(atrName==='ref') {
            let updated=Object.assign({},tempJsx,{ref:value});
            this.updateAllReferences(updated);
          } else {
            let tempVar={};
            tempVar[atrName]=value;
            let updated=this.swapPropsAttr(tempJsx,tempVar);
            this.updateAllReferences(updated);
          }
        }
      }
    }
  }

  /*done*/
  removeAttribute(key,attValues) {
    if(attValues instanceof Array) {
      attValues.map((current)=>{
        this.processRemove(key,current);
      },this);
    } else {
      this.processRemove(key,attValues);
    }
  }

  /*done*/
  processRemove(key,atrName) {
    if(!key && !atrName) {
      console.log('metodo: removeAttribute - Você precisa especificar uma key em string e o nome do atributo a ser removido!');
      return;
    }
    if(this.checkKey(key)) {
      if(this.checkProps(key)) {
        let tempJsx=this.getElement(key);
        if(atrName==='ref') {
          let updated=Object.assign({},tempJsx,{ref:null});
          this.updateAllReferences(updated);
        }
        if(this.checkAttribute(key,atrName)) {
          let index=Object.keys(tempJsx.props);
          index.splice(index.indexOf(atrName),1);
          let tempObj={};
          index.map((current)=>{
            tempObj[current]=tempJsx.props[current];
          });
          let result=Object.assign({},tempJsx,{props:tempObj});
          this.updateAllReferences(result);
        }
      }
    }
  }

  /*done*/
  setChildren(key,childrenVal,index='',mergeIndex=false) {
    if(!key && !childrenVal) {
      console.log('metodo: setChildren - Você precisa especificar a key e um elemento a ser inserido!');
      return;
    }
    if(this.checkKey(key)) {
      let tempJsx=this.getElement(key);
      if(this.checkProps(key)) {
        if(tempJsx.props.children) {
          if(childrenVal instanceof Array) {
            let arrChild=tempJsx.props.children;
            if(!(arrChild instanceof Array))arrChild=new Array(arrChild);
            let updated={};
            if(index) {
              index--;
              if(mergeIndex)arrChild.splice(index,0,...childrenVal);
              else arrChild.splice(index,1,...childrenVal);
              updated=this.swapPropsAttr(tempJsx,{children:arrChild});
            }else updated=this.swapPropsAttr(tempJsx,{children:arrChild.concat(childrenVal)});
            this.updateAllReferences(updated);
          } else {
            let arrChild=tempJsx.props.children instanceof Array?tempJsx.props.children:new Array(tempJsx.props.children);
            if(index) {
              index--;
              if(mergeIndex)arrChild.splice(index,0,childrenVal);
              else arrChild[index]=childrenVal;
            } else {
              arrChild.push(childrenVal);
            }
            let updated=this.swapPropsAttr(tempJsx,{children:arrChild});
            this.updateAllReferences(updated);
          }
        } else {
          let updated=this.swapPropsAttr(tempJsx,{children:childrenVal});
          this.updateAllReferences(updated);
        }
      }
    }
  }

  /*done*/
  removeChildren(key,index) {
    if(index instanceof Array && index!==-1) {
      index.map((current)=>{
        this.processRemoveChildren(key,current);
      },this);
    } else if(index===-1) {
      this.processResetChildren(key);
    } else this.processRemoveChildren(key,index);
  }

  /*done*/
  processRemoveChildren(key,index) {
    index--;
    if(!key && index) {
      console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada a children e o índice que corresponde a children a ser removida!');
      return;
    }
    if(this.checkKey(key)) {
      let jsxMaster=this.getElement(key);
      if(jsxMaster.props.children instanceof Array) {
        let newArr=jsxMaster.props.children.filter((current,idx)=>index!==idx);
        let updated=this.swapPropsAttr(jsxMaster,{children:newArr});
        this.updateAllReferences(updated);
      } else {
        let updated=this.swapPropsAttr(jsxMaster,{children:null});
        this.updateAllReferences(updated);
      }
    }else console.log('Chave não encontrada!');
  }

  /*done*/
  processResetChildren(key) {
    if(!key) {
      console.log('metodo: removeChildren - Você precisa especificar a key onde será retirada os childrens !');
      return;
    }
    if(this.checkKey(key)) {
      let jsxMaster=this.getElement(key);
      let updated=this.swapPropsAttr(jsxMaster,{children:null});
      this.updateAllReferences(updated);
    } else console.log('Chave não encontrada!');
}

/*done*/
updateAllReferences(obj) {

  let keys=this.keys();
  keys.map(function(current) {
    let tempElement=this.getStore(current);
    if(tempElement.props) {
      if(tempElement.key!==obj.key) {
        let childrenUpdated=this.checkChildrensInArray(obj,tempElement);
        this.putStore(current,this.processElement(this.swapPropsAttr(tempElement,{children:childrenUpdated}),current).getElement());
      } else this.putStore(current,this.processElement(obj,current).getElement());
    }
  },this);
}

/*done*/
checkChildrensInArray(mainElement,currentElement) {

  if(currentElement && currentElement.props) {
    let childrens=currentElement.props.children;
    let childrenUpdated=[];
    if(childrens && childrens instanceof Array) {
      childrens.map(function(current) {
        let nextChildrens=this.checkChildrensInArray(mainElement,current);
        childrenUpdated=this.compareChildrens(mainElement,current,childrenUpdated,nextChildrens);
      },this);
      return childrenUpdated;
    }else if(childrens && childrens.props) {
      let nextChildrens=this.checkChildrensInArray(mainElement,childrens);
      childrenUpdated=this.compareChildrens(mainElement,childrens,childrenUpdated,nextChildrens);
      return childrenUpdated;
    }else return childrens;
  }else return currentElement;
}

/*done*/
compareChildrens(mainElement,current,childrenUpdated,nextChildrens) {
  if(current && current.key && current.key===mainElement.key) {
    childrenUpdated.push(mainElement);
  } else {
    if(current && current.props)childrenUpdated.push(this.swapPropsAttr(current,{children:nextChildrens}));
    else childrenUpdated.push(current);
  }
  return childrenUpdated;
}

/*done*/
swapPropsAttr(obj,newAttr) {
  let tempProps=Object.assign({},obj.props,newAttr);
  return Object.assign({},obj,{props:tempProps});
}

/*done*/
checkKey(key) {
  return this.keys().indexOf(key)=== -1?false:true;
}

/*done*/
checkProps(key) {
  return this.checkKey(key)?Object.keys(this.getElement(key)).indexOf('props')===-1?false:true:false;
}

/*done*/
checkAttribute(key,atrName) {
  return this.checkKey(key)?this.checkProps(key)?Object.keys(this.getElement(key).props).indexOf(atrName)===-1?false:true:false:false;
}

}
