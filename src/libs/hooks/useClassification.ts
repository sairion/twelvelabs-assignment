import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSClassificationResponse } from "../core/apiTypes"

export default function useClassification({ limit = 10 }) {
  return useInfiniteQuery({
    queryKey: ["classification", limit],
    queryFn: async ({ pageParam }) => {
      if (pageParam) {
        const response = await api.get(`classify/${pageParam}`)
        return response.json<TWLSClassificationResponse>()
      } else {
        const response = await api.post(`classify/bulk`, {
          json: {
            options: ["visual", "conversation", "text_in_video"],
            index_id: process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID,
            classes,
            page_limit: limit,
          },
        })
        return response.json<TWLSClassificationResponse>()
      }
    },
    getNextPageParam: ({ page_info }) => page_info.next_page_token ?? undefined,
    retry: false,
  })
}

const classes = [
  {
    name: "BeautyTok",
    prompts: ["Makeup", "Skincare", "cosmetic products", "doing nails", "doing hair", "eyeshadow", "lipstick", "blush"],
  },
  {
    name: "DanceTok",
    prompts: [
      "dance tutorial",
      "dance competition",
      "dance challenge",
      "dance trend",
      "dancing with friends",
      "dance class",
      "dance moves",
      "dance lessons",
      "dance choreography",
      "dance performances",
    ],
  },
  {
    name: "CookTok",
    prompts: [
      "cooking tutorial",
      "cooking utensils ",
      "baking tutorials",
      "recipes",
      "restaurants",
      "food",
      "cooking utensils",
      "cooking tips",
      "cooking techniques",
      "healthy cooking",
    ],
  },
  {
    name: "AnimalTok",
    prompts: ["dog", "cat", "birds", "fish ", "playing with pets", "fish", "feeding pets", "caring for animals"],
  },
  {
    name: "KidTok",
    prompts: ["babies", "little girl", "little boy", "kids ", "toddlers", "children", "animation", "kid toys"],
  },
  {
    name: "FashionTok",
    prompts: [
      "clothing",
      "outfit",
      "fashion design",
      "mens fashion",
      "womens fashion",
      "find your style",
      "upcoming fashion trends",
      "streetwear",
      "style advice",
    ],
  },
  {
    name: "ArtTok",
    prompts: [
      "handicraft",
      "drawing",
      "graffiti",
      "sketching",
      "digital art",
      "sketchbook",
      "artists",
      "artwork",
      "painting",
    ],
  },
  {
    name: "FitTok",
    prompts: [
      "doing exercises",
      "workout",
      "being active",
      "staying active",
      "personal trainer",
      "going to the gym",
      "weight training",
      "yoga",
    ],
  },
]
