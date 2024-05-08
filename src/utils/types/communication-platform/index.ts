
export type updateStartProps = {
  ac_id: string
  type: string;
  type_id: string;
}

export type CreateComment = {
  article_id?: string;
  achievement_id?: string;
  resource_id?: string;
  to_user_id: string;
  root_id: string;
  content: string;
  type: string;
  authorID?: string;
  name?: string;
  title?: string;
}
