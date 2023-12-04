import React from 'react'
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import classes from './StatisticsPieChart.module.css'

const StatisticsPieChart = ({ uniqueCategoryData, selectedMonth }) => {

    const COLORS = ['#6be4e3', '#f8df8c', '#8884d8']
    return (
        <section className={classes.mainContainer}>
            <h1 className={classes.heading}>Pie Chart Stats {selectedMonth ? `- ${selectedMonth}` : ''}</h1>
            <ResponsiveContainer width='100%' height={400}>
                <PieChart >
                    <Pie
                        data={uniqueCategoryData}
                        dataKey="itemCount"
                        nameKey="category"
                        cx="50%"
                        scy="50%"
                        outerRadius={80}

                    >
                        {
                            uniqueCategoryData.map((item, index) => (
                                <Cell key={index} fill={COLORS[index % 3]} />
                            ))
                        }

                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </section>
    )
}

export default StatisticsPieChart