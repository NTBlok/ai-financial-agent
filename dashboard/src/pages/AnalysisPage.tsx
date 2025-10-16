import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function AnalysisPage() {
  // Sample data for the portfolio allocation pie chart
  const allocationData = {
    labels: ['Stocks', 'Bonds', 'Cash', 'Crypto', 'Other'],
    datasets: [
      {
        data: [65, 15, 10, 5, 5],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(14, 165, 233, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the performance line chart
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio',
        data: [10000, 10200, 10800, 11200, 10500, 11500, 12000, 12500, 13000, 12800, 13200, 14000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'S&P 500',
        data: [10000, 10300, 10100, 10500, 10400, 10800, 11200, 11500, 11300, 11000, 11500, 12000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.05)',
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Allocation',
      },
    },
  };

  const stats = [
    { name: 'Total Return', value: '+12.5%', change: '+2.3%', changeType: 'positive' },
    { name: 'Volatility', value: '15.2%', change: '-0.8%', changeType: 'negative' },
    { name: 'Sharpe Ratio', value: '1.2', change: '+0.1', changeType: 'positive' },
    { name: 'Max Drawdown', value: '-8.5%', change: '-1.2%', changeType: 'negative' },
  ];

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">Detailed insights and performance metrics for your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <span className="material-icons">trending_up</span>
                    ) : (
                      <span className="material-icons">trending_down</span>
                    )}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stat.changeType === 'positive' ? (
                          <span className="material-icons text-green-500" style={{ fontSize: '16px' }}>arrow_upward</span>
                        ) : (
                          <span className="material-icons text-red-500" style={{ fontSize: '16px' }}>arrow_downward</span>
                        )}
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance vs Benchmark</h3>
          <div className="h-80">
            <Line options={options} data={performanceData} />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Allocation</h3>
          <div className="h-80 flex items-center justify-center">
            <Pie options={pieOptions} data={allocationData} />
          </div>
        </div>
      </div>

      {/* Additional Analysis Sections */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sector Allocation</h3>
          <div className="space-y-4">
            {[
              { name: 'Technology', value: 35, color: 'bg-blue-500' },
              { name: 'Healthcare', value: 20, color: 'bg-green-500' },
              { name: 'Financials', value: 15, color: 'bg-yellow-500' },
              { name: 'Consumer Discretionary', value: 12, color: 'bg-purple-500' },
              { name: 'Other', value: 18, color: 'bg-gray-300' },
            ].map((sector) => (
              <div key={sector.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{sector.name}</span>
                  <span className="font-medium">{sector.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${sector.color}`}
                    style={{ width: `${sector.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
