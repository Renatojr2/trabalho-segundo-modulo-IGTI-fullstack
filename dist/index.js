import fs from 'fs';
function createJson(city, state, uf) {
    var readCity = fs.readFileSync(city).toString('utf-8');
    var readState = fs.readFileSync(state).toString('utf-8');
    var stateJson = JSON.parse(readState);
    var cityJson = JSON.parse(readCity);
    var stateAndCities = [];
    cityJson.filter(function (city) {
        var estado = stateJson.find(function (state) {
            return state.Sigla === uf;
        });
        var cidades = city.Estado === estado.ID;
        if (cidades) {
            stateAndCities.push({
                uf: estado.Sigla,
                cidade: city.Nome,
                id: city.ID
            });
        }
    });
    fs.writeFileSync(uf + ".json", JSON.stringify(stateAndCities, null, 2));
    return stateAndCities;
}
var readState = JSON.parse(fs.readFileSync('./Estados.json').toString('utf-8'));
readState.find(function (state) {
    for (var i = 1; i <= 27; i++) {
        var uf = state.Sigla;
        createJson('./Cidades.json', './Estados.json', uf);
    }
});
function numberCities(file) {
    var total = JSON.parse(fs.readFileSync(file).toString('utf-8'));
    var result = total.reduce(function (acc, _a) {
        var uf = _a.uf;
        acc[uf] = acc[uf] + 1 || 1;
        return acc;
    }, {});
    return result;
}
var Result = [];
var total = JSON.parse(fs.readFileSync('./Estados.json').toString('utf-8'));
total.map(function (_a) {
    var Sigla = _a.Sigla;
    Result.push(numberCities("./" + Sigla + ".json"));
});
fs.writeFileSync('tota.json', JSON.stringify(Result, null, 2));
