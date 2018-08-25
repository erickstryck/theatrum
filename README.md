# React DeathStar

Esta biblioteca foi desenvolvida para facilitar a manipulação de elementos do React, com ela você poderá modificar atributos, componentes, contextos de forma dinâmica, facilitando a construção de projetos que necessitam de uma agressiva iteração entre componentes. Seu funcionamento é similar a um grande armazém auto gerenciavel de componentes.

## Instalação

Você poderá baixar a biblioteca pelo repositório NPM, se desejar poderá baixar este projeto e importar o arquivo minificado que está na pasta de distribuição.

### Inicialização

A biblioteca suporta o react 15.^, a biblioteca não vem com react embarcado em si, o react é passado de seu projeto para a biblioteca por meio de um singleton, abaixo você pode ver um exemplo de como iniciar a biblioteca em seu projeto.

```
import React, { Component } from 'react';
import DeathStar from 'react-deathStar';

export default class MyProject extends Component {

  /**
   * Construtor da classe
   */
  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
  }

  /* code here */
}

```
Após iniciada uma vez o singleton garante que a intância da biblioteca terá a versão do React de seu projeto e assim funcionará corretamente.

## Utilizando a biblioteca

Abaixo você terá exemplos de uso da biblioteca.

### Função processElement

Após iniciar a biblioteca como no exemplo anterior vamos começar a mapear os componentes a serem gerenciados, a biblioteca trabalha com JSX, então os componentes podem ser escritos diretamente na entrada de parametro no formato de marcação. Ex:

```
import React, { Component } from 'react';
import DeathStar from 'react-deathStar';

export default class MyProject extends Component {

  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
    this.processElements = this.processElements.bind(this);
  }

  processElements(){
      this.deathStar.processElement(
          <div className="test">
            <span className="colorRed">1</span>
            <span className="colorBlue">2</span>
            <span className="colorGreen">3</span>
            <span className="colorYellow">4</span>
            <span className="colorBlack">5</span>
            <span className="colorOrange">6</span>
        </div>, "ComponenteDiv");
  }
}

```
No exemplo acima foi processado, mapeado e armazenado todoo o componente 'div' incluindo seus filhos, a função 'processElement' necessita que se passe uma chave
única para recuperar o componente posteriormente, caso insira chaves repetidas o conteúdo será substituído a cada processamento. A função processElements retorna um manipulador, mais adiante será mostrado seu uso.

### Função getElement

No exemplo anterior mapeamos um componente e seus filhos, agora podemos recuperar esse componente para renderização ou qualquer outra ação por meio da função 'getElement', essa função busca em nosso armazem de componentes a 'div' mapeada, é necessário passar a chave única utilizada para o mapeamento. Ex:

```
import React, { Component } from 'react';
import DeathStar from 'react-deathStar';

export default class MyProject extends Component {

  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
    this.processElements = this.processElements.bind(this);
  }

  processElements(){
      this.deathStar.processElement(
          <div className="test">
            <span className="colorRed">1</span>
            <span className="colorBlue">2</span>
            <span className="colorGreen">3</span>
            <span className="colorYellow">4</span>
            <span className="colorBlack">5</span>
            <span className="colorOrange">6</span>
        </div>, "ComponenteDiv");
  }

  render() {
      return (this.deathStar.getElement("ComponenteDiv"));
  }
}

```
No exemplo acima o componente foi enderizado após ser recuperado pela chave.

### Função manipulate

Já mapeamos e recuperamos um componente por meio da biblioteca, agora estamos prontos para manipular esse componente a nossa necessidade, a bibiloteca pussui uma função de manipulação que nos possibilita utilizar todas as outras funções, você deve informar a chave única do elemento a ser recuperado para manipulação. Ex:

```
import React, { Component } from 'react';
import DeathStar from 'react-deathStar';

export default class MyProject extends Component {

  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
    this.processElements = this.processElements.bind(this);
    this.manipulateElement = this.manipulateElement.bind(this);
  }

  processElements(){
      this.deathStar.processElement(
          <div className="test">
            <span className="colorRed">1</span>
            <span className="colorBlue">2</span>
            <span className="colorGreen">3</span>
            <span className="colorYellow">4</span>
            <span className="colorBlack">5</span>
            <span className="colorOrange">6</span>
        </div>, "ComponenteDiv");
  }

  manipulateElement(){
    let manipulateDiv = this.deathStar.manipulate("ComponenteDiv");
  }

  render() {
      return (this.deathStar.getElement("ComponenteDiv"));
  }
}

```

