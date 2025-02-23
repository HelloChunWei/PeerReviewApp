import { load } from '@tauri-apps/plugin-store'

// action
export const getSaveFilePath = async() => {
    /* path: app_data_dir according to https://crates.io/crates/directories
     * macOS ~/Library/Application Support/[app_name]
    */
    const store = await load('PeerReviewApp.json', { autoSave: false })
    // Get a path
    const path = await store.get<{ value: number }>('save_path')
    return path
}

// action
export const savePath = async(path: string) => {
    const store = await load('PeerReviewApp.json', { autoSave: false });
    await store.set('save_path', { value: path });
    await store.save();
}