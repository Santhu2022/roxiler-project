import { useEffect, useState } from 'react';
import classes from './App.module.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function App() {

  const [searchText, setSearchText] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(3)
  const [pageNum, setPageNum] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    fetchData()
  }, [selectedMonth, pageNum])




  const fetchData = async () => {
    setShowLoader(true)
    const url = `http://localhost:3000/transactions?search=${searchText}&month=${selectedMonth}&page=${pageNum}&pageSize=10`
    try {
      const response = await fetch(url)
      const { data, hasNextPage } = await response.json()
      console.log(data, hasNextPage)
      setTransactions(data)
      setHasNextPage(hasNextPage)
    } catch (error) {
      console.log(error.message)

    } finally {
      setShowLoader(false)
    }
  }




  return (
    <div className={classes.mainContainer}>
      <div className={classes.appHeadingcontainer}>
        <p>Transaction Dashboard</p>
      </div>
      <div className={classes.subContainer} >
        <input
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={classes.seachInput}
        />
        <button
          type='button'
          onClick={() => fetchData()}
        >
          search
        </button>
        <select
          className={classes.monthDropdown}
          id='month'
          name='month'
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option key={0} value='' >All</option>
          {
            months.map((each, index) =>
              <option key={each} value={index + 1} >{each}</option>
            )
          }
        </select>
      </div>
      {
        pageNum > 1 &&
        <button
          type='button'
          onClick={() => setPageNum(prev => prev - 1)}
        >
          Prev
        </button>
      }
      {
        hasNextPage === true &&
        <button
          type='button'
          onClick={() => setPageNum(prev => prev + 1)}
        >
          Next
        </button>
      }
      {showLoader && <p>Loading...</p>}
    </div>
  );
}

export default App;
