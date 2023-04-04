import { api } from '@/lib/axios'
import { TaskType } from '@/pages'
import { PlusCircle } from 'phosphor-react'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'

interface NewTaskProps {
  tasks: TaskType[]
  setTasks: Dispatch<SetStateAction<TaskType[]>>
}

export function NewTask({ tasks, setTasks }: NewTaskProps) {
  const [newTaskText, setNewTaskText] = useState('')

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const response = await api.post('/tasks', {
      title: newTaskText,
      is_complete: false,
    })
    setNewTaskText('')
    setTasks((state) => [...state, response.data])
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
    setNewTaskText(event.target.value)
  }

  return (
    <form
      onSubmit={handleCreateNewTask}
      className="h-[54px] w-full flex justify-center gap-2 -mt-[27px]"
    >
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTaskText}
        onChange={handleNewTaskChange}
        className="w-[638px] p-5 bg-gray-500 text-gray-300 border-[1px] border-solid border-gray-700 rounded-lg transition-colors focus:border-2 focus:border-solid focus:border-purple-400 focus:outline-none"
      />
      <button
        type="submit"
        className="w-[90px] flex items-center justify-center gap-2 font-bold text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-200"
      >
        Criar <PlusCircle size={20} weight="bold" />
      </button>
    </form>
  )
}
