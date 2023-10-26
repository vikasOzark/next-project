from django.contrib import admin
from unfold.admin import ModelAdmin
from authentication.models import User, AccessTokens


@admin.register(AccessTokens)
class TokenAdminClass(ModelAdmin):
    pass

admin.site.register(User)
# admin.site.register(AccessTokens)