No exemplo acima temos um manipulador do elemento na variável 'manipulateDiv', por meio dela poderemos utilizar as funções de manipulação de nosso elemento.
A função 'processElement' retorna um manipulador do elemento mapeado, caso deseje poderá manipular o componente recém mapeado. Ex:

```
import React, { Component } from 'react';
import DeathStar from 'react-deathStar';

export default class MyProject extends Component {

  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
    this.processElements = this.processElements.bind(this);
    this.manipulateElement = this.manipulateElement.bind(this);
  }

  processElements(){
     let manipulateDiv = this.deathStar.processElement(
          <div className="test">
            <span className="colorRed">1</span>
            <span className="colorBlue">2</span>
            <span className="colorGreen">3</span>
            <span className="colorYellow">4</span>
            <span className="colorBlack">5</span>
            <span className="colorOrange">6</span>
        </div>, "ComponenteDiv");
  }

  render() {
      return (this.deathStar.getElement("ComponenteDiv"));
  }
}

```

#### Recuperando o manipulador dos filhos de um elemento

Vimos que podemos recuperar o manipulador de um elemento pela chave, agora iremos buscar um manipulador de um de seus elementos filhos, imagine que você deseja mudar uma classe ou até mesmo o falor de um dos filhos do elemento mapeado, isso é possível apenas concatenado a chave qual o elemento será manipulado e em qual o nível ele está. Ex:

```
export default class MyProject extends Component {

  constructor() {
    super();
    this.deathStar = DeathStar.getInstance(React);
    this.processElements = this.processElements.bind(this);
    this.manipulateElement = this.manipulateElement.bind(this);
  }

  processElements(){
      this.deathStar.processElement(
          <div className="test">
            <span className="colorRed">1</span>
            <span className="colorBlue">2</span>
            <span className="colorGreen">3</span>
            <span className="colorYellow">4</span>
            <span className="colorBlack">5</span>
            <span className="colorOrange">6</span>
        </div>, "ComponenteDiv");
  }

  manipulateElement(){
    let manipulateSpan1 = this.deathStar.manipulate("ComponenteDiv-span1");
    let manipulateSpan2 = this.deathStar.manipulate("ComponenteDiv-span2");
    let manipulateSpan3 = this.deathStar.manipulate("ComponenteDiv-span3");
  }

  render() {
      return (this.deathStar.getElement("ComponenteDiv"));
  }
}

```
No exemplo acima recuperamos o manipulador dos seguintes elementos:

```
    manipulateSpan1 == <span className="colorRed">1</span>
    manipulateSpan2 == <span className="colorBlue">2</span>
    manipulateSpan3 == <span className="colorGreen">3</span>

```
Cada manipulador recuperado permitirá acessar a funções de manipulação para o elemento associado, toda modificação feita por esse manipulador será refletida automaticamente ao elemento pai, ou seja, ao modificar o elemento filho o elemento pai é atualizado com essas modificações.

### Função setAttribute

Com o manipulador do elemento agora podemos utilizar as funções de manipulação, vamos adicionar um id ao terceiro span de nosso elemento 'Div' utilizando a função 'manipulateElement' do exemplo anterior. Ex:

```
 ...
 
  manipulateElement(){
    let manipulateSpan3 = this.deathStar.manipulate("ComponenteDiv-span3");
    manipulateSpan3.setAttribute({'id':'spanGreen'});
  }

 ...

```

No exemplo acima adicionamos o 'id' 'spanGreen' ao terceiro span de nosso elemento div, ao recuperarmos nosso componente por meio da função 'getElement' teremos então:

```
<div className="test">
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen" id="spanGreen">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
</div>
```
Mais um exemplo, agora vamos inserir um atributo no elemento pai:

```
 ...
 
  manipulateElement(){
    let manipulateDiv = this.deathStar.manipulate("ComponenteDiv");
    manipulateDiv.setAttribute({'id':'divSpanList'});
  }

 ...

```

