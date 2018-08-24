<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Funções Relacionadas ao manipulador "Bridge"

-   [constructor][1]
    -   [Parameters][2]
-   [getMyKey][3]
-   [getElement][4]
-   [copy][5]
    -   [Parameters][6]
-   [setAttribute][7]
    -   [Parameters][8]
-   [setProps][9]
    -   [Parameters][10]
-   [modifyAttribute][11]
    -   [Parameters][12]
-   [removeAttribute][13]
    -   [Parameters][14]
-   [setChildren][15]
    -   [Parameters][16]
-   [removeChildren][17]
    -   [Parameters][18]
-   [checkAttribute][19]
    -   [Parameters][20]
-   [manipulateCopy][21]
    -   [Parameters][22]
-   [manipulate][23]
    -   [Parameters][24]
-   [destroy][25]
    -   [Parameters][26]

### Funções que compõe a biblioteca.

-   [constructor][27]
    -   [Parameters][28]
-   [builder][29]
    -   [Parameters][30]
-   [clearBus][31]
-   [setContext][32]
    -   [Parameters][33]
-   [getContext][34]
    -   [Parameters][35]
-   [putStore][36]
    -   [Parameters][37]
-   [getStore][38]
    -   [Parameters][39]
-   [deleteStore][40]
    -   [Parameters][41]
-   [keys][42]
-   [destroy][43]
    -   [Parameters][44]
-   [minf][45]
    -   [Parameters][46]
-   [container][47]
    -   [Parameters][48]
-   [processChildren][49]
    -   [Parameters][50]
-   [processElement][51]
    -   [Parameters][52]
-   [mapChildrens][53]
    -   [Parameters][54]
-   [haveTypeName][55]
    -   [Parameters][56]
-   [getId][57]
-   [setStore][58]
    -   [Parameters][59]
-   [manipulate][60]
    -   [Parameters][61]
-   [manipulateCopy][62]
    -   [Parameters][63]
-   [getElement][64]
    -   [Parameters][65]
-   [setProps][66]
    -   [Parameters][67]
-   [walkChildren][68]
    -   [Parameters][69]
-   [copy][70]
    -   [Parameters][71]
-   [setAttribute][72]
    -   [Parameters][73]
-   [modifyAttribute][74]
    -   [Parameters][75]
-   [processModify][76]
    -   [Parameters][77]
-   [removeAttribute][78]
    -   [Parameters][79]
-   [processRemove][80]
    -   [Parameters][81]
-   [setChildren][82]
    -   [Parameters][83]
-   [removeChildren][84]
    -   [Parameters][85]
-   [processRemoveChildren][86]
    -   [Parameters][87]
-   [processResetChildren][88]
    -   [Parameters][89]
-   [updateAllReferences][90]
    -   [Parameters][91]
-   [checkChildrensInArray][92]
    -   [Parameters][93]
-   [compareChildrens][94]
    -   [Parameters][95]
-   [swapPropsAttr][96]
    -   [Parameters][97]
-   [checkKey][98]
    -   [Parameters][99]
-   [checkProps][100]
    -   [Parameters][101]
-   [checkAttribute][102]
    -   [Parameters][103]
-   [getInstance][104]
    -   [Parameters][105]

## constructor

Representa a classe de ponte para manipulação dos elementos.

### Parameters

-   `key` **[string][106]** 

## getMyKey

Função de ponte de Maniplação.
Retorna a chave relacionada a manipulação corrente.

Returns **[string][106]** 

## getElement

Função de ponte de Maniplação.
Recupera o elemento relacionado a chave deste manipulador para renderização.

Returns **[object][107]** 

## copy

Função de ponte de Maniplação.
Recupera o elemento por meio de sua chave e realiza uma cópia aplicando a ela uma nova chave.

### Parameters

-   `newKey` **[string][106]** 

Returns **([object][107] \| [undefined][108])** 

## setAttribute

Função de ponte de Maniplação.
Insere novos atributos no objeto relacionado a chave deste manipulador.
Return manipulador

### Parameters

-   `attributes` **[object][107]** 

Returns **[object][107]** 

## setProps

Função de ponte de Maniplação.
Insere o novo objeto de propriedades ao elemento substituindo as antigas propriedades, o elemento será encontrado pela chave deste manipulador.
Return manipulador

### Parameters

-   `props` **[object][107]** 

