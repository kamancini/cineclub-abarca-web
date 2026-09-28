import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/articulos')({
  beforeLoad: () => {
    throw redirect({
      to: '/ensayos',
      replace: true,
    })
  },
})