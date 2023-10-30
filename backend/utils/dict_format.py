class DictFormater:
    """This helper function is used to make regular dict to 
    use as a dot notation"""

    def __init__(self, data) -> None:
        self.__dict__ = data
        self.data = data

    def to_dict(self):
        # dict_data = self.data
        return self
        # self.__dict__.pop