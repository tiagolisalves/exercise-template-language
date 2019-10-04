const parseDictionaryTemplateLiterals = (dictionary, data) => {
    return Object.keys(dictionary)
        .filter(verificaTipo(dictionary))
        .map((key) => ({key: key, value : dictionary[key]}))
        .map(parseParam(dictionary, data))
        .reduce((acc, el) => 
            Object.assign(acc, {[el.key] : el.value}), {})     
   
}

function verificaTipo(dictionary){
    return function(key){
        return dictionary[key] && (typeof dictionary[key] === 'string' || typeof dictionary[key] === 'number')
    }
}

function parseParam(dictionary, data){
  return function(keyValue){
      if(typeof dictionary[keyValue.key] === 'number'){
          return keyValue
      }
      const regexp = /\{\{\s*(\w|\.|\[\d\])+\s*\}\}/g
      const match = dictionary[keyValue.key].match(regexp) || ['']
      const selectors = match.map(m => m.replace(/\{\{\s*/g, '').replace(/\s*\}\}/g, ''));      
      const value = selectors.reduce((acc,s) => acc.replace(new RegExp('\{\{\\s*' + s.replace(/(\[)/g, '\\[').replace(/(\])/g, '\\]') +'\\s*\}\}', 'gi'), objectAcessor(data, s)), dictionary[keyValue.key]);
      return {key : keyValue.key, value : value};     
  }
} 

function objectAcessor(obj, acessor){
    return acessor.replace(/(\[|\]\.*)/g, '.').replace(/\.$/g, '').split('.').reduce((acc,subAcessor) => acc ? acc[subAcessor] : undefined, obj) || ''
}

module.exports = parseDictionaryTemplateLiterals
