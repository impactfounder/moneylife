'use client'

import dynamic from 'next/dynamic'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
} from 'chart.js'

// 차트 등록을 한 번만 수행
let isRegistered = false

export const registerCharts = () => {
  if (!isRegistered && typeof window !== 'undefined') {
    ChartJS.register(
      ArcElement,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      RadialLinearScale,
      Filler
    )
    isRegistered = true
  }
}

// 로딩 플레이스홀더
function ChartPlaceholder({ height = 280 }: { height?: number }) {
  return (
    <div
      className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg animate-pulse"
      style={{ height }}
    />
  )
}

// 동적 차트 컴포넌트
export const DynamicPie = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    registerCharts()
    return mod.Pie
  }),
  {
    loading: () => <ChartPlaceholder />,
    ssr: false,
  }
)

export const DynamicBar = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    registerCharts()
    return mod.Bar
  }),
  {
    loading: () => <ChartPlaceholder />,
    ssr: false,
  }
)

export const DynamicLine = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    registerCharts()
    return mod.Line
  }),
  {
    loading: () => <ChartPlaceholder />,
    ssr: false,
  }
)

export const DynamicDoughnut = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    registerCharts()
    return mod.Doughnut
  }),
  {
    loading: () => <ChartPlaceholder />,
    ssr: false,
  }
)

export const DynamicRadar = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    registerCharts()
    return mod.Radar
  }),
  {
    loading: () => <ChartPlaceholder />,
    ssr: false,
  }
)