Resultado:

```
<div className="test" id="divSpanList">
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen" id="spanGreen">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
</div>
```

```
    *Também é possível utilizar essa função para inserir um 'props' personalizado.
```

### Função modifyAttribute

Podemos modificar um atributo utilizando a função 'modifyAttribute', vamos supor que queremos modificar a 'className' do elemento 'div' e posteriormente modificar o 'id' da terceira 'span':


```
 ...
 
  manipulateElement(){
    let manipulateDiv = this.deathStar.manipulate("ComponenteDiv");
    manipulateDiv.modifyAttribute({'className':'testClass'});
    let manipulateSpan3 = this.deathStar.manipulate("ComponenteDiv-span3");
    manipulateSpan3.modifyAttribute({'id':'spanTest'});
  }

 ...

```

Podemos fazer isso de uma maneira mais curta que produzirá o mesmo resultado. Ex:

```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .modifyAttribute({'className':'testClass'})
        .manipulate("ComponenteDiv-span3")
        .modifyAttribute({'id':'spanTest'});
  }

 ...

```

Os exemplos acima produzem o seguinte resultado:

```
<div className="testClass" id="divSpanList">
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen" id="spanTest">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
</div>
```

```
    *Também é possível utilizar essa função para modificar um 'props' personalizado.
```
### Função removeAttribute

Do mesmo modo que criamos e modificamos os atributos de um elemento podemos também removê-lo, utilizando a função 'removeAttribute' isso é possível. A função necessita do nome do atributo a ser removido, ou de uma lista de atributos a serem removidos. Abaixo iremos remover o atributo 'classeName' e o 'id' da 'div' e também o 'id' do terceiro 'span' do elemento pai. Ex:

```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .removeAttribute(['classeName','id'])
        .manipulate("ComponenteDiv-span3")
        .removeAttribute('id');
  }

 ...

```

O exemplo acima produz o seguinte resultado:

```
<div>
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
</div>
```

```
    *Também é possível utilizar essa função para remover um 'props' personalizado.
```

### Função setChildren

É possível inserir um ou mais filhos ao elemento pai por meio do manipulador, a função 'setChildren' permite a inserção de um elemento ou de uma lista de elementos ao elemento pai, caso passe apenas um elemento ou um lista de elementos estes serão adicionados depois de todos os elemento já existentes. Ex:

```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .setChildren(<span className="colorOrange">7</span>);
  }

 ...

```

O exemplo acima produz o seguinte resultado:

```
<div>
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
    <span className="colorOrange">7</span>
</div>
```

Agora iremos passar uma lista de novos elementos:

```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .setChildren([
            <span className="colorOrange">7</span>,
            <span className="colorOrange">8</span>,
            <span className="colorOrange">9</span>
        ]);
  }

 ...

```

O exemplo acima produz o seguinte resultado:

```
<div>
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen">3</span>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
    <span className="colorOrange">7</span>
    <span className="colorOrange">8</span>
    <span className="colorOrange">9</span>
</div>
```

Agora vamos inserir no lugar da nossa terceira 'span' um novo elemento:


```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .setChildren(<p>teste</p>, 3);
  }

 ...

```
O exemplo acima produz o seguinte resultado:

```
<div>
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <p>teste</p>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
    <span className="colorOrange">7</span>
    <span className="colorOrange">8</span>
    <span className="colorOrange">9</span>
</div>
```

Caso deseje adicionar um elemento após um índice informado sem que nada seja excluído, passe a flag 'true' na terceira entrada de parâmetro da função:

```
 ...
 
  manipulateElement(){
    this.deathStar.manipulate("ComponenteDiv")
        .setChildren(<p>teste</p>, 3 , true);
  }

 ...

```
O exemplo acima produz o seguinte resultado:

```
<div>
    <span className="colorRed">1</span>
    <span className="colorBlue">2</span>
    <span className="colorGreen">3</span>
    <p>teste</p>
    <span className="colorYellow">4</span>
    <span className="colorBlack">5</span>
    <span className="colorOrange">6</span>
    <span className="colorOrange">7</span>
    <span className="colorOrange">8</span>
    <span className="colorOrange">9</span>
</div>
```

Continue ...
