library('jsonlite')

source("script/score_extraction.R")

create_score_files <- function(array, file_id) {
  states = sort(unique(array$state))
  
  # CH Scores
  ch_scores = get_overall_ch_score(array[array$ch_presence == 1,])
  for (state in states) {
    temp = get_ch_score_for_state(state, array[array$state == state & array$ch_presence == 1,])
    
    ch_scores = rbind(ch_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(ch_scores, paste("data/ch_scores_", file_id, ".json",sep = ""))
  
  # CN Scores 
  cn_scores = get_overall_cn_score(array[array$cn_presence == 1,])
  for (state in states) {
    temp = get_cn_score_for_state(state, array[array$state == state & array$cn_presence == 1,])
    
    cn_scores = rbind(cn_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(cn_scores, paste("data/cn_scores_", file_id, ".json",sep = ""))
  
  # LC Scores 
  lc_scores = get_overall_lc_score(array[array$lc_presence == 1,])
  for (state in states) {
    temp = get_lc_score_for_state(state, array[array$state == state & array$lc_presence == 1,])
    
    lc_scores = rbind(lc_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(lc_scores, paste("data/lc_scores_", file_id, ".json",sep = ""))
  
  # MT Scores 
  mt_scores = get_overall_mt_score(array[array$mt_presence == 1,])
  for (state in states) {
    temp = get_mt_score_for_state(state, array[array$state == state & array$mt_presence == 1,])
    
    mt_scores = rbind(mt_scores, 
                      temp,
                      make.row.names = FALSE
    )
  }
  write_json(mt_scores, paste("data/mt_scores_", file_id, ".json",sep = ""))
  
  # Writing Scores 
  writing_scores = get_overall_writing_score(array[array$lc_presence == 1,])
  for (state in states) {
    temp = get_writing_score_for_state(state, array[array$state == state & array$lc_presence == 1,])
    
    writing_scores = rbind(writing_scores, 
                           temp,
                           make.row.names = FALSE
    )
  }
  write_json(writing_scores, paste("data/writing_scores_", file_id, ".json",sep = ""))
}