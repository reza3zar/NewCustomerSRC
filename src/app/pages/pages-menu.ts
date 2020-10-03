import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'خانه',
    icon: 'home-outline',
    link: '/broker',
    roles:['broker','exchange','ime_legal'],
    home: true,
  },
  // {
  //   title: 'پروفایل',
  //   icon: 'shopping-cart-outline',
  //   link: '/pages/iot-dashboard',allCustomer
  // },
  {
    title: 'بورس کالا',
    icon: 'linkedin-outline',
    roles:['exchange','ime_legal'],

    group: true,
  },
  {
    title: 'استعلام اطلاعات',
    icon: 'eye-outline',
    roles:['exchange'],

    link: '/exchange/InquiriesComponent',
 
  },
  {
    title: ' بررسی درخواست کارگزاران',
    icon: 'layers-outline',
    roles:['exchange'],

    children: [
      {
        title: 'کارشناس پذیرش',
        link: '/exchange/requestOfBrokers',
        icon: 'person-add-outline',
        roles:['exchange'],
        
      },
      {
        title: 'سرپرست پذیرش',
        link: '/exchange/supervisorManagementRequests',
        icon: 'person-done-outline',
        roles:['exchange'],
        
      },
    ],
  },
  {
    title: ' بررسی درخواست وکیل/نماینده',
    icon: 'person-done-outline',
    roles:['exchange','ime_legal'],

    children: [
      {
        title: 'کارشناس حقوقی',
        link: '/exchange/legalUnitManagementOfAttorneyRequests',
        icon: 'person-add-outline',
        roles:['ime_legal'],
        
      },
      {
        title: 'سرپرست پذیرش',
        link: '/exchange/supervisorManagementOfAttorneyRequests',
        icon: 'person-done-outline',
        roles:['exchange'],
        
      },
    ],
  },
  {
    title: 'انتقال کدهای تایید شده',
    icon: 'swap-outline',
    roles:['exchange'],

    children: [
      {
        title: 'انتقال درخواست‌های باز',
        link: '/exchange/MigrateToOldSystems',
        icon: 'shake-outline',
        roles:['exchange'],
        
      },
 
    ],
  },
  {
    title: ' مدیریت مشتریان',
    icon: 'cast-outline',
    roles:['exchange'],
    children: [
      {
        title: 'تمامی مشتریان',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
       roles:['exchange'],
        
      },
      {
        title: 'مشتریان حقوقی',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
        roles:['exchange'],

      },
      {
        title: 'مشتریان حقیقی',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
        roles:['exchange'],

      },
    ],
  },
  {
    title: ' اطلاعات وکیل/نماینده',
    icon: 'people-outline',
    link: '/exchange/finalAttorneys',
    roles:['exchange','ime_legal'],

  },

  {
    title: 'گزارش گیری',
    icon: 'pie-chart-outline',
    link: '',
    roles:['broker','exchange','ime_legal'],

  },

  
  {
    title: 'عملیات کارگزاران',
    icon: 'people-outline',
    group: true,
    roles:['broker'],

  },
  {
    title: 'مدیریت درخواست‌ها',
    link: '/broker/request',
    icon: 'keypad-outline',
roles:['broker'],
    
  },
  {
    title: 'مدیریت وکیل/نماینده',
    link: '/broker/attorneyRequests',
    icon: 'person-done-outline',
     roles:['broker'],
    
  },
  {
    title: 'اطلاعات وکیل/نماینده',
    link: '/broker/finalAttorneys',
    icon: 'people-outline',
     roles:['broker'],
    
  },
  {
    title: 'تمامی مشتریان',
     link: '/broker/allCustomer',
    icon: 'checkmark-square-outline',
roles:['broker'],
    
  },
  {
    title: 'تنظیمات',
    icon: 'settings-2-outline',
    link: '',
    roles:['broker','exchange','ime_legal'],

  },

  {
    title: 'خروج',
    roles:['broker','exchange','ime_legal'],
    
    icon: 'power-outline',
    link: '',
  },
 
  // { 
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
