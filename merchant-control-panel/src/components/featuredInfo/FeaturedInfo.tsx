import './featuredInfo.css'

export default function FeaturedInfo(props: {
  merchantNum: any
  paymentNum: any
  reefNum: any
}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Merchants</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.merchantNum}</span>
          <span className="featuredMoneyRate">
            {/* -11.4 <ArrowDownward  className="featuredIcon negative"/> */}
          </span>
        </div>
        <span className="featuredSub">Total merchant registered</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Payments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.paymentNum}</span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative"/> */}
          </span>
        </div>
        <span className="featuredSub">Total payments made</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">REEF</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.reefNum}</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon"/> */}
          </span>
        </div>
        <span className="featuredSub">Total REEF token transferred</span>
      </div>
    </div>
  )
}