Returns **[object][107]** 

## modifyAttribute

Função de ponte de Maniplação.
Reaplica um novo valor ao atributo passado ao objeto relacionado a chave deste manipulador.
Return manipulador

### Parameters

-   `value` **[object][107]** 

Returns **[object][107]** 

## removeAttribute

Função de ponte de Maniplação.
Recupera o elemento do repositório relacionado a chave deste manipulador e realiza a remoção dos atributos informados.
Return manipulador

### Parameters

-   `atrName` **[string][106]** 

Returns **[object][107]** 

## setChildren

Função de ponte de Maniplação.
Realiza a inserção de um elemento filho em um outro elemento especificado relacionado a chave deste manipulador.
Return manipulador

### Parameters

-   `children` **[object][107]** 
-   `index` **integer**  (optional, default `''`)
-   `mergeIndex` **[boolean][109]**  (optional, default `false`)

Returns **[object][107]** 

## removeChildren

Função de ponte de Maniplação.
Recupera um elemento relacionado a chave deste manipulador e realiza a remoção do filho especificado pela índice informado
o índice obedece a regra da ordem dos filhos do elemento pai.
Return manipulador

### Parameters

-   `index` **integer** 

Returns **[object][107]** 

## checkAttribute

Função de ponte de Maniplação.
Verifica se o elemento relacionado a chave deste manipulador contém o atributo indicado.

### Parameters

-   `atrName` **[string][106]** 

Returns **[boolean][109]** 

## manipulateCopy

Função de ponte de Maniplação.
Recupera o elemento React relacionado a chave deste manipulador, cria uma cópia com a nova chave e o disponibiliza para manipulação.

### Parameters

-   `newKey` **[string][106]** 

Returns **[object][107]** 

## manipulate

Função de ponte de Maniplação.
Carrega este manipulador de elemento com a nova chave informada.
Return manipulador

### Parameters

-   `key` **[string][106]** 

Returns **[object][107]** 

## destroy

Função de ponte de Maniplação.
Destrói os elementos React do repositório por meio da lista de Arrays informados.
Return manipulador

### Parameters

-   `keys` **([array][110] \| [string][106])** 

Returns **[object][107]** 

## constructor

Classe responsável por prover as funções da biblioteca.

### Parameters

-   `react` **[object][107]** 

## builder

Recria o componente informado com seu devido mapeamento para manipulação.

### Parameters

-   `type` **([string][106] \| [object][107])** 
-   `props` **[object][107]** 
-   `children` **[object][107]** 

Returns **[object][107]** 

## clearBus

Limpa o repositório local de informações

## setContext

Insere o contexto do elemento para manipulação remota por outro componente.

### Parameters

-   `key` **[string][106]** 
-   `value` **[object][107]** 

## getContext

Recupera o contexto do elemento para manipulação remota por outro componente.

### Parameters

-   `key` **[string][106]** 

## putStore

Persiste os dados informados no repositório local. 
Poderá persistir o contexto do componente e recuperar o mesmo posteriormente.

### Parameters

-   `key` **[string][106]** 
-   `value` **[object][107]** 
-   `context` **[boolean][109]** 

Returns **([object][107] \| [undefined][108])** 

## getStore

Recupera o dado do repositório por meio da 'Key' informada.

### Parameters

-   `key` **[string][106]** 

Returns **[object][107]** 

## deleteStore

Remove o objeto do repositório por meio da 'Key' informada.

### Parameters

-   `key` **[string][106]** 

## keys

Recupera todas as chaves realcionadas aos objetos persistidos no repositório.

Returns **[array][110]** 

## destroy

Destrói os elementos React do repositório por meio da lista de Arrays informados.

### Parameters

-   `keys` **([array][110] \| [string][106])** 

## minf

Realiza a minificação dos tipos de objetos React fazendo a compressão de nomes dos componentes.

### Parameters

-   `key` **[string][106]** 

Returns **[string][106]** 

## container

Prepara um container de informações para serem criadas e indexadas.

### Parameters

-   `data` **[object][107]** 
-   `copy` **[boolean][109]**  (optional, default `false`)

Returns **[object][107]** 

## processChildren

Processa os filhos de um elemento React para que possam ser mapeados para manipulação.

### Parameters

-   `children` **([object][107] \| [array][110])** 
-   `copy` **[boolean][109]** 

