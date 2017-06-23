const Login = r => require.ensure([], () => r(require('./views/Login.vue')), 'group-index')
const NotFound = r => require.ensure([], () => r(require('./views/404.vue')), 'group-index')
const Home = r => require.ensure([], () => r(require('./views/Index.vue')), 'group-index')
const Main = r => require.ensure([], () => r(require('./views/Main.vue')), 'group-index')
const Table = r => require.ensure([], () => r(require('./views/nav1/Table.vue')), 'gra')
const Form = r => require.ensure([], () => r(require('./views/nav1/Form.vue')), 'group-nav1')
const User = r => require.ensure([], () => r(require('./views/nav1/User.vue')), 'group-nav1')
const Page4 = r => require.ensure([], () => r(require('./views/nav2/Page4.vue')), 'group-nav2')
const Page5 = r => require.ensure([], () => r(require('./views/nav2/Page5.vue')), 'group-nav2')
const Page6 = r => require.ensure([], () => r(require('./views/nav3/Page6.vue')), 'group-nav3')
const echarts = r => require.ensure([], () => r(require('./views/charts/echarts.vue')), 'group-charts')

/*通用*/
const Index = r=>require.ensure([],()=>r(require('./views/Index.vue')),'common')
/*学生端*/
const StudentList = r=>require.ensure([],()=>r(require('./student/views/CpStudents.vue')),'student')
const StudentLogin = r=>require.ensure([],()=>r(require('./student/views/Login.vue')),'student')
const StudentHome = r=>require.ensure([],()=>r(require('./student/views/Home.vue')),'student')
const StudentPoolBuild = r=>require.ensure([],()=>r(require('./student/views/ApplyPoolBuild.vue')),'student')
/*教师端*/
const TeacherLogin = r=>require.ensure([],()=>r(require('./teacher/views/Login.vue')),'teacher')
const TeacherHome = r=>require.ensure([],()=>r(require('./teacher/views/Home.vue')),'teacher')
const TeacherOpenApply = r=>require.ensure([],()=>r(require('./teacher/views/OpenApply.vue')),'teacher')
const DocTagList = r=>require.ensure([],()=>r(require('./teacher/views/DocTagList.vue')),'teacher')
const Upload = r=>require.ensure([],()=>r(require('./teacher/views/Upload.vue')),'teacher')





let routes = [
    {
        path: '/',
        component: Index,
        name: '',
        hidden: true
    },
    {
        path: '*',
        component: NotFound,
        name: '',
        hidden: true
    },
  {
    path: '/student',
    component: StudentHome,
    name: '学生功能',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {path:"/student/list",component:StudentList,name:'学生列表'},
      {path:"/student/ApplyPoolBuild",component:StudentPoolBuild,name:'建档申请'}
    ]
  },
  {
    path: '/student/login',
    component: StudentLogin,
    name: '',
    hidden: true
  },
  {
    path: '/teacher',
    component: TeacherHome,
    name: '教师功能',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {path:"/teacher/openApply",component:TeacherOpenApply,name:'开放申请'},
      {path:"/teacher/docTagList",component:DocTagList,name:'文档标签列表'},
      {path:"/teacher/upload",component:Upload,name:'测试上传'}
    ]
  },
  {
    path: '/teacher/login',
    component: TeacherLogin,
    name: '',
    hidden: true
  }
];

export default routes;
