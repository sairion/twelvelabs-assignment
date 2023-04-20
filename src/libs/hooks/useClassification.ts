import { useQuery } from "@tanstack/react-query"
import api from "@/libs/core/api"
import type { TWLSClassificationResponse } from "../core/apiTypes"

export default function useClassification({ limit = 10 }) {
  return useQuery({
    queryKey: ["classification", limit],
    queryFn: async () => {
      const response = await api.post(`classify/bulk`, {
        json: {
          options: ["visual", "conversation", "text_in_video"],
          index_id: process.env.NEXT_PUBLIC_TWLS_LIST_INDEX_ID,
          classes,
        },
        searchParams: {
          page_limit: limit,
        },
      })
      return response.json<TWLSClassificationResponse>()
    },
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
