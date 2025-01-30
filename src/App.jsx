import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [currencyfrom, setCurrencyfrom] = useState("1inch")
  const [currencyto, setcurrencyto] = useState('1inch')
  const [fromvalue, setFromvalue] = useState('')
  const [tovalue, setValueto] = useState('')
  const [msg, setMsg] = useState('')
  const [msg1, setMsg1] = useState("")

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data)
      })
  }, [])

  function check() {
    if (fromvalue == '') { alert("Please enter a number") } else {
      if (currencyfrom === currencyto) {
        alert("I am not allowing you to calculate the value because, you know the value right! So please kindly change any one currency name... ")
      } else {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyfrom}.json`)
          .then((response) => response.json())
          .then((data) => {
            setMsg(`${fromvalue} ${currencyfrom} is `)
            setValueto(fromvalue * data[currencyfrom][currencyto])
            setMsg1(`${currencyto}`)
          })
      }
    }
  }
  const checkvalue = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromvalue(value);
    }
  };
  const image = () => {
    setCurrencyfrom(currencyto)
    setcurrencyto(currencyfrom)
  }
  return (
    
      <div id="main">
        <h1>Currency Converter</h1>
        <div id="con2">
        <div id="first">
          <input type='text' placeholder='please enter value' value={fromvalue} onChange={checkvalue}></input>
        </div>
        <div id="second">
          <div>
            <select onChange={(ee) => setCurrencyfrom(ee.target.value)} value={currencyfrom}>
              {Object.entries(currencies).map(([code, name]) =>
                <option key={code} value={code}>
                  {name}
                </option>)}
            </select>
          </div>
          <div>
            <img src='https://png.pngtree.com/png-vector/20220609/ourmid/pngtree-isolated-reload-arrow-icon-from-white-background-png-image_4819629.png'
              width={"40"} onClick={image}></img>
          </div>
          <div>
            <select onChange={(event) => { setcurrencyto(event.target.value) }} value={currencyto}>
              {Object.entries(currencies).map(([code, name]) =>
                <option key={code} value={code}>
                  {name}
                </option>
              )}
            </select>
          </div>
        </div>
        <button onClick={check}>caluclate</button><br />
        <input type='tel' disabled value={`Converted value is ${tovalue} ${currencyto}`} id="ina"></input>
        <input type='tel' disabled value={`${msg} ${tovalue} ${msg1}`} id="in"></input>
        </div>
      </div>
    
  )
}

export default App
