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
      className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {list.map((item, index) => {
        return (
          <Card
            key={index}
            className=" shadow"
            styles={{
              header: { padding: '0 7px' },
              body: { padding: '10px  10px' },
            }}
            title={
              <div className="flex justify-between">
                <div className="">{item.fromPhone}</div>
                <div className="">
                  {dayjs(item.receiveTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
            }
          >
            <div>{item.content}</div>

            <div className="text-right mt-6">{item.phone}</div>
          </Card>
        )
      })}
    </div>
  )
}
