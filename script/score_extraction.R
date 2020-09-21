source("script/utils.R")

score_names = c('State', 'Region', 'Min', 'Perc25', 'Median', 'Mean', 'Perc75', 'Max', 'Zeros')

# CH scores
ch_scores <- function(array) {
  ch_score = summary(array$ch_score)
  c(ch_score['Min.'] ,ch_score['1st Qu.'], ch_score['Median'], ch_score['Mean'], ch_score['3rd Qu.'], ch_score['Max.'])
}

get_overall_ch_score <- function(array) {
  total = nrow(array)
  zeros = nrow(array[array$ch_score == 0,])
  
  temp = data.frame(t(c('Brasil', NA, ch_scores(array[array$ch_score != 0,]), zeros/total)))
  colnames(temp) = score_names
  temp
}

get_ch_score_for_state <- function(state, array) {
  total = nrow(array)
  zeros = nrow(array[array$ch_score == 0,])
  
  temp = data.frame( t(c(state, get_region(state), ch_scores(array[array$ch_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

# CN scores
cn_scores <- function(array) {
  cn_score = summary(array$cn_score)
  c(cn_score['Min.'] ,cn_score['1st Qu.'], cn_score['Median'], cn_score['Mean'], cn_score['3rd Qu.'], cn_score['Max.'])
}

get_overall_cn_score <- function(array) {
  total = nrow(array)
  zeros = nrow(array[array$cn_score == 0,])
  
  temp = data.frame(t(c('Brasil', NA, cn_scores(array[array$cn_score != 0,]), zeros/total)))
  colnames(temp) = score_names
  temp
}

get_cn_score_for_state <- function(state, array) {
  total = nrow(array)
  zeros = nrow(array[array$cn_score == 0,])
  
  temp = data.frame( t(c(state, get_region(state), cn_scores(array[array$cn_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

# LC scores
lc_scores <- function(array) {
  lc_score = summary(array$lc_score)
  c(lc_score['Min.'] ,lc_score['1st Qu.'], lc_score['Median'], lc_score['Mean'], lc_score['3rd Qu.'], lc_score['Max.'])
}

get_overall_lc_score <- function(array) {
  total = nrow(array)
  zeros = nrow(array[array$lc_score == 0,])
  
  temp = data.frame(t(c('Brasil', NA, lc_scores(array[array$lc_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

get_lc_score_for_state <- function(state, array) {
  total = nrow(array)
  zeros = nrow(array[array$lc_score == 0,])
  
  temp = data.frame( t(c(state, get_region(state), lc_scores(array[array$lc_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

# MT scores
mt_scores <- function(array) {
  mt_score = summary(array$mt_score)
  c(mt_score['Min.'] ,mt_score['1st Qu.'], mt_score['Median'], mt_score['Mean'], mt_score['3rd Qu.'], mt_score['Max.'])
}

get_overall_mt_score <- function(array) {
  total = nrow(array)
  zeros = nrow(array[array$mt_score == 0,])
  
  temp = data.frame(t(c('Brasil', NA, mt_scores(array[array$mt_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

get_mt_score_for_state <- function(state, array) {
  total = nrow(array)
  zeros = nrow(array[array$mt_score == 0,])
  
  temp = data.frame( t(c(state, get_region(state), mt_scores(array[array$mt_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

# Writing scores
writing_scores <- function(array) {
  writing_score = summary(array$writing_score)
  c(writing_score['Min.'] ,writing_score['1st Qu.'], writing_score['Median'], writing_score['Mean'], writing_score['3rd Qu.'], writing_score['Max.'])
}

get_overall_writing_score <- function(array) {
  total = nrow(array)
  zeros = nrow(array[array$writing_score == 0,])
  
  temp = data.frame(t(c('Brasil', NA, writing_scores(array[array$writing_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}

get_writing_score_for_state <- function(state, array) {
  total = nrow(array)
  zeros = nrow(array[array$writing_score == 0,])
  
  temp = data.frame( t(c(state, get_region(state), writing_scores(array[array$writing_score != 0,]), zeros/total)) )
  colnames(temp) = score_names
  temp
}
