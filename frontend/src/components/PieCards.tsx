import PieChartComponent from './PieChartComponent';

function PieCards() {
  const title = 'Positions Distribution By Chain';
  const data = [30.7762, 25.994, 366.779, 624.84969, 268.33378, 2264.012,411.9574,693.14971];
  const labels = ['Base', 'binance-smart-chain', 'ethereum', 'optimism', 'polygon', 'scroll', 'xdai', 'zksync-era'];


  // const title2 = 'positions distribution by type';
  // const data2 = [4685.85, 0, 0, 0, 0];
  // const labels2 = ['wallet', 'deposited', 'borrowed', 'locked', 'staked'];

  return (
   
        <PieChartComponent title={title} data={data} labels={labels} />
    
  );
}

export default PieCards;