const renderBoxPlots = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 50,
		right: 0,
		left: 50
	}
	const width = 1280 - margin.left - margin.right
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

    const chartGroup = svg.append('g')
        .attr('transform', 'translate(0, 13)')

	const xAxisScale = d3.scaleBand()
		.range([ 10, width ])
		.domain(data.map( stateName ))
		.paddingInner(1)
		.paddingOuter(.5)

	chartGroup.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xAxisScale))

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
    document.querySelector("#score_per_state_overall").addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(overall_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== overall_school)
        }

        drawBoxPlot()
    })
    document.querySelector("#score_per_state_public").addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(public_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== public_school)
        }

        drawBoxPlot()
    })
    document.querySelector("#score_per_state_private").addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedSchools.push(private_school)
        } else {
            selectedSchools = selectedSchools.filter(s => s !== private_school)
        }

        drawBoxPlot()
    })

    let selectedTest = "ch"
    document.querySelector("#score_per_state_test").addEventListener('change', (event) => {
        selectedTest = event.target.value
        drawBoxPlot()
    })


    const drawBoxPlot = () => {
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

        const tooltipMessage = (item) => {
            let message = item.State
            if (item.State !== 'Brasil') {
                message += " (" + item.Region + ")"
            }
            message += "<br>Mínima: " + item.Min
            message += "<br>Percentil 25: " + item.Perc25
            message += "<br>Média: " + item.Mean
            message += "<br>Mediana: " + item.Median
            message += "<br>Percentil 75: " + item.Perc75
            message += "<br>Máxima: " + item.Max
            return message
        }
        
        const lastState = data[data.length-1]
        const meanLineJoin = chartGroup.selectAll(".meanLine")
            .data(data.filter(item => item.State === 'Brasil' && item.school === 'global' && item.test === selectedTest), item => item.id)
        meanLineJoin
            .enter()
                .append("line")
                    .attr("x1", 0)
                    .attr("x2", xAxisScale(stateName(lastState)) + +boxWidth({school: "global"})/2)
                    .attr("y1", item => yAxisScoreScale(item.Mean))
                    .attr("y2", item => yAxisScoreScale(item.Mean))
                    .attr("class", "meanLine")

        meanLineJoin.exit().remove()

        const dataJoin = chartGroup.selectAll(".boxplots").data(data.filter(r => r.test === selectedTest && selectedSchools.includes(r.school)), item => item.id)
        const boxplotGroup = dataJoin
            .enter()
                .append("g")
                    .attr("class", "boxplots")

        boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("y1", (item) => yAxisScoreScale(item.Perc75) )
                .attr("y2", (item) => yAxisScoreScale(item.Max) )
                .attr("class", "boxplotQuantile")

        boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item) )
                .attr("y1", (item) => yAxisScoreScale(item.Min) )
                .attr("y2", (item) => yAxisScoreScale(item.Perc25) )
                .attr("class", "boxplotQuantile")

        boxplotGroup.append("rect")
                .attr("x", item => xAxisScale(stateName(item)) + getSchoolOffset(item)-boxWidth(item)/2)
                .attr("y", item => yAxisScoreScale(item.Perc75))
                .attr("height", item => yAxisScoreScale(item.Perc25)-yAxisScoreScale(item.Perc75))
                .attr("width", item => boxWidth(item) )
                .attr("class", item => `boxplot-rect ${regionClass(item)} ${item.school}`)
                .on('mouseover', item => {
                    d3.select('#tooltip')
                        .style('left', d3.event.pageX + 'px')
                        .style('top', d3.event.pageY + 'px')
                        .style('opacity', 1)
                        .html(tooltipMessage(item));
                })
                .on('mouseout', () => {
                    d3.select('#tooltip').style('opacity', 0)
                })

        boxplotGroup.append("line")
                .attr("x1", item => xAxisScale(stateName(item)) + getSchoolOffset(item)-boxWidth(item)/2)
                .attr("x2", item => xAxisScale(stateName(item)) + getSchoolOffset(item)+boxWidth(item)/2)
                .attr("y1", item => yAxisScoreScale(item.Median))
                .attr("y2", item => yAxisScoreScale(item.Median))
                .attr("class", "boxplot-medianLine")

        dataJoin.exit().remove()
    }

    drawBoxPlot()

}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/scores_per_state.json')
.then(data => {
    data.forEach(d => d.id = Math.random())
    renderBoxPlots({ 
        data: data, 
        htmlComponent: '#score_per_state',
        chartTitle: 'Performance no ENEM por Estados'
    })
})
