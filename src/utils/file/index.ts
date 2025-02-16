import { load } from '@tauri-apps/plugin-store'

// action
export const getSaveFilePath = async() => {
    // TODO: need to know where PeerReviewApp is saved.
    const store = await load('PeerReviewApp.json', { autoSave: false })
    // Get a path
    const path = await store.get<{ value: number }>('save_path')
    return path
}