type TWLSIndex = {
  _id: string
  created_at: string
  updated_at: string
  metadata: {
    duration: number
    engine_id: string
    filename: string
    fps: number
    height: number
    size: number
    width: number
  }
}

type TWLSPageInfo = {
  page: number
  limit_per_page: number
  total_page: number
  total_results: number
  total_duration: number
}

export type TWLSIndexListResponse = {
  data: TWLSIndex[]
  page_info: TWLSPageInfo
}

type TWLSSearchPageInfo = {
  limit_per_page: number
  total_results: number
  page_expired_at: string
  prev_page_token?: string
  next_page_token: string
}

type TWLSClass = {
  name: string
  score: number
  duration_ratio: number
}
type TWLSClassification = {
  video_id: string
  classes: TWLSClass[]
}

export type TWLSClassificationResponse = {
  data: TWLSClassification[]
  page_info: TWLSSearchPageInfo
}
