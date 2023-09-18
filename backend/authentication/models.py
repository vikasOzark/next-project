from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.urls import reverse
from django.utils.translation import gettext as _
import uuid
from datetime import timedelta, datetime
from django.utils import timezone

class BaseUserModelManager(BaseUserManager):
    def create_user(self, email, username, first_name, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            username=username,
        )
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, first_name, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
            first_name=first_name,
        )
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(_("Email Address"), unique=True)
    username = models.CharField(_("Username"), unique=True, max_length=50)
    first_name = models.CharField(_("First Name"), max_length=15)
    last_name = models.CharField(_("Last Name"), max_length=15, blank=True, null=True)
    phone_number = models.PositiveIntegerField(_("Phone Number"), blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    
    objects = BaseUserModelManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name"]
    
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.first_name

    def get_absolute_url(self):
        return reverse("user_detail", kwargs={"pk": self.pk})
    
    def has_perm(self, perm, obj=None):
    # Does the user have a specific permission?
    # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # Does the user have permissions to view the app `app_label`?
        # Simplest possible answer: Yes, always
        return True



class AccessTokens(models.Model):
    """This class is used for storing information about JSON web tokens
    being used as access tokens to manage user sessions and access to
    services offered in the application.
    """

    def generate_secret_key() -> str:
        """This method is used to generate a secret key to be used for
        signing the JWT.

        Returns
        -------
        The generated secret key in hexadecimal format.
        """
        return uuid.uuid4().hex

    issued_at = models.DateTimeField(_("issued at"), auto_now_add=True)
    expires_at = models.DateTimeField(_("Expires at"))
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="access_tokens",
        related_query_name="token",
        verbose_name=_("subject")
    )
    token = models.CharField(_("secret"), max_length=150, )
    is_blacklisted = models.BooleanField(_("is blacklisted"), default=False)

    def save(self, *args, **kwargs) -> None:
        """This method is used to save the model instance to the database.
        It also sets the default value for the `expires_at` field to 1
        day after the `issued_at` field.
        """
        user_token = AccessTokens.objects.filter(user=self.user)
        if user_token.exists():
            user_token.delete()
        self.expires_at = timezone.now() + timedelta(days=14)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        """Returns the string representation of the model."""
        return f"{self.user.username}"

    class Meta:
        """This class is used to define the metadata options for the model."""

        verbose_name = _("access token")
        verbose_name_plural = _("access tokens")
        ordering = ("-issued_at",)

