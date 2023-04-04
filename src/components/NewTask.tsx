import { api } from '@/lib/axios'
import { TaskType } from '@/pages'
import { PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dispatch, SetStateAction } from 'react'

interface NewTaskProps {
  tasks: TaskType[]
  setTasks: Dispatch<SetStateAction<TaskType[]>>
}

const newTaskFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
})

type NewTaskFormData = z.infer<typeof newTaskFormValidationSchema>

export function NewTask({ tasks, setTasks }: NewTaskProps) {
  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewTaskFormData>({
      resolver: zodResolver(newTaskFormValidationSchema),
      defaultValues: {
        task: '',
      },
    })

  async function handleCreateNewTask(data: NewTaskFormData) {
    const response = await api.post('/tasks', {
      title: data.task,
      is_complete: false,
    })
    // reset volta para o valor que esta no deault values, quando input nao e tradicional html?
    reset()
    setTasks((state) => [...state, response.data])
  }

  // log do erro de validacao zod
  console.log(formState.errors)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewTask)}
      className="h-[54px] w-full flex justify-center gap-2 -mt-[27px]"
    >
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        {...register('task')}
        className="w-[638px] p-5 bg-gray-500 text-gray-300 border-[1px] border-solid border-gray-700 rounded-lg transition-colors focus:border-2 focus:border-solid focus:border-purple-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-[90px] flex items-center justify-center gap-2 font-bold text-gray-100 bg-blue-500 rounded-lg hover:bg-blue-200 disabled:bg-gray-400"
      >
        Criar <PlusCircle size={20} weight="bold" />
      </button>
    </form>
  )
}
