import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { IoIosSearch } from "react-icons/io";
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import { getStatistics, getStatisticsPriceRange, getStatisticsUniqueCategory, getTransactions } from './webservices/ApiController';
import PriceBarChart from './components/PriceBarChart';
import { monthsList } from './utilities/Constants';
import StatisticsPieChart from './components/StatisticsPieChart';




function App() {

  const [searchText, setSearchText] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(3) //Default March
  const [pageNum, setPageNum] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [showLoader, setShowLoader] = useState(true)
  const [statisticsData, setStatisticsData] = useState({})
  const [priceRangeData, setPriceRangeData] = useState([])
  const [uniqueCategoryData, setUniqueCategoryData] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [selectedMonth, pageNum])

  useEffect(() => {
    fetchStatistics()
    fetchPriceRangeStatistics()
    fetchUniqueCategoryStatistics()
  }, [selectedMonth])



  const fetchTransactions = async (searchStringEmpty) => {
    setShowLoader(true)
    const searchString = searchStringEmpty === true ? '' : searchText
    try {
      const { data, hasNextPage } = await getTransactions(searchString, selectedMonth, pageNum)
      setTransactions(data)
      setHasNextPage(hasNextPage)
    } catch (error) {
      console.log(error.message)
    } finally {
      setShowLoader(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const data = await getStatistics(selectedMonth)
      setStatisticsData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchPriceRangeStatistics = async () => {
    try {
      const data = await getStatisticsPriceRange(selectedMonth)
      setPriceRangeData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchUniqueCategoryStatistics = async () => {
    try {
      const data = await getStatisticsUniqueCategory(selectedMonth)
      setUniqueCategoryData(data)
    } catch (error) {
      console.log(error.message)
    }
  }



  const onSubmitSearch = (e) => {
    e.preventDefault()
    fetchTransactions()
  }

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      fetchTransactions(true) //searchStringEmpty
    }
  }

  const onChangeMonth = (e) => {
    setSelectedMonth(e.target.value)
    setPageNum(1)
  }

  return (
    <div className={classes.mainContainer}>

      <div className={classes.appHeadingcontainer}>
        <p>Transaction Dashboard</p>
      </div>
      {/* search and Month Selection */}
      <div className={classes.subContainer1} >
        <form className={classes.searchInput} onSubmit={onSubmitSearch}>
          <input
            type='text'
            value={searchText}
            placeholder='Search transaction'
            onChange={onChangeSearchText}
          />
          <button
            type='button'
            onClick={() => fetchTransactions()}
          >
            <IoIosSearch size={'1rem'} className={classes.searchIcon} />
          </button>
        </form>
        <select
          className={classes.monthDropdown}
          id='month'
          name='month'
          value={selectedMonth}
          onChange={onChangeMonth}
        >
          <option key={0} value='' >All</option>
          {
            monthsList.map((each, index) =>
              <option key={each} value={index + 1} >{each}</option>
            )
          }
        </select>
      </div>
      {/* Transactions Table */}
      <TransactionsTable
        transactions={transactions}
        showLoader={showLoader}
      />

      {/* Pagination */}
      <div className={classes.pageInfoContainer}>
        <p>Page No: {pageNum}</p>
        <div>
          {
            hasNextPage === true &&
            <button
              type='button'
              onClick={() => setPageNum(prev => prev + 1)}
            >
              Next
            </button>
          }
          {hasNextPage && pageNum > 1 && <p>-</p>}
          {
            pageNum > 1 &&
            <button
              type='button'
              onClick={() => setPageNum(prev => prev - 1)}
            >
              Previous
            </button>
          }
        </div>
        <p>Per Page: 10</p>
      </div>

      <Statistics
        selectedMonth={monthsList[selectedMonth - 1]}
        statisticsData={statisticsData}
      />

      <section className={classes.statisticsContainer}>
        <PriceBarChart
          priceRangeData={priceRangeData}
          selectedMonth={monthsList[selectedMonth - 1]}
        />
        <StatisticsPieChart
          uniqueCategoryData={uniqueCategoryData}
          selectedMonth={monthsList[selectedMonth - 1]}
        />
      </section>
    </div>
  );
}

export default App;
