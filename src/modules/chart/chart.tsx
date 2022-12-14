// @ts-nocheck
import React from "react";
import axios from "axios";
import styled from "styled-components";
import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
)

export const Container = styled.div`
  // display: flex;
  // justify-content: center;
  // align-content: stretch ;
  width:100vw;
  max-width: 1280px;

`;

interface ChartInt {
  dataType: string;
  color: string
}

class Chart extends React.Component<{}, { props:ChartInt, options:object }> {
  constructor(props: {} ) {
    super(props);
    this.state = { data: {
      datasets: [
        {
          data: [],
        },
      ],
    }, options: this.options };
  }

  options = {
    responsive: true,
    parsing: {
      xAxisKey: "time",
      yAxisKey: "data",
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: this.props.dataType ,
      },
    },
    scales: {
      x: {
          type: 'time',
      }
  }
  };

  componentDidMount() {
    axios.get(`http://s0.kajoj.com:8080/Data/` + this.props.dataType +`/24h/ChartData`).then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({
        data: {
          datasets: [
            {
              backgroundColor: this.props.color	,
              borderColor: this.props.color,
              data: data,
            },
          ],
        },
        options : this.options
      });
    });
  }
  render() {
    return <Container>
      <Line options={this.state.options} data={this.state.data} />
    </Container>;
  }
}

export default Chart;
