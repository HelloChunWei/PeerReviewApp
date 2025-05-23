# PeerReviewApp
**You can use AI to help you complete peer review**

## Important Information:
This is my side project. Since I haven't purchased an Apple Developer Program membership, you'll need to run terminal commands to open the app.

I do not store any of your data or API keys.

All related data is stored locally in `~/Library/Application Support/com.PeerReview.app`.


## Download
Download link: https://github.com/HelloChunWei/PeerReviewApp/releases/tag/1.13

Choose ``PeerReviewApp_1.1.3_x64.dmg`` if your macbook is intel-based

Click on the `.dmg` file to download it and then click to install the application.

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

This command ``sudo xattr -rd com.apple.quarantine`` is used on macOS to remove the quarantine attribute from files or folders. 

When you download files from the internet, macOS adds this attribute as a security measure. Running this command bypasses the security warning that appears when opening downloaded applications, especially those from unverified developers. Just make sure the file is from a trusted source before removing this protection.


You can now open the application!

<img width="867" alt="截圖 2025-05-12 晚上11 10 07" src="https://github.com/user-attachments/assets/d3a12566-6d44-45d1-98d0-3c2b3aceae0e" />

## First-time Setup
When you first open the app, you will be prompted to select a folder to store your reviews.

**Please select a folder on your desktop.**

Since I haven't spent much time developing permission-related code, it's recommended to create a new folder on your desktop for this purpose.

## Usage

You can open the sidebar to create a new work log.
<img width="1017" alt="截圖 2025-05-12 晚上11 12 39" src="https://github.com/user-attachments/assets/7c13a152-b051-43e3-829a-289c95dbe707" />

<img width="977" alt="截圖 2025-05-12 晚上11 14 09" src="https://github.com/user-attachments/assets/56df5516-c539-495d-a267-54e7c343d1c6" />


After creation, work logs will be automatically sorted by date.
<img width="1015" alt="截圖 2025-05-12 晚上11 14 00" src="https://github.com/user-attachments/assets/40f7870e-42c6-4b65-86b8-0ddc871d6606" />

You can edit your work logs by:

Clicking on them from the home page

Selecting "Your Work Log" in the sidebar

<img width="1246" alt="截圖 2025-05-12 晚上11 15 30" src="https://github.com/user-attachments/assets/9dc1c2a3-526d-4e35-87c0-4770b19ad11b" />

Once all work logs are completed, you can click the star icon in the upper right corner of the home page to start the peer review process.

<img width="1251" alt="截圖 2025-05-12 晚上11 17 20" src="https://github.com/user-attachments/assets/a92519f8-8eea-4097-8f7f-9268cb36953c" />

You can select from three different AI models to perform the peer review.

<img width="1144" alt="截圖 2025-05-12 晚上11 18 30" src="https://github.com/user-attachments/assets/67f04bf0-800a-4928-81ee-a6ede5ddf845" />

The first time you use the review feature, you will be prompted to enter an API key. 

Your key will be stored locally in ``~/Library/Application Support/com.PeerReview.app.`` I do not store or have access to your API key.

<img width="1151" alt="截圖 2025-05-12 晚上11 19 09" src="https://github.com/user-attachments/assets/5403a93f-d82a-44e4-a853-975ddc03c80f" />

Next, you can select which quarter you want to review, it will take some time. You can also choose whether to overwrite the old result.

<img width="1220" alt="截圖 2025-05-13 晚上10 33 37" src="https://github.com/user-attachments/assets/e990e700-e00c-45e8-af26-40037d214392" />




After the review is complete, you can find the peer review results in the sidebar or in the folder you specified during setup.

<img width="1224" alt="截圖 2025-05-12 晚上11 23 20" src="https://github.com/user-attachments/assets/e794697f-c032-41f8-bb03-e723a80ac1de" />


<img width="776" alt="截圖 2025-05-12 晚上11 24 21" src="https://github.com/user-attachments/assets/cb7f6de2-2e5d-4e0c-9e76-caefb3e30b35" />


------

# Tech - Tauri + React + Typescript
## package: shadcn/ui + tailwindcss + zustand + zod + mdxeditor
