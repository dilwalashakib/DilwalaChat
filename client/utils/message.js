export const lastMessage = (users, msg, status) => {
    const findIndex = users?.findIndex((u) => u.user._id === msg.senderId || u.user._id === msg.receiverId);
    if(findIndex > -1) {
        users[findIndex].lastMessage = { ...msg, status };
        return users;
    }
}