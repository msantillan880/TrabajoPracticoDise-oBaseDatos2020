function asyncForLoop(numeroDeIteraciones, callback) {
    (function fnInterna(iteracionActual) {
        if (iteracionActual === numeroDeIteraciones) {
            return
        }
        callback(iteracionActual, ()=>{
            fnInterna(iteracionActual+1)
        })
    })(0)
}

module.exports = asyncForLoop