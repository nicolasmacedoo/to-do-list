import { Header } from '@/components/Header'
import { NewTask } from '@/components/NewTask'
import { Tasks } from '@/components/Tasks'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

export interface TaskType {
  id: string
  title: string
  is_complete: boolean
  created_at: Date
  updated_at: Date
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([])

  async function loadTasks() {
    const response = await api.get('/tasks')
    setTasks(response.data)

    console.log(response.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-[736px] mx-auto flex flex-col items-center">
        <NewTask tasks={tasks} setTasks={setTasks} />
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  )
}
