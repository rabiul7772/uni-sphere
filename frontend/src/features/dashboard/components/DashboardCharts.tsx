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

const PIE_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-5)'];

export const PieChartCard = ({
  title,
  data
}: {
  title: string;
  data: any[];
}) => {
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: PIE_COLORS[index % PIE_COLORS.length]
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
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle! * RADIAN);
                const y = cy + radius * Math.sin(-midAngle! * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-bold text-[10px]"
                  >
                    {`${((percent ?? 0) * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              labelLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                fontWeight: 600,
                color: 'var(--foreground)'
              }}
              itemStyle={{ color: 'var(--foreground)' }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              width="45%"
              iconSize={14}
              iconType="circle"
              wrapperStyle={{
                paddingLeft: '20px',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '24px'
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
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4"
            vertical={false}
            stroke="var(--border)"
          />
          <XAxis
            dataKey={xKey}
            tick={{
              fontSize: 12,
              fontWeight: 600,
              fill: 'var(--muted-foreground)'
            }}
            tickLine={true}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            tick={{
              fontSize: 12,
              fontWeight: 600,
              fill: 'var(--muted-foreground)'
            }}
            tickLine={true}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <Tooltip
            defaultIndex={4}
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontWeight: 600,
              color: 'var(--foreground)'
            }}
            itemStyle={{ color: 'var(--foreground)' }}
          />
          <Legend
            iconType="circle"
            iconSize={12}
            wrapperStyle={{ color: 'var(--foreground)' }}
          />
          <Area
            type="monotone"
            dataKey={yKey}
            name={label}
            stroke="var(--chart-2)"
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
            stroke="var(--border)"
          />
          <XAxis
            dataKey={xKey}
            tick={{
              fontSize: 12,
              fontWeight: 600,
              fill: 'var(--muted-foreground)'
            }}
            tickLine={false}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            tick={{
              fontSize: 12,
              fontWeight: 600,
              fill: 'var(--muted-foreground)'
            }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontWeight: 600,
              color: 'var(--foreground)'
            }}
            itemStyle={{ color: 'var(--foreground)' }}
            cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
          />
          <Legend
            iconType="circle"
            iconSize={12}
            wrapperStyle={{ color: 'var(--foreground)' }}
          />
          <Bar
            dataKey={yKey}
            name={label}
            fill="var(--chart-2)"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
