const overall_school_boxplot_checkbox = "#score_per_state_overall"
const public_school_boxplot_checkbox = "#score_per_state_public"
const private_school_boxplot_checkbox = "#score_per_state_private"
const test_boxplot_select = "#score_per_state_test"
const region_boxplot_select = "#score_per_state_region_filter"
const boxplot_sort = "#score_per_state_sort"

const setUpBoxplotLegends = (svgComponent) => {
    const legendXOffset = 1190
    const legendYOffset = 20
    const defaulSpacing = 30
    const legendSize = 15


    svgComponent.append("text")
        .attr("x", legendXOffset)
        .attr("y", legendYOffset + legendSize)
        .attr("class", "legend")
        .text("Legendas:")

    const brazilLegendYOffset = legendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", brazilLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "brazil")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", brazilLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Brasil")

    const meanLegendYOffset = brazilLegendYOffset + defaulSpacing
    svgComponent.append("line")
        .attr("x1", legendXOffset + 15)
        .attr("x2", legendXOffset + legendSize + 15)
        .attr("y1", meanLegendYOffset + legendSize/2)
        .attr("y2", meanLegendYOffset + legendSize/2)
        .attr("class", "meanLine")
        .attr("stroke-width", 4)
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 20)
        .attr("y", meanLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Média")

    const coLegendYOffset = meanLegendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", coLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "co_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", coLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Centro-Oeste")

    const neLegendYOffset = coLegendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", neLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "ne_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", neLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Nordeste")

    const nLegendYOffset = neLegendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", nLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "n_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", nLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Norte")

    const seLegendYOffset = nLegendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", seLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "se_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", seLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Sudeste")

    const sLegendYOffset = seLegendYOffset + defaulSpacing
    svgComponent.append("rect")
        .attr("x", legendXOffset)
        .attr("y", sLegendYOffset)
        .attr("height", legendSize)
        .attr("width", legendSize)
        .attr("class", "s_region")
    svgComponent.append("text")
        .attr("x", legendXOffset + legendSize + 5)
        .attr("y", sLegendYOffset + legendSize - 2)
        .attr("class", "legend")
        .text("Sul")
}

const tooltipMessageForMeanLine = (item) => {
    let message = translateState(item.State)
    message += "<hr/><label>Média: </label>"
    message += normalizeGrade(item.Mean)

    return message
}

const tooltipMessageForBoxplots = (item) => {
    let message = translateState(item.State)
    if (item.State !== 'Brasil') {
        message += " (" + translateRegion(item.Region) + ")"
    }
    if (item.school !== "global") {
        message += "<br>" + translateSchool(item.school)
    }
    message += "<hr/><table class=\"boxplotTooltip\">"
    message += "<tr><td class=\"label\">Mínima:</td><td class=\"value\">" + normalizeGrade(item.Min) + "</td></tr>"
    message += "<tr><td class=\"label\">Percentil 25:</td><td class=\"value\">" + normalizeGrade(item.Perc25) + "</td></tr>"
    message += "<tr><td class=\"label\">Média:</td><td class=\"value\">" + normalizeGrade(item.Mean) + "</td></tr>"
    message += "<tr><td class=\"label\">Mediana:</td><td class=\"value\">" + normalizeGrade(item.Median) + "</td></tr>"
    message += "<tr><td class=\"label\">Percentil 75:</td><td class=\"value\">" + normalizeGrade(item.Perc75) + "</td></tr>"
    message += "<tr><td class=\"label\">Máxima:</td><td class=\"value\">" + normalizeGrade(item.Max) + "</td></tr>"
    message += "</table>"
    return message
}

const getSchoolOffset = (item) => {
    if (item.school === 'private') {
        return 7.5;
    }
    if (item.school === 'public') {
        return -7.5;
    }
    return 0;
}

const boxWidth = (item) => {
    if (item.school === 'global') {
        return 35;
    }
    return 10;
}

const boxplotSortDecoder = (sortId) => {
    switch(sortId) {
        case "region":
            return (a, b) => a.Region ? a.Region.localeCompare(b.Region) : -1
        case "median":
            return (a, b) => a.Median - b.Median
        case "spread":
            return (a, b) => (a.Perc75 - a.Perc25) - (b.Perc75 - b.Perc25)
        default:
            return (a, b) => -1
    }
}

