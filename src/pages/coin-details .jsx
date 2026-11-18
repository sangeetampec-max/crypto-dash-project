import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../component /Spinner'
import CoinChart from '../component /coinchart'
import { useShopLater } from '../context/ShopLaterContext'

const API_URL = import.meta.env.VITE_COIN_API_URL || '/api/coins'
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

const CoindetailsPage = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isSaved, toggleShopLater } = useShopLater()
    const saved = coin ? isSaved(coin.id) : false

    useEffect(() => {
        const fetchCoin = async () => {
            try {
               setLoading(true)
               setError(null)
               const headers = API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {}
               let res
               try {
                   res = await fetch(`${API_URL}/${id}`, { headers })
                   if (!res.ok && res.status !== 429) {
                       res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { headers })
                   }
               } catch {
                   res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, { headers })
               }

               if (!res.ok) {
                   if (res.status === 429) {
                       throw new Error('CoinGecko API rate limit reached (429). Please wait a moment and try again.')
                   }
                   throw new Error(`Unable to fetch coin details (${res.status})`)
               }

               const data = await res.json()
               setCoin(data)
            }
            catch (err) {
               setError(err.message)
            }
            finally {
               setLoading(false)
            }
        }

        fetchCoin()
    }, [id])

    
    return (
        <div className="coin-details-container onepiece-details">
            <Link to='/' className="back-home-link">&larr; Back to Log Pose (Home)</Link>
            <div className="details-bounty-badge">
                <span>☠️ GRAND LINE WANTED ARCHIVE</span>
            </div>
            <h1 className="h1 coins-details-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : `Coin Details`}
            </h1>
            {coin && !loading && (
                <div className="coin-details-actions">
                    <button
                        type="button"
                        className={`shop-later-details-btn ${saved ? 'saved' : ''}`}
                        onClick={() => toggleShopLater(coin)}
                    >
                        {saved ? '★ In Treasure Chest (Click to Remove)' : '💎 Add to Treasure Chest'}
                    </button>
                </div>
            )}
            {loading && <Spinner />}
            {error && <p className='error'>{error}</p>}
            {!loading && !error && coin && ( <>
             <div className="details-image-frame">
                 <img src={coin.image.large} 
                 alt ={coin.name}
                 className ='coin-details-image'
                  />
             </div>
              <p className="coin-details-description">
                  {coin.description?.en ? coin.description.en.split('.')[0] + '.' : 'A renowned cryptocurrency traversing the Grand Line.'}
              </p>
              <div className='coin-details-info'>
                <h3 className="details-primary-bounty">
                    Bounty: ฿ {coin.market_data.current_price.usd.toLocaleString()} <span className="usd-sub">(${coin.market_data.current_price.usd.toLocaleString()})</span>
                </h3>
                <h4>
                    Market Treasure: ${coin.market_data.market_cap.usd.toLocaleString()}
                </h4>
                <h4>
                    24h High Tide: ฿ {coin.market_data.high_24h.usd.toLocaleString()}
                </h4>
                <h4>
                    24h Low Tide: ฿ {coin.market_data.low_24h.usd.toLocaleString()}
                </h4>
                <h4>
                    24h Tide Change: {coin.market_data.price_change_percentage_24h >= 0 ? '▲ +' : '▼ '}
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </h4>
                <h4>
                    Circulating Bounty: {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                </h4>
                <h4>
                    Total Max Supply: {coin.market_data.total_supply?.toLocaleString() || 'Unlimited'}
               </h4>
              </div>
              <CoinChart coinId ={coin.id }/>

                            <div className="coin-details-links">
                                {coin.links?.homepage?.[0] && (
                                    <p>
                                        🌐{' '}
                                        <a
                                            href={coin.links.homepage[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Website
                                        </a>
                                    </p>
                                )}
                                {coin.links?.blockchain_site?.[0] && (
                                    <p>
                                        🧩{' '}
                                        <a
                                            href={coin.links.blockchain_site[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Blockchain Explorer
                                        </a>
                                    </p>
                                )}
                            </div>
                            {coin.categories?.length > 0 && (
                                <p>Categories: {coin.categories.join(', ')}</p>
                            )}

            </>)}
            {!loading && !error && !coin && <p>No Data Found!</p>}
        </div>
    );
};

export default CoindetailsPage;