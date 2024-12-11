export interface Movie {
    id?: number; 
    title: string; 
    releaseDate: string; 
    runtimeInMinutes?: number; 
    trailerUrl: string; 
    displayPriority?: number; 
    createdAt?: Date; 
    updatedAt?: Date; 
  }