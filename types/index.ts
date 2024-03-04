export type Doc = {
  doc_id: string
  file_name: string
  createdAt: string
  content: string
}

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}
