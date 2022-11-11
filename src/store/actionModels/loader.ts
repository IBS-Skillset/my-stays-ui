export interface ActionLoader {
  type: string
  payload: { status: boolean; showLoading: boolean }
}
