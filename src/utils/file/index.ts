import { load } from '@tauri-apps/plugin-store'
import { readDir, mkdir, BaseDirectory, create, exists, readTextFile, writeTextFile, remove } from '@tauri-apps/plugin-fs'
import dayjs from 'dayjs'

const reviewFolder = 'reviews'
const resultFolder = 'results'
const SAVE_PATH = {
    value: ''
}

// pattern: YYYY-MM-DD_Name.md
export const pathRegx = /^\d{4}-\d{2}-\d{2}_[a-zA-Z0-9]+\.md$/

// action
export const getSaveFilePath = async() => {
    if (SAVE_PATH.value) return SAVE_PATH;
    /* path: app_data_dir according to https://crates.io/crates/directories
     * macOS ~/Library/Application Support/[app_name]
    */
    const store = await load('PeerReviewApp.json', { autoSave: false })
    // Get a path
    const path = await store.get<{ value: string }>('save_path')
    SAVE_PATH.value = path?.value || ''
    return path
}

// action
export const savePath = async(path: string) => {
    const store = await load('PeerReviewApp.json', { autoSave: false })
    await store.set('save_path', { value: path })
    await store.save()
}

// action
const createFolderIfNotExist = async (path: string, folderName: string) => {
    const folderPath = `${path}/${folderName}`
    await mkdir(folderPath, { baseDir: BaseDirectory.AppLocalData })
};

// action
const createFile = async (filename: string) => {
    const isExist = await exists(`${filename}`, { baseDir: BaseDirectory.AppLocalData })
      if (isExist) throw new Error('A work log for this colleague already exists for this date')
    const file = await create(`${filename}`, { baseDir: BaseDirectory.AppData })
    await file.close()
}

// calculate
const createPathAndFileName = (payload: {
    path: string,
    folderName: string,
    fileName: string,
}) => `${payload.path}/${payload.folderName}/${payload.fileName}`

// action
export const createReview = async(date: Date, colleagueName: string) =>{
    try {
        const path = await getSaveFilePath();
        if (!path?.value) throw new Error('save path not found');

        const entries = await readDir(path.value, { baseDir: BaseDirectory.AppLocalData });

        if (entries.length === 0) {
            await createFolderIfNotExist(path.value, reviewFolder);
            await createFolderIfNotExist(path.value, resultFolder);
        } else {
            const existingFolders = new Set(
                entries
                    .filter(entry => entry.isDirectory)
                    .map(entry => entry.name)
            );

            if (!existingFolders.has(reviewFolder)) {
                await createFolderIfNotExist(path.value, reviewFolder);
            }
            if (!existingFolders.has(resultFolder)) {
                await createFolderIfNotExist(path.value, resultFolder);
            }
        }

        const filePathAndName = createPathAndFileName({
            path: path.value,
            folderName: reviewFolder,
            fileName: `${dayjs(date).format('YYYY-MM-DD')}_${colleagueName}.md`
        })

        await createFile(filePathAndName)


    } catch (e) {
        console.error(e)
        throw e
    }

}
// calculate
export const getReviewFile =  async (name: string) => {
    try {
        const path = await getSaveFilePath()
        if (!path?.value) throw new Error('save path not found')
        const combinePath = `${path.value}/${reviewFolder}/${name}.md`
        const contents = await readTextFile(combinePath, { baseDir: BaseDirectory.AppLocalData })
        return contents
    } catch (e) {
        console.error(e)
        throw e
    }
}

// action
export const getAllReviewFile = async () => {
    const path = await getSaveFilePath()
    if (!path?.value) throw new Error('save path not found')
    const reviewFilePath = `${path.value}/${reviewFolder}`
    const entries = await readDir(reviewFilePath, { baseDir: BaseDirectory.AppLocalData })
    const resultList = entries.filter(entry => pathRegx.test(entry.name) && entry.isFile)
      .map(entry => entry.name)
    return resultList
}

export const saveFile = async (fileName: string, content: string) => {
    try {
        const path = await getSaveFilePath()
        if (!path?.value) throw new Error('save path not found')
        const combinePath = `${path.value}/${reviewFolder}/${fileName}.md`
        const contents = await writeTextFile(combinePath, content, { baseDir: BaseDirectory.AppLocalData })
        return contents
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const deleteFile = async(fileName: string) => {
    try {
        const path = await getSaveFilePath()
        if (!path?.value) throw new Error('save path not found')
        const combinePath = `${path.value}/${reviewFolder}/${fileName}.md`
        await remove(combinePath, { baseDir: BaseDirectory.AppLocalData })
    } catch (e) {
        console.error(e)
        throw e
    }
}