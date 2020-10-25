const overall_school_income_checkbox = "#income_overall"
const public_school_income_checkbox = "#income_public"
const private_school_income_checkbox = "#income_private"
const test_income_select = "#income_test"
const region_income_select = "#income_region_filter"

const circleRadius = 5

const setUpIncomeLegends = (svgComponent) => {
    const legendXOffset = 970

    svgComponent.append("text")
        .attr("x", legendXOffset - circleRadius)
        .attr("y", 70 + circleRadius)
        .attr("class", "legend")
        .text("Legendas:")

    const brazilLegendYOffset = 100
    svgComponent.append("line")
        .attr("x1", legendXOffset-circleRadius)
        .attr("x2", legendXOffset+circleRadius)
        .attr("y1", brazilLegendYOffset)
        .attr("y2", brazilLegendYOffset)
        .attr("class", "income_reference")
        .attr("stroke-width", 4)
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", brazilLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Brasil")

    const coLegendYOffset = 130
    svgComponent.append("circle")
        .attr("cx", legendXOffset)
        .attr("cy", coLegendYOffset)
        .attr("r", circleRadius)
        .attr("class", "co_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", coLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Centro-Oeste")

    const neLegendYOffset = 160
    svgComponent.append("circle")
        .attr("cx", legendXOffset)
        .attr("cy", neLegendYOffset)
        .attr("r", circleRadius)
        .attr("class", "ne_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", neLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Nordeste")

    const nLegendYOffset = 190
    svgComponent.append("circle")
        .attr("cx", legendXOffset)
        .attr("cy", nLegendYOffset)
        .attr("r", circleRadius)
        .attr("class", "n_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", nLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Norte")

    const seLegendYOffset = 220
    svgComponent.append("circle")
        .attr("cx", legendXOffset)
        .attr("cy", seLegendYOffset)
        .attr("r", circleRadius)
        .attr("class", "se_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", seLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Sudeste")

    const sLegendYOffset = 250
    svgComponent.append("circle")
        .attr("cx", legendXOffset)
        .attr("cy", sLegendYOffset)
        .attr("r", circleRadius)
        .attr("class", "s_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + 10)
        .attr("y", sLegendYOffset + circleRadius)
        .attr("class", "legend")
        .text("Sul")
}

const tooltipMessageForIncomeChart = (item) => {
    let message = translateState(item.State)
    if (item.State !== 'Brasil') {
        message += " (" + translateRegion(item.Region) + ")"
    }
    if (item.school !== "global") {
        message += "<br>" + translateSchool(item.school)
    }
    message += "<hr/>Mediana: " + normalizeGrade(item.Median)
    return message
}

const renderIncomeCharts = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 75,
		right: 140,
		left: 200
	}
	const width = 1280 - margin.left - margin.right
	const height = 625 - margin.top - margin.bottom

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

    const legendGroup = svg.append('g')
    setUpIncomeLegends(legendGroup)

    const chartGroup = svg.append('g')
        .attr('transform', 'translate(0, 50)')

    const xValue = data => data.Median
	const xAxisScale = d3.scaleLinear()
		.range([ 0, width ])
		.domain([ 400, 950 ])

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


    const overall_school = "global"
    const public_school = "public"
    const private_school = "private"
    let selectedSchools = [ overall_school ]
    document.querySelector(overall_school_income_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(overall_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== overall_school)
        }

        renderIncomeChart()
    })
    document.querySelector(public_school_income_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(public_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== public_school)
        }

        renderIncomeChart()
    })
    document.querySelector(private_school_income_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(private_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== private_school)
        }

        renderIncomeChart()
    })

    let selectedTest = "ch"
    document.querySelector(test_income_select).addEventListener('change', (event) => {
        selectedTest = event.target.value
        renderIncomeChart()
    })

    let selectedRegion = ""
    document.querySelector(region_income_select).addEventListener('change', (event) => {
        selectedRegion = event.target.value === "all" ? "" : event.target.value
        renderIncomeChart()
    })

    const renderIncomeChart = () => {
        
        const regionClass = (item) => {
            if (item.Region) {
                return `${item.Region.toLowerCase()}_region`
            }
            return 'brazil'
        }


        charJoin = chartGroup.selectAll("circle")
            .data(data.filter(r => r.State !== "Brasil" && r.test === selectedTest && selectedSchools.includes(r.school) && (!selectedRegion || !r.Region || r.Region.toLowerCase() === selectedRegion)), item => item.id)
        const circles = charJoin.enter()
                .append("circle")
                    .attr('cx', d => xAxisScale(xValue(d)))
                    .attr('cy', d => yAxisScale(yValue(d.income)))
                    .attr("class", regionClass)

        setUpTooltipEvents(circles, tooltipMessageForIncomeChart)

        circles.transition().duration(1000)
            .attr('r', circleRadius)

        charJoin.exit()
            .transition()
                .attr('r', 0)
            .remove()


        let groupedData = data.filter(r => r.State === "Brasil" && r.test === selectedTest && selectedSchools.includes(r.school))
            .reduce((group, item) => { 
                const items = group[item.school] || []
                items.push(item)
                group[item.school] = items.sort((a, b) => a.income.localeCompare(b.income))
                return group
            }, {})
        let pathValues = Object.values(groupedData).map(items => {return {school: items[0].school, test: items[0].test, grades: items}})


        const lineFunction = d3.line()
                                .x(item => xAxisScale(xValue(item)))
                                .y(item => yAxisScale(yValue(item.income)))

        const pathWidth = 0.5
        const referenceJoin = chartGroup.selectAll("path.income_reference").data(pathValues, item => item.school+item.test)
        referenceJoin.enter()
            .append("path")
                .attr("d", item => lineFunction(item.grades))
                .attr("class", "income_reference")
                .transition().duration(1000)
                    .attr("stroke-width", pathWidth)
                        
        referenceJoin.exit()
            .transition()
                .attr("stroke-width", 0)
            .remove()

    }
    
    renderIncomeChart()

}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/scores_per_income_type.json')
.then(data => {
    data.forEach(d => d.id = Math.random())

    document.querySelector(overall_school_income_checkbox).checked = true
    document.querySelector(public_school_income_checkbox).checked = false
    document.querySelector(private_school_income_checkbox).checked = false
    document.querySelector(test_income_select).value = "ch"
    document.querySelector(region_income_select).value = "all"
    
    renderIncomeCharts({ 
        data: data, 
        htmlComponent: '#score_per_income',
        chartTitle: 'Mediana das notas no ENEM por faixas de renda'
    })
})
