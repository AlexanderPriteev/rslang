export const optionsCount = {
  series: [
    {
      name: 'Выучено слов',
      data: [30, 140, 195, 350, 449, 460, 570, 691, 725],
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
    size: 5,
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
    categories: ['Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя'],
  },
};

export const optionsDay = {
  series: [
    {
      name: 'Слов',
      data: [42, 68, 60, 88, 22, 56],
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
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#563C8A'],
    },
  },

  xaxis: {
    categories: ['18.08', '19.08', '20.08', '21.08', '22.08', '23.08'],
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
