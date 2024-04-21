import { Flex } from "@/styles";
import Chart from "react-apexcharts";

type TStatsDatatype = {
  base_stat: number;
  stat: { name: string };
};

type IProps = {
  stats: TStatsDatatype[];
};

export default function PokemonStats({ stats }: IProps) {
  const statsHash = stats.reduce((acc, cv) => {
    return {
      ...acc,
      [cv.stat.name]: cv.base_stat,
    };
  }, {});

  return (
    <Flex justify="center">
      <Chart
        type="radar"
        series={[
          {
            name: "",
            data: Object.values(statsHash) as number[],
          },
        ]}
        options={{
          chart: {
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
            toolbar: {
              show: false,
            },
          },
          labels: Object.keys(statsHash).map((_) => {
            return _.replaceAll("-", " ").toUpperCase();
          }),
          plotOptions: {
            radar: {
              polygons: {
                fill: {
                  colors: ["#f8f8f8", "#fff"],
                },
              },
            },
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            labels: {
              style: {
                colors: Array(6).fill("#333"),
                fontSize: "10px",
                fontWeight: 500,
              },
            },
          },
          dataLabels: {
            enabled: true,
          },
        }}
        height={300}
        width={300}
      />
    </Flex>
  );
}
