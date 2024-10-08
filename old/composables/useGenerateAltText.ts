
const fetchGeneratedAltText = ref($fetch.create({}));

function init(API_URL: string) {
  console.log('init useGenerateAltText: ', API_URL)
  fetchGeneratedAltText.value = $fetch.create({
    baseURL: API_URL,
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    // Define the onRequest interceptor to add headers
    async onRequest({ options }) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('localid')
        options.headers = options.headers || {}
        if (token) {
          (options.headers as any)['Authorization'] = `Bearer ${token}`
        }
        if (userId) {
          (options.headers as any)['user-id'] = userId
        }
      }
    },
    // Define the onRequestError interceptor
    onRequestError(error) {
      console.error('Request error:', error)
    },
    // Define the onResponse interceptor
    onResponse({ response }) {
      // Do something with the response data
    },
    // Define the onResponseError interceptor
    onResponseError(error) {
      console.error('Response error:', error)
    }
  })
}

export function useGenerateAltText() {
  return {
    api: fetchGeneratedAltText,
    init,
    fetchGeneratedAltText: (src: string) => fetchGeneratedAltText.value<string>("/api/alt-text", { params: { src } }),
  }
}