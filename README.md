 # My Final Project – Group Collaboration App

I built this full-stack **group collaboration app** for my Web Architecture final project named as **Slate** naming is random as it represents the blackboard term or synonym. The main goal was to allow users to interact in groups by chatting, video calling, and sharing files in real-time.

##  What My App Does

-  Users can **log in** and **join groups** also,
-   can **create**, **edit**, or **delete** groups
-   can **add members** directly into a group
-   can **chat live** with group members (no refresh needed!)
-   can **upload files** and see all uploaded documents in the group
-   can **start a group video call**

---

##  Technologies I Used

| Feature / Area         | Technology                         |
|------------------------|-------------------------------------|
| Frontend               | React, Redux Toolkit, MUI, SCSS     |
| Routing                | React Router v6                     |
| Backend                | Node.js, Express.js, MongoDB        |
| Real-Time Chat         | Socket.IO                           |
| Video Calling          | WebRTC with Simple-Peer             |
| File Uploads           | express-fileupload, multer-style    |
| Authentication         | JWT Tokens                          |
| Testing                | Jest, React Testing Library         |

---

##  How It Works 

###  Socket.IO
I used Socket.IO to enable real-time communication between users — for things like:
- Sending and receiving chat messages instantly
- Notifying other users when someone joins or leaves the group
- Broadcasting video/audio toggle status in a call

###  WebRTC + Simple-Peer
I used WebRTC for peer-to-peer video calling. I used a library called `simple-peer` to manage the video call connection between two users. Each group acts as a **room** where only the group’s members can join the video call.

---

##  Testing

I created a few basic test cases using **Jest** and **React Testing Library** just to check if:
- Components render correctly


