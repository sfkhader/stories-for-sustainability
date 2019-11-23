# stories-for-sustainability

Release Notes (Version 5.0)
  -New Features: 
    -Filtering capabilities on the library homepage (by language and goals)
    -Users can view account information in the Accounts page
    -Users can change select account information such as password
    -Users can bookmark pages and favorite books, and view these changes in separate tabs in the sticky navigation bar
    -Users can view which books they are currently reading and which books they have finished
  -App is mostly bug free and stable
  -Bug Fixes:
    -Web app no longer allows users to press “Next” after the book has ended, which previously caused the page to crash
  -Known bugs:
    -Ensure that the books database has at least one book. If not, the books database will be empty and the entire component is deleted.
    -Deleting users from the admin account on the web app may cause problems with the database, so if a user is deleted make sure to go into the Firebase console, click on “Authentication” on the left hand side, and delete the user from there as well. 
  -Future features that could be implemented:
    -Recommending books to user based on age, grade, and goals they are interested in (information is taken when registering so there is already access to this data)
    -Having sound effects while reading the book
    -Text-to-speech capabilities
    -Annotation capabilities on the PDF
    
Install Guide:
  -Pre-requisites:
    -This app can be run on most Windows, Mac, or LINUX operating systems. 
  -Dependent libraries that must be installed:
    -Download and install the latest version of node for the appropriate operating system (https://nodejs.org/en/)
    -Download and install the latest version of git  for the appropriate operating system (https://git-scm.com/downloads)
  -Download instructions:
    -Clone the github directory by navigating to command prompt (for Windows) or terminal (on LINUX/Mac) and typing in “git clone <repo URL>” and pressing the enter/return key 
      -IMPORTANT: Make sure you have cloned the repository into the directory (folder) that you want. For example, if you would like to have the repository in your Desktop, change navigate to that directory first (by typing cd Desktop and pressing return/enter). Then type in the git clone line.  
  -Installation of actual application:
    -Navigate into the directory by typing in “cd <directory name>” (in this case the directory name is stories-for-sustainability)  and pressing the enter/return key
    -Navigate to the react webapp directory by typing in “cd react” and pressing the enter/return key
    -Type in “npm install” and press enter
  -Run instructions:
    -Type in “npm start” and press enter
    -The app should automatically open in your default browser, but if it doesn’t, navigate to “http://localhost:3000” in your browser. 
    -To stop the web app from running, do Control/Command + C on the command prompt/terminal.
  -Troubleshooting: 
    -Please make sure to have the provided JSON file copied and pasted into the “react > src” directory. 
    -If the localhost opens up to a white screen with red errors, try running this command in the command prompt/terminal:  rm -rf node_modules && npm install
      -After running this command, run “npm install” and then “npm start”

