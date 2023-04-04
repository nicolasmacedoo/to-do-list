import { api } from '@/lib/axios'
import { TaskType } from '@/pages'
import Image from 'next/image'
import clipboard from '../../public/clipboard.png'
import { Task } from './Task'
import { Dispatch, SetStateAction } from 'react'

interface TasksProps {
  tasks: TaskType[]
  setTasks: Dispatch<SetStateAction<TaskType[]>>
}

export function Tasks({ tasks, setTasks }: TasksProps) {
  async function onDeleteTask(id: string) {
    await api.delete(`/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id))
    })
  }

  async function onCompleteTask(id: string) {
    await api.patch(`/tasks/${id}/complete`).then((response) => {
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)))
    })
  }

  const isListTasksEmpty = tasks.length === 0
  const numberCreatedTasks = tasks.length
  const numberCompletedTasks = tasks.filter((task) => task.is_complete).length

  return (
    <>
      <div className="w-full flex justify-between mt-16 mb-6">
        <div className="flex items-center gap-2">
          <p className="text-blue-200 font-bold">Tarefas criadas</p>
          <p className="flex justify-center items-center px-[8px] py-[2px] gap-[10px] h-[19px] text-gray-200 font-bold text-xs bg-gray-400 rounded-full">
            {numberCreatedTasks}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-purple-200 font-bold">Concluídas</p>
          <p className="flex justify-center items-center px-[8px] py-[2px] gap-[10px] h-[19px] text-gray-200 font-bold text-xs bg-gray-400 rounded-full">
            {numberCompletedTasks}
          </p>
        </div>
      </div>
      {isListTasksEmpty && (
        <div className="w-full flex flex-col items-center px-6 py-16 border-t-[1px] border-gray-400">
          <Image src={clipboard} alt="" className="w-14 h-14 mb-4" />
          <p className="text-gray-300 text-base">
            <span className="font-bold">
              Você ainda não tem tarefas cadastradas
            </span>
          </p>
          <p className="text-gray-300 text-base">
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      )}
      <div className="w-full">
        {tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              onDeleteTask={onDeleteTask}
              onCompleteTask={onCompleteTask}
            />
          )
        })}
      </div>
    </>
  )
}
