import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../Hooks/useCrypto';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = () => {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: 500,
      }}
    >
      <Pie data={data} />
    </div>
  );
};
