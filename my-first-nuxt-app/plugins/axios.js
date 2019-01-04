export default function({ $axios }) {
  $axios.onRequest((config) => {
    if(process.env.QIIITA_TOKEN) {
      config.headers.common['Authorization'] = process.env.QIIITA_TOKEN
    }

    return config
  })
}