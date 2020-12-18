export const usersData = [
  {
    email: 'ppldhsp@gmail.com',
    password: '123456',
    uid: '0001',
    name: 'test',
    type: 'Admin',
    accessToken: 'TEST-TOKEN',
  },
  {
    email: 'admin@gmail.com',
    password: '123456',
    uid: '0001',
    name: 'test',
    type: 'Admin',
    accessToken: 'TEST-TOKEN',
  },
  {
    email: 'doanhnghiep@gmail.com',
    password: '123456',
    uid: '0001',
    name: 'test',
    type: 'Enterprise',
    accessToken: 'TEST-TOKEN',
  },
];

export let listEnterprises = [
  {
    id: 1,
    name: 'Công ty trách nhiệm hữu hạn An Phát',
    province: 'Hà Nội',
    district: 'Lâm Đồng',
    town: 'Đồng Nam',
    xCoordinate: '122SSDE',
    yCoordinate: '121212AF',
    productionValue: '1212',
    employees: '1212',
    fieldId: 1,
    branches: [{ id: 1, name: 'Khai thác than' }],
    energies: [
      { energyId: 1, volume: '212' },
      { energyId: 2, volume: '121' },
      { energyId: 3, volume: '2' },
      { energyId: 4, volume: '12' },
      { energyId: 5, volume: '12' },
      { energyId: 6, volume: '12' },
      { energyId: 7, volume: '121' },
      { energyId: 8, volume: '2' },
    ],
    productions: [
      { productionId: 1, volume: '121' },
      { productionId: 2, volume: '21' },
    ],
  },
  {
    id: 2,
    name: 'Công ty đầu tư cổ phần Thịnh Vượng',
    province: 'Bắc Ninh',
    district: 'Bắc Giang',
    town: 'Hà Nam',
    xCoordinate: 'ADDDA',
    yCoordinate: 'AADDSS',
    productionValue: '1212212',
    employees: '12121212',
    fieldId: 1,
    branches: [{ id: 2, name: 'Khai thác dầu khí' }],
    energies: [
      { energyId: 1, volume: '21' },
      { energyId: 2, volume: '3443' },
      { energyId: 3, volume: '78' },
      { energyId: 4, volume: '12' },
      { energyId: 5, volume: '87' },
      { energyId: 6, volume: '8' },
      { energyId: 7, volume: '9' },
      { energyId: 8, volume: '69' },
    ],
    productions: [
      { productionId: 4, volume: '1212' },
      { productionId: 5, volume: '2222' },
      { productionId: 6, volume: '1221' },
      { productionId: 7, volume: '2122' },
    ],
  },
  {
    id: 3,
    name: 'Công ty nhiều thành viên Đại Thắng',
    province: 'Tây Ninh',
    district: 'Tây Hạ',
    town: 'Tây Hồ',
    xCoordinate: 'BBABABA',
    yCoordinate: 'BBAAAAS',
    productionValue: '232',
    employees: '4432',
    fieldId: 1,
    branches: [
      { id: 2, name: 'Khai thác dầu khí' },
      { id: 1, name: 'Khai thác than' },
    ],
    energies: [
      { energyId: 1, volume: '212' },
      { energyId: 2, volume: '87' },
      { energyId: 3, volume: '8' },
      { energyId: 4, volume: '96' },
      { energyId: 5, volume: '87' },
      { energyId: 6, volume: '8' },
      { energyId: 7, volume: '68' },
      { energyId: 8, volume: '69' },
    ],
    productions: [
      { productionId: 4, volume: '97' },
      { productionId: 5, volume: '2222' },
      { productionId: 6, volume: '12212' },
      { productionId: 7, volume: '212' },
      { productionId: 1, volume: '212' },
      { productionId: 2, volume: '21' },
    ],
  },
  {
    id: 4,
    name: 'Công ty vật tư Hoàng Thắng',
    province: 'Nam Định',
    district: 'Định Tường',
    town: 'Tường Long',
    xCoordinate: 'ANNA#@A',
    yCoordinate: 'ANESIK#A',
    productionValue: '21',
    employees: '12',
    fieldId: 2,
    branches: [{ id: 3, name: 'CN sản xuất sắt thép' }],
    energies: [
      { energyId: 1, volume: '12' },
      { energyId: 2, volume: '2' },
      { energyId: 3, volume: '12' },
      { energyId: 4, volume: '12' },
      { energyId: 5, volume: '12' },
      { energyId: 6, volume: '12' },
      { energyId: 7, volume: '12' },
      { energyId: 8, volume: '12' },
    ],
    productions: [
      { productionId: 8, volume: '12' },
      { productionId: 9, volume: '12' },
      { productionId: 10, volume: '121' },
      { productionId: 11, volume: '2' },
      { productionId: 12, volume: '12' },
      { productionId: 13, volume: '12' },
      { productionId: 14, volume: '12' },
      { productionId: 15, volume: '12' },
      { productionId: 16, volume: '121' },
      { productionId: 17, volume: '12' },
      { productionId: 18, volume: '18' },
    ],
  },
];

