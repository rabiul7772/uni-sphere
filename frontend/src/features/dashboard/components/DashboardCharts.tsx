import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#0088fe',
  '#00c49f'
];

export const PieChartCard = ({
  title,
  data
}: {
  title: string;
  data: any[];
}) => {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={coloredData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              cx="40%"
              cy="50%"
              paddingAngle={3}
              isAnimationActive={true}
              label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                fontWeight: 600
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              width="40%"
              iconSize={14}
              iconType="circle"
              wrapperStyle={{
                paddingLeft: '16px',
                fontSize: '14px',
                lineHeight: '28px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const AreaChartCard = ({
  title,
  data,
  xKey,
  yKey,
  label
}: {
  title: string;
  data: any[];
  xKey: string;
  yKey: string;
  label: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fontWeight: 600 }}
            tickLine={true}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fontWeight: 600 }}
            tickLine={true}
            axisLine={true}
          />
          <Tooltip
            defaultIndex={4}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontWeight: 600
            }}
          />
          <Legend iconType="circle" iconSize={12} />
          <Area
            type="monotone"
            dataKey={yKey}
            name={label}
            stroke="#8884d8"
            fill="url(#colorGradient)"
            strokeWidth={3}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const BarChartCard = ({
  title,
  data,
  xKey,
  yKey,
  label
}: {
  title: string;
  data: any[];
  xKey: string;
  yKey: string;
  label: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontWeight: 600
            }}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          />
          <Legend iconType="circle" iconSize={12} />
          <Bar
            dataKey={yKey}
            name={label}
            fill="#82ca9d"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
