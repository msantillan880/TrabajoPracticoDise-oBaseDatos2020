// calcula el numero de fibonacci para el valor num


function getFib(num) {
    if (num === 0) {
      return 0;
    }
    else if (num === 1) {
      return 1;
    }
    else {
      return getFib(num - 1) + getFib(num - 2);
    }
}

module.exports.getFib = getFib;