library('jsonlite')

save_ch_scores <- function(array) {
  write_json(
    data.frame(array$state, array$school_type, array$ch_score, array$income_code), 
    "data/ch_full_scores.json"
  )
}

save_cn_scores <- function(array) {
  write_json(
    data.frame(array$state, array$school_type, array$cn_score, array$income_code), 
    "data/cn_full_scores.json"
  )
}

save_lc_scores <- function(array) {
  write_json(
    data.frame(array$state, array$school_type, array$lc_score, array$income_code), 
    "data/lc_full_scores.json"
  )
}

save_mt_scores <- function(array) {
  write_json(
    data.frame(array$state, array$school_type, array$mt_score, array$income_code), 
    "data/mt_full_scores.json"
  )
}

save_writing_scores <- function(array) {
  write_json(
    data.frame(array$state, array$school_type, array$writing_score, array$income_code), 
    "data/writing_full_scores.json"
  )
}