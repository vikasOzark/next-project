from django.contrib import admin
from authentication.models import User, AccessTokens

admin.site.register(User)
admin.site.register(AccessTokens)
