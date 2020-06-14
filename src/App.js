import React, { useState } from 'react';
import './App.css';
import dataset from './dataset.json'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, createContainer } from 'victory'

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

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  onDomainChange(domain) {
    this.setState({
      zoomedXDomain: domain.x,
    });
  }

  getData() {
    const { zoomedXDomain } = this.state;
    const { data } = this.props;
    return data.filter(
      // is d "between" the ends of the visible x-domain?
      (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));
  }

  render() {
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
            onZoomDomainChange={this.onDomainChange.bind(this)}
            labels={({ datum }) => `${datum.dataBase}
          ${datum.precoVenda}`} />}
        >
          <VictoryAxis
            // scale='time'
            style={{
              tickLabels: { angle: 330, fontSize: 5 }
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
}

export default App;