export let listFields = [
  {
    id: 1,
    name: 'Khai khoáng',
    listBranches: [
      {
        id: 1,
        name: 'Khai thác than',
        listProduct: [
          {
            productionId: 1,
            name: 'Than khai thác hầm lò',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 2,
            name: 'Than khai thác lộ thiên',
            unit: 'Nghìn tấn',
          },
        ],
      },
      {
        id: 2,
        name: 'Khai thác dầu khí',
        listProduct: [
          {
            productionId: 4,
            name: 'Dầu thô',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 5,
            name: 'Khí đồng hành',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 6,
            name: 'Khí không đồng hành',
            unit: 'Tr.m3',
          },
          {
            productionId: 7,
            name: 'Khí không thành phẩm',
            unit: 'Tr.m3',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Chế biến, chế tạo',
    listBranches: [
      {
        id: 3,
        name: 'CN sản xuất sắt thép',
        listProduct: [
          {
            productionId: 8,
            name: 'Axit nitric (HNO3)',
            unit: 'Tấn',
          },
          {
            productionId: 9,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất HNO3',
            unit: 'Tấn',
          },
          {
            productionId: 10,
            name: 'Axit adipic (C6H10O4)',
            unit: 'Tấn',
          },
          {
            productionId: 11,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất C6H10O4',
            unit: 'Tấn',
          },
          {
            productionId: 12,
            name: 'Amoniac (NH3)',
            unit: 'Tấn',
          },
          {
            productionId: 13,
            name: 'Khí dùng làm nguyên liệu cho sản xuất NH3',
            unit: 'Tấn',
          },
          {
            productionId: 14,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất NH3',
            unit: 'Tấn',
          },
          {
            productionId: 15,
            name: 'Canxi cácbua (CaC2)',
            unit: 'Tấn',
          },
          {
            productionId: 16,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất CaC2',
            unit: 'Tấn',
          },
          {
            productionId: 17,
            name: 'Sản xuất Na2CO3',
            unit: 'Tấn',
          },
          {
            productionId: 18,
            name: 'Sử dụng Na2CO3',
            unit: 'Tấn',
          },
        ],
      },
      {
        id: 4,
        name: 'CN sản xuất hóa chất và dầu mỏ ',
        listProduct: [
          {
            productionId: 18,
            name: 'Gang',
            unit: 'Tấn',
          },
          {
            productionId: 19,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất gang',
            unit: 'Tấn',
          },
          {
            productionId: 20,
            name: 'Thép',
            unit: 'Tấn',
          },
          {
            productionId: 21,
            name: 'Than cốc dùng làm nguyên liệu cho sản xuất thép',
            unit: 'Tấn',
          },
          {
            productionId: 22,
            name: 'Hợp kim chứa sắt',
            unit: 'Tấn',
          },
          {
            productionId: 23,
            name: 'Nhôm (Al)',
            unit: 'Tấn',
          },
          {
            productionId: 24,
            name: 'Khí SF6 sử dụng trong luyện Al',
            unit: 'm³',
          },
          {
            productionId: 25,
            name: 'Magie (Mg)',
            unit: 'Tấn',
          },
          {
            productionId: 26,
            name: 'Khí SF6 sử dụng trong luyện Mg',
            unit: 'm³',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Khai khoáng',
    listBranches: [
      {
        id: 1,
        name: 'Khai thác than',
        listProduct: [
          {
            productionId: 1,
            name: 'Than khai thác hầm lò',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 2,
            name: 'Than khai thác lộ thiên',
            unit: 'Nghìn tấn',
          },
        ],
      },
      {
        id: 2,
        name: 'Khai thác dầu khí',
        listProduct: [
          {
            productionId: 4,
            name: 'Dầu thô',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 5,
            name: 'Khí đồng hành',
            unit: 'Nghìn tấn',
          },
          {
            productionId: 6,
            name: 'Khí không đồng hành',
            unit: 'Tr.m3',
          },
          {
            productionId: 7,
            name: 'Khí không thành phẩm',
            unit: 'Tr.m3',
          },
        ],
      },
    ],
  }
];

export let energyConsumption = [
  {
    id: 1,
    name: 'Than antraxit',
    unit: 'Nghìn tấn',
  },
  {
    id: 2,
    name: 'Than bitum',
    unit: 'Nghìn tấn',
  },
  {
    id: 3,
    name: 'Dầu hỏa',
    unit: 'Nghìn tấn',
  },
  {
    id: 4,
    name: 'Dầu DO',
    unit: 'Nghìn tấn',
  },
  {
    id: 5,
    name: 'Dầu FO',
    unit: 'Nghìn tấn',
  },
  {
    id: 6,
    name: 'LPG',
    unit: 'Nghìn tấn',
  },
  {
    id: 7,
    name: 'Khí sinh học',
    unit: 'Nghìn tấn',
  },
  {
    id: 8,
    name: 'Khí sinh khối',
    unit: 'Nghìn tấn',
  },
];

export let listReportEnergizer = [
  {
    yearDeclare: 2020,
    enterpriseName: 'DHBK',
    taxCode: 34324234324,
    address: 'abc',
    productMajor: 'aslfsakfs',
    employeesPerYear: 123,
    co2Electric: 343,
    energyProcess: {
      co2: 33,
      ch4: 12,
      n2o: 30,
    },
    productionProcess: {
      co2: 33,
      ch4: 12,
      n2o: 30,
    },
    co2Total: 235,
  },
  {
    yearDeclare: 2020,
    enterpriseName: 'ABC',
    taxCode: 34324234324,
    address: 'abc',
    productMajor: 'aslfsakfs',
    employeesPerYear: 123,
    co2Electric: 343,
    energyProcess: {
      co2: 33,
      ch4: 12,
      n2o: 30,
    },
    productionProcess: {
      co2: 33,
      ch4: 12,
      n2o: 30,
    },
    co2Total: 235,
  },
];
