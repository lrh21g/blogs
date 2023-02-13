# React-Router v6.x

## 基础使用

```js
// router/index.js

import React from 'react'
import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom'

const Home = React.lazy(() => import('@/views/Home'))
const Page1 = React.lazy(() => import('@/views/Page1'))
const Page2 = React.lazy(() => import('@/views/Page2'))

function Redirect({ to }) {
  let navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  })
  return null
}

const localRoutes = [
  {
    path: '/',
    element: <Navigate to="/home" replace />, // 重定向
    // element: <Redirect to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home/page1',
        element: <Page1 />,
      },
      {
        path: '/home/page2',
        element: <Page2 />,
      },
    ],
  },
]

const router = createBrowserRouter(localRoutes)

export default router
```

```js
// App.js

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './router'

export default function App() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
```

## 实现原理

![react_router](../files/images/react_router.drawio.png)