Returns **[object][107]** 

## processElement

Processa um elemento React para que possam ser mapeado para manipulação.

### Parameters

-   `data` **[object][107]** 
-   `key` **[string][106]** 
-   `copy` **[boolean][109]**  (optional, default `false`)

Returns **[object][107]** 

## mapChildrens

Mapeia os filhos processados de um elemento para indexação no repositório.

### Parameters

-   `data` **[object][107]** 
-   `key` **[string][106]** 

## haveTypeName

Verifica se o tipo do componente já foi inserido no dicionário de tipos, caso não exista ele o insere.

### Parameters

-   `type` **[string][106]** 

Returns **[string][106]** 

## getId

Recupera um ID único para uso no mapeamento de elementos.

Returns **[string][106]** 

## setStore

Insere no repositório um elemento react novo

### Parameters

-   `key` **[string][106]** 
-   `jsxData` **[object][107]** 
-   `copy` **[boolean][109]**  (optional, default `false`)

Returns **[object][107]** 

## manipulate

Recupera um elemento React do repositório e o disponibiliza para manipulação.

### Parameters

-   `key` **[string][106]** 

Returns **[object][107]** 

## manipulateCopy

Recupera um elemento React do repositório cria uma cópia com a nova chave e o disponibiliza para manipulação.

### Parameters

-   `key` **[string][106]** 
-   `newKey` **[string][106]** 

Returns **[object][107]** 

## getElement

Recupera um elemento do repositório para renderização.

### Parameters

-   `key` **[string][106]** 

Returns **[object][107]** 

## setProps

Insere o novo objeto de propriedades ao elemento substituindo as antigas propriedades, o elemento será encontrado pela chave informada.

### Parameters

-   `key` **[string][106]** 
-   `props` **[object][107]** 

## walkChildren

Retorna todos os filhos de um elemento recursivamente.

### Parameters

-   `data` **[object][107]** 
-   `key` **[string][106]** 

Returns **[array][110]** 

## copy

Recupera o elemento por meio de sua chave e realiza uma cópia aplicando a ela uma nova chave.

### Parameters

-   `key` **[string][106]** 
-   `keyNew` **[string][106]** 

Returns **([object][107] \| [undefined][108])** 

## setAttribute

Insere um novo atributo no objeto relacionado a chave informada.

### Parameters

-   `key` **[string][106]** 
-   `attributes` **[object][107]** 

## modifyAttribute

Reaplica um novo valor ao atributo passado ao objeto por meio da chave informada.

### Parameters

-   `key` **[string][106]** 
-   `attValues` **[object][107]** 

## processModify

Aplica as mudanças nos atributos de acordo com os valores informados.

### Parameters

-   `key` **[string][106]** 
-   `atrName` **[string][106]** 
-   `value` **any** 

## removeAttribute

Recupera o elemento do repositório e realiza a remoção dos atributos informados.

### Parameters

-   `key` **[string][106]** 
-   `attValues` **([array][110] \| [string][106])** 

## processRemove

Aplica a remoção dos atributos de acordo com os valores informados.

### Parameters

-   `key` **[string][106]** 
-   `atrName` **[string][106]** 

## setChildren

Realiza a inserção de um elemento filho em um outro elemento especificado pela chave, 
poderá ser informado o índice onde será inserido o objeto, caso a flag "mergeIndex" for informada o conteúdo do índice antigo será substituído 
caso contrario o índice será acrescentado a partir da posição informada.

### Parameters

-   `key` **[string][106]** 
-   `childrenVal` **[object][107]** 
-   `index` **integer**  (optional, default `''`)
-   `mergeIndex` **[boolean][109]**  (optional, default `false`)

## removeChildren

Recupera um elemento pela chave e realiza a remoção do filho especificado pelo índice informado
o índice obedece a regra da ordem dos filhos do elemento pai.

### Parameters

-   `key` **[string][106]** 
-   `index` **intger** 

## processRemoveChildren

Aplica a remoção do filho de acordo com os valores informados.

### Parameters

-   `key` **[string][106]** 
-   `index` **integer** 

## processResetChildren

Remove todos os filhos de um elemento recuperado pela chave.

### Parameters

-   `key` **[string][106]** 

## updateAllReferences

Realiza a atualização das mudanças em todo os elementos do repositório.

### Parameters

-   `obj` **[object][107]** 

