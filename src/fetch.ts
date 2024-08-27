export const $fetch = (p: any) =>
  new Promise((resolve, reject) => {
    const config: any = {
      method: p.method || 'GET',
    }
    if (p.data) {
      config.data = p.data
    }

    let q = ''
    if (
      p.query &&
      Object.prototype.toString.call(p.query) === '[object Object]'
    ) {
      for (const key in p.query) {
        if (Object.getOwnPropertyNames(p.query).includes(key)) {
          q += `&${key}=${encodeURIComponent(p.query[key])}`
        }
      }
      if (q.length) q = q.substring(1)
    }

    if (p.headers) {
      config.headers = Object.assign(
        {
          ua: import.meta.env.VITE_UA,
          'Content-Type': 'application/json',
        },
        p.headers,
      )
    } else {
      config.headers = {
        ua: import.meta.env.VITE_UA,
        'Content-Type': 'application/json',
      }
    }

    let path = p.url
    if (q.length) {
      path += path.indexOf('?') === -1 ? `?${q}` : `&${q}`
    }

    fetch(path, config)
      .then((res) => {
        res
          .json()
          .then((data) => {
            // console.log(data, 'response')
            if (data.code === 200) {
              resolve(data)
            } else {
              reject(data)
            }
          })
          .catch((e) => reject(e))
      })
      .catch((e) => reject(e))
  })
