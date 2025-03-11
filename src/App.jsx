import { useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";


function App() {

  const [word, setWord] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(null)

  function searchWord(e) {
    e.preventDefault()

    setData(null)

    if(!word) {
      setError(true)
      setErrorMessage('Please Enter A Word!')
      return
    }
    else{
      setError(false)
    }
    
    setLoading(true)
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word.toLowerCase().trim()}`)
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('Word Not Found!')
        setError(true)
        setLoading(false)
      })

  }
  
  return (
    <>
      <header className='bg-base-100 p-8 flex flex-col gap-5 items-center'>
        <h1 className='text-4xl font-semibold text-base-content mb-8'>English Dictionary</h1>
        <form onSubmit={searchWord} className='flex gap-3 items-center~'>
          <input className="input input-lg" type="text" placeholder="Enter a word..." value={word} onChange={(e) => setWord(e.target.value)}/>
          <button type="submit" className='btn btn-success p-[21px]'>
            <FaSearch size={25} color='white'/>
          </button>
        </form>
      </header>
      <main className='container mx-auto p-8 flex flex-col items-center'>
        {loading && (
          <span className="loading loading-spinner loading-xl"></span>
        )}
        {error && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! {errorMessage}</span>
          </div>
        )}

        {data && (
          <div className="my-5 w-full max-w-md p-8 bg-base-300 rounded-lg shadow-lg flex flex-col gap-5">
            <h1 className='text-3xl text-base-content font-semibold underline'>{data[0].word}</h1>
            <div>
              <h2 className='text-accent text-xl font-semibold'>Parts of speech:</h2>
              <p className='text-base-content'>{data[0].meanings[0].partOfSpeech}</p>
            </div>
            <div className="">
              <h2 className='text-accent text-xl font-semibold mb-3'>Definitions:</h2>
              <ul>
                {data[0].meanings[0].definitions.map((definition, index) => (
                  <li key={index} className='mb-3'>
                    <p className='text-base-content'><b>{index + 1}.</b> {definition.definition}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              {data[0].meanings[0].definitions[0].example && (
                <>
                  <h2 className='text-accent text-xl font-semibold mb-3'>Examples:</h2>
                  {data[0].meanings[0].definitions.map((definition, index) => (
                    definition.example && <p key={index} className='text-base-content mb-3'><b>-</b> {definition.example}</p>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App
