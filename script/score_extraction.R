source("script/utils.R")

score_names = c('State', 'Region', 'Min', 'Perc25', 'Median', 'Mean', 'Perc75', 'Max')

cn_scores <- function(array) {
  ch_score = summary(array$ch_score)
  c(ch_score['Min.'] ,ch_score['1st Qu.'], ch_score['Median'], ch_score['Mean'], ch_score['3rd Qu.'], ch_score['Max.'])
}

get_overall_cn_score <- function(array) {
  temp = data.frame(t(c('Brasil', NA, cn_scores(array))))
  colnames(temp) = score_names
  temp
}

get_cn_score_for_state <- function(state, array) {
  temp = data.frame( t(c(state, get_region(state), cn_scores(array))) )
  colnames(temp) = score_names
  temp
}
