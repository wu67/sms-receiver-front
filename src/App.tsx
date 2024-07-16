import { useEffect, useState } from 'react'
import { Card } from 'antd'
import dayjs from 'dayjs'
import './app.scss'

export default function App() {
  let [list, setList] = useState([] as any[])

  useEffect(() => {
    fetch(import.meta.env.VITE_API + `/sms/list?limit=${20}`, {
      headers: {
        ua: import.meta.env.VITE_UA,
      },
    }).then((res) => {
      res.json().then((d) => {
        if (d.code === 200) {
          setList(d.data)
        }
      })
    })
  }, [])

  return (
    <div
      id="app"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {list.map((item, index) => {
        return (
          <Card
            key={index}
            className="shadow"
            styles={{
              header: { padding: '0 7px' },
              body: { padding: '10px  10px' },
            }}
            title={
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-7">{item.fromPhone}</div>
                <div className="text-sm text-gray-7">
                  {dayjs(item.receiveTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
            }
          >
            <div className="text-gray-2">{item.content}</div>

            <div className="mt-6 text-right text-gray-7">
              {item.phone.replace(/SIM\d_/, '').replace(/(_|-)/, ' ')}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
