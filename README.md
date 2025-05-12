# PeerReviewApp

## Important Information:
This is my side project. Since I haven't purchased an Apple Developer Program membership, you'll need to run terminal commands to open the app.

I do not store any of your data or API keys.

All related data is stored locally in `~/Library/Application Support/com.PeerReview.app`.


## Download
Download link: https://github.com/HelloChunWei/PeerReviewApp/releases/tag/1.1.1
Click on the .dmg file and then click to install the application.

<img width="692" alt="截圖 2025-05-12 晚上11 01 05" src="https://github.com/user-attachments/assets/0b69695e-c62b-4a4c-8a2b-6611fc0b5f4a" />

## Installation Instructions
After installation, open your terminal and run:

``sudo xattr -rd com.apple.quarantine $PATH``

Replace ``$PATH`` with the path to your application:

If installed on your Desktop:

``sudo xattr -rd com.apple.quarantine ~/Desktop/PeerReviewApp.app``

If installed in the Applications folder:

``sudo xattr -rd com.apple.quarantine /Applications/PeerReviewApp.app``

After pressing Enter, you will be prompted to enter your computer password.

Enter your password and press Enter again to complete the process. (Note: When typing your password, no characters like asterisks (*) will appear on the screen, but your input is being recorded.)


<img width="1594" alt="截圖 2025-05-12 晚上11 08 42" src="https://github.com/user-attachments/assets/0f2705de-d984-4ce8-a1e7-569ee664d314" />


You can now open the application!

<img width="867" alt="截圖 2025-05-12 晚上11 10 07" src="https://github.com/user-attachments/assets/d3a12566-6d44-45d1-98d0-3c2b3aceae0e" />

## First-time Setup
When you first open the app, you will be prompted to select a folder to store your reviews.

**Please select a folder on your desktop.**

Since I haven't spent much time developing permission-related code, it's recommended to create a new folder on your desktop for this purpose.



# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
