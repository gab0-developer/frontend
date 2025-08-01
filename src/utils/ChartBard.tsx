import { Box } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Props = {
    titiledashboard: string;
    subtitledata: string;
    labeldata: string[];
    datas: number[]; // CORREGIDO: debe ser number[]
    indexAxis: 'x' | 'y'; // CORREGIDO: solo acepta 'x' o 'y'
};

function ChartBard({ titiledashboard, subtitledata, labeldata, datas, indexAxis }: Props) {
    const options: ChartOptions<'bar'> = {
        indexAxis,
        responsive: true,
        animation: {
            duration: 1000, // En lugar de `true`, se debe definir como un objeto
        },
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: titiledashboard,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context: TooltipItem<'bar'>) {
                        return indexAxis === 'x'
                            ? `Value: ${context.parsed.y}`
                            : `Value: ${context.parsed.x}`;
                    },
                    title: function (tooltipItem: TooltipItem<'bar'>[]) {
                        return labeldata[tooltipItem[0].dataIndex];
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: 'rgba(0, 0, 0, 0.5)' },
            },
        },
    };

    const data = {
        labels: labeldata,
        datasets: [
            {
                label: subtitledata,
                data: datas,
                backgroundColor: [
                    '#ffc0cb', '#87ceeb', '#f3e5ab', '#98fb98', '#ffdab9',
                    '#f3e5ab', '#98eede', '#d8bfd8', '#a0d8ef', '#ffd700',
                    '#c1e1c1', '#ffdab9', '#eaeaea', '#ffdab9', '#add8e6',
                    '#cdecb8', '#e6e6fa', '#b0e0e6', '#ffef96', '#ffb6c1',
                    '#d0f0c0', '#afeeee', '#fdd5b1', '#ffdab9', '#afeeee',
                    '#f08080', '#d3d3d3', '#f3e5ab', 'skyblue', '#f0f8ff'
                ],
            },
        ],
    };

    return (
        <Box sx={{ width: '100%', my: '0.5rem', borderRadius: '7px', boxShadow: '0 8px  25px rgba(0,0,0,0.20)' }}>
            <Bar data={data} options={options} />
        </Box>
    );
}

export default ChartBard;
