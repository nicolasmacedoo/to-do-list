import { TaskType } from '@/pages'
import { Trash } from 'phosphor-react'
import Image from 'next/image'
import vector from '../../public/vector.svg'

interface TaskProps {
  task: TaskType
  key: string
  onDeleteTask: (id: string) => void
  onCompleteTask: (id: string) => void
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  function handleCompleteTask() {
    onCompleteTask(task.id)
  }

  return (
    <div className="text-gray-100 bg-gray-500 h-[72px] p-4 border-solid border-2 border-gray-400 rounded-lg flex items-center gap-4 mb-3">
      <input
        type="checkbox"
        name={task.title}
        id={task.id}
        onClick={handleCompleteTask}
        defaultChecked={task.is_complete}
        className={`appearance-none border-solid border-2 border-blue-200 h-[17px] w-[17px] rounded-full checked:bg-purple-200 checked:border-none checked:befiore:content-[${(
          <Image src={vector} alt="check image" />
        )}] checked:before:flex checked:before:justify-center`}
      />
      <label
        htmlFor={task.id}
        className={task.is_complete ? 'text-sm line-through' : 'text-sm'}
      >
        {task.title}
      </label>
      <button
        className="text-gray-300 hover:text-danger"
        onClick={handleDeleteTask}
      >
        <Trash size={16} />
      </button>
    </div>
  )
}
