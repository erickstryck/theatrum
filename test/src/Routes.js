import React from 'react'
import { Actor, Scene, Staff, Stage, Theatrum } from '../../src/Teatrum'

const Initial = () => (
  <Scene name="initial">
    <h1>Initial</h1>
    <p onClick={() => Staff.stagePush('teatrum', '/1')}>Teste 1</p>
    <p onClick={() => Staff.stagePush('teatrum', '/2')}>Teste 2</p>
  </Scene>
)

const Teste1 = () => (
  <Scene name="scene1">
    <Actor name="title1">
      <h1>Teste 1</h1>
      <p
        onClick={() => {
          Staff.setAttribute(
            'actor_title2',
            { style: { color: 'yellow' } },
            true
          )
          Staff.stageBack('teatrum')
        }}
      >
        voltar
      </p>
    </Actor>
  </Scene>
)

const Teste2 = () => (
  <Scene name="scene2">
    <Actor name="title2">
      <h1>Teste 2</h1>
      <p onClick={() => Staff.stageBack('teatrum')}>voltar</p>
    </Actor>
  </Scene>
)

const NotFound = () => (
  <div>
    <h1>Ops rota nao existente</h1>
  </div>
)

export default () => (
  <Theatrum name="teatrum" init="/" redirect="/notfound" browser>
    <Stage name="notfound" path="/notfound">
      <NotFound />
    </Stage>
    <Stage name="initial" path="/">
      <Initial />
    </Stage>
    <Stage name="teste1" path="/1">
      <Teste1 />
    </Stage>
    <Stage name="teste2" path="/2">
      <Teste2 />
    </Stage>
  </Theatrum>
)
