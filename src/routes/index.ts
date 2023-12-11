import { lazy } from 'react'
const Employees = lazy(() => import('../pages/Management/Employees/Employees'))
const EmployeeSkills = lazy(() => import('../pages/Management/Employees/Skills/EmployeeSkills'))
const Projects = lazy(() => import('../pages/Management/Projects/Projects'))
const Alerts = lazy(() => import('../pages/UiElements/Alerts'))
const Buttons = lazy(() => import('../pages/UiElements/Buttons'))
const Profile = lazy(() => import('../pages/Profile'))
const Settings = lazy(() => import('../pages/Settings'))
const ChartProjects = lazy(() => import('../pages/Dashboard/ChartProjects'))
const ChartEmployees = lazy(() => import('../pages/Dashboard/ChartEmployees'))
const DetailEmployee = lazy(() => import('../pages/Management/Employees/Details'))

const coreRoutes = [
  {
    path: '/chart-employees',
    title: 'Chart Employees',
    component: ChartEmployees
  },
  {
    path: '/detail-employee',
    title: 'Detail Employee',
    component: DetailEmployee
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
    path: '/management/employees/:id/skills',
    title: 'Employee Skills',
    component: EmployeeSkills
  },
  {
    path: '/management/projects',
    title: 'Projects Management',
    component: Projects
  },
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
