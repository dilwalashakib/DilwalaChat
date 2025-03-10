export const seenMessage = async(msg) => {
    const data = await fetch(`${process.env.server}/api/messages/seen`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(msg)
    });

    const res = await data.json();
    if(data.ok) {
        console.log(res?.success);
    } else {
        console.log(res?.error);
    }
}

export const deliveredMessage = async(msg) => {
    const data = await fetch(`${process.env.server}/api/messages/delivered`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(msg)
    });

    const res = await data.json();
    if(data.ok) {
        console.log(res?.success);
    } else {
        console.log(res?.error);
    }
}
