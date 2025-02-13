# Secret Santa Assignment

## Overview

This application automates the process of assigning secret children to employees based on the provided employee information. Users can upload a CSV file (in the format: name, email id) to generate Secret Santa details. If a previous year's CSV file is provided, the application ensures that the same Secret Santa pairings are not repeated.

<img width="957" alt="img13" src="https://github.com/user-attachments/assets/4ac3b86f-c15d-444d-8837-6402753144d7" />
<img width="941" alt="img12" src="https://github.com/user-attachments/assets/0548187d-5ec6-46ed-ba2b-604a454961eb" />

## Installation

- Clone the repository:

git clone <repo-url>
cd <repo-directory>

- Install dependencies:

npm install

- Start the development server:

npm run dev

## Usage

- Upload a CSV file containing employee details in the format:

Name, Email ID
Layla Graham, layla.graham@acme.com
Benjamin Collins, benjamin.collins@acme.com

- (Optional) Upload the previous year's CSV file to prevent repeated pairings.
  Name, Email ID Secret Santa Name, Secret Santa Email ID
Layla Graham, layla.graham@acme.com, Charlie Ross, charlie.ross.jr@acme.com
Benjamin Collins, benjamin.collins@acme.com, Matthew King, matthew.king.jr@acme.com

- Generate the Secret Santa pairings.

- Download the generated file for future reference.

## Additional Information

- The application ensures fair and random assignment.

- The generated results can be downloaded as a CSV file.

- If a previous year's data is uploaded, the application intelligently avoids assigning the same Secret Santa pair as before.

Happy Gifting! 🎁
