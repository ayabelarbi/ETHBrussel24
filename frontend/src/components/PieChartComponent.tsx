import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Element should be display in the vertical order
import { HStack } from '@chakra-ui/react';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title: string;
  data: any[];
  labels: string[];
}

const PieChartComponent = ({ title, data, labels }: PieChartProps) => {

    const options = {
        plugins: {
          legend: {
            labels: {
              color: 'white' // legend text color
            }
          }
        }
      };
    const chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FFD700', // bright yellow
              '#800080', // purple
              '#FF00FF', // magenta
              '#FFFF00', // yellow
              '#DA70D6', // orchid
              '#EE82EE'  // violet
            ],
            hoverBackgroundColor: [
              '#FFD700',
              '#800080',
              '#FF00FF',
              '#FFFF00',
              '#DA70D6',
              '#EE82EE'
            ]
          }
        ]
      };
  return (
    <HStack >
      <h2>{title}</h2>
      <Pie data={chartData} options={options} />
    </HStack>
  );
};

export default PieChartComponent;