setwd("C:/Users/lucasm/Desktop/enem_panel_using_d3")

source("script/set_up_scores_per_state.R")

file_path = "C:/Users/lucasm/Desktop/microdados_enem_2019/DADOS/MICRODADOS_ENEM_2019.csv"

original_dataset = read.csv(file_path, header = TRUE, sep = ";", stringsAsFactors = FALSE)

filtered_dataset = data.frame(
  id = original_dataset$NU_INSCRICAO,
  training = original_dataset$IN_TREINEIRO,
  state = original_dataset$SG_UF_PROVA,
  school_type = original_dataset$TP_ESCOLA,
  cn_presence = original_dataset$TP_PRESENCA_CN, cn_score = original_dataset$NU_NOTA_CN,
  ch_presence = original_dataset$TP_PRESENCA_CH, ch_score = original_dataset$NU_NOTA_CH,
  lc_presence = original_dataset$TP_PRESENCA_LC, lc_score = original_dataset$NU_NOTA_LC,
  mt_presence = original_dataset$TP_PRESENCA_MT, mt_score = original_dataset$NU_NOTA_MT,
  writing_status = original_dataset$TP_STATUS_REDACAO, writing_score = original_dataset$NU_NOTA_REDACAO,
  income_code = original_dataset$Q006
)

rm(original_dataset)

real_candidates = filtered_dataset[filtered_dataset$training==0,]
rm(filtered_dataset)

set_up_scores_per_state(real_candidates)

save_ch_scores(real_candidates[real_candidates$ch_presence == 1,])
save_cn_scores(real_candidates[real_candidates$cn_presence == 1,])
save_lc_scores(real_candidates[real_candidates$lc_presence == 1,])
save_mt_scores(real_candidates[real_candidates$mt_presence == 1,])
save_writing_scores(real_candidates[real_candidates$lc_presence == 1,])

























summary(real_candidates$NU_NOTA_CH)
summary(real_candidates$NU_NOTA_CN)
summary(real_candidates$NU_NOTA_LC)
summary(real_candidates$NU_NOTA_MT)
summary(real_candidates$NU_NOTA_REDACAO)


#dataset[dataset$CO_MUNICIPIO_RESIDENCIA==1504059,]["NU_INSCRICAO"]
#unique(dataset[dataset$IN_TREINEIRO==0 & dataset$CO_MUNICIPIO_RESIDENCIA==1504059,]["SG_UF_PROVA"])
#dataset[dataset$IN_TREINEIRO==0 & dataset$CO_MUNICIPIO_RESIDENCIA==1504059,][c("SG_UF_PROVA", "TP_PRESENCA_CH")]

NU_INSCRICAO

unique(dataset$TP_STATUS_REDACAO)
tst = dataset[dataset$IN_TREINEIRO==0 & dataset$TP_PRESENCA_LC==1 & dataset$TP_STATUS_REDACAO==1,]
tst2 = tst$NU_NOTA_REDACAO

max(tst$NU_NOTA_REDACAO)

tst = dataset[dataset$IN_TREINEIRO==0 & dataset$TP_PRESENCA_CN==1,]$NU_NOTA_CN

quantile(sort(tst))

max(dataset[dataset$IN_TREINEIRO==0 & dataset$TP_STATUS_REDACAO==1,]$NU_NOTA_REDACAO)
max(dataset$NU_NOTA_CN)
max(dataset$NU_NOTA_CH)
max(dataset$NU_NOTA_LC)
max(dataset$NU_NOTA_MT)

IN_TREINEIRO=0
TP_PRESENCA_CN=1
TP_PRESENCA_CH=1
TP_PRESENCA_LC=1
TP_PRESENCA_MT=1
TP_STATUS_REDACAO=1

SG_UF_PROVA
TP_ESCOLA
Q006
  
NU_NOTA_REDACAO
NU_NOTA_CN
NU_NOTA_CH
NU_NOTA_LC
NU_NOTA_MT