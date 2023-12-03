import React from 'react'
import classes from './Statistics.module.css'

const Statistics = ({ selectedMonth, statisticsData }) => {
    const { totalSale, totalSold, totalNotSold } = statisticsData
    return (
        <section className={classes.mainContainer}>
            <h1 className={classes.heading}>Statistics {selectedMonth ? `- ${selectedMonth}` : ''}</h1>
            <table className={classes.statisticsTable}>
                <tbody>
                    <tr>
                        <td>Total sale</td>
                        <td>{totalSale}</td>
                    </tr>
                    <tr>
                        <td>Total sold item</td>
                        <td>{totalSold}</td>
                    </tr>
                    <tr>
                        <td>Total not sold item</td>
                        <td>{totalNotSold}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Statistics