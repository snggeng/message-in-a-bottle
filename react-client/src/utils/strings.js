import React from 'react'

export const asDollarString = (num) => {
  // console.log(`num: ${num} ${typeof num}`)
  if(num !== undefined) {
    return "$" + num.toFixed(2)
  }
  return undefined
}

export const asIngredientUnitString = (num, nativeUnits) => {
  if (num != undefined) {
    return num.toFixed(2) + " " + nativeUnits
  }
  return undefined
}

export const precisionRound = (num, precision) => {
  var factor = Math.pow(10, precision)
  return Math.round(num * factor) / factor
}

export const asCapitalizedString = (str) => {
  if(str === undefined) {
    return ''
  }
  return str.trim().toLowerCase().split(' ').map((w) => w[0].toUpperCase() + w.substr(1)).join(' ')
}

export const formatLabel = (label, value) => {
  if (!value) {
    return label;
  }
  return (<span>
    { label.split(value)
      .reduce((prev, current, i) => {
        if (!i) {
          return [current];
        }
        return prev.concat(<b key={value + current}>{ value }</b>, current);
      }, [])
    }
  </span>);
}

export const underscoresToSpaces = (str) => {
  if(str === undefined) {
    return ''
  }
  return str.split('_').join(' ')
}

export const spacesToUnderscores = (str) => {
  if(str === undefined) {
    return ''
  }
  return str.split(' ').join('_')
}

export const asLengthLimitedString = (str, n) => {
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

export const sanitizeNumber = (str) => {
  return parseFloat(str.replace(/[^\d\.\-]/g, ""))
}

export const validateIsNum = (str) => {
  return str.match(/^[+]?([0-9]*[.])?[0-9]+$/) != null
}

function decimalPlaces(n) {
  // Make sure it is a number and use the builtin number -> string.
  var s = "" + (+n);
  // Pull out the fraction and the exponent.
  var match = /(?:\.(\d+))?(?:[eE]([+\-]?\d+))?$/.exec(s);
  // NaN or Infinity or integer.
  // We arbitrarily decide that Infinity is integral.
  if (!match) { return 0; }
  // Count the number of digits in the fraction and subtract the
  // exponent to simulate moving the decimal point left by exponent places.
  // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
  // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
  return Math.max(
      0,  // lower limit.
      (match[1] == '0' ? 0 : (match[1] || '').length)  // fraction length
      - (match[2] || 0));  // exponent
}

export const asRounded = (num, prec) => {
  num = +num
  if(isNaN(num)) {
    return ''
  }
  let decs = decimalPlaces(num)
  if(decs < prec) {
    return num.toString()
  } else {
    return num.toFixed(prec)
  }
}
