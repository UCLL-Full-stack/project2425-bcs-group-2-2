import { AnonymousFeedback } from "@/types";


const addFeedack = (anonymousFeedback: AnonymousFeedback) => {
    const token = sessionStorage.getItem("token");
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/anonymousFeedback", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(anonymousFeedback)
    })
}

const AnonymousFeedbackService = {
    addFeedack
};

export default AnonymousFeedbackService;