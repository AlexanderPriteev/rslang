export const optionsCount = (values: number[], dates: string[]) =>{
  return {
    series: [
      {
        name: 'Выучено слов',
        data: values,
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: values.length < 22 ? 5 : 0,
      colors: ['#AF95E6'],
      strokeColor: '#AF95E6',
    },
    colors: ['#AF95E6'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    xaxis: {
      categories: dates,
      labels: {
        show: values.length < 22,
      }
    },
  };
}


export const optionsDay = (values: number[], dates: string[] ) => {
  return {
    series: [
      {
        name: 'Слов',
        data: values,
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      height: 350,
      type: 'bar',
    },
    colors: ['#AF95E6'],
    plotOptions: {
      bar: {
        borderRadius: 0,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: values.length < 22,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#563C8A'],
      },
    },

    xaxis: {
      categories: dates,
      labels: {
        show: values.length < 22,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
    },
  };
}
