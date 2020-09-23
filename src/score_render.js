const render = ({data, htmlComponent, chartTitle}) => {
	const margin = {
		top: 40,
		bottom: 50,
		right: 40,
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
		.range([ 0, width ])
		.domain(data.map( stateName ))
		.paddingInner(1)
		.paddingOuter(.5)

	chartGroup.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xAxisScale))

	const yAxisScoreScale = d3.scaleLinear()
		.domain([0, 1000])
		.range([height, 0])

    const yAxisScore = d3.axisRight(yAxisScoreScale)
        .tickPadding(2)

	chartGroup.append("g")
        .attr('transform', `translate(${width}, 0)`)
        .call(yAxisScore)

    const brasilData = data.filter(item => item.State === 'Brasil')[0]
    const lastState = data[data.length-1]
    chartGroup.append("line")
    	.attr("x1", xAxisScale(stateName(brasilData)))
    	.attr("x2", `${width}`)
    	.attr("y1", yAxisScoreScale(brasilData.Mean))
    	.attr("y2", yAxisScoreScale(brasilData.Mean))
    	.attr("stroke", "black")

	chartGroup.selectAll("vertLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", item => xAxisScale(stateName(item)) )
    		.attr("x2", item => xAxisScale(stateName(item)) )
    		.attr("y1", (item) => yAxisScoreScale(item.Min) )
    		.attr("y2", (item) => yAxisScoreScale(item.Max) )
    		.attr("stroke", "red")
    		.style("width", 40)

    const boxWidth = 10

	chartGroup.selectAll("boxes").data(data)
    .enter()
    	.append("rect")
    		.attr("x", function(d){return(xAxisScale(stateName(d))-boxWidth/2)})
    		.attr("y", function(d){return(yAxisScoreScale(d.Perc75))})
    		.attr("height", function(d){return(yAxisScoreScale(d.Perc25)-yAxisScoreScale(d.Perc75))})
    		.attr("width", boxWidth )
    		.attr("stroke", "black")
    		.attr("class", item => {
    			if (item.Region) {
    				return `${item.Region.toLowerCase()}_region`
    			}
    			return 'brazil'
    		})

	chartGroup.selectAll("medianLines").data(data)
    .enter()
    	.append("line")
    		.attr("x1", function(d){return(xAxisScale(stateName(d))-boxWidth/2) })
    		.attr("x2", function(d){return(xAxisScale(stateName(d))+boxWidth/2) })
    		.attr("y1", function(d){return(yAxisScoreScale(d.Median))})
    		.attr("y2", function(d){return(yAxisScoreScale(d.Median))})
    		.attr("stroke", "black")
    		.style("width", 80)
}

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/ch_scores_global.json')
//d3.json('data/ch_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#ch_score',
        chartTitle: 'Performance na prova de Ciências Humanas em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/ch_scores_private.json')
//d3.json('data/ch_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#ch_score_private',
        chartTitle: 'Escolas privadas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/ch_scores_public.json')
//d3.json('data/ch_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#ch_score_public',
        chartTitle: 'Escolas públicas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/cn_scores_global.json')
//d3.json('data/cn_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#cn_score',
        chartTitle: 'Performance na prova de Ciências da Natureza em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/cn_scores_private.json')
//d3.json('data/cn_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#cn_score_private',
        chartTitle: 'Escolas privadas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/cn_scores_public.json')
//d3.json('data/cn_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#cn_score_public',
        chartTitle: 'Escolas públicas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/lc_scores_global.json')
//d3.json('data/lc_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#lc_score',
        chartTitle: 'Performance na prova de Linguagens e Códigos em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/lc_scores_private.json')
//d3.json('data/lc_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#lc_score_private',
        chartTitle: 'Escolas privadas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/lc_scores_public.json')
//d3.json('data/lc_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#lc_score_public',
        chartTitle: 'Escolas públicas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/mt_scores_global.json')
//d3.json('data/mt_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#mt_score',
        chartTitle: 'Performance na prova de Matemática em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/mt_scores_private.json')
//d3.json('data/mt_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#mt_score',
        chartTitle: 'Escolas privadas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/mt_scores_public.json')
//d3.json('data/mt_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#mt_score',
        chartTitle: 'Escolas públicas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/writing_scores_global.json')
//d3.json('data/writing_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#writing_score',
        chartTitle: 'Performance na redação em 2019 nos estados brasileiros'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/writing_scores_private.json')
//d3.json('data/writing_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#writing_score_private',
        chartTitle: 'Escolas privadas'
    })
})

d3.json('https://raw.githubusercontent.com/lukasmeirelles/lukasmeirelles.github.io/master/data/writing_scores_public.json')
//d3.json('data/writing_aggregated_scores.json')
.then(data => {
    render({ 
        data: data, 
        htmlComponent: '#writing_score_public',
        chartTitle: 'Escolas públicas'
    })
})