## checkChildrensInArray

Verifica e aplica as mudanças nos filhos de um elemento pai.

### Parameters

-   `mainElement` **[object][107]** 
-   `currentElement` **[object][107]** 

Returns **[object][107]** 

## compareChildrens

Verifica se houve alteração no filho encontrado e recupera o filho atualizado.

### Parameters

-   `mainElement` **[object][107]** 
-   `current` **[object][107]** 
-   `childrenUpdated` **[object][107]** 
-   `nextChildrens` **[object][107]** 

Returns **[object][107]** 

## swapPropsAttr

Realiza a inserção de novos atributos a um elemento informado.

### Parameters

-   `obj` **[object][107]** 
-   `newAttr` **[object][107]** 

Returns **[object][107]** 

## checkKey

Verifica se existe algum item no repositório relacionado a chave informada.

### Parameters

-   `key` **[string][106]** 

Returns **[boolean][109]** 

## checkProps

Verifica se o elemento relacionado a chave informada contém propriedades.

### Parameters

-   `key` **[string][106]** 

Returns **[boolean][109]** 

## checkAttribute

Verifica se o elemento relacionado a chave informada contém o atributo indicado.

### Parameters

-   `key` **[string][106]** 
-   `atrName` **[string][106]** 

Returns **[boolean][109]** 

## getInstance

Recupera a instância corrente do React pelo componente que o utilizará.

### Parameters

-   `react` **[object][107]** 

Returns **[object][107]** 

[1]: #constructor

[2]: #parameters

[3]: #getmykey

[4]: #getelement

[5]: #copy

[6]: #parameters-1

[7]: #setattribute

[8]: #parameters-2

[9]: #setprops

[10]: #parameters-3

[11]: #modifyattribute

[12]: #parameters-4

[13]: #removeattribute

[14]: #parameters-5

[15]: #setchildren

[16]: #parameters-6

[17]: #removechildren

[18]: #parameters-7

[19]: #checkattribute

[20]: #parameters-8

[21]: #manipulatecopy

[22]: #parameters-9

[23]: #manipulate

[24]: #parameters-10

[25]: #destroy

[26]: #parameters-11

[27]: #constructor-1

[28]: #parameters-12

[29]: #builder

[30]: #parameters-13

[31]: #clearbus

[32]: #setcontext

[33]: #parameters-14

[34]: #getcontext

[35]: #parameters-15

[36]: #putstore

[37]: #parameters-16

[38]: #getstore

[39]: #parameters-17

[40]: #deletestore

[41]: #parameters-18

[42]: #keys

[43]: #destroy-1

[44]: #parameters-19

[45]: #minf

[46]: #parameters-20

[47]: #container

[48]: #parameters-21

[49]: #processchildren

[50]: #parameters-22

[51]: #processelement

[52]: #parameters-23

[53]: #mapchildrens

[54]: #parameters-24

[55]: #havetypename

[56]: #parameters-25

[57]: #getid

[58]: #setstore

[59]: #parameters-26

[60]: #manipulate-1

[61]: #parameters-27

[62]: #manipulatecopy-1

[63]: #parameters-28

[64]: #getelement-1

[65]: #parameters-29

[66]: #setprops-1

[67]: #parameters-30

[68]: #walkchildren

[69]: #parameters-31

[70]: #copy-1

[71]: #parameters-32

[72]: #setattribute-1

[73]: #parameters-33

[74]: #modifyattribute-1

[75]: #parameters-34

[76]: #processmodify

[77]: #parameters-35

[78]: #removeattribute-1

[79]: #parameters-36

[80]: #processremove

[81]: #parameters-37

[82]: #setchildren-1

[83]: #parameters-38

[84]: #removechildren-1

[85]: #parameters-39

[86]: #processremovechildren

[87]: #parameters-40

[88]: #processresetchildren

[89]: #parameters-41

[90]: #updateallreferences

[91]: #parameters-42

[92]: #checkchildrensinarray

[93]: #parameters-43

[94]: #comparechildrens

[95]: #parameters-44

[96]: #swappropsattr

[97]: #parameters-45

[98]: #checkkey

[99]: #parameters-46

[100]: #checkprops

[101]: #parameters-47

[102]: #checkattribute-1

[103]: #parameters-48

[104]: #getinstance

[105]: #parameters-49

[106]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[107]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[108]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[109]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[110]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