const renderBoxPlots = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 50,
		right: 160,
		left: 50
	}
	const width = 1380 - margin.left - margin.right
	const height = 350 - margin.top - margin.bottom

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
    setUpBoxplotLegends(legendGroup)

    const chartGroup = svg.append('g')
        .attr('transform', 'translate(0, 13)')

	const yAxisScoreScale = d3.scaleLinear()
		.domain([0, 1000])
		.range([height, 0])

    const yAxisScore = d3.axisLeft(yAxisScoreScale)
        .tickPadding(2)

	chartGroup.append("g")
        .call(yAxisScore)

    const regionClass = (item) => {
        if (item.Region) {
            return `${item.Region.toLowerCase()}_region`
        }
        return 'brazil'
    }

    const overall_school = "global"
    const public_school = "public"
    const private_school = "private"
    let selectedSchools = [ overall_school ]
    document.querySelector(overall_school_boxplot_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(overall_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== overall_school)
        }

        drawBoxPlot()
    })
    document.querySelector(public_school_boxplot_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(public_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== public_school)
        }

        drawBoxPlot()
    })
    document.querySelector(private_school_boxplot_checkbox).addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(private_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== private_school)
        }

        drawBoxPlot()
    })

    let selectedTest = "ch"
    document.querySelector(test_boxplot_select).addEventListener('change', (event) => {
        selectedTest = event.target.value
        drawBoxPlot()
    })

    let selectedRegion = ""
    document.querySelector(region_boxplot_select).addEventListener('change', (event) => {
        selectedRegion = event.target.value === "all" ? "" : event.target.value
        drawBoxPlot()
    })

    let selectedSort = ""
    document.querySelector(boxplot_sort).addEventListener('change', (event) => {
        selectedSort = event.target.value === "state" ? "" : event.target.value
        drawBoxPlot()
    })


    const drawBoxPlot = () => {
        const orderedStates = data.filter(item => item.school === 'global' && item.test === selectedTest)
            .sort(boxplotSortDecoder(selectedSort))
            .map( stateName )

        const xAxisScale = d3.scaleBand()
            .range([ 10, width ])
            .domain(orderedStates)
            .paddingInner(1)
            .paddingOuter(.5)

        chartGroup.selectAll(".boxplotXAxis").remove()
        chartGroup.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "boxplotXAxis")
            .call(d3.axisBottom(xAxisScale))

        chartGroup.selectAll(".dataGroup").remove()
        const dataGroup = chartGroup.append("g").attr("class", "dataGroup")

        const meanLineJoin = chartGroup.selectAll(".meanLine")
            .data(data.filter(item => item.State === 'Brasil' && item.school === 'global' && item.test === selectedTest), item => item.id)
        
        const meanLineElement = meanLineJoin.enter().append("line")
        meanLineElement.attr("y1", item => yAxisScoreScale(item.Mean))
            .attr("y2", item => yAxisScoreScale(item.Mean))
            .attr("class", "meanLine")
            .transition().duration(2000)
                .attr("x1", 0)
                .attr("x2", xAxisScale(orderedStates[orderedStates.length-1]) + +boxWidth({school: "global"})/2)
        setUpTooltipEvents(meanLineElement, tooltipMessageForMeanLine)

        meanLineJoin.exit()
            .transition()
                .attr("stroke-width", 0)
            .remove()

        const dataJoin = dataGroup.selectAll(".boxplots")
            .data(data.filter(r => r.test === selectedTest && selectedSchools.includes(r.school) && (!selectedRegion || !r.Region || r.Region.toLowerCase() === selectedRegion)), item => item.id)
        const boxplotGroup = dataJoin
            .enter()
                .append("g")
                    .attr("class", "boxplots")

        const upperQuantile = boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("y1", (item) => yAxisScoreScale(item.Perc75) )
                .attr("y2", (item) => yAxisScoreScale(item.Max) )
                .attr("class", "boxplotQuantile")
        setUpTooltipEvents(upperQuantile, tooltipMessageForBoxplots)

        const bottomQuantile = boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("y1", (item) => yAxisScoreScale(item.Min) )
                .attr("y2", (item) => yAxisScoreScale(item.Perc25) )
                .attr("class", "boxplotQuantile")
        setUpTooltipEvents(bottomQuantile, tooltipMessageForBoxplots)

        const boxplotQuantile = boxplotGroup.append("rect")
                .attr("x", item => xAxisScale(stateName(item)) + getSchoolOffset(item)-boxWidth(item)/2)
                .attr("y", item => yAxisScoreScale(item.Perc75))
                .attr("height", item => yAxisScoreScale(item.Perc25)-yAxisScoreScale(item.Perc75))
                .attr("width", item => boxWidth(item) )
                .attr("class", item => `boxplot-rect ${regionClass(item)} ${item.school}`)
        setUpTooltipEvents(boxplotQuantile, tooltipMessageForBoxplots)

        const boxplotMedianLine = boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item)-boxWidth(item)/2)
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item)+boxWidth(item)/2)
                .attr("y1", item => yAxisScoreScale(item.Median))
                .attr("y2", item => yAxisScoreScale(item.Median))
                .attr("class", "boxplot-medianLine")
        setUpTooltipEvents(boxplotMedianLine, tooltipMessageForBoxplots)

        dataJoin.exit()
            .transition()
                .attr("width", 0)
            .remove()
    }

    drawBoxPlot()

}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/scores_per_state.json')
.then(data => {
    data.forEach(d => d.id = Math.random())

    document.querySelector(overall_school_boxplot_checkbox).checked = true
    document.querySelector(public_school_boxplot_checkbox).checked = false
    document.querySelector(private_school_boxplot_checkbox).checked = false
    document.querySelector(test_boxplot_select).value = "ch"
    document.querySelector(region_boxplot_select).value = "all"
    document.querySelector(boxplot_sort).value = "state"
    
    renderBoxPlots({ 
        data: data, 
        htmlComponent: '#score_per_state',
        chartTitle: 'Performance no ENEM por Estados'
    })
})
