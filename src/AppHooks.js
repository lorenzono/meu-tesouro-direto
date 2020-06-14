import React, { useState } from 'react';
import './App.css';
import dataset from './dataset.json'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, createContainer } from 'victory'

export default function App() {

  // const [bonds, setBonds] = useState({})

  const data = dataset
    .filter(titulo => titulo.tipo === 'ipca')
    .filter(titulo => titulo.vencimento === '2035-05-15') // É melhor filtrar ou criar um novo objeto?
    .sort((a, b) => a.dataBase < b.dataBase ? -1 : 1) // Descobri o problema da ordem dos dados! O dataset não está ordenado pela data OTL. O Victory não consegue ajeitar isso?
    .map(({ tipo, vencimento, ...properties }) => properties) // É melhor deletar ou criar um novo objeto sem as propriedades?
  // .map(titulo => titulo.precoVenda.toString().replace(".", ","))

  // const newDatas = data // Acho que também não preciso mais disso

  data.length = 201 // Descobri que não preciso mais disso! O problema estava na ordem do dataset

  // console.log(newDatas)

  let arr = []
  let tickValue = []
  let i = 0
  let j = 0

  for (i; i < data.length; i++) {
    if (i % 100 === 0) {
      arr.push(data[i].dataBase)
    } else {
      arr.push(undefined)
    }
  }

  for (j; j < data.length; j++) {
    tickValue.push(j + 1)
  }

  console.log(arr)

  console.log(tickValue)

  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  return (
    <>
      <div>
        Testando coisas heheheh
      </div>
      <VictoryChart
        // theme={VictoryTheme.material}
        // domainPadding={20}
        // padding={70}
        containerComponent={<VictoryZoomVoronoiContainer
          labels={({ datum }) => `${datum.dataBase}
          ${datum.precoVenda}`} />}
      >
        <VictoryAxis
          // scale='time'
          style={{
            tickLabels: { angle: -30, fontSize: 5 }
          }}
          tickValues={tickValue}
          tickFormat={arr}
        />
        <VictoryAxis
          dependentAxis
        // tickFormat={y => `R$ ${y},00`}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31", strokeWidth: 0.5 },
            // parent: { border: "1px solid #ccc" }
          }}
          // labelComponent={<VictoryTooltip />} Isso não funciona em Line
          data={data}
          x="dataBase"
          y="precoVenda"
        />
      </VictoryChart>
    </>
  );
}
