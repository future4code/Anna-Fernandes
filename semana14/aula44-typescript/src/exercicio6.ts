enum idadesHistoricas {
    PRE_HISTORIA = "Pré-História",
    ANTIGA = "Idade Antiga",
    MEDIA = "Idade Média",
    MODERNA = "Idade Moderna",
    CONTEMPORANEA = "Idade Contemporânea",
}

function funcaoQueDeterminaAIdadeHistorica(ano: number, sigla?: string): void  {
    if(sigla === undefined) {
        sigla = "dc";
    }
    
    if(sigla?.toLowerCase() === "ac") {
        if( ano > 100000 ) {
            "Não havia humanos nesse período."
        } else if(ano >= 4000) {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.PRE_HISTORIA}`)
        } else {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.ANTIGA}`)
        }

    } else {

        if(ano >= 0 && ano < 476) {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.ANTIGA}`)
        } else if (ano > 476 && ano < 1453) {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.MEDIA}`)
        } else if (ano >= 1453 && ano < 1789) {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.MODERNA}`)
        } else {
            console.log(`${ano} ${sigla} pertence à ${idadesHistoricas.CONTEMPORANEA}`)
        }
    }

}

console.log(funcaoQueDeterminaAIdadeHistorica(1500))