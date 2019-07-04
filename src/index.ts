import request = require('request-promise')

const composer : string = 'https://coccoc.com/composer'
const requester : any = request.defaults({
  headers: {
    'Cookie': 'serp_version=26028468/8f8349e;',
    'Referer': 'https://coccoc.com/search'
  },
  json: true,
  strictSSL: true
})

interface QueryString {
  q: string,
  _: number,
  reqid: string
}

enum Errors {
  CannotSolve = 'Cannot solve this problem'
}

// Sample call: solve('x+y=3,2x+3y=4')
// Find for example query: https://coccoc.com/search/math
const solve = async (q : string) : Promise<string> => {
  const qs : QueryString = {
    q: q,
    _: (new Date()).getTime(),
    reqid: Math.random().toString(36).substring(7)
  }
  const response = await requester(composer, { qs })
  return (response.math === null) ? Errors.CannotSolve : response.math
}