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
    <div className="flex flex-col min-h-screen bg-base-100">
      <div className='container mx-auto p-4 flex-grow'>
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
              <>
                {data[0].meanings.map((meaning, index) => (
                  <div key={index} className="my-5 w-full max-w-md p-8 bg-base-300 rounded-lg shadow-lg flex flex-col gap-5">
                    <h1 className='text-3xl text-base-content font-semibold underline'>{data[0].word}</h1>
                    <div>
                      <h2 className='text-accent text-xl font-semibold'>Parts of speech:</h2>
                      <p className='text-base-content'>{meaning.partOfSpeech}</p>
                    </div>
                    <div>
                      <h2 className='text-accent text-xl font-semibold mb-3'>Definitions:</h2>
                      <ul>
                        {meaning.definitions.map((definition, index) => (
                          <li key={index} className='mb-3'>
                            <p className='text-base-content'><b>{index + 1}.</b> {definition.definition}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                    {meaning.definitions.some((definition) => definition.example) && (
                      <div>
                        <h2 className="text-accent text-xl font-semibold mb-3">Examples:</h2>
                        {meaning.definitions.map(
                          (definition, index) =>
                            definition.example && (
                              <p key={index} className="text-base-content mb-3">
                                <b>-</b> {definition.example}
                              </p>
                            )
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </main>
        </div>
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-8">
              <aside>
                <p className="text-xl font-semibold">
                  Build by{" "}
                  <a className="text-accent" target='blank' href="https://github.com/BossNattawat">
                    BossNattawat
                  </a>
                </p>
              </aside>
        </footer>
    </div>
  )
}

export default App
