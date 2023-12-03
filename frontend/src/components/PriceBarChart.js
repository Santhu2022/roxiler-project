import React from 'react'
import classes from './PriceBarChart.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';


const PriceBarChart = ({ priceRangeData, selectedMonth }) => {
    const data = [
        { range: '0-100', count: priceRangeData[0] },
        { range: '101-200', count: priceRangeData[1] },
        { range: '201-300', count: priceRangeData[2] },
        { range: '301-400', count: priceRangeData[3] },
        { range: '401-500', count: priceRangeData[4] },
        { range: '501-600', count: priceRangeData[5] },
        { range: '601-700', count: priceRangeData[6] },
        { range: '701-800', count: priceRangeData[7] },
        { range: '801-900', count: priceRangeData[8] },
        { range: '901 above', count: priceRangeData[9] }
    ]
    return (
        <section className={classes.mainContainer}>
            <h1 className={classes.heading}>Bar Chart Stats {selectedMonth ? `- ${selectedMonth}` : ''}</h1>
            <BarChart width={800} height={500} data={data} barCategoryGap={0} >
                <XAxis
                    dataKey="range"
                    angle={320}
                    tickLine={false}
                    tickMargin={20}
                    height={70}
                    axisLine={{ stroke: '#757c7c', strokeWidth: 0.2 }}
                    padding='no-gap'
                />
                <YAxis tickLine={false} axisLine={false} interval={0} />
                <CartesianGrid vertical={false} stroke="#757c7c" strokeDasharray={'0'} strokeWidth={0.1} strokeOpacity={0.8} />
                <Bar
                    dataKey="count"
                    radius={[5, 5, 0, 0]}
                    barSize={50}
                    fill={'#6be4e3'}
                />
            </BarChart>
        </section >
    )
}

export default PriceBarChart