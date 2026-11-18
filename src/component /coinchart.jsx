import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import Spinner from './Spinner'

ChartJS.register(
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip,
)

const API_URL = import.meta.env.VITE_COIN_API_URL || '/api/coins'
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

const Coinchart = ({ coinId }) => {
    const [prices, setPrices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true)
                setError(null)
                const headers = API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {}
                let response
                try {
                    response = await fetch(
                        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
                        { headers }
                    )
                    if (!response.ok && response.status !== 429) {
                        response = await fetch(
                            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
                            { headers }
                        )
                    }
                } catch {
                    response = await fetch(
                        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
                        { headers }
                    )
                }

                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error('Chart data rate limit reached (429). Please wait a moment.')
                    }
                    throw new Error(`Unable to fetch chart data (${response.status})`)
                }

                const data = await response.json()
                setPrices(data.prices || [])
            } catch (fetchError) {
                setError(fetchError.message)
            } finally {
                setLoading(false)
            }
        }

        fetchChartData()
    }, [coinId])


    if (loading) return <Spinner />
    if (error) return <p className="error">{error}</p>
    if (!prices.length) return <p>No chart data found.</p>

    const chartData = {
        datasets: [
            {
                label: 'Price (USD)',
                data: prices.map(([timestamp, price]) => ({
                    x: timestamp,
                    y: price,
                })),
                borderColor: '#58a6ff',
                backgroundColor: 'rgba(88, 166, 255, 0.15)',
                fill: true,
                pointRadius: 0,
                tension: 0.25,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: {
                type: 'time',
                time: { unit: 'day' },
            },
            y: {
                ticks: {
                    callback: (value) => `$${Number(value).toLocaleString()}`,
                },
            },
        },
    }

    return (
        <div className="coin-chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default Coinchart