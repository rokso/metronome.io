import { connect } from 'react-redux'
import BigNumber from 'bignumber.js'
import React from 'react'

import AuctionCounterSm from './AuctionCounterSm'
import AuctionMetAvailableSm from './AuctionMetAvailableSm'
import EthValue from './EthValue'
import metIcon from '../img/light.svg'

function AuctionSummary (props) {
  const {
    currentPrice,
    lastPurchasePrice,
    onBuyMetronomeClick,
    tokensRemaining
  } = props

  const isAuctionInProgress = !(new BigNumber(tokensRemaining).eq(0))

  return (
    <div className="AuctionInProgress" style={{ height: 430, marginBottom: 154 }}>
      <div className="overview__met-container" style={{ bottom: 'auto' }}>
        <div className="overview__price-container">
          <span className="overview__current-auction-price">
            {isAuctionInProgress ? 'Current Auction Price' : 'Last Purchase Price'}
          </span>
          <span className="overview__eth-price">
            <EthValue>{isAuctionInProgress ? currentPrice : lastPurchasePrice}</EthValue>
          </span>
        </div>
        <div className="overview__met-container--inner">
          <div className="overview__met-header">
            <div className="overview__met-header--inner">
              <div className="overview__met-icon">
                <img alt='m' src={metIcon} />
              </div>
              <span className="overview__met-container-title">
                Metronome (MET)
              </span>
            </div>
          </div>
          <div className="overview__time-left-container">
            <div className="overview__time-left-remaining">
              <div className="overview__time-left-remaining--inner">
                <AuctionCounterSm />
              </div>
            </div>
            <div className="overview__time-left-available">
              <div className="overview__time-left-available--inner">
                <AuctionMetAvailableSm />
              </div>
            </div>
          </div>
          <div className="overview__buy-met">
            <div className="overview__buy-met--inner">
              <button
                className={`btn ${isAuctionInProgress ? '' : 'btn-disabled'}`}
                disabled={!isAuctionInProgress}
                style={{ borderColor: '#fff', color: '#7e61f8' }}
                onClick={onBuyMetronomeClick}>
                Buy Metronome
              </button>
            </div>
          </div>
          <div className="overview__visit-dashboard">
            <a href="/dashboard.html">Visit Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return state.auction.status
}

const mapDispatchToProps = dispatch => ({
  onBuyMetronomeClick: () => dispatch({ type: 'SHOW_BUY_PANEL', payload: true })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionSummary)
