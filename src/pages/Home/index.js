import './index.scss'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import Bar from '@/components/Bar'

function Home () {

    return (
        <div>
            <Bar
                title='主流框架'
                xData={['vue', 'react', 'angular']}
                yData={['30', '40', '50']}
                style={{ width: '500px', height: '500px' }}
            />
        </div>
    )

}

export default Home