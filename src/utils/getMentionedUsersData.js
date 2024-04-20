import { isJSONString } from "./validateJsonString";

export default function getMentionedUser(dataString) {
    const isJsonString = isJSONString(dataString);
    if (!isJsonString) {
        return []
    }

    const parsedData = JSON.parse(dataString)
    let mentionsArray = []
    for (const [key, val] of Object.entries(parsedData)) {
        const v = val.content.filter(con => con.type === "mention")
        if (v.length > 0) {
            mentionsArray = [...v]
        }
    }
    return mentionsArray.map(mention => mention.props.user)
}