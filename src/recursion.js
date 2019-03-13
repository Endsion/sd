/* 递归相加 */
function sun(n){
  if(!isPositiveInteger(n)){
    return 0;
  }
  if(n === 1){
    return n; 
  }
  return sun(n-1)+n;
}
//是否为正整数
function isPositiveInteger(s){
  var re = /^[0-9]+$/ ;
  return re.test(s)
}