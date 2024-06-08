interface Content {
  id: number
  articleId: number
  type: 'heading' | 'image' | 'paragraph'
  content: string
}

export interface Article {
  id: number
  title: string
  thumbnail: string
  createdAt: Date
  contents: Content[]
}
