import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarChartComponent=({data})=>{
    return(
        <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray='10 10 ' />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 3 }} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    )
}

export default BarChartComponent