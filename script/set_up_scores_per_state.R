library('jsonlite')

source("script/create_score_files.R")

set_up_scores_per_state <- function(real_candidates) {
  create_score_files(real_candidates, "global")
  create_score_files(real_candidates[real_candidates$school_type == 3,], "private")
  create_score_files(real_candidates[real_candidates$school_type == 2,], "public")
}
