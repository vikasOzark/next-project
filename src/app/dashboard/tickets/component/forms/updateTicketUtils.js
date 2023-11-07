  export const handleSelect = (tag, tags, setTags, setSelectedTag, selectedTag) => {
    const isMatched = selectedTag.find((item) => item.id === tag.id);
    if (!isMatched) {
      setSelectedTag([...selectedTag, tag]);
    }

    tags.find((item, index) => {
      if (item.id === tag.id) {
        const newUpdated = [...tags];
        if (!newUpdated[index].isSelected) {
          newUpdated[index].isSelected = true;
        }
        setTags(newUpdated);
      }
    });
  };

  export const handleRemove = (tag, tags, setTags, selectedTag, setSelectedTag) => {
    selectedTag.find((item, index) => {
      if (item.id === tag.id) {
        const newA = [...selectedTag];
        newA.splice(index, 1);
        setSelectedTag(newA);
      }

      tags.find((item, index) => {
        if (item.id === tag.id) {
          const newUpdated = [...tags];
          newUpdated[index].isSelected = false;
          setTags(newUpdated);
        }
      });
    });
  };
