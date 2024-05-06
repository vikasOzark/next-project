export default function GitlabParser(text) {
    const sampleFormat = `[{\"id\":\"3c92654b-e926-4e41-ad4b-d02c43e67854\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"${text}\",\"styles\":{}}],\"children\":[]},{\"id\":\"2ad4e73f-cec8-4e74-8a40-9f0c510dcd51\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[],\"children\":[]}]`;
    return JSON.parse(sampleFormat);
}
