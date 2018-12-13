const min = (a,b) => {
  const c = 3
  return (b-a)*c
}

module.exports = {
  cover(a, b) {
    if (a > b) {
      return a - b;
    }else if(a===b){
      return a
    }else{
      return min(a,b)
    }
  }
}
