import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from "react-google-charts";

const Analytics = () => {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const d = [["Name", "Number of deals"]]
    const d2 = [["Pair", "Number of Deals"]]
    const history = useNavigate()
    const showAnalytics = () => {
        fetch('http://localhost:3001/analytics1')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('Analytics cant load..Try Later');
                    setTimeout(() => history('/home'), 500);
                }
            })
            .then((jsonRes) => {
                for (var i = 0; i < jsonRes.counts.length; i = i + 2) {
                    const x = []
                    x.push(jsonRes.counts[i + 1], jsonRes.counts[i])
                    d.push(x)

                }
                setData1(d)
                // console.log(data);
            })
            .catch((e) => {
                console.log('Analytics cant load..Try Later', e);
                setTimeout(() => history('/home'), 500);
            });
        fetch('http://localhost:3001/analytics2')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('Analytics cant load..Try Later');
                    setTimeout(() => history('/home'), 500);
                }
            })
            .then((jsonRes) => {
                for (var i = 0; i < jsonRes.counts.length; i = i + 3) {
                    if (jsonRes.counts[i] != 0) {
                        const x = []
                        x.push(jsonRes.counts[i + 1] + '-' + jsonRes.counts[i + 2], jsonRes.counts[i])
                        d2.push(x)
                    }
                }
                
                setData2(d2)
                console.log(d2)
            })
            .catch((e) => {
                console.log('Analytics cant load..Try Later', e);
                setTimeout(() => history('/home'), 500);
            });
    }
    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data1}
                options={{
                    title: 'My Daily Activities',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={data2}
                options={{
                    title: 'PartnerShips',
                    chartArea: { width: '50%' },
                    hAxis: {
                        title: 'Total Deals',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Partners',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '1' }}
            />

            <button onClick={showAnalytics}>Show</button>
        </div>
    );
};

export default Analytics;