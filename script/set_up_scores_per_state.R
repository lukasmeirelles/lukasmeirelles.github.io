library('jsonlite')

source("script/score_extraction.R")
source("script/save_full_scores.R")

set_up_scores_per_state <- function(real_candidates) {
  states = sort(unique(real_candidates$state))
  
  # CH Scores
  ch_scores = get_overall_ch_score(real_candidates[real_candidates$ch_presence == 1 & real_candidates$ch_score != 0,])
  for (state in states) {
    temp = get_ch_score_for_state(state, real_candidates[real_candidates$state == state & real_candidates$ch_presence == 1 & real_candidates$ch_score != 0,])
    
    ch_scores = rbind(ch_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(ch_scores, "data/ch_aggregated_scores.json")
  
  # CN Scores 
  cn_scores = get_overall_cn_score(real_candidates[real_candidates$cn_presence == 1 & real_candidates$cn_score != 0,])
  for (state in states) {
    temp = get_cn_score_for_state(state, real_candidates[real_candidates$state == state & real_candidates$cn_presence == 1 & real_candidates$cn_score != 0,])
    
    cn_scores = rbind(cn_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(cn_scores, "data/cn_aggregated_scores.json")
  
  # LC Scores 
  lc_scores = get_overall_lc_score(real_candidates[real_candidates$lc_presence == 1 & real_candidates$lc_score != 0,])
  for (state in states) {
    temp = get_lc_score_for_state(state, real_candidates[real_candidates$state == state & real_candidates$lc_presence == 1 & real_candidates$lc_score != 0,])
    
    lc_scores = rbind(lc_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(lc_scores, "data/lc_aggregated_scores.json")
  
  # MT Scores 
  mt_scores = get_overall_mt_score(real_candidates[real_candidates$mt_presence == 1 & real_candidates$mt_score != 0,])
  for (state in states) {
    temp = get_mt_score_for_state(state, real_candidates[real_candidates$state == state & real_candidates$mt_presence == 1 & real_candidates$mt_score != 0,])
    
    mt_scores = rbind(mt_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(mt_scores, "data/mt_aggregated_scores.json")
  
  # Writing Scores 
  writing_scores = get_overall_writing_score(real_candidates[real_candidates$lc_presence == 1 & real_candidates$writing_score != 0,])
  for (state in states) {
    temp = get_writing_score_for_state(state, real_candidates[real_candidates$state == state & real_candidates$lc_presence == 1 & real_candidates$writing_score != 0,])
    
    writing_scores = rbind(writing_scores, 
                           temp,
                           make.row.names = FALSE
    )
  }
  write_json(writing_scores, "data/writing_aggregated_scores.json")
}
