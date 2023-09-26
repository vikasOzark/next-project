from django.db import models
from authentication.models import User
from django.utils.translation import gettext as _

class Department(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user", related_query_name="user")
    department_name = models.CharField(_("Department"), name="department", max_length=20)
    discription = models.CharField(_("Discription"), name="discription", max_length=255, null=True)
    created_at = models.DateTimeField(_("Created on"), name="created date", auto_now_add=True)


    def __str__(self) -> str:
        return super().__str__(self.user)