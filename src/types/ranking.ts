export interface User {
    id: string
    name: string
    avatar: string
    points: number
    prize?: number
  }
  
  export interface TopUser extends User {
    pointsToEarn: number
  }
  
  export interface RankingTableUser extends User {
    place: number
  }
  
  