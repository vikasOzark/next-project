import enum


class PermissionPrifix(enum.Enum):
    ALLOW_CREATE:str = "Allow create permission"
    ALLOW_UPDATE:str = "Allow update permission"
    ALLOW_DELETE:str = "Allow delete permission"
    ALLOW_READ:str = "Allow READ permission"
