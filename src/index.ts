import fs from 'fs'



function createJson(city: string, state: string, uf: string) {
  const readCity = fs.readFileSync(city).toString('utf-8')
  const readState = fs.readFileSync(state).toString('utf-8')
  const stateJson = JSON.parse(readState)
  const cityJson = JSON.parse(readCity)

  interface StateAndCyties {
    uf: string,
    cidade: string,
    id: string
  }

  let stateAndCities: StateAndCyties[] = []

  interface City {
    ID: string,
    Nome: string,
    Estado: string
  }

  interface Estado {
    ID: string,
    Nome: string,
    Sigla: string
  }

  cityJson.filter((city: City) => {
    const estado = stateJson.find((state: Estado) => {
      return state.Sigla === uf
    })
    const cidades = city.Estado === estado.ID

    if (cidades) {
      stateAndCities.push({
        uf: estado.Sigla,
        cidade: city.Nome,
        id: city.ID
      })
    }
  })

  fs.writeFileSync(`${uf}.json`, JSON.stringify(stateAndCities, null, 2))
  return stateAndCities
}


interface Estado {
  ID: string,
  Nome: string,
  Sigla: string
}


const readState = JSON.parse(fs.readFileSync('./Estados.json').toString('utf-8'))
readState.find((state: Estado) => {

  for (let i = 1; i <= 27; i++) {
    const uf = state.Sigla
    createJson('./Cidades.json', './Estados.json', uf)
   

  }
})

interface City {
  ID: string,
  Nome: string,
  Estado: string
}

interface Uf {
  uf: string,
  Sigla?: string
}




function numberCities(file: string) {
  const total = JSON.parse(fs.readFileSync(file).toString('utf-8'))
  const result = total.reduce((acc: string | any, { uf }: Uf) => {
    acc[uf] = acc[uf] + 1 || 1
    return acc
  }, {})

  return result
}

let Result: string[] = []



const total = JSON.parse(fs.readFileSync('./Estados.json').toString('utf-8'))

total.map(({ Sigla }: Uf) => {
  Result.push(numberCities(`./${Sigla}.json`))
})

fs.writeFileSync('tota.json', JSON.stringify(Result, null, 2))









