const svg = d3.select('#cn_score')

d3.json('data/cn_scores.json')
.then(data => {
	console.log(data)
})

