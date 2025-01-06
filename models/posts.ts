interface PaginationLinks {
  previous: string | null;
  current: string;
  next: string | null;
}

interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: PaginationLinks;
}

interface Meta {
  pagination: Pagination;
}

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostsData {
  meta: Meta;
  data: Post[];
}

export interface CreatePostInput {
  title: string;
  body: string;
}

export interface UpdatePostInput {
  postID: number;
  title: string;
  body: string;
}

export interface DeletePostInput {
  postID: number;
}
