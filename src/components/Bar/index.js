
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function Bar ({ title, xData, yData, style }) {
    const domRef = useRef()
    const chartInit = () => {
        var myChart = echarts.init(domRef.current)
        var option = {
            title: {
                text: title
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: yData
                }
            ]
        }
        myChart.setOption(option)
    }
    useEffect(() => {
        chartInit()
    }, [])
    return (
        <div>
            <div ref={domRef} style={style}>

            </div>
        </div>
    )
}

export default Bar