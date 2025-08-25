import axios from 'axios'

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

export async function fetchDailyET0(lat: number, lon: number): Promise<number[]> {
  const { data } = await axios.get(WEATHER_API, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'et0_fao_evapotranspiration',
      timezone: 'auto'
    }
  })
  return data?.daily?.et0_fao_evapotranspiration ?? []
}

