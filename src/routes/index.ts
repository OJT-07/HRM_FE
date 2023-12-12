import { lazy } from 'react'
const Employees = lazy(() => import('../pages/Management/Employees/Employees'))
const Projects = lazy(() => import('../pages/Management/Projects/Projects'))
const detailsProjects = lazy(() => import('../pages/Management/Projects/Details'))
// const detailsEmployee = lazy(() => import('../pages/Management/Employee/employeeDetails'))


const Alerts = lazy(() => import('../pages/UiElements/Alerts'))
const Buttons = lazy(() => import('../pages/UiElements/Buttons'))
const Profile = lazy(() => import('../pages/Profile'))
const Settings = lazy(() => import('../pages/Settings'))
const ChartProjects = lazy(() => import('../pages/Dashboard/ChartProjects'))
const ChartEmployees = lazy(() => import('../pages/Dashboard/ChartEmployees'))

const coreRoutes = [

  {
    path: '/chart-employees',
    title: 'Chart Employees',
    component: ChartEmployees
  },
  {
    path: '/chart-projets',
    title: 'Chart Projects',
    component: ChartProjects
  },
  {
    path: '/management/employees',
    title: 'Employees Management',
    component: Employees
  },
  {
    path: '/management/projects',
    title: 'Projects Management',
    component: Projects
  },
  {
    path: '/management/details/:id',
    title: 'Projects Management',
    component: detailsProjects
  },
  // {
  //   path: '/management/employee-details',
  //   title: 'Employee Management',
  //   component: detailsEmployee
  // },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings
  }
]

const routes = [...coreRoutes]
export default routes
