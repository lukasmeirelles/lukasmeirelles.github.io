const render = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 30,
		right: 30,
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

	const xAxisScale = d3.scaleBand()
		.range([ 0, width ])
		.domain(data.map( stateName ))
		.paddingInner(1)
		.paddingOuter(.5)

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xAxisScale))

	const yAxisScale = d3.scaleLinear()
		.domain([0, 1000])
		.range([height, 0])

    const yAxis = d3.axisLeft(yAxisScale)
        .tickPadding(2)

	svg.append("g").call(yAxis)

    const brasilData = data.filter(item => item.State === 'Brasil')[0]
    const lastState = data[data.length-1]
    svg.append("line")
    	.attr("x1", "0")
    	.attr("x2", xAxisScale(stateName(lastState)))
    	.attr("y1", yAxisScale(brasilData.Mean))
    	.attr("y2", yAxisScale(brasilData.Mean))
    	.attr("stroke", "black")

	svg.selectAll("vertLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", item => xAxisScale(stateName(item)) )
    		.attr("x2", item => xAxisScale(stateName(item)) )
    		.attr("y1", (item) => yAxisScale(item.Min) )
    		.attr("y2", (item) => yAxisScale(item.Max) )
    		.attr("stroke", "red")
    		.style("width", 40)

    const boxWidth = 10

	svg.selectAll("boxes").data(data)
    .enter()
    	.append("rect")
    		.attr("x", function(d){return(xAxisScale(stateName(d))-boxWidth/2)})
    		.attr("y", function(d){return(yAxisScale(d.Perc75))})
    		.attr("height", function(d){return(yAxisScale(d.Perc25)-yAxisScale(d.Perc75))})
    		.attr("width", boxWidth )
    		.attr("stroke", "black")
    		.attr("class", item => {
    			if (item.Region) {
    				return `${item.Region.toLowerCase()}_region`
    			}
    			return 'brazil'
    		})

	svg.selectAll("medianLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", function(d){return(xAxisScale(stateName(d))-boxWidth/2) })
    		.attr("x2", function(d){return(xAxisScale(stateName(d))+boxWidth/2) })
    		.attr("y1", function(d){return(yAxisScale(d.Median))})
    		.attr("y2", function(d){return(yAxisScale(d.Median))})
    		.attr("stroke", "black")
    		.style("width", 80)
}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/ch_aggregated_scores.json')
//d3.json('data/ch_aggregated_scores.json')
.then(data => {
	render({ 
        data: data, 
        htmlComponent: '#ch_score',
        chartTitle: 'Notas da prova de Ciências Humanas em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/cn_aggregated_scores.json')
//d3.json('data/cn_aggregated_scores.json')
.then(data => {
	render({ 
        data: data, 
        htmlComponent: '#cn_score',
        chartTitle: 'Notas da prova de Ciências da Natureza em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/lc_aggregated_scores.json')
//d3.json('data/lc_aggregated_scores.json')
.then(data => {
	render({ 
        data: data, 
        htmlComponent: '#lc_score',
        chartTitle: 'Notas da prova de Linguagens e Códigos em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/mt_aggregated_scores.json')
//d3.json('data/mt_aggregated_scores.json')
.then(data => {
	render({ 
        data: data, 
        htmlComponent: '#mt_score',
        chartTitle: 'Notas da prova de Matemática em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/writing_aggregated_scores.json')
//d3.json('data/writing_aggregated_scores.json')
.then(data => {
	render({ 
        data: data, 
        htmlComponent: '#writing_score',
        chartTitle: 'Notas da redação em 2019 nos estados brasileiros'
    })
})

