get_region <- function(state) {
  switch(state,
         'AC' = 'N','AP' = 'N','AM' = 'N','PA' = 'N','RO' = 'N','RR' = 'N','TO' = 'N',
         'AL' = 'NE','BA' = 'NE','CE' = 'NE','MA' = 'NE','PB' = 'NE','PI' = 'NE','PE' = 'NE','RN' = 'NE','SE' = 'NE',
         'DF' = 'CO','GO' = 'CO','MT' = 'CO','MS' = 'CO',
         'ES' = 'SE','MG' = 'SE','SP' = 'SE','RJ' = 'SE',
         'PR' = 'S','RS' = 'S','SC' = 'S',
         NULL
  )
}