library('jsonlite')

source("script/create_score_files.R")

set_up_scores_per_state <- function(real_candidates, analysis_type) {
  create_score_files(real_candidates, paste(analysis_type, "_global", sep = ""))
  create_score_files(real_candidates[real_candidates$school_type == 3,], paste(analysis_type, "_private", sep = ""))
  create_score_files(real_candidates[real_candidates$school_type == 2,], paste(analysis_type, "_public", sep = ""))
}
