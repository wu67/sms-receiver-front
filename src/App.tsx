import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import './app.scss'
import { get } from './fetch'

export default function App() {
  let [list, setList] = useState([] as any[])

  useEffect(() => {
    get(import.meta.env.VITE_API + `/sms/list`, {
      limit: 20,
    }).then((res: any) => {
      setList(res.data as any[])
    })
  }, [])

  return (
    <div
      id="app"
      className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {list.map((item, index) => {
        return (
          <div className="rounded border border-solid border-gray-e shadow">
            <div className="flex items-center justify-between border border-solid border-transparent border-b-gray-e p-[7px]">
              <div className="text-sm text-gray-7">{item.fromPhone}</div>
              <div className="text-sm text-gray-7">
                {dayjs(item.receiveTime).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
            <div className="p-[10px]">
              <div className="break-all text-justify text-lg leading-[1.4] text-gray-2 md:text-base lg:text-sm xl:text-sm">
                {item.content}
              </div>
              <div className="mt-6 text-right text-gray-7">
                {item.phone.replace(/SIM\d_/, '').replace(/(_|-)/, ' ')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
