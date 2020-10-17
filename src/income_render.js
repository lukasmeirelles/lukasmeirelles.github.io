const renderIncomeCharts = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 50,
		right: 40,
		left: 200
	}
	const width = 1280 - margin.left - margin.right
	const height = 600 - margin.top - margin.bottom

    const incomes = {}
    incomes["A"] = "Nenhuma renda"
    incomes["B"] = "Até R$ 998,00"
    incomes["C"] = "De R$ 998,01 até R$ 1.497,00"
    incomes["D"] = "De R$ 1.497,01 até R$ 1.996,00"
    incomes["E"] = "De R$ 1.996,01 até R$ 2.495,00"
    incomes["F"] = "De R$ 2.495,01 até R$ 2.994,00"
    incomes["G"] = "De R$ 2.994,01 até R$ 3.992,00"
    incomes["H"] = "De R$ 3.992,01 até R$ 4.990,00"
    incomes["I"] = "De R$ 4.990,01 até R$ 5.988,00"
    incomes["J"] = "De R$ 5.988,01 até R$ 6.986,00"
    incomes["K"] = "De R$ 6.986,01 até R$ 7.984,00"
    incomes["L"] = "De R$ 7.984,01 até R$ 8.982,00"
    incomes["M"] = "De R$ 8.982,01 até R$ 9.980,00"
    incomes["N"] = "De R$ 9.980,01 até R$ 11.976,00"
    incomes["O"] = "De R$ 11.976,01 até R$ 14.970,00"
    incomes["P"] = "De R$ 14.970,01 até R$ 19.960,00"
    incomes["Q"] = "Mais de R$ 19.960,00"

	const svg = d3.select(htmlComponent).append('svg')
		.attr('width', `${width + margin.left + margin.right}`)
		.attr('height', `${height + margin.top + margin.bottom}`)
		.append("g")
    		.attr("transform", `translate(${margin.left}, ${margin.top})`)
	
	const stateName = (item) => item.State

    svg.append('text')
        .attr('y', 0)
        .attr('x', width/2)
        .attr('class', 'chartTitle')
        .text(chartTitle)

    const chartGroup = svg.append('g')
        .attr('transform', 'translate(0, 25)')

    const xValue = data => data.Median
	const xAxisScale = d3.scaleLinear()
		.range([ 0, width ])
		.domain([ 400, 1000 ])

	chartGroup.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xAxisScale))

    const yValue = value => incomes[value]
    const yAxisValues = data.map(e => e.income)
                            .filter((v, i, a) => a.indexOf(v) === i)
                            .sort()
                            .map(yValue)
	const yAxisScale = d3.scalePoint()
		.domain(yAxisValues)
		.range([height, 0])
        .padding(0.7)

    const yAxisScore = d3.axisLeft(yAxisScale)
        .tickPadding(2)

	chartGroup.append("g")
        .call(yAxisScore)

    const circleRadius = 2
    chartGroup.selectAll("rect").data(data)
        .enter()
            .append("circle")
                .attr('cx', d => xAxisScale(xValue(d)))
                .attr('r', circleRadius)
                .attr('cy', d => yAxisScale(yValue(d.income)))
                .attr("class", item => {
                    if (item.Region) {
                        return `${item.Region.toLowerCase()}_region`
                    }
                    return 'brazil'
                })

}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/scores_per_income_type.json')
//d3.json('data/ch_aggregated_scores.json')
.then(data => {
    renderIncomeCharts({ 
        data: data, 
        htmlComponent: '#ch_score_per_income',
        chartTitle: 'Notas por renda'
    })
})
