import { INavData } from '@coreui/angular';

export const listMenuReport: INavData[] = [
  {
    title: true,
    name: 'Báo cáo',
  },
  {
    name: 'Phát thải KNK ',
    url: '/reports/list-reports',
    icon: 'icon-chart',
  },
  {
    name: 'Tổng hợp tiêu thụ năng lượng của các lĩnh vực',
    url: '/reports/fields/list-reports',
    icon: 'icon-chart',
  },
  {
    name: 'Tổng hợp phát thải KNK cho các lĩnh vực',
    url: '/reports/emission-by-fields/list-reports',
    icon: 'icon-chart',
  },
  {
    name: 'Các chỉ tiêu tổng hợp',
    url: '/reports/indicators/detail',
    icon: 'icon-chart',
  },
];
